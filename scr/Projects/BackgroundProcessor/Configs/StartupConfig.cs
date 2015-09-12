using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using NimbusServer.Api;
using Microsoft.Owin;
using Microsoft.Owin.StaticFiles;
using Microsoft.Owin.FileSystems;
using WebApiContrib.Formatting.Jsonp;
using Newtonsoft.Json.Serialization;
using Microsoft.Owin.Security.OAuth;
using System.Web.Http.Cors;
using NimbusServer.Api.Kernel.Api;

namespace BackgroundProcessor
{
    namespace Configs
    {
        public class StartupConfig
        {
            public void Configure(IAppBuilder appBuilder, IKernel kernel)
            {
    
                UseFileServer(appBuilder);
                UseWebApi(appBuilder, kernel);
                appBuilder.UseNancy(options => options.Bootstrapper = new NancyBootstrapper());
            }

            private static void UseFileServer(IAppBuilder application)
            {
                //application.UseFileServer(new FileServerOptions
                //{
                //    FileSystem = new PhysicalFileSystem(IsDevelopment() ? "../../static" : "static"),
                //    RequestPath = new PathString("/static")
                //});
            }

            private static void UseWebApi(IAppBuilder application, IKernel kernel)
            {
                var config = new HttpConfiguration();
                config.MapHttpAttributeRoutes();
                var cors = new EnableCorsAttribute("*", "*", "*");




                //GlobalConfiguration.Configure(configuration =>
                //{
                //    configuration.SuppressDefaultHostAuthentication();
                //    configuration.MapHttpAttributeRoutes();
                //    configuration.EnableCors(cors);
                //    configuration.Filters.Add(new HostAuthenticationAttribute(OAuthDefaults.AuthenticationType));
                //    var jsonformatter = configuration.Formatters.JsonFormatter;
                //    jsonformatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                //    configuration.AddJsonpFormatter();
                //    application.UseNinjectMiddleware(() => kernel);
                //    application.UseNinjectWebApi(configuration);
                //    application.UseWebApi(configuration);
                //});
                config.SuppressDefaultHostAuthentication();
                ConfigureOAuth(application);
                config.EnableCors(cors);
                config.Filters.Add(new HostAuthenticationAttribute(OAuthDefaults.AuthenticationType));
                var jsonformatter = config.Formatters.JsonFormatter;
                jsonformatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                config.AddJsonpFormatter();

                application.UseNinjectMiddleware(() => kernel);
                application.UseNinjectWebApi(config);
                application.UseWebApi(config);

                

                application.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            }
            public static void ConfigureOAuth(IAppBuilder app)
            {

                OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
                {

                    AllowInsecureHttp = true,
                    TokenEndpointPath = new PathString("/token"),
                    AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                    Provider = new SimpleAuthorizationServerProvider()
                };

                // Token Generation
                app.UseOAuthAuthorizationServer(OAuthServerOptions);

                app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            }
            public static bool IsDevelopment()
            {
                // todo add a way to determine if development or not.
                return false;
            }
        }
    }
}