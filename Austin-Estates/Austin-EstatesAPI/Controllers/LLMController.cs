using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstatesAPI.Models;
using System.Text;
using System.Text.Json;
using System.Net.Http;
using EstatesAPI.Services;
using EstatesAPI.CustomExceptions;

namespace EstatesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LLMController : Controller
    {
        private readonly HttpClientService _httpClientService;

        public LLMController(HttpClientService httpClientService)
        {
            _httpClientService = httpClientService;
        }

        [HttpPost]
        [Route("GenerateDescription")]
        public async Task<IActionResult> GenerateDescription([FromBody] LLMInput data)
        {
            try
            {
                var response = await _httpClientService.GenerateDescription(data);

                 return Ok(response);
            }
            catch (CustomException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("PredictPrice")]
        public async Task<IActionResult> PredictPrice([FromBody] RealEstate realEstate)
        {
            try
            {
                var response = await _httpClientService.PredictPrice(realEstate);

                return Ok(response);
            }
            catch (CustomException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
