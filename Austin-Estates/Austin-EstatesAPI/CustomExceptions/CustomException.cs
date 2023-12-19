using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstatesAPI.CustomExceptions
{
    public class CustomException : Exception
    {
        public CustomException() { }

        public CustomException(string message) : base(message) { }

        public CustomException(string message, Exception innerException) : base(message, innerException) { }
    }
}
