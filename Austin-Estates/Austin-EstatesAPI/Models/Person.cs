using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace EstatesAPI.Models
{
    public class Person
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public bool IsLoggedIn { get; set; }

        public string City { get; set; }

        public string Contact { get; set; }

        public string ProfileImg { get; set; }

        public string Biography { get; set; }

        public List<string> Wishes { get; set; }

        public List<Property> Properties { get; set; }


        public Person()
        {
            Wishes = new List<string>();
            Properties = new List<Property>();
        }
    }
}

