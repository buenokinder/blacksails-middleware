using NimbusServer.Api.Kernel.Schedule.Log;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace NimbusServer.Api
{
    public static class ReadLog
    {
        public static List<LogEntry> LoadFile()
        {
            return LoadFile(string.Empty);
        }

        public static List<LogEntry> LoadFile(string JobId)
        {
            String FileName = @"E:\app\nimbus\trace\application.xml";

            List<LogEntry> _Entries = new List<LogEntry>();
            DateTime dt = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            string sXml = string.Empty;
            string sBuffer = string.Empty;
            int iIndex = 1;

            try
            {
                FileStream oFileStream = new FileStream(FileName, FileMode.OpenOrCreate, FileAccess.Read, FileShare.ReadWrite);
                StreamReader oStreamReader = new StreamReader(oFileStream);
                sBuffer = string.Format("<root>{0}</root>", oStreamReader.ReadToEnd());
                oStreamReader.Close();
                oFileStream.Close();

                #region Read File Buffer
                ////////////////////////////////////////////////////////////////////////////////
                StringReader oStringReader = new StringReader(sBuffer);
                XmlTextReader oXmlTextReader = new XmlTextReader(oStringReader);
                oXmlTextReader.Namespaces = false;
                while (oXmlTextReader.Read())
                {
                    if ((oXmlTextReader.NodeType == XmlNodeType.Element) && (oXmlTextReader.Name == "log4net:event"))
                    {


                        iIndex = BuildEntidadeLog(JobId, _Entries, iIndex, oXmlTextReader);

                    }

                }
                ////////////////////////////////////////////////////////////////////////////////
                #endregion
            }
            catch (Exception ex)
            {
                // MessageBox.Show(ex.ToString());
            }

            return _Entries;
        }

        private static bool VerificaMessage(XmlTextReader oXmlTextReader, string JobId)
        {
            bool retorno = false;
            while (oXmlTextReader.Read())
            {
                string teste123;
                if (oXmlTextReader.Name == "log4net:message")
                    if (oXmlTextReader.ReadString().Contains(JobId))
                        retorno = true;

            }
            return retorno;
        }

        private static int BuildEntidadeLog(string JobId, List<LogEntry> _Entries, int iIndex, XmlTextReader oXmlTextReader)
        {
            LogEntry logentry = new LogEntry();

            logentry.Item = iIndex;




            logentry.TimeStamp = oXmlTextReader.GetAttribute("timestamp");
            logentry.Thread = oXmlTextReader.GetAttribute("thread");

            #region get level
            ////////////////////////////////////////////////////////////////////////////////
            logentry.Level = oXmlTextReader.GetAttribute("level");
            switch (logentry.Level)
            {
                case "ERROR":
                    {
                        logentry.Image = "ERROR";
                        break;
                    }
                case "INFO":
                    {
                        logentry.Image = "INFO";
                        break;
                    }
                case "DEBUG":
                    {
                        logentry.Image = "DEBUG";
                        break;
                    }
                case "WARN":
                    {
                        logentry.Image = "WARN";
                        break;
                    }
                case "FATAL":
                    {
                        logentry.Image = "FATAL";
                        break;
                    }
                default:
                    {
                        logentry.Image = "CUSTOM";
                        break;
                    }
            }
            ////////////////////////////////////////////////////////////////////////////////
            #endregion

            #region read xml
            ////////////////////////////////////////////////////////////////////////////////
            while (oXmlTextReader.Read())
            {
                if (oXmlTextReader.Name == "log4net:event")   // end element
                    break;
                else
                {
                    switch (oXmlTextReader.Name)
                    {
                        case ("log4net:message"):
                            {
                                logentry.Message = oXmlTextReader.ReadString();
                                break;
                            }
                        case ("log4net:data"):
                            {
                                switch (oXmlTextReader.GetAttribute("name"))
                                {
                                    case ("log4netmachinename"):
                                        {
                                            logentry.MachineName = oXmlTextReader.GetAttribute("value");
                                            break;
                                        }
                                    case ("log4net:HostName"):
                                        {
                                            logentry.HostName = oXmlTextReader.GetAttribute("value");
                                            break;
                                        }
                                    case ("log4net:UserName"):
                                        {
                                            logentry.UserName = oXmlTextReader.GetAttribute("value");
                                            break;
                                        }
                                    case ("log4netapp"):
                                        {
                                            logentry.App = oXmlTextReader.GetAttribute("value");
                                            break;
                                        }
                                }
                                break;
                            }
                        case ("log4j:throwable"):
                            {
                                logentry.Throwable = oXmlTextReader.ReadString();
                                break;
                            }
                        case ("log4j:locationInfo"):
                            {
                                logentry.Class = oXmlTextReader.GetAttribute("class");
                                logentry.Method = oXmlTextReader.GetAttribute("method");
                                logentry.File = oXmlTextReader.GetAttribute("file");
                                logentry.Line = oXmlTextReader.GetAttribute("line");
                                break;
                            }
                    }
                }
            }
            ////////////////////////////////////////////////////////////////////////////////
            #endregion

            if (string.IsNullOrEmpty(JobId))
                _Entries.Add(logentry);
            else
                if (logentry.Message.Contains(JobId))
                    _Entries.Add(logentry);


            iIndex++;

            #region Show Counts
            ////////////////////////////////////////////////////////////////////////////////
            int ErrorCount =
            (
                from entry in _Entries
                where entry.Level == "ERROR"
                select entry
            ).Count();

            if (ErrorCount > 0)
            {
                //labelErrorCount.Content = string.Format("{0:#,#}  ", ErrorCount);
                //labelErrorCount.Visibility = Visibility.Visible;
                //imageError.Visibility = Visibility.Visible;
            }
            else
            {
                //labelErrorCount.Visibility = Visibility.Hidden;
                //imageError.Visibility = Visibility.Hidden;
            }

            int InfoCount =
            (
                from entry in _Entries
                where entry.Level == "INFO"
                select entry
            ).Count();

            if (InfoCount > 0)
            {
                //labelInfoCount.Content = string.Format("{0:#,#}  ", InfoCount);
                //labelInfoCount.Visibility = Visibility.Visible;
                //imageInfo.Visibility = Visibility.Visible;
            }
            else
            {
                //labelInfoCount.Visibility = Visibility.Hidden;
                //imageInfo.Visibility = Visibility.Hidden;
            }

            int WarnCount =
            (
                from entry in _Entries
                where entry.Level == "WARN"
                select entry
            ).Count();

            if (WarnCount > 0)
            {
                //labelWarnCount.Content = string.Format("{0:#,#}  ", WarnCount);
                //labelWarnCount.Visibility = Visibility.Visible;
                //imageWarn.Visibility = Visibility.Visible;
            }
            else
            {
                //labelWarnCount.Visibility = Visibility.Hidden;
                //imageWarn.Visibility = Visibility.Hidden;
            }

            int DebugCount =
            (
                from entry in _Entries
                where entry.Level == "DEBUG"
                select entry
            ).Count();

            if (DebugCount > 0)
            {
                //labelDebugCount.Content = string.Format("{0:#,#}  ", DebugCount);
                //labelDebugCount.Visibility = Visibility.Visible;
                //imageDebug.Visibility = Visibility.Visible;
            }
            else
            {
                //labelDebugCount.Visibility = Visibility.Hidden;
                //labelDebugCount.Visibility = Visibility.Hidden;
            }
            ////////////////////////////////////////////////////////////////////////////////
            return iIndex;
        }

    }

}
            #endregion