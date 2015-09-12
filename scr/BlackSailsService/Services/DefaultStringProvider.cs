using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackgroundProcessor
{
    using Contracts;

    namespace Services
    {
        public class DefaultStringProvider : IStringProvider
        {
            public static int Count = 0;

            public string HelloWorld
            {
                get
                {
                    return string.Format("Hello World #{0}!", ++Count);
                }
            }
        }
    }
}