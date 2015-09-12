using Microsoft.Owin.Hosting;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using NilbusServer.Application.Contract;
using NimbusServer.Application;
using NimbusServer.Data.Repository;
using NimbusServer.Domain.Interface;
using NimbusServer.Kernel.Config;
using Ninject;
using Ninject.Web.Common;
using Ninject.Web.Common.OwinHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace NimbusServer.Kernel
{
    public class NimbusService
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        public NimbusService()
        {
            
        }

        public void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);


            //WebApp.Start<Startup>(url: Configuration.UrlBase);
            
        }

        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            RegisterServices(kernel);
            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
           
            return kernel;
        }
        public static IKernel Kernel;
      
        private static void RegisterServices(IKernel kernel)
        {
            Kernel = kernel;

            kernel.Bind<IApplicationApi>().To<ApplicationApi>().InRequestScope();

            kernel.Bind<IRepository>().To<Repository>().InRequestScope();


        }
        public void Stop()
        {
         
            
        }
    }
    
}
