using NimbusServer.Data.Repository;
using NimbusServer.Domain.Interface;
using Sennit.Cryptography;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Data
{
    public class Workflow : IWorkflow
    {
       

       
        public void Execute(string workflowId, string dbType, string ConnectionString, string Query)
        {
            RepositoryHelper repositorio = new RepositoryHelper(dbType);
            Dictionary<string, string> parametroWorkflow = new Dictionary<string, string>();
            parametroWorkflow.Add("@id",workflowId );
            DataTableReader dataReader  = repositorio.ExecutaQuery(ConnectionString, Query, CommandType.Text, parametroWorkflow).CreateDataReader();


            List<Parametros> parametrosWorkflow = new List<Parametros>();
            while (dataReader.Read())
            {
                parametrosWorkflow.Add(new Parametros() { Campo = dataReader["Parametro"].ToString(), Valor = dataReader["Valor"].ToString() });
            }
            ExecuteWorkflow(parametrosWorkflow, ConnectionString, workflowId, repositorio);
        }

        private static void ExecuteWorkflow(List<Parametros> parameters, string conn, string workflowId, RepositoryHelper repositorio)
        {
            Dictionary<string, string> parametroWorkflow = new Dictionary<string, string>();
            parametroWorkflow.Add("@id", workflowId);

            
            DataTableReader dataReader = repositorio.ExecutaQuery(conn, "Select * from WorkflowSISTEMA where Id=@Id", CommandType.Text, parametroWorkflow).CreateDataReader();
            if (dataReader.Read())
                WorkflowHelper.Start( SennitCrypt.DeCrypt(dataReader["Workflow"].ToString(), "A!09#x*&aTe$"), parameters, workflowId);
                
        }
    }
}
