using System;
using System.Activities;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api
{
    [ToolboxItem(true)]
    [DisplayName("Bulk Insert Sql")]
    [Category("Nimbus Rules")]
    public class SqlServer : CodeActivity
    {

        public InArgument<bool> persist { get; set; }
        public InArgument<string> query { get; set; }
        public InArgument<string> connectionString { get; set; }

        public InArgument<Dictionary<string, string>> parameters { get; set; }
        public OutArgument<List<Dictionary<string, string>>> resultQuery { get; set; }




        protected override void Execute(CodeActivityContext context)
        {
            List<Dictionary<string, string>> retorno = new List<Dictionary<string, string>>();
            try
            {
                using (SqlConnection connection =
                            new SqlConnection(connectionString.Get(context)))
                {
                    connection.Open();



                    using (SqlCommand command = new SqlCommand(query.Get(context), connection))
                    {
                        try
                        {
                            AddParameters(context, command);
                            if (persist.Get(context))
                            {
                                command.ExecuteScalar();
                            }
                            else
                                GetResultadoOracle(retorno, command);
                        }
                        catch (Exception ex)
                        {
                            LogScheduler.Save("SQLERROR", ex.Message);
                        }

                    }

                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                LogScheduler.Save("SQLERROR", ex.Message);
            }
            resultQuery.Set(context, retorno);
        }


        private void AddParameters(CodeActivityContext context, SqlCommand command)
        {

            foreach (KeyValuePair<string, string> parametro in parameters.Get(context))
            {
                command.Parameters.Add(new SqlParameter() { ParameterName = parametro.Key, Value = parametro.Value });
            }
        }

        private static void GetResultadoOracle(List<Dictionary<string, string>> retorno, SqlCommand command)
        {
            try
            {
                SqlDataReader dataReader = command.ExecuteReader();
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
            catch (Exception ex)
            {
                LogScheduler.Save("SQLERROR", ex.Message);
            }
        }
    }
}
