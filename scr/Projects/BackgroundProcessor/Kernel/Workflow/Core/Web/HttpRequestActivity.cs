using Newtonsoft.Json;
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
    public class HttpRequestActivity : AsyncCodeActivity
    {
        public InArgument<AutenticationType> autenticationType { get; set; }
        public InArgument<string> username { get; set; }

        public InArgument<string> password { get; set; }
        public InArgument<string> url { get; set; }
        public InArgument<Dictionary<string, string>> data { get; set; }

        public OutArgument<object> retorno { get; set; }

        protected override void EndExecute(AsyncCodeActivityContext context, IAsyncResult result)
        {
            
            object retornado = new object();
            HttpResponseMessage response = ((Task<HttpResponseMessage>)result).Result;
            string deals = string.Empty;
            if (response.IsSuccessStatusCode &&
                string.Compare(response.Content.Headers.ContentType.MediaType, "application/json",
                               StringComparison.OrdinalIgnoreCase) == 0)

                //retornado = response.Content.ReadAsAsync<object>().Result;





            retorno.Set(context, retornado);
        }


        protected override IAsyncResult BeginExecute(AsyncCodeActivityContext context, AsyncCallback callback,
                                                   object state)
        {

            //@"{ ""sendSmsRequest"": { ""to"": ""551170905788"", ""msg"": ""Teste Carrefour"" } }"

            //HttpContent content = new StringContent(JsonConvert.SerializeObject(data.Get(context)));
            //HttpContent content = new StringContent(JsonConvert.SerializeObject(data.Get(content)));

            HttpContent content = new StringContent(JsonConvert.SerializeObject(data.Get(context)), Encoding.UTF8, "application/json");
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");


            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


            switch (autenticationType.Get(context))
            {

                case AutenticationType.Basic:
                    AuthBasic(context, httpClient);
                    break;

            }
            var task =
                httpClient.PostAsync(url.Get(context).ToString(), content).ToApm(callback, state);
            task.ContinueWith(obj => httpClient.Dispose());
            return task;
        }

        private void AuthBasic(AsyncCodeActivityContext context, HttpClient httpClient)
        {
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic",
        Convert.ToBase64String(
            System.Text.ASCIIEncoding.ASCII.GetBytes(
                string.Format("{0}:{1}", username.Get(context).ToString(), password.Get(context).ToString()))));
        }



    }
  
}
