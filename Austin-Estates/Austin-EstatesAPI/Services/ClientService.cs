using EstatesAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstatesAPI.Services
{
    public class ClientService
    {
        private readonly IMongoCollection<User> _clientCollection;

        public ClientService(IOptions<EstateDatabaseSettings> estateDatabaseSettings)
        {
            var mongoClient = new MongoClient(estateDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(estateDatabaseSettings.Value.DatabaseName);

            _clientCollection = mongoDatabase.GetCollection<User>(
                estateDatabaseSettings.Value.ClientsCollectionName);
        }

        public async Task<List<User>> GetAllClientsAsync()
        {
            var filter = Builders<User>.Filter.Empty;

            var clients = await _clientCollection.Find(filter).ToListAsync();

            return clients;
        }

        public async Task<User> GetClientByIdAsync(string id)
        {
            var client = await _clientCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

            return client;
        }

        public User GetClientByEmail(string email)
        {
            var client = _clientCollection.Find(x => x.Email == email).FirstOrDefault();

            return client;
        }

        public async Task CreateClientAsync(User newClient)
        {
            await _clientCollection.InsertOneAsync(newClient);
        }

        public async Task UpdateClientAsync(string id, User updatedClient)
        {
            await _clientCollection.ReplaceOneAsync(x => x.Id == id, updatedClient);
        }

        public async Task RemoveClientAsync(string id)
        {
            await _clientCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}

