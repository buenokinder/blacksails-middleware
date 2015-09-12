using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Kernel.Config
{
    public static class Configuration
    {
        public static string UrlBase = System.Configuration.ConfigurationManager.AppSettings["UrlBase"];
    }
}
