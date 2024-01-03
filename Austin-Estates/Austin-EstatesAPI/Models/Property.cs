using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace EstatesAPI.Models
{
    public class Property
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string city { get; set; }
        public string streetAddress { get; set; }
        public int zipcode { get; set; }
        public string description { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double propertyTaxRate { get; set; }
        public int garageSpaces { get; set; }
        public int hasAssociation { get; set; }
        public int hasCooling { get; set; }
        public int hasGarage { get; set; }
        public int hasHeating { get; set; }
        public int hasSpa { get; set; }
        public int hasView { get; set; }
        public string homeType { get; set; }
        public int parkingSpaces { get; set; }
        public int yearBuilt { get; set; }
        public double orig_price { get; set; }
        public int numPriceChanges { get; set; }
        public DateTime latest_saledate { get; set; }
        public int latest_salemonth { get; set; }
        public int latest_saleyear { get; set; }
        public string latestPriceSource { get; set; }
        public int numOfPhotos { get; set; }
        public int accessibility { get; set; }
        public int numOfAppliances { get; set; }
        public int numOfParkingFeatures { get; set; }
        public int patioporch { get; set; }
        public int security { get; set; }
        public int waterfront { get; set; }
        public int windowfeatures { get; set; }
        public int community { get; set; }
        public double lotSizeSqFt { get; set; }
        public double livingAreaSqFt { get; set; }
        public int numOfPrimarySchools { get; set; }
        public int numOfElementarySchools { get; set; }
        public int numOfMiddleSchools { get; set; }
        public int numOfHighSchools { get; set; }
        public double avgSchoolDistance { get; set; }
        public double avgSchoolRating { get; set; }
        public double avgSchoolSize { get; set; }
        public int MedianStudentsPerTeacher { get; set; }
        public float numOfBathrooms { get; set; }
        public int numOfBedrooms { get; set; }
        public int numOfStories { get; set; }
        public string homeImage { get; set; }
        public double price { get; set; }
        public int zip_rank { get; set; }
        public double median_zip { get; set; }
        public double pr_sqft { get; set; }
    }
}

