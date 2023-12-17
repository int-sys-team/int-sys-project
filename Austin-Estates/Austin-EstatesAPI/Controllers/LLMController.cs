using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstatesAPI.Models;
using System.Text;
using System.Text.Json;
using System.Net.Http;

namespace EstatesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LLMController : Controller
    {
        private readonly HttpClient _httpClient;

        public LLMController(HttpClient httpClient)
        {
            _httpClient = httpClient;
            //_httpClient.BaseAddress = new Uri("http://127.0.0.1:5000/apidocs");
        }

        [HttpPost]
        [Route("GenerateDescription")]
        public async Task<IActionResult> GenerateDescription([FromBody] LLMInput data)
        {
            try
            {
                
                _httpClient.BaseAddress = new Uri("http://127.0.0.1:5000/apidocs");

                var jsonRequestData = JsonSerializer.Serialize(data);

                using (var request = new HttpRequestMessage(HttpMethod.Post, "/llm/description"))
                {
                    request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await _httpClient.SendAsync(request);

                    if (response.IsSuccessStatusCode)
                    {

                        string responseBody = await response.Content.ReadAsStringAsync();

                        var responseBodyDeserialized = JsonSerializer.Deserialize<RealEstateDescriptionApiModel>(responseBody);
                    
                        return Ok(responseBodyDeserialized);
                    }
                    else
                    {
                        return BadRequest($"Greška: {response.StatusCode}");
                    }
                }
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

                _httpClient.BaseAddress = new Uri("http://127.0.0.1:5000/apidocs");

                RealEstateApiModel realEstateApiModel = new RealEstateApiModel();
                realEstateApiModel.data = realEstate;

                var jsonRequestData = JsonSerializer.Serialize(realEstateApiModel);

                using (var request = new HttpRequestMessage(HttpMethod.Post, "/price"))
                {
                    request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await _httpClient.SendAsync(request);

                    if (response.IsSuccessStatusCode)
                    {

                        string responseBody = await response.Content.ReadAsStringAsync();

                        var responseBodyDeserialized = JsonSerializer.Deserialize<RealEstatePriceApiModel>(responseBody);

                        return Ok(responseBodyDeserialized);
                    }
                    else
                    {
                        return BadRequest($"Greška: {response.StatusCode}");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
