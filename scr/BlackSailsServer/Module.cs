using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ninject.Modules;

namespace NimbusServer
{
    using Contracts;
    using NimbusServer.Application;
    using Services;
    using NilbusServer.Application.Contract;
    namespace Modules
    {
        public class Module : NinjectModule
        {
            public override void Load()
            {
                Bind<IService>().To<Service>();
                Bind<IApplicationApi>().To<ApplicationApi>();
            }
        }
    }
}
