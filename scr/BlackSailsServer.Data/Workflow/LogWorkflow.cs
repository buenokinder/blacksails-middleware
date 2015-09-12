using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Data
{

    public static class LogWorkflow
    {
        public static void Save(string origem, string message)
        {
            String mydocpath = System.Configuration.ConfigurationManager.AppSettings["CaminhoArquivoLog"];

            using (StreamWriter outfile = File.AppendText(mydocpath + @"\logworkflow_id_" + origem + ".txt"))
            {
                outfile.WriteLine(message);
            }
        }
    }
}
