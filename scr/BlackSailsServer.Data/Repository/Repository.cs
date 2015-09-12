using NimbusServer.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NimbusServer.Domain.Entidades;
using System.Data;

namespace NimbusServer.Data.Repository
{
    public class Repository : IRepository
    {

        public Dictionary<string, object> BuscarPorId(string Id, string Connection, string StringQuery, string dbType)
        {
            RepositoryHelper repositorio = new RepositoryHelper(dbType);
            Dictionary<string, object> entidade = new Dictionary<string, object>();
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("@id", Id);
            DataTableReader dataReader = repositorio.ExecutaQuery(Connection, StringQuery, CommandType.Text, parameters).CreateDataReader();
            while (dataReader.Read())
            {
                int fields = dataReader.FieldCount;

                for (int i = 0; i < fields; i++)
                {

                    if (dataReader[i] == null)
                        entidade.Add(dataReader.GetName(i).ToLower(), string.Empty);
                    else
                    {
                        if (dataReader.GetName(i).ToLower().Contains("_cript"))
                            entidade.Add(dataReader.GetName(i).ToLower().Replace("_cript", ""), Sennit.Cryptography.SennitCrypt.DeCrypt(dataReader[i].ToString(), "A!09#x*&aTe$"));
                        else
                            entidade.Add(dataReader.GetName(i).ToLower(), dataReader[i]);
                    }
                }
            }

            return entidade;
        }

        public string Delete(string Connection, string StringQuery, string Id, string dbType)
        {
            RepositoryHelper repositorio = new RepositoryHelper(dbType);

            repositorio.ExecuteNonQuery(Connection, StringQuery, CommandType.Text, Id);

            return "Ok";
        }

        public PaginadoGenerico ListaPaginadaNew(int page, int tamanhoDaPagina, string Connection, string StringQuery, string QueryCount, Dictionary<string, object> parametros, string dbType, String TipoQuery)
        {
            PaginadoGenerico listaPaginado = new PaginadoGenerico();

            RepositoryHelper repositorio = new RepositoryHelper(dbType);
            if (page != 0)
                PreparaPaginacaoNew(page, tamanhoDaPagina, parametros);


            BuscaRegistrosListaNew(Connection, StringQuery, parametros, listaPaginado, repositorio, TipoQuery);

            if (!string.IsNullOrEmpty(QueryCount))
                RetornaInformacoesLista(page, tamanhoDaPagina, Connection, QueryCount, new Dictionary<string, string>(), listaPaginado, repositorio);

            return listaPaginado;
        }

        public PaginadoGenerico ListaPaginada(int page, int tamanhoDaPagina, string Connection, string StringQuery, string QueryCount, Dictionary<string, string> parametros, string dbType, String TipoQuery)
        {
            PaginadoGenerico listaPaginado = new PaginadoGenerico();

            RepositoryHelper repositorio = new RepositoryHelper(dbType);
            if (page != 0)
                PreparaPaginacao(page, tamanhoDaPagina, parametros);


            BuscaRegistrosLista(Connection, StringQuery, parametros, listaPaginado, repositorio, TipoQuery);

            if (!string.IsNullOrEmpty(QueryCount))
                RetornaInformacoesLista(page, tamanhoDaPagina, Connection, QueryCount, parametros, listaPaginado, repositorio);

            return listaPaginado;
        }
        private static void PreparaPaginacaoNew(int page, int tamanhoDaPagina, Dictionary<string, object> parametros)
        {
            parametros.Add("@pageSize", tamanhoDaPagina);
            parametros.Add("@currentPage", page);
        }
        private static void PreparaPaginacao(int page, int tamanhoDaPagina, Dictionary<string, string> parametros)
        {
            parametros.Add("@RegistroInicial", ((page - 1) * tamanhoDaPagina).ToString());
            parametros.Add("@TamanhoPagina", tamanhoDaPagina.ToString());
        }

