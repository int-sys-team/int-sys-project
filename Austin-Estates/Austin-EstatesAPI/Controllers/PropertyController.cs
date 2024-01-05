using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Authorization;
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
        private readonly CurrentUserService _currentUserService;

        public PropertyController(PropertyService propertyService, ClientService clientService, CurrentUserService currentUserService)
        {
            _propertyService = propertyService;
            _clientService = clientService;
            _currentUserService = currentUserService;
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
        [Route("AddProperty")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> AddProperty([FromBody] Property newProperty)
        {
            if (newProperty == null)
            {
                return BadRequest("Invalid data");
            }

            var currentUserId = _currentUserService.GetCurrentUserId();
            var client = await _clientService.GetClientByIdAsync(currentUserId);
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
            await _clientService.UpdateClientAsync(currentUserId, client);

            return CreatedAtAction(nameof(GetPropertyById), new { id = newProperty._id }, newProperty);
        }

        // Put:

        [HttpPut]
        [Route("EditProperty/{idProperty:length(24)}")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> EditProperty(string idProperty, [FromBody] Property updatedProperty)
        {
            if (idProperty is null)
            {
                return BadRequest("Invalid data");
            }

            var property = await _propertyService.GetPropertyByIdAsync(idProperty);
            if (property is null)
            {
                return NotFound("Property not found!");
            }

            var currentUserId = _currentUserService.GetCurrentUserId();
            var client = await _clientService.GetClientByIdAsync(currentUserId);
            if (client is null)
            {
                return NotFound("Client not found!");
            }
            var clientProperty = client.Properties.Find(p => p._id == property._id);
            if (clientProperty is null && !client.Role.Equals("Administrator"))
            {
                return BadRequest("You are not allowed to edit this property!");
            }

            updatedProperty._id = property._id;

            await _propertyService.UpdatePropertyAsync(idProperty, updatedProperty);

            return NoContent();
        }

        // Delete:

        [HttpDelete]
        [Route("DeleteProperty/{idProperty:length(24)}")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> DeleteProperty(string idProperty)
        {

            if (idProperty is null)
            {
                return BadRequest("Invalid data");
            }

            var property = await _propertyService.GetPropertyByIdAsync(idProperty);
            if (property is null)
            {
                return NotFound("Property not found!");
            }

            var currentUserId = _currentUserService.GetCurrentUserId();
            var client = await _clientService.GetClientByIdAsync(currentUserId);
            if (client is null)
            {
                return NotFound("Client not found!");
            }

            var clientProperty = client.Properties.Find(p => p._id == property._id);
            if (clientProperty is null && !client.Role.Equals("Administrator"))
            {
                return BadRequest("You are not allowed to delete this property!");
            }

            if (clientProperty != null)
            {
                client.Properties.Remove(clientProperty);
            }
            
            await _propertyService.RemovePropertyAsync(idProperty);
            await _clientService.UpdateClientAsync(currentUserId, client);

            return NoContent();
        }
    }
}
