using DatabaseSchemaReader;
using Net.Http.WebApi.OData.Query;
using Net.Http.WebApi.OData.Query.Expressions;
using Newtonsoft.Json.Linq;
using NilbusServer.Application.Contract;
using NimbusServer.Data;
using NimbusServer.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;


namespace NimbusServer.Api
{
    public class RepositoryController : ApiController
    {
        private readonly IApplicationApi service;

        public RepositoryController(IApplicationApi service)
            : base()
        {

            this.service = service;
        }

        protected IApplicationApi Service
        {
            get
            {
                return this.service;
            }
        }


        //[Authorize]
        [HttpGet]
        [ResponseType(typeof(NimbusServer.Domain.Entidades.PaginadoGenerico))]
        [Route("api/{sistema}/OData/{assunto}")]
        public HttpResponseMessage Grid(string sistema, string assunto, ODataQueryOptions queryOptions)
        {
            try
            {

                var Retorno = service.ODataGet(sistema, assunto, queryOptions);

                if (Retorno._Lista.Count < 1)
                    return this.Request.CreateResponse(HttpStatusCode.NotFound);

                return Request.CreateResponse(HttpStatusCode.OK, Retorno);

            }
            catch (Exception ex)
            {
                return this.Request.CreateResponse(HttpStatusCode.InternalServerError, ex);

            }
            finally
            {


            }


            //var dbReader = new DatabaseReader("DATA SOURCE=sennit-prod.cloudapp.net; PERSIST SECURITY INFO=True;USER ID=admin;INITIAL CATALOG=Outbound; PASSWORD=senni1@2015", DatabaseSchemaReader.DataSchema.SqlType.SqlServer);

            //var schema = dbReader.Table(assunto);
            //var sqlWrite = new SqlWriter(schema, DatabaseSchemaReader.DataSchema.SqlType.SqlServer);



            //sqlWrite.CountSql();

            //sqlWrite.SelectAllSql();

            //foreach (var itemschema in schema.Columns) { 

            //}
            //foreach (string item in queryOptions.Select.Properties) { 

            //}

            ////DataTableReader dataReader = rdr.Read().CreateDataReader();
            ////while (dataReader.Read())
            ////{
            ////    int fields = dataReader.FieldCount;
            ////    Dictionary<string, object> parametrosLista = new Dictionary<string, object>();
            ////    for (int i = 0; i < fields; i++)
            ////    {
            ////        parametrosLista.Add(dataReader.GetName(i).ToLower(), dataReader[i]);

            ////    }
            ////    listaPaginado._Lista.Add(parametrosLista);

            ////}

            //return new NimbusServer.Domain.Entidades.PaginadoGenerico();

        }
        //[Authorize]
        [HttpGet]
        [Route("api/{sistema}/repository/{assunto}")]
        public NimbusServer.Domain.Entidades.PaginadoGenerico Grid(string sistema, string assunto, string Page, string PageSize, String parameters)
        {
            Dictionary<String, String> Dctparameters = new Dictionary<string, string>();
            try
            {
                JObject jsonObj;

                if (!string.IsNullOrEmpty(parameters))
                {
                    jsonObj = JObject.Parse(parameters);

                    JToken jtoken = jsonObj.First;

                    while (jtoken != null)
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

            return service.ListaPaginada(Convert.ToInt32(Page), Convert.ToInt32(PageSize), sistema, assunto, Dctparameters);

        }


        //[Authorize]
        [HttpGet]
        [Route("api/{sistema}/repository/{assunto}/{id}")]
        public Dictionary<string, object> Grid(string sistema, string assunto, string id)
        {

            return service.BuscarPorId(sistema, assunto, id);


        }
        //[Authorize]
        [HttpPost]
        [Route("api/{sistema}/repository/{assunto}/save/{type}")]
        public string Post(string sistema, string assunto, string type, JObject data)
        {
            JToken jtoken = data.First;
            Dictionary<String, string> parameters = new Dictionary<String, string>();
            while (jtoken != null)//loop through columns
            {
                
                if (((JProperty)jtoken).Name.ToString().Contains("_cript"))
                    parameters.Add(((JProperty)jtoken).Name.ToString().Replace("_cript", ""), Sennit.Cryptography.SennitCrypt.Crypt(((JProperty)jtoken).Value.ToString(), "A!09#x*&aTe$"));
                else
                    parameters.Add(((JProperty)jtoken).Name.ToString(), ((JProperty)jtoken).Value.ToString());

                jtoken = jtoken.Next;
            }
            try
            {
                return service.Save(sistema, assunto, parameters, type);
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.Conflict, ex.Message));
            }

            //return string.Empty;

        }

        [HttpDelete]
        [Route("api/{sistema}/repository/{assunto}/{id}")]
        public string Delete(string sistema, string assunto, string id)
        {
            return service.Delete(sistema, assunto, id);
        }
    }
}
