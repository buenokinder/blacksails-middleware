
using NimbusServer.Data;
using Sennit.Cryptography;
using System;
using System.Activities;
using System.Activities.XamlIntegration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Data
{
    public static class WorkflowHelper
    {

        public static Activity LoadFromString(string xaml)
        {
            ActivityXamlServicesSettings settings = new ActivityXamlServicesSettings
            {
                CompileExpressions = true
            };
            using (Stream stream = new MemoryStream(ASCIIEncoding.Unicode.GetBytes(xaml)))
            {
                return ActivityXamlServices.Load(stream, settings);
            }
        }

        public static Dictionary<string, object> BuildingParameters(List<Parametros> workFlowpParameters)
        {
            Dictionary<string, object> parametros = new Dictionary<string, object>();
            foreach (Parametros parametro in workFlowpParameters)
            {

                parametros.Add(parametro.Campo, SennitCrypt.DeCrypt(parametro.Valor, "A!09#x*&aTe$"));
            }
            return parametros;

        }
        public static void Start(string xaml, List<Parametros> workFlowpParameters, string workflowId)
        {
            try
            {
                WorkflowInvoker.Invoke(LoadFromString(xaml), BuildingParameters(workFlowpParameters));
            }
            catch (Exception ex)
            {
                LogWorkflow.Save(workflowId, "#Erro# : " + DateTime.Now.ToString() + " - " + ex.Message);
            }
        }
    }
}
