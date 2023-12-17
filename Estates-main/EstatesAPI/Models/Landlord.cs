using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace EstatesAPI.Models
{
    public class Landlord : Person
    {
       public List<string> PropertyIds { get; set; }

    }
}

