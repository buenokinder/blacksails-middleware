using Common.Logging;
using CrystalQuartz.Core;
using CrystalQuartz.Core.SchedulerProviders;
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api.Kernel.Schedule
{
    public static class SchedulerServer
    {

        private static readonly ILog logger = LogManager.GetLogger(typeof(SchedulerServer));

        public static ITrigger BuildTrigger(string cron)
        {


            var trigger = TriggerBuilder.Create()
                                        .StartNow()
                                        .WithSchedule(CronScheduleBuilder.CronSchedule(cron))
                                        .Build();
            return trigger;
        }



        public static StdSchedulerProvider Provider {get;set;}
        public static DefaultSchedulerDataProvider SchedulerData { get; set; }
        public static IScheduler InicializarScheduler()
        {

            Provider  = new StdSchedulerProvider();

            Provider.Init();
            Provider.Scheduler.Start();

            SchedulerData = new DefaultSchedulerDataProvider(Provider);


            //var scheduleMigracao = SchedulerServer.GetScheduler();

            //if (!scheduleMigracao.IsStarted)
            //    scheduleMigracao.Start();

            logger.Info("Scheduler started successfully");

            return Provider.Scheduler;
        }

        public static IJobDetail BuildJogDetail<T>(string WorkFlowId, string Group) where T : IJob
        {
            return JobBuilder.Create<T>()
                   .WithIdentity(WorkFlowId, Group)
                   .RequestRecovery()
                   .Build();
        }

        public  static IScheduler GetScheduler()
        {
            try
            {
                return Provider.Scheduler;
                //IScheduler scheduler = SchedulerRepository.Instance.Lookup("DefaultQuartzScheduler");
                //if (scheduler == null)
                //{
                //    var factoryScheduler = new StdSchedulerFactory();

                //    return factoryScheduler.GetScheduler();
                //}
                //else
                //{
                //    return scheduler;
                //}
            }
            catch (Exception ex)
            {
                logger.Error("Server initialization failed:" + ex.Message, ex);
                throw;
            }
        }
    }
}
