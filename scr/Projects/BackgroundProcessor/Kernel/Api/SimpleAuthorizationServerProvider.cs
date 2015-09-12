using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api.Kernel.Api
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            bool isValidUser = false;
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

            if (allowedOrigin == null) allowedOrigin = "*";

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            using (SQLiteConnection cn = new SQLiteConnection(Sennit.Cryptography.SennitCrypt.DeCrypt(System.Configuration.ConfigurationManager.ConnectionStrings["Database"].ConnectionString, "A!09#x*&aTe$")))
            {


                SQLiteCommand cmdCount = new SQLiteCommand();
                cmdCount.Connection = cn;
                cmdCount.CommandText = "Select * from Usuario where email=@email and senha=@senha;";
                cmdCount.CommandType = CommandType.Text;


                cmdCount.Parameters.AddWithValue("@email", context.UserName);
                cmdCount.Parameters.AddWithValue("@senha", context.Password);

                try {
                    cn.Open();
                    SQLiteDataReader dataReader = cmdCount.ExecuteReader();

                    if (dataReader.Read())
                    {

                        isValidUser = true;

                    }

                    cn.Close();
                }
                catch (Exception ex) {

                }


               

               

            }



            if (!isValidUser)
            {
                context.SetError("invalid_grant", "Usuario/Senha inválido.");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role", "user"));

            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "as:client_id", (context.ClientId == null) ? string.Empty : context.ClientId
                    },
                    {
                        "userName", context.UserName
                    }
                });
            var ticket = new AuthenticationTicket(identity, props);
            context.Validated(ticket);
        }
    }
}
