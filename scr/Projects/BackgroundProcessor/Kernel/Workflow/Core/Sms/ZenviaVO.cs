using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api
{
    public class ZenviaVO
    {
        public ZenviaVORequest sendSmsMultiRequest = new ZenviaVORequest();
    }
    public class ZenviaVOResponse
    {
        public IEnumerable<ZenviaResponse> sendSmsMultiResponse {get;set;}
    }

    public class ZenviaResponse {
        public string statusCode { get; set; }

        public string statusDescription { get; set; }
        public string detailCode { get; set; }
        public string detailDescription { get; set; }
    }
    public class ZenviaVORequest
    {
        public List<ZenviaRequest> sendSmsRequestList {get;set;}
    }

    public class ZenviaRequest {
        

        public string to { get; set; }
        
        public string msg { get; set; }

    }
}
