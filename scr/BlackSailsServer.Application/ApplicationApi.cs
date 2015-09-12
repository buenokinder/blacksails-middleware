using NilbusServer.Application.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NimbusServer.Domain.Entidades;
using NimbusServer.Domain.Interface;
using Net.Http.WebApi.OData.Query;
using DatabaseSchemaReader;
using Net.Http.WebApi.OData.Query.Expressions;

namespace NimbusServer.Application
{
    public class ApplicationApi : IApplicationApi
    {
        private readonly IRepository _repository;

        public string connectionApplication = Sennit.Cryptography.SennitCrypt.DeCrypt(System.Configuration.ConfigurationManager.ConnectionStrings["Database"].ConnectionString, "A!09#x*&aTe$");
        public string dataBaseType = System.Configuration.ConfigurationManager.AppSettings["BancoDados"];

        public ApplicationApi(IRepository repository)
        {
            _repository = repository;

        }
        private string ConvertIntToTipoConexao(string tipoconexao)
        {
            if (tipoconexao.Equals("0"))
                return "SqLite";

            if (tipoconexao.Equals("1"))
                return "SQLServer";

            return string.Empty;
        }

        public PaginadoGenerico ODataGet(string Sistema, string Assunto, ODataQueryOptions queryOptions)
        {


            Dictionary<string, object> parametros = new Dictionary<string, object>();
            Dictionary<string, string> parametrosNimbus = new Dictionary<string, string>();

            string Connection = string.Empty;
            string Query = string.Empty;
            string QueryCount = string.Empty;
            string DbConnection = string.Empty;
            string TipQuery = string.Empty;
            parametrosNimbus.Add("@Sistema", Sistema);

            PaginadoGenerico entidadeNimbus = _repository.ListaPaginada(0, 2, connectionApplication, "Select * from sistema where Nome = @Sistema LIMIT 1", "", parametrosNimbus, dataBaseType, "Text");
            foreach (Dictionary<string, object> itemQueryNimbus in entidadeNimbus._Lista)
            {
                DbConnection = itemQueryNimbus["connectionstring"].ToString();
            }


            var dbReader = new DatabaseReader(DbConnection, DatabaseSchemaReader.DataSchema.SqlType.SqlServer);

            var schema = dbReader.Table(Assunto);
            var sqlWrite = new SqlWriter(schema, DatabaseSchemaReader.DataSchema.SqlType.SqlServer);
            PaginadoGenerico entidade = null;
            if (queryOptions.Skip != null && queryOptions.Top != null)
            {
                int page = 1;
                if (queryOptions.Skip.Value >= queryOptions.Top.Value)
                    page = (queryOptions.Skip.Value / queryOptions.Top.Value) + 1;

                string replaceOver = string.Empty;
                string query = sqlWrite.SelectPageSql();
                BuildSelect(queryOptions, schema, ref replaceOver, ref query);
                BuildOrderBy(queryOptions, schema, ref replaceOver, ref query);
                BuildFilter(queryOptions, schema, ref replaceOver, ref query);
                entidade = _repository.ListaPaginadaNew(page, queryOptions.Top.Value, DbConnection, query, sqlWrite.CountSql(), parametros, "SQLServer", "Select");
            }

            else
            {
                string query = sqlWrite.SelectAllSql();
                if (queryOptions.Select != null)
                {
                    foreach (var item in schema.Columns)
                    {
                        var linqVerifica = (from queryOption in queryOptions.Select.Properties
                                            where queryOption.ToLower().Equals(item.Name.ToLower())
                                            select queryOption).SingleOrDefault();
                        if (string.IsNullOrEmpty(linqVerifica))
                        {
                            query = query.Replace("[" + item.Name + "],", "");
                            query = query.Replace("[" + item.Name + "]", "");

                        }
                    }
                }
                entidade = _repository.ListaPaginadaNew(0, 0, DbConnection, sqlWrite.SelectAllSql(), sqlWrite.CountSql(), parametros, "SQLServer", "Select");
            }
            return entidade;

        }
        private static void BuildOrderBy(ODataQueryOptions queryOptions, DatabaseSchemaReader.DataSchema.DatabaseTable schema, ref string replaceOver, ref string query)
        {
            if (queryOptions.OrderBy != null)
            {
                int countOrder = 0;

                foreach (OrderByProperty itemOrder in queryOptions.OrderBy.Properties)
                {
                    if (countOrder == 0)
                        query = query + " Order By " + itemOrder.RawValue.ToString();
                    else
                        query = query + " , " + itemOrder.RawValue.ToString();

                    countOrder = countOrder + 1;
                }
            }
        }

