using EstatesAPI.Models;
using EstatesAPI.Services;
using EstatesAPI.Controllers;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting;
using Server;

namespace EstatesAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
       
    }
}