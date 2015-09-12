using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Domain.Interface
{
    public interface IWorkflow
    {
        void Execute(string workflowId, string dbType, string ConnectionString, String Query);
    }
}
