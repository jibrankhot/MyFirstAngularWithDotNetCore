using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace WebAPI
{
  public class Program
  {
    public static void Main(string[] args)
    {
      CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureHostConfiguration(configHost =>
            {
              configHost.AddEnvironmentVariables(prefix: "HSPA_");
            })
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>()
                            .UseUrls($"http://*:{Environment.GetEnvironmentVariable("PORT") ?? "5000"}");
            });
  }
}
