using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstatesAPI.Models
{
    public class SimilarProperty : Property
    {
        public int numOfSchools { get; set; }

        public int score { get; set; }
    }
}
