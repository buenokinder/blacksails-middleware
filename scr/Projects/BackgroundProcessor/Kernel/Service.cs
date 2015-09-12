using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Owin.Hosting;
using Ninject;
using Topshelf;
using Quartz.Impl.AdoJobStore.Common;

namespace BackgroundProcessor
{
    using Configs;
    using NimbusServer.Api.Kernel.Ioc;
    using NimbusServer.Api.Kernel.Schedule;
    using Quartz;
    using NimbusServer.Api.Kernel.Schedule.Job;
    using CrystalQuartz.Core.SchedulerProviders;
    using CrystalQuartz.Core;
    using CrystalQuartz.Core.Domain;

    public class Service
    {
        private readonly IKernel kernel;

        public Service(IKernel kernel)
            : base()
        {
            this.kernel = kernel;
        }

        protected IKernel Kernel
        {
            get
            {
                return this.kernel;
            }
        }

        protected IDisposable WebAppHolder
        {
            get;
            set;
        }

        protected int Port
        {
            get
            {
                return Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["NimbusPort"].ToString());
            }
        }

        protected string Host
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["NimbusHost"].ToString();
            }
        }

        private static void BuildingQuartzMetadataSqLite1090()
        {
            var metaData = new DbMetadata();
            metaData.AssemblyName = "System.Data.SQLite, Version = 1.0.94.0, Culture = neutral, PublicKeyToken = db937bc2d44ff139";

            metaData.BindByName = true;
            metaData.CommandBuilderType = typeof(System.Data.SQLite.SQLiteCommandBuilder);
            metaData.CommandType = typeof(System.Data.SQLite.SQLiteCommand);
            metaData.ConnectionType = typeof(System.Data.SQLite.SQLiteConnection);
            metaData.ExceptionType = typeof(System.Data.SQLite.SQLiteException);
            metaData.ParameterDbType = typeof(System.Data.SQLite.TypeAffinity);
            metaData.ParameterDbTypePropertyName = "DbType";
            metaData.ParameterNamePrefix = "@";
            metaData.ParameterType = typeof(System.Data.SQLite.SQLiteParameter);
            metaData.UseParameterNamePrefixInParameterCollection = true;

            DbProvider.RegisterDbMetadata("SQLite-1094", metaData);
        }

        public bool Start(HostControl hostControl)
        {

            if (WebAppHolder == null)
            {

                WebAppHolder = WebApp.Start
                (
                    Host,
                    appBuilder =>
                    {
                        new StartupConfig().Configure(appBuilder, Kernel);
                    }
                );

                NinjectHelper.Kernel = Kernel;
                BuildingQuartzMetadataSqLite1090();

                //IScheduler scheduler = SchedulerServer.InicializarScheduler();




                //scheduler.ScheduleJob(SchedulerServer.BuildJogDetail<WorkflowJob>("5DD5243A-52A8-4A38-BBD5-1D21AAAB7536", "Carrefour"), SchedulerServer.BuildTrigger("0 0/10 * * * ?"));




                //scheduler.ScheduleJob(SchedulerServer.BuildJogDetail<WorkflowJob>("649D4A31-31E5-48B4-9E5C-9CDB17584F77", "Carrefour"), SchedulerServer.BuildTrigger("0 0/30 * * * ?"));


                //scheduler.ScheduleJob(SchedulerServer.BuildJogDetail<WorkflowJob>("A9BF0D2D-C75B-4D67-BFA6-F99D3ACCD5AD", "Bayer"), SchedulerServer.BuildTrigger("0 0/1 * * * ?"));

                

            }

            return true;
        }

        public bool Stop(HostControl hostControl)
        {
            if (WebAppHolder != null)
            {
                WebAppHolder.Dispose();
                WebAppHolder = null;
            }

            return true;
        }
    }
}