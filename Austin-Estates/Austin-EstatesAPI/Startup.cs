using EstatesAPI.Controllers;
using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

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
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                    };
                });

            services.AddMvc();
           
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference=new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });

            services.AddCors(options => {
                options.AddPolicy("Cors", builder => {

                    builder.WithOrigins(new string[]{
                    "https://ai-nekretnine.azurewebsites.net",
                    "https://ai-nekretnine.azurewebsites.net/explore",
                    "https://nekretnine-ai.azurewebsites.net",
                    "https://nekretnine-ai.azurewebsites.net/explore",
                    "http://localhost:5500",
                    "https://localhost:3000",
                    "https://localhost:5500",
                    "https://127.0.0.1:5500",
                    "http://localhost:3000",
                    "http://localhost:5100",
                    "https://localhost:5100",
                    "https://127.0.0.1:5100",

                    "http://localhost:5173",
                    "http://127.0.0.1:5173",

                }).AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();

                });
            });

            services.AddHttpClient<HttpClientService>();
            services.AddHttpContextAccessor();
            services.Configure<ApiUrls>(Configuration.GetSection("ApiUrls"));
            services.Configure<EstateDatabaseSettings>(Configuration.GetSection("EstateDB"));
            services.AddSingleton<PropertyService>();
            services.AddSingleton<ClientService>();
            services.AddSingleton<HttpClientService>();
            services.AddScoped<CurrentUserService>();

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

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
               
            });
        }
    }
}
