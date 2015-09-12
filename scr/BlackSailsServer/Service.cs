using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Owin.Hosting;
using Ninject;
using Topshelf;


namespace NimbusServer
{
    
    using Contracts;
    using NimbusServer.Kernel.Configs;

    namespace Services
    {
        public class Service : IService
        {
            private readonly IKernel kernel;

            public Service(IKernel kernel)
                : base()
            {
                this.kernel = kernel;
            }

            protected IKernel Kernel
            {
                get
                {
                    return this.kernel;
                }
            }

            protected IDisposable WebAppHolder
            {
                get;
                set;
            }

            protected int Port
            {
                get
                {
                    return 9000;
                }
            }

            public bool Start(HostControl hostControl)
            {
                if (WebAppHolder == null)
                {
                    WebAppHolder = WebApp.Start(new StartOptions { Port = Port }, appBuilder =>
                    {
                        new StartupConfig().Configure(appBuilder, Kernel);
                    });
                }

                return true;
            }

            public bool Stop(HostControl hostControl)
            {
                if (WebAppHolder != null)
                {
                    WebAppHolder.Dispose();
                    WebAppHolder = null;
                }

                return true;
            }
        }
    }
}
