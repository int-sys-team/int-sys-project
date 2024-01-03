﻿using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EstatesAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyService _propertyService;
        private readonly ClientService _clientService;

        public PropertyController(PropertyService propertyService, ClientService clientService)
        {
            _propertyService = propertyService;
            _clientService = clientService;
        }

        // Get:

        [HttpGet]
        [Route("GetAllProperties")]
        public async Task<IActionResult> GetAllPropertiesAsync()
        {
            var properties = await _propertyService.GetAllPropertiesAsync();
           
            if (properties == null)
            {
                return NotFound();
            }

            return Ok(properties);
        }

        [HttpGet]
        [Route("GetPropertyById/{id:length(24)}")]
        public async Task<IActionResult> GetPropertyById(string id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);

            if (property is null)
            {
                return NotFound();
            }

            return Ok(property);
        }

        // Post:

        [HttpPost]
        [Route("AddProperty/{idClient:length(24)}")]
        public async Task<IActionResult> AddProperty([FromBody] Property newProperty, string idClient)
        {
            if (newProperty == null)
            {
                return BadRequest("Invalid data");
            }

            var client = await _clientService.GetClientByIdAsync(idClient);

            if (client is null)
            {
                return NotFound("Client not found!");
            }

            if (client.Properties is null)
            {
                client.Properties = new List<Property>();
            }

            client.Properties.Add(newProperty);

            await _propertyService.AddPropertyAsync(newProperty);
            await _clientService.UpdateClientAsync(idClient, client);

            return CreatedAtAction(nameof(GetPropertyById), new { id = newProperty._id }, newProperty);
        }

        // Put:

        [HttpPut]
        [Route("EditProperty/{id:length(24)}")]
        public async Task<IActionResult> EditProperty(string id, [FromBody] Property updatedProperty)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property is null)
            {
                return NotFound("Property not found!");
            }

            updatedProperty._id = property._id;

            await _propertyService.UpdatePropertyAsync(id, updatedProperty);

            return NoContent();
        }

        // Delete:

        [HttpDelete]
        [Route("DeleteProperty/{idProperty:length(24)}/{idClient:length(24)}")]
        public async Task<IActionResult> DeleteProperty(string idProperty, string idClient)
        {
            var property = await _propertyService.GetPropertyByIdAsync(idProperty);
            if (property is null)
            {
                return NotFound("Property not found!");
            }

            var client = await _clientService.GetClientByIdAsync(idClient);
            if (client is null)
            {
                return NotFound("Client not found!");
            }

            var clientProperty = client.Properties.Find(p => p._id == property._id);
            if (clientProperty != null)
            {
                client.Properties.Remove(clientProperty);
            }

            await _propertyService.RemovePropertyAsync(idProperty);
            await _clientService.UpdateClientAsync(idClient, client);

            return NoContent();
        }
    }
}
