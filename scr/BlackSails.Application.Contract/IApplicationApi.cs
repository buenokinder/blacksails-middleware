using Net.Http.WebApi.OData.Query;
using NimbusServer.Domain.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NilbusServer.Application.Contract
{
    public interface IApplicationApi
    {
        PaginadoGenerico ListaPaginada(int page, int tamanhoDaPagina, string Sistema, string Assunto, Dictionary<string, string> parametros);

        Dictionary<string,object> BuscarPorId(string sistema, string assunto, string id);
        PaginadoGenerico ODataGet(string Sistema, string Assunto, ODataQueryOptions queryOptions);
        string Save(string Sistema, string Assunto, Dictionary<string, string> parameters, string type);

        string GetWorkflowSistemaName(string WorfklowId);

        string Delete(string Sistema, string Assunto, string Id);
    }
}
