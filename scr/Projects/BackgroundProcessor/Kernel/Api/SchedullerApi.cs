using CrystalQuartz.Core;
using CrystalQuartz.Core.Domain;
using CrystalQuartz.Core.SchedulerProviders;
using NilbusServer.Application.Contract;
using NimbusServer.Api.Kernel.Schedule;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using System.Runtime.Serialization;
using Quartz.Impl.Matchers;
using NimbusServer.Api.Kernel.Schedule.Log;
namespace NimbusServer.Api.Kernel.Api
{
    public class JobGroups
    {
        public List<JobGroup> Grupos { get; set; }
        public Int32? TotalJobs { get; set; }

    }
    public class JobGroup
    {
        public string Name { get; set; }
        public IList<JobDetails> Jobs { get; set; }
    }
    public class JobDetails
    {
        public string NomeLegivel { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string State { get; set; }

        public string TriggerId { get; set; }
        public string NextFire { get; set; }

        public string Grupo { get; set; }

        public string PreviousFire { get; set; }

        public string FirstFire { get; set; }

        public string LastFire { get; set; }

    }
    [DataContract]
    public class SchedulerDto
    {

        [DataMember]
        public bool CanShutdown { get; set; }
        [DataMember]
        public bool CanStart { get; set; }
        [DataMember]
        public string InstanceId { get; set; }
        [DataMember]
        public bool IsRemote { get; set; }
        [DataMember]
        public bool IsStarted { get; set; }
        [DataMember]
        public JobGroups JobGroups { get; set; }

        public int JobsExecuted { get; set; }

        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public DateTime? RunningSince { get; set; }
        [DataMember]
        public string SchedulerType { get; set; }
        [DataMember]
        public string Status { get; set; }

        //public IList<TriggerGroupData> TriggerGroups { get; set; }
    }

    public class SchedullerController : ApiController
    {

        private readonly IApplicationApi service;

        public SchedullerController(IApplicationApi service)
            : base()
        {
            this.service = service;
        }

        protected IApplicationApi Service
        {
            get
            {
                return this.service;
            }
        }
        private JobGroups GetAllJobs(IScheduler scheduler)
        {

            int countJobs = 0;
            IList<string> jobGroups = scheduler.GetJobGroupNames();
            IList<string> triggerGroups = scheduler.GetTriggerGroupNames();
            List<JobGroup> entidadeJobGroup = new List<JobGroup>();
            foreach (string group in jobGroups)
            {



                var groupMatcher = GroupMatcher<JobKey>.GroupContains(group);
                JobGroup grupoItem = new JobGroup();
                grupoItem.Name = group;
                grupoItem.Jobs = new List<JobDetails>();
                var jobKeys = scheduler.GetJobKeys(groupMatcher);
                foreach (var jobKey in jobKeys)
                {
                    countJobs++;
                    var detail = scheduler.GetJobDetail(jobKey);
                    var triggers = scheduler.GetTriggersOfJob(jobKey);
                    foreach (ITrigger trigger in triggers)
                    {
                        DateTimeOffset? nextFireTime = trigger.GetNextFireTimeUtc();
                        DateTimeOffset? previousFireTime = trigger.GetPreviousFireTimeUtc();
                        DateTimeOffset? startFireTime = trigger.StartTimeUtc;
                        DateTimeOffset? lastFireTime = trigger.FinalFireTimeUtc;

                        //
                        grupoItem.Jobs.Add(new JobDetails()
                        {
                            Grupo = group,
                            FirstFire = (startFireTime.HasValue) ? startFireTime.Value.LocalDateTime.ToString() : "",
                            LastFire = (lastFireTime.HasValue) ? lastFireTime.Value.LocalDateTime.ToString() : "",
                            Type = trigger.GetType().Name,
                            NomeLegivel = service.GetWorkflowSistemaName(jobKey.Name),
                            Name = jobKey.Name,
                            Description = detail.Description,
                            NextFire = (nextFireTime.HasValue) ? nextFireTime.Value.LocalDateTime.ToString() : "",
                            PreviousFire = (previousFireTime.HasValue) ? previousFireTime.Value.LocalDateTime.ToString() : "",
                            State = scheduler.GetTriggerState(trigger.Key).ToString(),
                            TriggerId = trigger.Key.Name
                        });

                    }
                }
                entidadeJobGroup.Add(grupoItem);


            }
            JobGroups entidadeRetorno = new JobGroups();
            entidadeRetorno.Grupos = new List<JobGroup>();
            entidadeRetorno.Grupos = entidadeJobGroup;
            entidadeRetorno.TotalJobs = countJobs;
            return entidadeRetorno;
        }

        [HttpGet]
        [Route("api/scheduler")]
        public SchedulerDto Get()
        {

            StdSchedulerProvider Provider = new StdSchedulerProvider();
            DefaultSchedulerDataProvider Scheduler = SchedulerServer.SchedulerData;



            GetAllJobs(Provider.Scheduler);


            return new SchedulerDto()
            {
                CanShutdown = Scheduler.Data.CanShutdown,
                CanStart = Scheduler.Data.CanStart,
                InstanceId = Scheduler.Data.InstanceId,
                IsRemote = Scheduler.Data.IsRemote,
                IsStarted = SchedulerServer.Provider.Scheduler.IsStarted,
                JobGroups = GetAllJobs(Provider.Scheduler),
                JobsExecuted = Scheduler.Data.JobsExecuted,

                Name = Scheduler.Data.Name,
                RunningSince = Scheduler.Data.RunningSince,
                SchedulerType = Scheduler.Data.SchedulerType.ToString(),
                Status = Scheduler.Data.Status.ToString()


            };


        }

        [HttpGet]
        [Route("api/scheduler/pause/{id}")]
        public void Pause(string id)
        {
            IScheduler scheduler = SchedulerServer.GetScheduler();
            var groupMatcher = GroupMatcher<TriggerKey>.AnyGroup();
            foreach (var trigger in scheduler.GetTriggerKeys(groupMatcher))
            {

                scheduler.PauseTrigger(trigger);
            }
        }


        [HttpGet]
        [Route("api/scheduler/resume/{id}")]
        public void Resume(string id)
        {
            IScheduler scheduler = SchedulerServer.GetScheduler();
            var groupMatcher = GroupMatcher<TriggerKey>.AnyGroup();
            foreach (var trigger in scheduler.GetTriggerKeys(groupMatcher))
            {
                scheduler.ResumeTrigger(trigger);
            }

        }



        [HttpGet]
        [Route("api/scheduler/groups")]
        public List<String> GetGroups()
        {
            List<string> listSchedule = new List<string>();
            IScheduler scheduler = SchedulerServer.GetScheduler();
            var jobGroups = scheduler.GetJobGroupNames();


            foreach (string jobGroup in jobGroups)
            {
                listSchedule.Add(jobGroup);

            }
            return listSchedule;
        }

        [HttpGet]
        [Route("api/scheduler/log")]
        public List<LogEntry> GetLog()
        {
            return ReadLog.LoadFile();
        }


        [HttpGet]
        [Route("api/scheduler/log/{id}")]
        public List<LogEntry> GetLog(string id)
        {
            return ReadLog.LoadFile(id);
        }
    }
}
