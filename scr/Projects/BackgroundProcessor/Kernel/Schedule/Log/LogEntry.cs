using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Api.Kernel.Schedule.Log
{
    public class LogEntry
    {
        public enum IMAGE_TYPE
        {
            DEBUG = 0,
            ERROR = 1,
            FATAL = 2,
            INFO = 3,
            WARN = 4,
            CUSTOM = 5
        }
        public string Image { get; set; }
        //private static Dictionary<IMAGE_TYPE, BitmapSource> _ImageList =
        //    new Dictionary<IMAGE_TYPE, BitmapSource>()
        //    {
        //        {IMAGE_TYPE.DEBUG, Imaging.CreateBitmapSourceFromHIcon(SystemIcons.Question.Handle, Int32Rect.Empty, null)},
        //        {IMAGE_TYPE.ERROR, Imaging.CreateBitmapSourceFromHIcon(SystemIcons.Error.Handle, Int32Rect.Empty, null)},
        //        {IMAGE_TYPE.FATAL, Imaging.CreateBitmapSourceFromHIcon(SystemIcons.Hand.Handle, Int32Rect.Empty, null)},
        //        {IMAGE_TYPE.INFO, Imaging.CreateBitmapSourceFromHIcon(SystemIcons.Information.Handle, Int32Rect.Empty, null)},
        //        {IMAGE_TYPE.WARN, Imaging.CreateBitmapSourceFromHIcon(SystemIcons.Warning.Handle, Int32Rect.Empty, null)},
        //        {IMAGE_TYPE.CUSTOM, Imaging.CreateBitmapSourceFromHIcon(SystemIcons.Asterisk.Handle, Int32Rect.Empty, null)}
        //    };

        //public static BitmapSource Images(IMAGE_TYPE type)
        //{
        //    return _ImageList[type];
        //}

        private int _Item = 0;
        public int Item
        {
            get { return _Item; }
            set { _Item = value; }
        }

        private String _TimeStamp;
        public String TimeStamp
        {
            get { return _TimeStamp; }
            set { _TimeStamp = value; }
        }

    

        private string _Level = string.Empty;
        public string Level
        {
            get { return _Level; }
            set { _Level = value; }
        }

        private string _Thread = string.Empty;
        public string Thread
        {
            get { return _Thread; }
            set { _Thread = value; }
        }

        private string _Message = string.Empty;
        public string Message
        {
            get { return _Message; }
            set { _Message = value; }
        }

        private string _MachineName = string.Empty;
        public string MachineName
        {
            get { return _MachineName; }
            set { _MachineName = value; }
        }

        private string _UserName = string.Empty;
        public string UserName
        {
            get { return _UserName; }
            set { _UserName = value; }
        }

        private string _HostName = string.Empty;
        public string HostName
        {
            get { return _HostName; }
            set { _HostName = value; }
        }

        private string _App = string.Empty;
        public string App
        {
            get { return _App; }
            set { _App = value; }
        }

        private string _Throwable = string.Empty;
        public string Throwable
        {
            get { return _Throwable; }
            set { _Throwable = value; }
        }

        private string _Class = string.Empty;
        public string Class
        {
            get { return _Class; }
            set { _Class = value; }
        }

        private string _Method = string.Empty;
        public string Method
        {
            get { return _Method; }
            set { _Method = value; }
        }

        private string _File = string.Empty;
        public string File
        {
            get { return _File; }
            set { _File = value; }
        }

        private string _Line = string.Empty;
        public string Line
        {
            get { return _Line; }
            set { _Line = value; }
        }
    }
}
