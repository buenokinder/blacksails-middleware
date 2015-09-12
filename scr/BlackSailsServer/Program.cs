using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ninject;
using Topshelf;
using Topshelf.Ninject;
using NimbusServer.Modules;
using NimbusServer.Services;

namespace NimbusServer
{
    class Program
    {
        static int Main(string[] args)
        {

            var exitCode = HostFactory.Run
            (
                c =>
                {
                    c.UseNinject(new Module());

                    c.Service<Service>
                    (
                        sc =>
                        {
                            sc.ConstructUsingNinject();

                            sc.WhenStarted((service, hostControl) => service.Start(hostControl));
                            sc.WhenStopped((service, hostControl) => service.Stop(hostControl));
                        }
                    );

                    c.SetServiceName("BackgroundProcessorSvc");
                    c.SetDisplayName("Background Processor");
                    c.SetDescription("Processes things in the background");

                    c.EnablePauseAndContinue();
                    c.EnableShutdown();

                    c.StartAutomaticallyDelayed();
                    c.RunAsLocalSystem();
                }
            );

            return (int)exitCode;
            //HostFactory.Run(x =>
            //{
            //    x.Service<NimbusService>(s =>
            //    {
            //        s.ConstructUsing(name => new NimbusService());
            //        s.WhenStarted(svc => svc.Start());
            //        s.WhenStopped(svc => svc.Stop());
            //    });
            //    x.RunAsLocalSystem();
            //    x.SetDescription("Sennit Nimbus Server.");
            //    x.SetDisplayName("Nimbus Web Api Service");
            //    x.SetServiceName("NimbusSErver");
            //});
        }
    }
}
