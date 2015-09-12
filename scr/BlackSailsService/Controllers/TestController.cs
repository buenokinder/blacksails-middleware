using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace BackgroundProcessor
{
    using Contracts;

    namespace Controllers
    {
        [RoutePrefix("test")]
        public class TestController : ApiController
        {
            private readonly IStringProvider stringProvider;

            public TestController(IStringProvider stringProvider)
                : base()
            {
                this.stringProvider = stringProvider;
            }

            protected IStringProvider StringProvider
            {
                get
                {
                    return this.stringProvider;
                }
            }

            [HttpGet]
            [Route("")]
            public HttpResponseMessage Index()
            {
                return Request.CreateResponse<string>(HttpStatusCode.OK, StringProvider.HelloWorld);
            }
        }
    }
}