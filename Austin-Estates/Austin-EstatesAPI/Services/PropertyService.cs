using EstatesAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstatesAPI.Services
{

    public class PropertyService
    {
        private readonly IMongoCollection<Property> _propertyCollection;

        public PropertyService(IOptions<EstateDatabaseSettings> estateDatabaseSettings)
        {
            var mongoClient = new MongoClient(estateDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(estateDatabaseSettings.Value.DatabaseName);

            _propertyCollection = mongoDatabase.GetCollection<Property>(
                estateDatabaseSettings.Value.PropertiesCollectionName);
        }

        public IMongoCollection<Property> Collection { get { return _propertyCollection; } }

        public async Task<List<Property>> GetAllPropertiesAsync()
        {
            var filter = Builders<Property>.Filter.Empty;

            var properties = await _propertyCollection.Find(filter).ToListAsync();

            return properties;
        }

        public async Task<Property> GetPropertyByIdAsync(string id)
        {
            var property = await _propertyCollection.Find(x => x._id == id).FirstOrDefaultAsync();

            return property;
        }

        public async Task<List<Property>> GetPropertiesOrderedByPriceAsync(int page, int count)
        {
            var filter = Builders<Property>.Filter.Empty;
            var properties = await _propertyCollection
                                        .Find(filter)
                                        .SortBy(p => p.price)
                                        .Skip((page-1)*count)
                                        .Limit(count)
                                        .ToListAsync();

            return properties;
        }

        public async Task<List<Property>> GetPropertiesOrderedByLatestSaleDateAsync(int page, int count)
        {
            var filter = Builders<Property>.Filter.Empty;
            var properties = await _propertyCollection
                                        .Find(filter)
                                        .SortBy(p => p.latest_saledate)
                                        .Skip((page - 1) * count)
                                        .Limit(count)
                                        .ToListAsync();

            return properties;
        }

        public async Task<List<Property>> FilterProperties(int zipcode, int yearBuilt, double startPrice, double endPrice)
        {
            var filterBuilder = Builders<Property>.Filter;

            var filter = filterBuilder.Eq(p => p.zipcode, zipcode)
                  | filterBuilder.Eq(p => p.yearBuilt, yearBuilt)
                  | (filterBuilder.Gte(p => p.price, startPrice) & filterBuilder.Lte(p => p.price, endPrice));


            var properties = await _propertyCollection
                                        .Find(filter)
                                        .ToListAsync();

            return properties;
        }

        public async Task AddPropertyAsync(Property newProperty)
        {
            await _propertyCollection.InsertOneAsync(newProperty);
        }

        public async Task UpdatePropertyAsync(string id, Property updatedProperty)
        { 
            await _propertyCollection.ReplaceOneAsync(x => x._id == id, updatedProperty);
        }

         public async Task RemovePropertyAsync(string id)
         {
             await _propertyCollection.DeleteOneAsync(x => x._id == id);
         }

    }
}

