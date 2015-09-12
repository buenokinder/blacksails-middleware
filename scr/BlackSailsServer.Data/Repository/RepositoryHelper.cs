using MySql.Data.MySqlClient;
using Ninject;

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data.SQLite;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Data.Repository
{
    public class RepositoryHelper
    {
        private DatabaseType _dbtype { get; set; }
        public RepositoryHelper(string dbtype)
        {
            _dbtype = (DatabaseType)Enum.Parse(typeof(DatabaseType), dbtype);
        }
        private DbDataAdapter CreateAdapter
        (IDbCommand cmd)
        {
            DbDataAdapter da;
            switch (_dbtype)
            {
                case DatabaseType.SqLite:
                    da = new SQLiteDataAdapter
                       ((SQLiteCommand)cmd);
                    break;

                case DatabaseType.SQLServer:
                    da = new SqlDataAdapter
                       ((SqlCommand)cmd);
                    break;

                //case DatabaseType.Oracle:
                //    da = new OracleDataAdapter
                //       ((OracleCommand)cmd);
                //    break;


                case DatabaseType.MySql:
                    da = new MySqlDataAdapter
                       ((MySqlCommand)cmd);
                    break;
                default:
                    da = new SqlDataAdapter
                       ((SqlCommand)cmd);
                    break;
            }

            return da;
        }


        private IDbConnection CreateConnection
         (string ConnectionString)
        {
            IDbConnection cnn;

            switch (_dbtype)
            {
                case DatabaseType.SqLite:
                    cnn = new SQLiteConnection
                       (ConnectionString);
                    break;
                case DatabaseType.SQLServer:
                    cnn = new SqlConnection
                       (ConnectionString);
                    break;

                //case DatabaseType.Oracle:
                //    cnn = new OracleConnection
                //       (ConnectionString);
                //    break;
                case DatabaseType.MySql:
                    cnn = new MySqlConnection
                       (ConnectionString);
                    break;

                default:
                    cnn = new SqlConnection
                       (ConnectionString);
                    break;
            }

            return cnn;
        }


        private IDbCommand CreateCommand
           (string CommandText,
           IDbConnection cnn)
        {
            IDbCommand cmd;
            switch (_dbtype)
            {
                case DatabaseType.SqLite:
                    cmd = new SQLiteCommand
                       (CommandText,
                       (SQLiteConnection)cnn);
                    break;

                case DatabaseType.SQLServer:
                    cmd = new SqlCommand
                       (CommandText,
                       (SqlConnection)cnn);
                    break;

                //case DatabaseType.Oracle:
                //    cmd = new OracleCommand
                //       (CommandText,
                //       (OracleConnection)cnn);
                //    break;

                case DatabaseType.MySql:
                    cmd = new MySqlCommand
                       (CommandText,
                       (MySqlConnection)cnn);
                    break;
                default:
                    cmd = new SqlCommand
                       (CommandText,
                       (SqlConnection)cnn);
                    break;
            }

            return cmd;
        }

        public enum DatabaseType
        {
            SqLite,
            SQLServer,
            Oracle,
            MySql
        }
        public object ExecuteNonQuery(string ConectionString, string Query, CommandType commandType, string Id)
        {

            using (IDbConnection cn = this.CreateConnection(ConectionString))
            {
                try
                {
                    IDbCommand command = CreateCommand(Query, cn);
                    command.Connection = cn;
                    command.CommandText = Query;
                    command.CommandType = commandType;

                    var parameter = command.CreateParameter();
                    parameter.ParameterName = "@Id";
                    parameter.Value = Id;
                    command.Parameters.Add(parameter);
                    cn.Open();
                    command.ExecuteNonQuery();


                }
                catch (DbException ex)
                {

                    throw ex;
                    //throw new SennitStatusReturn() { StatusCode = "02", DetailDescription = ex.Message };
                    return "False";

                }
                finally
                {
                    cn.Close();
                }


                return "True";
            }
        }
        public object ExecuteEscalar(string ConectionString, string Query, CommandType commandType, Dictionary<string, string> parameters, object newId)
        {

            using (IDbConnection cn = this.CreateConnection(ConectionString))
            {
                try
                {
                    IDbCommand command = CreateCommand(Query, cn);
                    command.Connection = cn;
                    command.CommandText = Query;
                    command.CommandType = commandType;

                    foreach (KeyValuePair<string, string> parametro in parameters)
                    {
                        var parameter = command.CreateParameter();
                        parameter.ParameterName = parametro.Key;
                        parameter.Value = parametro.Value;
                        command.Parameters.Add(parameter);
                    }
                    cn.Open();
                    command.ExecuteNonQuery();


                }
                catch (DbException ex)
                {
                    throw ex;
                    //throw new SennitStatusReturn() { StatusCode = "02", DetailDescription = ex.Message };
                }
                finally
                {
                    cn.Close();
                }

            }



            return newId;
        }



        public List< Dictionary<String,Object>> ExecutaQueryProcedure(string ConectionString, string Query, CommandType commandType, Dictionary<string, string> parameters)
        {
            List<Dictionary<String, Object>> retorno = new List<Dictionary<string, object>>();
            DataTable DataTableRetorno = new DataTable();

            using (IDbConnection cn = this.CreateConnection(ConectionString))
            {
                try
                {
                    IDbCommand command = CreateCommand(Query, cn);
                    command.Connection = cn;
                    command.CommandText = Query;
                    command.CommandType = commandType;
                    
                    foreach (KeyValuePair<string, string> parametro in parameters)
                    {
                        var parameter = command.CreateParameter();
                        parameter.ParameterName = parametro.Key;
                        parameter.Value = parametro.Value;
                        command.Parameters.Add(parameter);
                    }
                    cn.Open();
                    IDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        int fields = dataReader.FieldCount;
                        Dictionary<string, object> parametrosLista = new Dictionary<string, object>();
                        for (int i = 0; i < fields; i++)
                        {
                            parametrosLista.Add(dataReader.GetName(i).ToLower(), dataReader[i]);

                        }
                        retorno.Add(parametrosLista);

                    }

                }
                catch (DbException ex)
                {
                    throw ex;
                }
                finally
                {
                    cn.Close();
                }

            }
            return retorno;
        }
        public DataTable ExecutaQuery(string ConectionString, string Query, CommandType commandType, Dictionary<string, string> parameters)
        {

            DataTable DataTableRetorno = new DataTable();

            using (IDbConnection cn = this.CreateConnection(ConectionString))
            {
                try
                {
                    IDbCommand command = CreateCommand(Query, cn);
                    command.Connection = cn;
                    command.CommandText = Query;
                    command.CommandType = commandType;

                    foreach (KeyValuePair<string, string> parametro in parameters)
                    {
                        var parameter = command.CreateParameter();
                        parameter.ParameterName = parametro.Key;
                        parameter.Value = parametro.Value;
                        if (parametro.Key == "@RegistroInicial")
                            parameter.DbType = DbType.Int32;

                        if (parametro.Key == "@TamanhoPagina")
                            parameter.DbType = DbType.Int32;


                        command.Parameters.Add(parameter);
                    }
                    cn.Open();
                    
                    using (DbDataAdapter sqlDataAdapter = CreateAdapter(command))
                    {
                        sqlDataAdapter.Fill(DataTableRetorno);
                        
                        
                    }

                }
                catch (DbException ex)
                {
                    throw ex;
                }
                finally
                {
                    cn.Close();
                }

            }
            return DataTableRetorno;
        }

        public DataTable ExecutaQueryNew(string ConectionString, string Query, CommandType commandType, Dictionary<string, object> parameters)
        {

            DataTable DataTableRetorno = new DataTable();

            using (IDbConnection cn = this.CreateConnection(ConectionString))
            {
                try
                {
                    IDbCommand command = CreateCommand(Query, cn);
                    command.Connection = cn;
                    command.CommandText = Query;
                    command.CommandType = commandType;

                    foreach (KeyValuePair<string, object> parametro in parameters)
                    {
                        var parameter = command.CreateParameter();
                        parameter.ParameterName = parametro.Key;
                        parameter.Value = parametro.Value;
                        command.Parameters.Add(parameter);
                    }
                    cn.Open();

                    using (DbDataAdapter sqlDataAdapter = CreateAdapter(command))
                    {
                        sqlDataAdapter.Fill(DataTableRetorno);


                    }

                }
                catch (DbException ex)
                {
                    throw ex;
                }
                finally
                {
                    cn.Close();
                }

            }
            return DataTableRetorno;
        }
    }
}
