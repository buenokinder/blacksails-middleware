using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NilbusServer.Application.Contract
{
    public interface IApplicationWorkflow
    {
        void Execute(string workflowId);
    }
}
