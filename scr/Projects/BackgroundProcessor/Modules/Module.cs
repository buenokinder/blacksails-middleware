using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Ninject.Modules;
using Ninject.Web.Common;

namespace BackgroundProcessor
{

    using NilbusServer.Application.Contract;
    using NimbusServer.Application;
    using NimbusServer.Data;
    using NimbusServer.Data.Repository;
    using NimbusServer.Domain.Interface;


    namespace Modules
    {
        public class ModuleIoc : NinjectModule
        {
            public override void Load()
            {
                
                Bind<IApplicationApi>().To<ApplicationApi>().InRequestScope();
                Bind<IRepository>().To<Repository>().InRequestScope();
                Bind<IApplicationWorkflow>().To<ApplicationWorkflow>().InRequestScope();
                Bind<IWorkflow>().To<Workflow>().InRequestScope();
                
                
            }
        }
    }
}