using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace NimbusServer.Config
{
    namespace Configs
    {
        public static class RoutesConfig
        {
            public static void MapDefinedRoutes(this HttpConfiguration config)
            {
                config.Routes.MapHttpRoute
                (
                    name: "DefaultApi",
                    routeTemplate: "api/{controller}/{id}",
                    defaults: new
                    {
                        id = RouteParameter.Optional
                    }
                );
            }
        }
    }
}
