using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NimbusServer.Api
{
    public sealed class SendEmailActivity : CodeActivity
    {
        public InArgument<string> to { get; set; }
        public InArgument<string> subject { get; set; }
        public InArgument<string> body { get; set; }
        private string from = "admin@sennit.com.br";
        private string host = "smtp.office365.com";
        private string userName = "admin@sennit.com.br";
        private string password = "@dmin@2014";
        public OutArgument<string> result { get; set; }

        protected override void Execute(CodeActivityContext context)
        {
            var mailMessage = new System.Net.Mail.MailMessage();
            mailMessage.To.Add(to.Get(context).ToString());
            mailMessage.Subject = subject.Get(context).ToString();
            mailMessage.Body = body.Get(context);
            mailMessage.From = new System.Net.Mail.MailAddress(from);
            var smtp = new System.Net.Mail.SmtpClient();
            smtp.Host = host;
            smtp.Credentials = new System.Net.NetworkCredential(userName, password);
            smtp.EnableSsl = true;
            smtp.Port = 587;
            smtp.Send(mailMessage);
            result.Set(context, "ok");
        }
    }
}
