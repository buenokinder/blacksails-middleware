using Nancy;
using Nancy.Bootstrapper;

using Nancy.TinyIoc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api
{
  
    public class NancyBootstrapper : DefaultNancyBootstrapper
    {
        protected override IRootPathProvider RootPathProvider
        {
            get { return new NancyPathProvider(); }
            
        }
        
     
    }

}
