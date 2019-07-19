using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost
            .CreateDefaultBuilder(args)
            // .ConfigureKestrel(options =>
            // {
            //     options.ListenLocalhost(5001, listenOptions =>
            //     {
            //         listenOptions.Protocols = HttpProtocols.Http2;
            //         listenOptions.UseHttps("testcert.pfx", "test");
            //     });
            // })
            .UseStartup<Startup>();
    }
}