using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EstatesAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _clientService;
        private readonly PropertyService _propertyService;
        private readonly CurrentUserService _currentUserService;
        private readonly IConfiguration _config;

        public ClientController(ClientService clientService, PropertyService propertyService, CurrentUserService currentUserService, IConfiguration config)
        {
            _clientService = clientService;
            _propertyService = propertyService;
            _currentUserService = currentUserService;
            _config = config;
        }

        //Registration

        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult> Register([FromBody] Person user)
        {
            var userExist = Authenticate(user.Email);

            if (userExist != null)
                return BadRequest("User with that email already exists");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

            user.Password = hashedPassword;
            user.IsLoggedIn = true;
            await _clientService.CreateClientAsync(user);

            var token = Generate(user);

            return CreatedAtAction(
                nameof(GetClientById),
                new { id = user.Id },
                new { user = user, token = token }
                );
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("LogIn")]
        public async Task<ActionResult> LogIn([FromBody] UserLogIn userLogIn)
        {
            var user = Authenticate(userLogIn.Email);

            if (user == null)
                return NotFound("User not found");

            var validPassword = BCrypt.Net.BCrypt.Verify(userLogIn.Password, user.Password);
            if (!validPassword)
                return BadRequest("Not valid password!");

            user.IsLoggedIn = true;
            await _clientService.UpdateClientAsync(user.Id, user);

            var token = Generate(user);

            return Ok(new
            {
                user = user,
                token = token
            });
        }

        [HttpPost]
        [Route("LogOut")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<ActionResult> LogOut()
        {
            var currentUserId = _currentUserService.GetCurrentUserId();

            var client = await _clientService.GetClientByIdAsync(currentUserId);
            if (client is null)
            {
                return NotFound("Client not found!");
            }

            client.IsLoggedIn = false;
            await _clientService.UpdateClientAsync(currentUserId, client);

            return NoContent();
        }


        // Get:

        [HttpGet]
        [Route("GetAllClients")]
        [Authorize(Roles = "Administrator,User")]
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
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> GetClientById(string id)
        {
            var client = await _clientService.GetClientByIdAsync(id);

            if (client is null)
            {
                return NotFound("Client not found!");
            }

            return Ok(client);
        }

        [HttpGet]
        [Route("GetWishes")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> GetWishes()
        {
            var currentUserId = _currentUserService.GetCurrentUserId();

            var client = await _clientService.GetClientByIdAsync(currentUserId);
            if (client is null)
            {
                return NotFound("Client not found!");
            }

            var wishes = new List<Property>();
            foreach (var wish in client.Wishes)
            {
                var property = await _propertyService.GetPropertyByIdAsync(wish);
                if (property != null)
                {
                    wishes.Add(property);
                }
            }

            return Ok(new
            {
                wishes = wishes
            });
        }

        // Post:

        //[HttpPost]
        //[Route("AddClient")]
        //[Authorize(Roles = "Administrator")]
        //public async Task<IActionResult> AddClient([FromBody] Person newClient)
        //{
        //    if (newClient == null)
        //    {
        //        return BadRequest("Invalid data");
        //    }

        //    await _clientService.CreateClientAsync(newClient);

        //    return CreatedAtAction(nameof(GetClientById), new { id = newClient.Id }, newClient);
        //}

        [HttpPost]
        [Route("AddWish/{idProperty:length(24)}")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> AddWish(string idProperty)
        {

            if (idProperty is null)
            {
                return BadRequest("Invalid data");
            }

            var currentUserId = _currentUserService.GetCurrentUserId();

            var client = await _clientService.GetClientByIdAsync(currentUserId);
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

            await _clientService.UpdateClientAsync(currentUserId, client);

            return Ok(client);
        }

        [HttpPost]
        [Route("RemoveWish/{idProperty:length(24)}")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> RemoveWish(string idProperty)
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

            if (client.Wishes is null || client.Wishes.Count == 0)
            {
                return BadRequest("There's no wishes!");
            }

            client.Wishes.Remove(idProperty);

            await _clientService.UpdateClientAsync(currentUserId, client);

            return Ok(client);
        }

        // Put:

        [HttpPut]
        [Route("EditClient")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> UpdateClient(Person updatedClient)
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var client = await _clientService.GetClientByIdAsync(currentUserId);
            if (client is null && !client.Role.Equals("Administrator"))
            {
                return NotFound("Client not found!");
            }

            updatedClient.Id = client.Id;

            await _clientService.UpdateClientAsync(currentUserId, updatedClient);

            return NoContent();
        }


        // Delete:

        [HttpDelete]
        [Route("DeleteClient/{id:length(24)}")]
        [Authorize(Roles = "Administrator")]
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

        //private

        private Person Authenticate(string email)
        {
            var client =  _clientService.GetClientByEmail(email);

            return client;
        }

        private string Generate(Person user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                   new Claim(ClaimTypes.NameIdentifier, user.Id),
                   new Claim(ClaimTypes.Email, user.Email),
                   new Claim(ClaimTypes.GivenName, user.FirstName),
                   new Claim(ClaimTypes.Surname, user.LastName),
                   new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
