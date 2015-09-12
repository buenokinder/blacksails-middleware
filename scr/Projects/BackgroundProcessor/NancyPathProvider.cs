using BackgroundProcessor.Configs;
using Nancy;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api
{
    public class NancyPathProvider : IRootPathProvider
    {
        public string GetRootPath()
        {
            return StartupConfig.IsDevelopment()
              ? Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\")
              : AppDomain.CurrentDomain.BaseDirectory;
        }
    }
}
