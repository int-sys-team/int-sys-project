using EstatesAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstatesAPI.Services
{
    public class ClientService
    {
        private readonly IMongoCollection<Person> _clientCollection;

        public ClientService(IOptions<EstateDatabaseSettings> estateDatabaseSettings)
        {
            var mongoClient = new MongoClient(estateDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(estateDatabaseSettings.Value.DatabaseName);

            _clientCollection = mongoDatabase.GetCollection<Person>(
                estateDatabaseSettings.Value.ClientsCollectionName);
        }

        public async Task<List<Person>> GetAllClientsAsync()
        {
            var filter = Builders<Person>.Filter.Empty;

            var clients = await _clientCollection.Find(filter).ToListAsync();

            return clients;
        }

        public async Task<Person> GetClientByIdAsync(string id)
        {
            var client = await _clientCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

            return client;
        }

        public Person GetClientByUsername(string username)
        {
            var client = _clientCollection.Find(x => x.Username == username).FirstOrDefault();

            return client;
        }

        public async Task CreateClientAsync(Person newClient)
        {
            await _clientCollection.InsertOneAsync(newClient);
        }

        public async Task UpdateClientAsync(string id, Person updatedClient)
        {
            await _clientCollection.ReplaceOneAsync(x => x.Id == id, updatedClient);
        }

        public async Task RemoveClientAsync(string id)
        {
            await _clientCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}

