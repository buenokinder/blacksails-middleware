using Common.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api.Kernel.Schedule.Job
{

    public class TimerJob : IInterruptableJob
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(WorkflowJob));

        public void Execute(IJobExecutionContext context)
        {
            throw new NotImplementedException();
        }

        public void Interrupt()
        {
            throw new NotImplementedException();
        }
    }
}
