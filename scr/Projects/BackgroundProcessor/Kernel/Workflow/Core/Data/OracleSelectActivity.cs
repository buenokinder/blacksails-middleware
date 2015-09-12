using System;
using System.Activities;
using System.Collections.Generic;
using System.Data.OracleClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api
{
    public static class LogScheduler
    {
        public static void Save(string origem, string message)
        {
            String mydocpath = System.Configuration.ConfigurationManager.AppSettings["CaminhoArquivoLog"];

            using (StreamWriter outfile = File.AppendText(mydocpath + @"\logworkflow_id_" + origem + ".txt"))
            {
                outfile.WriteLine(message);
            }
        }
    }
    public class OracleSelectActivity : CodeActivity
    {

        public InArgument<bool> persist { get; set; }
        public InArgument<string> query { get; set; }
        public InArgument<string> connectionStringDestino { get; set; }

        public InArgument<Dictionary<string, string>> parameters { get; set; }
        public OutArgument<List<Dictionary<string, string>>> resultQuery { get; set; }
        protected override void Execute(CodeActivityContext context)
        {

            List<Dictionary<string, string>> retorno = new List<Dictionary<string, string>>();
            using (OracleConnection connection =
                        new OracleConnection(connectionStringDestino.Get(context)))
            {
                connection.Open();



                using (OracleCommand command = new OracleCommand(query.Get(context), connection))
                {

                    LogScheduler.Save("Oracle", "Incio Query : \n " + query.Get(context));
                    AddParameters(context, command);
                    if (persist.Get(context))
                    {
                        try
                        {
                            command.ExecuteScalar();
                        }
                        catch (Exception ex)
                        {
                            LogScheduler.Save("OracleUpdate", ex.Message);
                        }

                    }
                    else
                        GetResultadoOracle(retorno, command);


                    LogScheduler.Save("Oracle", "Fim Query : \n " + query.Get(context));

                }

                connection.Close();

            }
            resultQuery.Set(context, retorno);
        }

        private static void GetResultadoOracle(List<Dictionary<string, string>> retorno, OracleCommand command)
        {
            OracleDataReader dataReader = command.ExecuteReader();
            while (dataReader.Read())
            {
                Dictionary<string, string> dictionaryRetorno = new Dictionary<string, string>();

                for (int i = 0; i < dataReader.FieldCount; i++)
                {
                    dictionaryRetorno.Add(dataReader.GetName(i), dataReader[i].ToString());
                }
                retorno.Add(dictionaryRetorno);
            }
        }

        private void AddParameters(CodeActivityContext context, OracleCommand command)
        {
            if (parameters.Get(context) != null)
            {
                foreach (KeyValuePair<string, string> parametro in parameters.Get(context))
                {
                    command.Parameters.Add(new OracleParameter() { ParameterName = parametro.Key, Value = parametro.Value });
                }
            }
        }
    }
}
