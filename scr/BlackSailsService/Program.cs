using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ninject;
using Topshelf;
using Topshelf.Ninject;

namespace BackgroundProcessor
{
    using Modules;
    using Services;

    public class Program
    {
        public static int Main(string[] args)
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

                    c.DependsOnEventLog();
                    c.DependsOnMsSql();
                    c.DependsOnIis();
                }
            );

            return (int)exitCode;
        }
    }
}