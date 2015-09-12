using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;

namespace BackgroundProcessor
{
    namespace Configs
    {
        public class StartupConfig
        {
            public void Configure(IAppBuilder appBuilder, IKernel kernel)
            {
                var config = new HttpConfiguration();

                config.MapHttpAttributeRoutes();
                config.MapDefinedRoutes();

                appBuilder.UseNinjectMiddleware(() => kernel);
                appBuilder.UseNinjectWebApi(config);
            }
        }
    }
}