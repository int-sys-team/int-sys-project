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
using Microsoft.AspNetCore.Authorization;

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

        [HttpGet]
        [Route("GetProperties/{page}/{count}")]
        public async Task<IActionResult> GetProperties(int page, int count)
        {
            try
            {
                var response = await _httpClientService.GetProperties(page, count);

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
        [Route("CompareTwoProperties")]
        //[Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> CompareTwoProperties([FromBody] Compare data)
        {
            try
            {
                var response = await _httpClientService.CompareTwoProperties(data);

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
        [Route("GenerateDescription")]
        //[Authorize(Roles = "Administrator,User")]
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
        [Route("GetPropertiesBasedOnQuery")]
        //[Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> GetPropertiesBasedOnQuery([FromBody] Query data)
        {
            try
            {
                var response = await _httpClientService.GetPropertiesBasedOnQuery(data);

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
        //[Authorize(Roles = "Administrator,User")]
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

        [HttpPost]
        [Route("GetSimilarProperties")]
        //[Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> GetSimilarProperties([FromBody] SimilarPropertyInput id)
        {
            try
            {
                var response = await _httpClientService.GetSimilarProperties(id);

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
