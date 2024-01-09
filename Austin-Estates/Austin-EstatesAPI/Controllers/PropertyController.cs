using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
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

        [HttpGet]
        [Route("GetPropertiesOrderedByPrice/{page}/{count}")]
        public async Task<IActionResult> GetPropertiesOrderedByPrice(int page, int count)
        {
            if (page < 1 || count < 0)
            {
                return BadRequest("Invalid data");
            }

            var properties = await _propertyService.GetPropertiesOrderedByPriceAsync(page, count);

            if (properties is null)
            {
                return NotFound();
            }

            return Ok(properties);
        }

        [HttpGet]
        [Route("GetPropertiesOrderedByLatestSaleDate/{page}/{count}")]
        public async Task<IActionResult> GetPropertiesOrderedByLatestSaleDate(int page, int count)
        {
            if (page < 1 || count < 0)
            {
                return BadRequest("Invalid data");
            }

            var properties = await _propertyService.GetPropertiesOrderedByLatestSaleDateAsync(page, count);

            if (properties is null)
            {
                return NotFound();
            }

            return Ok(properties);
        }

        [HttpGet]
        [Route("FilterProperties")]
        public async Task<IActionResult> FilterProperties([FromQuery] int? zipcode, [FromQuery] int? startYearBuilt, [FromQuery] int? endYearBuilt, [FromQuery] double? startPrice, [FromQuery] double? endPrice)
        {
            if (zipcode.HasValue && zipcode < 0)
            {
                return BadRequest("Invalid zipcode!");
            }

            if (startPrice.HasValue && endPrice.HasValue)
            {
                if ( startPrice  < 0 || endPrice < 0)
                {
                    return BadRequest("Invalid price!");
                }

                if (startPrice > endPrice)
                {
                    return BadRequest("End price can't be less that start price!");
                }
            }

            if (startYearBuilt.HasValue && endYearBuilt.HasValue)
            {
                if (startYearBuilt <= 0 || endYearBuilt <= 0)
                {
                    return BadRequest("Invalid build year!");
                }

                if (startYearBuilt > endYearBuilt)
                {
                    return BadRequest("End build year can't be less that start build year!");
                }
            }

            var properties = await _propertyService.FilterProperties(zipcode, startYearBuilt, endYearBuilt, startPrice, endPrice);

            if (properties is null)
            {
                return NotFound();
            }

            return Ok(properties);
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
