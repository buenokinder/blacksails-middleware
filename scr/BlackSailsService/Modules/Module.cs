using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ninject.Modules;
using Ninject.Web.Common;

namespace BackgroundProcessor
{
    using Contracts;
    using Services;

    namespace Modules
    {
        public class Module : NinjectModule
        {
            public override void Load()
            {
                Bind<IStringProvider>().To<DefaultStringProvider>().InRequestScope();
            }
        }
    }
}