using NilbusServer.Application.Contract;
using NimbusServer.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Application
{
    public class ApplicationWorkflow : IApplicationWorkflow
    {
        private readonly IWorkflow _workflow;

        public string connectionApplication = Sennit.Cryptography.SennitCrypt.DeCrypt(System.Configuration.ConfigurationManager.ConnectionStrings["Database"].ConnectionString, "A!09#x*&aTe$");
        public string dataBaseType = System.Configuration.ConfigurationManager.AppSettings["BancoDados"];

        public ApplicationWorkflow(IWorkflow workflow)
        {
            _workflow = workflow;

        }
        public void Execute(string workflowId)
        {
            _workflow.Execute(workflowId, dataBaseType, connectionApplication, "Select * from WorkFlowSistemaParametro where WorkFlowSistema_Id=@id");
        }
    }
}