        private static void BuildFilter(ODataQueryOptions queryOptions, DatabaseSchemaReader.DataSchema.DatabaseTable schema, ref string replaceOver, ref string query)
        {
            if (queryOptions.Filter != null )
            {
                //int countParam
                var binaryOperator = queryOptions.Filter.Expression as BinaryOperatorNode;
                if (binaryOperator != null)
                {
                    var property = binaryOperator.Left as SingleValuePropertyAccessNode ?? binaryOperator.Right as SingleValuePropertyAccessNode;
                    var constant = binaryOperator.Left as ConstantNode ?? binaryOperator.Right as ConstantNode;

                    if (property != null && property.PropertyName != null && constant != null && constant.Value != null)
                    {
                        if(binaryOperator.OperatorKind == BinaryOperatorKind.Equal)
                            query = query.Replace("WHERE", " where " + property.PropertyName + " = '" + constant.LiteralText + "' and ");
                        //Debug.WriteLine("Property: " + property.PropertyName);
                        //Debug.WriteLine("Operator: " + binaryOperator.OperatorKind);
                        //Debug.WriteLine("Value: " + constant.LiteralText);
                    }
                }
            }

            if (queryOptions.Filter != null)
            {
                int countOrder = 0;

                //foreach (var itemQuery in queryOptions.Filter.)
                //{
                //    //if (countOrder == 0)
                //    //    query = query + " Order By " + itemOrder.RawValue.ToString();
                //    //else
                //    //    query = query + " , " + itemOrder.RawValue.ToString();

                //    //countOrder = countOrder + 1;
                //}
            }
        }
        private static void BuildSelect(ODataQueryOptions queryOptions, DatabaseSchemaReader.DataSchema.DatabaseTable schema, ref string replaceOver, ref string query)
        {
            if (queryOptions.Select != null)
            {

                foreach (var item in schema.Columns)
                {
                    var linqVerifica = (from queryOption in queryOptions.Select.Properties
                                        where queryOption.ToUpper().Equals(item.Name.ToUpper())
                                        select queryOption).SingleOrDefault();


                    if (string.IsNullOrEmpty(linqVerifica))
                    {

                        query = query.Replace("[" + item.Name + "],", "");
                        query = query.Replace("[" + item.Name + "]", "");

                    }
                    else
                    {
                        replaceOver = "OVER(ORDER BY " + item.Name + ")";
                    }

                }

                char[] delimiters = new char[] { '\r', '\n' };
                string[] parts = query.Split(delimiters,
                 StringSplitOptions.RemoveEmptyEntries);
                parts = query.Split(new string[] { "\r\n" }, StringSplitOptions.None);
                int PartBeforeFrom = 0;
                for (int i = 0; i < parts.Length; i++)
                {
                    if (!string.IsNullOrEmpty(parts[i]) && parts[i].Contains("FROM"))
                    {
                        query = query.Replace(parts[PartBeforeFrom], parts[PartBeforeFrom].Replace(",", ""));
                    }
                    if (!string.IsNullOrEmpty(parts[i].Trim()))
                        PartBeforeFrom = i;


                }
            }
            query = query.Replace("OVER(ORDER BY )", replaceOver);
        }
        public PaginadoGenerico ListaPaginada(int page, int tamanhoDaPagina, string Sistema, string Assunto, Dictionary<string, string> parametros)
        {
            Dictionary<string, string> parametrosNimbus = new Dictionary<string, string>();

            string Connection = string.Empty;
            string Query = string.Empty;
            string QueryCount = string.Empty;
            string DbConnection = string.Empty;
            string TipQuery = string.Empty;
            parametrosNimbus.Add("@Sistema", Sistema);
            parametrosNimbus.Add("@Assunto", Assunto);
            PaginadoGenerico entidadeNimbus = _repository.ListaPaginada(0, 2, connectionApplication, "Select QT.Nome as TipoQuery,Conn.StringConexao as connection, Conn.TipoConexao as TipoConexao, Query.Query as QueryString from Assunto as A inner join Assunto_Query as Query on A.Id = Query.Assunto_id inner join Conexao as Conn on Conn.Id = A.Conexao_Id inner join TipoQuery as QT on QT.Id = Query.TipoQuery_Id  where A.Sistema_Id = (Select id from sistema where Nome = @Sistema LIMIT 1) and A.Nome = @Assunto and(QT.Id = '4144D227-605B-42B6-863E-FCF350E7834C' or QT.Id = 'AF807C76-FAB9-4C1D-827C-ADEEB873D779' or QT.Id = '016D5EF6-FDF9-4A88-9A34-6FB342C4F378')", "", parametrosNimbus, dataBaseType, "Text");
            foreach (Dictionary<string, object> itemQueryNimbus in entidadeNimbus._Lista)
            {
                if (itemQueryNimbus["tipoquery"].ToString().Equals("Select") || itemQueryNimbus["tipoquery"].ToString().Equals("Procedure"))
                {
                    Connection = Sennit.Cryptography.SennitCrypt.DeCrypt(itemQueryNimbus["connection"].ToString(), "A!09#x*&aTe$");
                    Query = itemQueryNimbus["querystring"].ToString();
                    DbConnection = ConvertIntToTipoConexao(itemQueryNimbus["tipoconexao"].ToString());
                    TipQuery = itemQueryNimbus["tipoquery"].ToString();
                }
                else
                    QueryCount = itemQueryNimbus["querystring"].ToString();
            }


            if (TipQuery == "Procedure")
                QueryCount = "";


            if (string.IsNullOrEmpty(Connection))
                return new PaginadoGenerico();
            else
                return _repository.ListaPaginada(page, tamanhoDaPagina, Connection, Query, QueryCount, parametros, DbConnection, TipQuery);


        }

