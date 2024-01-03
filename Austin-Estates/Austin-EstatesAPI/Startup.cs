using EstatesAPI.Controllers;
using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddMvc();
           
            services.AddControllers();

            services.AddSwaggerGen();
           
            services.AddCors(options => {
                options.AddPolicy("Cors", builder => {

                    builder.WithOrigins(new string[]{
                    "http://localhost:5500",
                    "https://localhost:3000",
                    "https://localhost:5500",
                    "https://127.0.0.1:5500",
                    "http://localhost:3000",
                    "http://localhost:5100",
                    "https://localhost:5100",
                    "https://127.0.0.1:5100",
                }).AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();

                });
            });

            services.AddHttpClient<HttpClientService>();

            services.Configure<ApiUrls>(Configuration.GetSection("ApiUrls"));
            services.Configure<EstateDatabaseSettings>(Configuration.GetSection("EstateDB"));
            services.AddSingleton<PropertyService>();
            services.AddSingleton<ClientService>();
            services.AddSingleton<HttpClientService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();


            app.UseCors("Cors");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
               
            });
        }
    }
}
