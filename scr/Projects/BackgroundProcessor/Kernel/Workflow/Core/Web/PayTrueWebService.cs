using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api.Web
{
    public class PayTrueWebService : CodeActivity
    {


        public OutArgument<List<Dictionary<string, string>>> retorno { get; set; }
        protected override void Execute(CodeActivityContext context)
        {

            SellsPay.SellsSoapClient teste = new SellsPay.SellsSoapClient();
            SellsPay.SellsResult retornoSells = teste.GetCurrentSells();
            List<Dictionary<string, string>> retornoPayTrue = new List<Dictionary<string, string>>();

            foreach (SellsPay.MerchantSellsDTO item in retornoSells.MerchantSells)
            {
                Dictionary<string, string> itensRetorno = new Dictionary<string, string>();
                itensRetorno.Add("ApprovedTrxsAmount", item.ApprovedTrxsAmount.ToString());
                itensRetorno.Add("ApprovedTrxsCount", item.ApprovedTrxsCount.ToString());
                itensRetorno.Add("ExtensionData", item.ExtensionData.ToString());
                itensRetorno.Add("MerchantCode", item.MerchantCode);
                itensRetorno.Add("MerchantName", item.MerchantName);
                itensRetorno.Add("RejectedTrxsAmount", item.RejectedTrxsAmount.ToString());
                itensRetorno.Add("RejectedTrxsCount", item.RejectedTrxsCount.ToString());

                retornoPayTrue.Add(itensRetorno);

            }

            retorno.Set(context, retornoPayTrue);
        }
    }
}