        public string Save(string Sistema, string Assunto, Dictionary<string, string> parameters, string type)
        {
            string Query = "Select QT.Nome as TipoQuery,Conn.StringConexao as connection, Conn.TipoConexao as TipoConexao, Query.Query as QueryString from Assunto as A inner join Assunto_Query as Query on A.Id = Query.Assunto_id inner join Conexao as Conn on Conn.Id = A.Conexao_Id inner join TipoQuery as QT on QT.Id = Query.TipoQuery_Id  where A.Sistema_Id = (Select id from sistema where Nome = @Sistema LIMIT 1) and A.Nome = @Assunto and(QT.Id = 'D3514C0B-8C7F-4F4A-8791-82EAB57847E7')";

            if (Insert(type))
                Query = "Select QT.Nome as TipoQuery,Conn.StringConexao as connection, Conn.TipoConexao as TipoConexao, Query.Query as QueryString from Assunto as A inner join Assunto_Query as Query on A.Id = Query.Assunto_id inner join Conexao as Conn on Conn.Id = A.Conexao_Id inner join TipoQuery as QT on QT.Id = Query.TipoQuery_Id  where A.Sistema_Id = (Select id from sistema where Nome = @Sistema LIMIT 1) and A.Nome = @Assunto and(QT.Id = '601D0D5F-2563-424F-9039-27767347EA99' )";

            Dictionary<string, string> parametrosNimbus = new Dictionary<string, string>();
            parametrosNimbus.Add("@Sistema", Sistema);
            parametrosNimbus.Add("@Assunto", Assunto);

            PaginadoGenerico entidadeNimbus = _repository.ListaPaginada(0, 1, connectionApplication, Query, string.Empty, parametrosNimbus, dataBaseType, "Text");
            if (entidadeNimbus._Lista.Count > 0)
            {
                _repository.Save(parameters, null, Sennit.Cryptography.SennitCrypt.DeCrypt(entidadeNimbus._Lista[0]["connection"].ToString(), "A!09#x*&aTe$"), entidadeNimbus._Lista[0]["querystring"].ToString(), ConvertIntToTipoConexao(entidadeNimbus._Lista[0]["tipoconexao"].ToString()));
            }
            else
            {
                return "Update or Insert methods not implemented!";
            }



            return string.Empty;

        }

