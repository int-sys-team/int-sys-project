using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstatesAPI.Models
{
    public class Compare
    {
        public List<Message> messages { get; set; }

        public string option1 { get; set; }

        public string option2 { get; set; }

        public bool stream { get; set; }
    }
}
