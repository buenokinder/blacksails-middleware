using Common.Logging;
using NilbusServer.Application.Contract;
using NimbusServer.Api.Kernel.Ioc;
using Quartz;
using Ninject;
using Ninject.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api.Kernel.Schedule.Job
{
    [PersistJobDataAfterExecution]
    [DisallowConcurrentExecution]
    public class WorkflowJob : IInterruptableJob
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(WorkflowJob));

        public void Interrupt()
        {

        }

        public void Execute(IJobExecutionContext context)
        {
            try
            {

                Log.DebugFormat("{0}****{0}Job {1} Iniciado  @ {2} próximo scheduled para {3}{0}***{0}",
                                                                        Environment.NewLine,
                                                                        context.JobDetail.Key,
                                                                        context.FireTimeUtc.Value.ToString("r"),
                                                                        context.NextFireTimeUtc.Value.ToString("r"));


                var kernel = NinjectHelper.Kernel;
                var workflow = kernel.Get<IApplicationWorkflow>();
                workflow.Execute(context.Trigger.JobKey.Name);
                

                Log.DebugFormat("{0}****{0}Job {1} executado com sucesso às  @ {2}",
                                                                        Environment.NewLine,
                                                                        context.JobDetail.Key,
                                                                        context.FireTimeUtc.Value.ToString("r"));

            }
            catch (Exception ex)
            {

                Log.ErrorFormat("{0}***{0}Job {2} {0}Failed: {1}{0}***{0}", Environment.NewLine, ex.Message, context.JobDetail.Key);
            }
        }
    }
}
