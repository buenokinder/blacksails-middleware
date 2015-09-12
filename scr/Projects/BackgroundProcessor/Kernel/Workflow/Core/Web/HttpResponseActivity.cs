using Newtonsoft.Json;
using RestSharp;
using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NimbusServer.Api
{
    public enum AutenticationType
    {
        None,
        Basic,
        DigestAuth,
        OAuth1
    }
    public class PaginadoGenerico
    {

        public List<Dictionary<string, string>> _Lista = new List<Dictionary<string, string>>();
        private int _PaginaAtual;
        private int _TamanhoPagina;
        private int _TotalRegistros;
        private int _TotalPaginas;
        private int _TotalDeRegistrosDaPagina;



        public int PaginaAtual
        {
            get
            {
                return _PaginaAtual;
            }
            set
            {
                _PaginaAtual = value;
            }
        }

        public int TamanhoDaPagina
        {
            get
            {
                return _TamanhoPagina;
            }
            set
            {
                _TamanhoPagina = value;
            }
        }

        public int TotalDeRegistros
        {
            get
            {
                return _TotalRegistros;
            }
            set
            {
                _TotalRegistros = value;
            }
        }

        public int TotalDeRegistrosDaPagina
        {
            get
            {
                return _TotalDeRegistrosDaPagina;
            }
            set
            {
                _TotalDeRegistrosDaPagina = value;
            }
        }
        public int TotalDePaginas
        {
            get
            {
                return _TotalPaginas;
            }
            set
            {
                _TotalPaginas = value;
            }

        }
    }
    public class JsonReturn
    {



        public IEnumerable<Dictionary<string, string>> value { get; set; }
        public Int32 TotalPaginas { get; set; }
        public Int32 TotalRegistro { get; set; }

        public Int32 PaginaAtual { get; set; }
    }
    public class HttpResponseActivity : CodeActivity
    {


        public InArgument<AutenticationType> autenticationType { get; set; }
        public InArgument<string> username { get; set; }

        public InArgument<string> password { get; set; }

        public InArgument<string> sistema { get; set; }

        public InArgument<string> assunto { get; set; }
        public InArgument<string> url { get; set; }
        public InArgument<PaginadoGenerico> api { get; set; }

        public OutArgument<List<Dictionary<string, string>>> retorno { get; set; }

        //protected override void EndExecute(AsyncCodeActivityContext context, IAsyncResult result)
        //{

        //    HttpResponseMessage response = ((Task<HttpResponseMessage>)result).Result;
        //    PaginadoGenerico deals = new PaginadoGenerico();
        //    if (response.IsSuccessStatusCode &&
        //        string.Compare(response.Content.Headers.ContentType.MediaType, "application/json",
        //                       StringComparison.OrdinalIgnoreCase) == 0)
        //        //deals = response.Content.ReadAsAsync<PaginadoGenerico>().Result; //.ToObject<IEnumerable<Deal>>();


        //    //PaginadoGenerico results = new PaginadoGenerico();//deals._Lista;
        //    LogScheduler.Save("GET", "Retorno JSON Ok" );
        //    //JsonReturn retornoJson = new JsonReturn();
        //    //;
        //    //retornoJson.TotalPaginas = deals.TotalDePaginas;
        //    ////var variavel = JsonConvert.DeserializeObject<Lista>(deals.Lista);
        //    //LogScheduler.Save("GET", "Retorno JSON Total: " + deals.TotalDeRegistrosDaPagina.ToString() );
        //    retorno.Set(context, deals._Lista);
        //}


        //protected override IAsyncResult BeginExecute(AsyncCodeActivityContext context, AsyncCallback callback,
        //                                           object state)
        //{
        //    var httpClient = new HttpClient();

        //     switch( autenticationType.Get(context))
        //     {

        //         case AutenticationType.Basic:
        //             AuthBasic(context, httpClient);
        //             break;

        //     }

        //    LogScheduler.Save("GET", "Chamada JSON URL: " + url.Get(context).ToString());
        //    var task =
        //        httpClient.GetAsync(url.Get(context).ToString()).ToApm(callback, state);
        //    task.ContinueWith(obj => httpClient.Dispose());
        //    return task;
        //}

        private void AuthBasic(AsyncCodeActivityContext context, HttpClient httpClient)
        {
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic",
        Convert.ToBase64String(
            System.Text.ASCIIEncoding.ASCII.GetBytes(
                string.Format("{0}:{1}", username.Get(context).ToString(), password.Get(context).ToString()))));
        }





        protected override void Execute(CodeActivityContext context)
        {

            var client2 = new RestClient(url.Get(context).ToString());
            var request = new RestRequest("api/{sistema}/repository/{assunto}", Method.GET);
            request.AddParameter("Page", "1");
            request.AddParameter("PageSize", "50");

            Dictionary<string, string> parameters = new Dictionary<string, string>();

            request.AddParameter("parameters", parameters);

            request.AddUrlSegment("sistema", sistema.Get(context).ToString());
            request.AddUrlSegment("assunto", assunto.Get(context).ToString());

            var responseClient2 = client2.Execute(request);


            PaginadoGenerico deals = Newtonsoft.Json.JsonConvert.DeserializeObject<PaginadoGenerico>(responseClient2.Content);

            retorno.Set(context, deals._Lista);
        }
    }
}
