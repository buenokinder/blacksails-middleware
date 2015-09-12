using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api.Administrator.Modules
{
    public class Home: NancyModule
    {
        public Home()
        {
            
            Get["/"] = parameters =>
                {
                    return "OLA" ;
                };
        }
    }
}
