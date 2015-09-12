using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ninject;
using Topshelf;
using Topshelf.Ninject;

using SKGL;
namespace BackgroundProcessor
{
    using Modules;
    using NimbusServer.Api.Kernel.Serial;

    using System.Activities;
    using System.IO;

    using System.Reflection;
    public class Program
    {

        private static string _serialNumber = System.Configuration.ConfigurationManager.AppSettings["NimbusSerial"];
        public static void Main(string[] args)
        {

    
            var exitCode = HostFactory.New
            (
                c =>
                {

                    c.UseNinject(new ModuleIoc());

                    c.Service<Service>
                    (
                        sc =>
                        {
                            sc.ConstructUsingNinject();

                            sc.WhenStarted((service, hostControl) => service.Start(hostControl));
                            sc.WhenStopped((service, hostControl) => service.Stop(hostControl));
                             
                            }
                    );

                    c.SetServiceName("BlackSailsService");
                    c.SetDisplayName("Black Sails Service");
                    c.SetDescription("Black Sails Api Server");

                    c.EnablePauseAndContinue();
                    c.EnableShutdown();
                    c.StartManually();
                   
                    c.RunAsLocalSystem();

                    }
            );
            exitCode.Run();
          
            
        }
    }
}