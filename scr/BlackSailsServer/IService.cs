using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer
{
    namespace Contracts
    {
        public interface IService
        {
            bool Start(Topshelf.HostControl hostControl);

            bool Stop(Topshelf.HostControl hostControl);
        }
    }
}