        private static bool Insert(string type)
        {
            if (type.ToLower().Equals("new"))
                return true;
            else
                return false;

        }
        public string Delete(string Sistema, string Assunto, string Id)
        {

            string Query = "Select QT.Nome as TipoQuery,Conn.StringConexao as connection, Conn.TipoConexao as TipoConexao, Query.Query as QueryString from Assunto as A inner join Assunto_Query as Query on A.Id = Query.Assunto_id inner join Conexao as Conn on Conn.Id = A.Conexao_Id inner join TipoQuery as QT on QT.Id = Query.TipoQuery_Id  where A.Sistema_Id = (Select id from sistema where Nome = @Sistema LIMIT 1) and A.Nome = @Assunto and(QT.Id = '480525E8-370B-404D-B0A5-F2A2174E20EF' )";

            Dictionary<string, string> parametrosNimbus = new Dictionary<string, string>();
            parametrosNimbus.Add("@Sistema", Sistema);
            parametrosNimbus.Add("@Assunto", Assunto);
            PaginadoGenerico entidadeNimbus = _repository.ListaPaginada(0, 1, connectionApplication, Query, string.Empty, parametrosNimbus, dataBaseType, "Text");
            if (entidadeNimbus._Lista.Count > 0)
            {

                _repository.Delete(Sennit.Cryptography.SennitCrypt.DeCrypt(entidadeNimbus._Lista[0]["connection"].ToString(), "A!09#x*&aTe$"), entidadeNimbus._Lista[0]["querystring"].ToString(), Id, ConvertIntToTipoConexao(entidadeNimbus._Lista[0]["tipoconexao"].ToString()));

            }
            else
            {
                return "Delete methods not implemented! Call Nimbus Administrator";
            }

            return "True";
        }





        public string GetWorkflowSistemaName(string WorfklowId)
        {
            string Query = "Select nome from WorkflowSistema where  Id = @Id";

            Dictionary<string, string> parametrosNimbus = new Dictionary<string, string>();
            parametrosNimbus.Add("@Id", WorfklowId);

            PaginadoGenerico entidadeNimbus = _repository.ListaPaginada(0, 1, connectionApplication, Query, string.Empty, parametrosNimbus, dataBaseType, "Text");

            if (entidadeNimbus._Lista.Count > 0)
                return entidadeNimbus._Lista[0]["nome"].ToString();

            return string.Empty;

        }


        public Dictionary<string, object> BuscarPorId(string sistema, string assunto, string id)
        {
            Dictionary<string, string> parametrosNimbus = new Dictionary<string, string>();

            string Connection = string.Empty;
            string Query = string.Empty;
            string QueryCount = string.Empty;
            string DbConnection = string.Empty;
            string TipQuery = string.Empty;
            parametrosNimbus.Add("@Sistema", sistema);
            parametrosNimbus.Add("@Assunto", assunto);
            PaginadoGenerico entidadeNimbus = _repository.ListaPaginada(0, 2, connectionApplication, "Select QT.Nome as TipoQuery,Conn.StringConexao as connection, Conn.TipoConexao as TipoConexao, Query.Query as QueryString from Assunto as A inner join Assunto_Query as Query on A.Id = Query.Assunto_id inner join Conexao as Conn on Conn.Id = A.Conexao_Id inner join TipoQuery as QT on QT.Id = Query.TipoQuery_Id  where A.Sistema_Id = (Select id from sistema where Nome = @Sistema LIMIT 1) and A.Nome = @Assunto and(QT.Id = 'E9E27BE4-DA24-468F-831E-3CDE63A13F8B' )", "", parametrosNimbus, dataBaseType, "Text");
            foreach (Dictionary<string, object> itemQueryNimbus in entidadeNimbus._Lista)
            {
              
                    Connection = Sennit.Cryptography.SennitCrypt.DeCrypt(itemQueryNimbus["connection"].ToString(), "A!09#x*&aTe$");
                    Query = itemQueryNimbus["querystring"].ToString();
                    DbConnection = ConvertIntToTipoConexao(itemQueryNimbus["tipoconexao"].ToString());
                    TipQuery = itemQueryNimbus["tipoquery"].ToString();
              
            }
            Dictionary<string, string> parametrosNimbusId = new Dictionary<string, string>();
            parametrosNimbusId.Add("@id", id);
            PaginadoGenerico entidade = _repository.ListaPaginada(0, 2, Connection, Query, "", parametrosNimbusId, DbConnection, "Text");
            Dictionary<string, object> retorno = new Dictionary<string,object>();

            foreach(Dictionary<string,object> item in entidade._Lista ){
                retorno = item;
            }
            return retorno;
        }
    }
}
