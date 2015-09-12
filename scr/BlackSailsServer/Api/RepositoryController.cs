using Newtonsoft.Json.Linq;
using NilbusServer.Application.Contract;
using NimbusServer.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace NimbusServer.Api
{
    public class RepositoryController : ApiController
    {
        private readonly IApplicationApi _service;

        public RepositoryController(IApplicationApi service)
        {
            this._service = service;

        }


        //[Authorize]
        [HttpGet]
        [Route("api/{sistema}/repository/{assunto}")]
        public PaginadoGenerico Grid(string sistema, string assunto, string Page, string PageSize, String parameters)
        {
            Dictionary<String, String> Dctparameters = new Dictionary<string, string>();
            try
            {
                JObject jsonObj;

                if (!string.IsNullOrEmpty(parameters))
                {
                    jsonObj = JObject.Parse(parameters);

                    JToken jtoken = jsonObj.First;

                    while (jtoken != null)//loop through columns
                    {


                        Dctparameters.Add(
                        ((JProperty)jtoken).Name.ToString(),
                         ((JProperty)jtoken).Value.ToString());

                        jtoken = jtoken.Next;
                    }
                }

            }
            catch (Exception ex)
            {
            }

            if (Page.Equals("undefined"))
                Page = "1";

            return _service.ListaPaginada(Convert.ToInt32(Page), Convert.ToInt32(PageSize), sistema, assunto, Dctparameters);

        }

        //[Authorize]
        [HttpPost]
        [Route("api/{sistema}/repository/{assunto}/save")]
        public string Post(string sistema, string assunto, JObject data)
        {
            //JToken jtoken = data.First;
            //List<Parametros> parameters = new List<Parametros>();
            //while (jtoken != null)//loop through columns
            //{
            //    parameters.Add(new Parametros()
            //    {
            //        Campo = ((JProperty)jtoken).Name.ToString(),
            //        Valor = ((JProperty)jtoken).Value.ToString()
            //    });
            //    jtoken = jtoken.Next;
            //}
            //try
            //{
            //    return _service.Save(sistema, assunto, parameters);
            //}
            //catch (SennitStatusReturn ex)
            //{
            //    throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.Conflict, ex.DetailDescription));
            //}

            return string.Empty;

        }

        [HttpDelete]
        [Route("api/{sistema}/repository/{assunto}/{id}")]
        public string Delete(string sistema, string assunto, string id)
        {
            //return _service.Delete(sistema, assunto, id);
            return string.Empty;
        }
    }
}
