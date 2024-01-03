using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstatesAPI.Models
{
    public class RealEstate
    {
        public bool accessibility { get; set; }

        public int garageSpaces { get; set; }

        public bool hasAssociation { get; set; }

        public bool hasCooling { get; set; }

        public bool hasGarage { get; set; }

        public bool hasHeating { get; set; }

        public bool hasSpa { get; set; }

        public bool hasView { get; set; }

        public string homeType { get; set; }

        public double latitude { get; set; }

        public int livingAreaSqFt { get; set; }

        public double longitude { get; set; }

        public float lotSizeSqFt { get; set; }

        public int numOfAppliances { get; set; }

        public int numOfBathrooms { get; set; }

        public int numOfBedrooms { get; set; }

        public int numOfParkingFeatures { get; set; }

        public int numOfPhotos { get; set; }

        public int numOfSchools { get; set; }

        public int numOfStories { get; set; }

        public int parkingSpaces { get; set; }

        public bool patioporch { get; set; }

        public bool security { get; set; }

        public bool waterfront { get; set; }

        public int yearBuilt { get; set; }

        public int zipcode { get; set; }
    }
}
