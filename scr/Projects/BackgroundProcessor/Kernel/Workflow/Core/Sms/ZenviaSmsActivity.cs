using Newtonsoft.Json;
using System;
using System.Activities;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace NimbusServer.Api
{

    public class ZenviaSmsActivity : CodeActivity
    {
        public InArgument<string> username { get; set; }

        public InArgument<string> password { get; set; }

        public InArgument<string> zenviaUrl { get; set; }

        public InArgument<List<Dictionary<String, String>>> data { get; set; }

        public OutArgument<ZenviaVOResponse> retorno { get; set; }

        public InArgument<Boolean> multipleSms { get; set; }

        //protected override void EndExecute(AsyncCodeActivityContext context, IAsyncResult result)
        //{

        //    object retornado = new object();
        //    HttpResponseMessage response = ((Task<HttpResponseMessage>)result).Result;
        //    string deals = string.Empty;
        //    if (response.IsSuccessStatusCode &&
        //        string.Compare(response.Content.Headers.ContentType.MediaType, "application/json",
        //                       StringComparison.OrdinalIgnoreCase) == 0)

        //        retornado = response.Content.ReadAsAsync<ZenviaVOResponse>().Result;





        //    retorno.Set(context, retornado);
        //}


        public String Content
        {
            get { return "application/json"; }
        }



        public HttpWebRequest HttpRequest { get; internal set; }
        public HttpWebResponse HttpResponse { get; internal set; }
        public CookieContainer CookieContainer = new CookieContainer();


        internal HttpWebRequest CreateRequest(string usuario, string senha, string url)
        {
            LogScheduler.Save("Zenvia", "Inicio criacao de solicitacao");
            //var basicRequest = (HttpWebRequest)WebRequest.Create("http://200.203.125.29/services/send-sms");
            //"https://api-rest.zenvia360.com.br/services/send-sms-multiple"
            var basicRequest = (HttpWebRequest)WebRequest.Create(url);

            basicRequest.ContentType = Content;
            basicRequest.Method = "POST";
            basicRequest.CookieContainer = CookieContainer;

            basicRequest.Accept = Content;
            basicRequest.Headers.Add("Authorization", "Basic" + " " + EncodeCredentials(usuario, senha));
            LogScheduler.Save("Zenvia", "Solicitacao Ok");
            return basicRequest;
        }

        internal void WriteStream(object obj)
        {

        }

        internal String ReadResponse()
        {
            if (HttpResponse != null)
                using (var streamReader = new StreamReader(HttpResponse.GetResponseStream()))
                    return streamReader.ReadToEnd();

            return string.Empty;
        }

        internal String ReadResponseFromError(WebException error)
        {
            using (var streamReader = new StreamReader(error.Response.GetResponseStream()))
                return streamReader.ReadToEnd();
        }

        public string EncodeCredentials(string usuario, string senha)
        {
            var strCredentials = string.Format("{0}:{1}", usuario, senha);
            var encodedCredentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(strCredentials));

            return encodedCredentials;
        }





        public ZenviaVO listaEnvio = new ZenviaVO();
        protected override void Execute(CodeActivityContext context)
        {





            try
            {
                HttpRequest = CreateRequest(username.Get(context), password.Get(context), zenviaUrl.Get(context));
                LogScheduler.Save("Zenvia", "Request 1");
                List<Dictionary<string, string>> dataObj = data.Get(context);
                if (dataObj.Count > 0)
                {
                    listaEnvio.sendSmsMultiRequest.sendSmsRequestList = new List<ZenviaRequest>();
                    foreach (Dictionary<string, string> itemSms in dataObj)
                    {
                        string mensagem;
                        if (itemSms["S_AUTACT_SMS_BODY"].ToString().Length > 150)
                            mensagem = itemSms["S_AUTACT_SMS_BODY"].ToString().Substring(0, 149);
                        else
                            mensagem = itemSms["S_AUTACT_SMS_BODY"].ToString();

                        listaEnvio.sendSmsMultiRequest.sendSmsRequestList.Add(new ZenviaRequest() { to = itemSms["S_MOBILE"].ToString(), msg = mensagem });
                    }

                    object obj = listaEnvio;


                    LogScheduler.Save("Zenvia", "Request 2");
                    if (obj != null)
                    {
                        using (var streamWriter = new StreamWriter(HttpRequest.GetRequestStream()))
                        {
                            if (obj is string)
                            {
                                streamWriter.Write(obj);
                                //LogScheduler.Save("Zenvia", "Valores Enviados: " + obj);
                            }
                            else
                            {
                                //LogScheduler.Save("Zenvia", "Valores Enviados: " + JsonConvert.SerializeObject(obj));
                                streamWriter.Write(JsonConvert.SerializeObject(obj).Replace(@"\", ""));
                            }

                        }
                    }


                    LogScheduler.Save("Zenvia", "Disparo Inicio");
                    HttpResponse = (HttpWebResponse)HttpRequest.GetResponse();
                    LogScheduler.Save("Zenvia", "Disparo Ok");
                }
                LogScheduler.Save("Zenvia", "Não havia sms a ser disparado.");
            }

            catch (WebException error)
            {
                LogScheduler.Save("Zenvia", "WebError");
                LogScheduler.Save("Zenvia", error.Response.ToString());
                HttpResponse = (HttpWebResponse)error.Response;
                LogScheduler.Save("Zenvia", HttpResponse.StatusDescription);
            }
            catch (Exception ex)
            {

                LogScheduler.Save("Zenvia", ex.Message);
            }
            retorno.Set(context, null);
        }
    }
    public static class Extensions
    {
        public static Task<TResult> ToApm<TResult>(this Task<TResult> task, AsyncCallback callback, object state)
        {
            if (task.AsyncState == state)
            {
                if (callback != null)
                {
                    task.ContinueWith(delegate { callback(task); },
                                      CancellationToken.None, TaskContinuationOptions.None, TaskScheduler.Default);
                }
                return task;
            }

            var tcs = new TaskCompletionSource<TResult>(state);
            task.ContinueWith(obj =>
            {
                if (task.IsFaulted) tcs.TrySetException(task.Exception.InnerExceptions);
                else if (task.IsCanceled) tcs.TrySetCanceled();
                else tcs.TrySetResult(task.Result);

                if (callback != null) callback(tcs.Task);
            }, CancellationToken.None, TaskContinuationOptions.None, TaskScheduler.Default);
            return tcs.Task;
        }
    }
}
