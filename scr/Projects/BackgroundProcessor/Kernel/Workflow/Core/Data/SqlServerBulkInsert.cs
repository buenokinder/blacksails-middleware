using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.ComponentModel;


namespace NimbusServer.Api
{

    [ToolboxItem(true)]
    [DisplayName("Bulk Insert Sql")]
    [Category("Nimbus Rules")]
    public class SqlServerBulkInsert : AsyncCodeActivity
    {
        public InArgument<string> connectionStringOrigem { get; set; }
        public InArgument<string> connectionStringDestino { get; set; }
        public InArgument<string> Query { get; set; }
        public SqlCommand commandSourceData;
        public InArgument<string> TabelaDestino { get; set; }
        public OutArgument<string> result { get; set; }
        public OutArgument<string> retorno { get; set; }

        public SqlConnection sourceConnection;

        protected override IAsyncResult BeginExecute(AsyncCodeActivityContext context, AsyncCallback callback, object state)
        {

            sourceConnection =
                   new SqlConnection(connectionStringOrigem.Get(context));

            sourceConnection.Open();



            commandSourceData = new SqlCommand(Query.Get(context), sourceConnection);
            var task =
                commandSourceData.BeginExecuteReader(callback, state, System.Data.CommandBehavior.Default);

            return task;



        }

        protected override void EndExecute(AsyncCodeActivityContext context, IAsyncResult result)
        {

            SqlDataReader reader = commandSourceData.EndExecuteReader(result);
            LogScheduler.Save("SQLBULK", "Chamada Ok");
            using (SqlConnection destinationConnection =
                         new SqlConnection(connectionStringDestino.Get(context)))
            {
                destinationConnection.Open();


                using (SqlBulkCopy bulkCopy =
                           new SqlBulkCopy(destinationConnection))
                {
                    bulkCopy.DestinationTableName =
                        TabelaDestino.Get(context);

                    try
                    {

                        bulkCopy.WriteToServer(reader);
                        LogScheduler.Save("SQLBULK", "PASSOU Ok");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        LogScheduler.Save("SQLBULK", ex.Message);
                    }
                    finally
                    {

                        reader.Close();
                        sourceConnection.Close();
                        
                    }
                }


            }
            retorno.Set(context, "ok");
        }
    }
}
