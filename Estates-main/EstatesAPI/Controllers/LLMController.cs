using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EstatesAPI.Models;
using System.Text;
using System.Text.Json;


namespace EstatesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LLMController : Controller
    {
        private readonly HttpClient _httpClient;

        [ActivatorUtilitiesConstructor]
        public LLMController(HttpClient httpClient)
        {
            _httpClient = httpClient;
            //_httpClient.BaseAddress = new Uri("http://127.0.0.1:5000/apidocs");
        }

        [HttpPost]
        [Route("GenerateDescription")]
        public async Task<IActionResult> Get([FromBody] LLMInput data)
        {
            try
            {
                //string data = await _apiService.GetDataAsync();
                //return Ok(data);

                // Inicijalizacija HttpClient-a van using bloka
                // using (HttpClient httpClient = new HttpClient())
                //   {
                // Postavljanje difoltnog URL-a
                //httpClient.BaseAddress = new Uri("https://example.com/api/");

                // Postavljanje podataka koje želite poslati
                //var requestData = new
                //{
                //    key1 = "value1",
                //    key2 = "value2"
                //};

                // Serijalizacija podataka u JSON format
                // var jsonRequestData = JsonConvert.SerializeObject(data);
                var jsonRequestData = JsonSerializer.Serialize(data);

                // Kreiranje HttpRequestMessage
                using (var request = new HttpRequestMessage(HttpMethod.Post, "http://127.0.0.1:5000/apidocs/llm/description"))
                    {
                        // Postavljanje Content tipa na application/json
                        request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                        // Slanje zahteva
                        HttpResponseMessage response = await _httpClient.SendAsync(request);

                        // Provera da li je zahtev uspešan
                        if (response.IsSuccessStatusCode)
                        {
                            // Čitanje odgovora
                            string responseBody = await response.Content.ReadAsStringAsync();
                        //Console.WriteLine(responseBody);
                             return Ok(responseBody);
                        }
                        else
                        {
                            //Console.WriteLine($"Greška: {response.StatusCode}");
                            return BadRequest($"Greška: {response.StatusCode}");
                        }
                    }
               // }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
