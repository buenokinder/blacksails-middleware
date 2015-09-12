using NimbusServer.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Domain.Interface
{
    public interface IRepository
    {

        PaginadoGenerico ListaPaginadaNew(int page, int tamanhoDaPagina, string Connection, string StringQuery, string QueryCount, Dictionary<string, object> parametros, string dbType, String TipoQuery);
        Dictionary<string,object> BuscarPorId(string Id, string Connection, string StringQuery, string dbType);
        PaginadoGenerico ListaPaginada(int page, int tamanhoDaPagina, string Connection, string StringQuery, string QueryCount, Dictionary<string, string> parametros, string dbType, String TipoQuery);
        object Save(Dictionary<string, string> parametros, object newId, string Connection, string StringQuery, string dbType);
        string Delete(string Connection, string StringQuery, string Id, string dbType);
    }
}