        private static void BuscaRegistrosListaNew(string Connection, string StringQuery, Dictionary<string, object> parametros, PaginadoGenerico listaPaginado, RepositoryHelper repositorio, String TipoQuery)
        {
            System.Data.CommandType CommandType = CommandType.StoredProcedure;
            if (TipoQuery == "Text" || TipoQuery == "Select")
            {
                CommandType = CommandType.Text;

                DataTableReader dataReader = repositorio.ExecutaQueryNew(Connection, StringQuery, CommandType, parametros).CreateDataReader();
                while (dataReader.Read())
                {
                    int fields = dataReader.FieldCount;
                    Dictionary<string, object> parametrosLista = new Dictionary<string, object>();
                    for (int i = 0; i < fields; i++)
                    {

                        if (dataReader[i] == null)
                            parametrosLista.Add(dataReader.GetName(i).ToLower(), string.Empty);
                        else
                        {
                            if (dataReader.GetName(i).ToLower().Contains("_cript"))
                                parametrosLista.Add(dataReader.GetName(i).ToLower().Replace("_cript", ""), Sennit.Cryptography.SennitCrypt.DeCrypt(dataReader[i].ToString(), "A!09#x*&aTe$"));
                            else
                                parametrosLista.Add(dataReader.GetName(i).ToLower(), dataReader[i]);
                        }
                    }
                    listaPaginado._Lista.Add(parametrosLista);

                }
            }
            else
            {
                //listaPaginado._Lista = repositorio.ExecutaQueryProcedure(Connection, StringQuery, CommandType, parametros);
            }
        }

        private static void BuscaRegistrosLista(string Connection, string StringQuery, Dictionary<string, string> parametros, PaginadoGenerico listaPaginado, RepositoryHelper repositorio, String TipoQuery)
        {
            System.Data.CommandType CommandType = CommandType.StoredProcedure;
            if (TipoQuery == "Text" || TipoQuery == "Select")
            {
                CommandType = CommandType.Text;

                DataTableReader dataReader = repositorio.ExecutaQuery(Connection, StringQuery, CommandType, parametros).CreateDataReader();
                while (dataReader.Read())
                {
                    int fields = dataReader.FieldCount;
                    Dictionary<string, object> parametrosLista = new Dictionary<string, object>();
             

                    for (int i = 0; i < fields; i++)
                    {

                        if (dataReader[i] == null)
                            parametrosLista.Add(dataReader.GetName(i).ToLower(), string.Empty);
                        else
                        {
                            if (dataReader.GetName(i).ToLower().Contains("_cript"))
                                parametrosLista.Add(dataReader.GetName(i).ToLower().Replace("_cript", ""), Sennit.Cryptography.SennitCrypt.DeCrypt(dataReader[i].ToString(), "A!09#x*&aTe$"));
                            else
                                parametrosLista.Add(dataReader.GetName(i).ToLower(), dataReader[i]);
                        }
                    }
                    listaPaginado._Lista.Add(parametrosLista);

                }
            }
            else
            {
                listaPaginado._Lista = repositorio.ExecutaQueryProcedure(Connection, StringQuery, CommandType, parametros);
            }
        }

        private static void RetornaInformacoesLista(int page, int tamanhoDaPagina, string Connection, string QueryCount, Dictionary<string, string> parametros, PaginadoGenerico listaPaginado, RepositoryHelper repositorio)
        {
            DataTableReader dataReaderCount = repositorio.ExecutaQuery(Connection, QueryCount, System.Data.CommandType.Text, parametros).CreateDataReader();
            listaPaginado.PaginaAtual = page;
            while (dataReaderCount.Read())
            {
                listaPaginado.TotalDeRegistros = Convert.ToInt32(dataReaderCount[0].ToString());
                if (tamanhoDaPagina != 0)
                    listaPaginado.TotalDePaginas = (listaPaginado.TotalDeRegistros / tamanhoDaPagina);
            }
            listaPaginado.TamanhoDaPagina = page;
            listaPaginado.TotalDeRegistrosDaPagina = listaPaginado._Lista.Count;
        }

        public object Save(Dictionary<string, string> parametros, object newId, string Connection, string StringQuery, string dbType)
        {
            RepositoryHelper repositorio = new RepositoryHelper(dbType);
            return repositorio.ExecuteEscalar(Connection, StringQuery, CommandType.Text, parametros, newId);
        }


    }
}
