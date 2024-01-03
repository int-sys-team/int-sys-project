using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstatesAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _clientService;
        private readonly PropertyService _propertyService;

        public ClientController(ClientService clientService, PropertyService propertyService)
        {
            _clientService = clientService;
            _propertyService = propertyService;
        }

        // Get:

        [HttpGet]
        [Route("GetAllClients")]
        public async Task<IActionResult> GetAllClients()
        { 
            var clients = await _clientService.GetAllClientsAsync();

            if (clients == null)
            {
                NotFound("No clients!");
            }

            return Ok(clients);
        }

        [HttpGet]
        [Route("GetClientById/{id:length(24)}")]
        public async Task<IActionResult> GetClientById(string id)
        {
            var client = await _clientService.GetClientByIdAsync(id);

            if (client is null)
            {
                return NotFound("Client not found!");
            }

            return Ok(client);
        }

        // Post:

        [HttpPost]
        [Route("AddClient")]
        public async Task<IActionResult> AddClient([FromBody] Person newClient)
        {
            if (newClient == null)
            {
                return BadRequest("Invalid data");
            }

            await _clientService.CreateClientAsync(newClient);

            return CreatedAtAction(nameof(GetClientById), new { id = newClient.Id }, newClient);
        }

        [HttpPost]
        [Route("AddWish/{idClient:length(24)}/{idProperty:length(24)}")]
        public async Task<IActionResult> AddWish(string idClient, string idProperty)
        {
            if (idClient is null || idProperty is null)
            {
                return BadRequest("Invalid data");
            }

            var client = await _clientService.GetClientByIdAsync(idClient);
            if (client is null)
            {
                return NotFound("Client not found!");
            }

            var property = await _propertyService.GetPropertyByIdAsync(idProperty);
            if (property is null)
            {
                return NotFound("Property not found!");
            }

            if (client.Wishes is null)
            {
                client.Wishes = new List<string>();
            }

            client.Wishes.Add(idProperty);

            await _clientService.UpdateClientAsync(idClient, client);

            return Ok(client);
        }

        // Put:

        [HttpPut]
        [Route("EditClient/{id:length(24)}")]
        public async Task<IActionResult> UpdateClient(string id, Person updatedClient)
        {
            var client = await _clientService.GetClientByIdAsync(id);

            if (client is null)
            {
                return NotFound("Client not found!");
            }

            updatedClient.Id = client.Id;

            await _clientService.UpdateClientAsync(id, updatedClient);

            return NoContent();
        }


        // Delete:

        [HttpDelete]
        [Route("DeleteClient/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var client = await _clientService.GetClientByIdAsync(id);

            if (client is null)
            {
                return NotFound("Client not found!");
            }

            await _clientService.RemoveClientAsync(id);

            return NoContent();
        }
    }
}
