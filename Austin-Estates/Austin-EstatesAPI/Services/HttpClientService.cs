using EstatesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using EstatesAPI.CustomExceptions;
using Microsoft.Extensions.Options;

namespace EstatesAPI.Services
{
    public class HttpClientService
    {
        private readonly HttpClient _httpClient;
        public HttpClientService(HttpClient httpClient, IOptions<ApiUrls> apiUrlsOptions)
        {
            _httpClient = httpClient;

            _httpClient.BaseAddress = new Uri(apiUrlsOptions.Value.LLMApiUrl);
        }

        public async Task<RealEstateDescriptionApiModel> GenerateDescription(LLMInput data)
        {
            try
            {
                var jsonRequestData = JsonSerializer.Serialize(data);

                using (var request = new HttpRequestMessage(HttpMethod.Post, "/llm/description"))
                {
                    request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await _httpClient.SendAsync(request);

                    var responseBodyDeserialized = new RealEstateDescriptionApiModel();

                    if (response.IsSuccessStatusCode)
                    {
                        string responseBody = await response.Content.ReadAsStringAsync();

                        responseBodyDeserialized = JsonSerializer.Deserialize<RealEstateDescriptionApiModel>(responseBody);
                    }
                    else
                    {
                        throw new CustomException($"An error occurred while generating description: {response.StatusCode}");
                    }

                    return responseBodyDeserialized;
                }
            }
            catch (Exception ex)
            {
                throw new CustomException(ex.Message);
            }
        }

        public async Task<RealEstatePriceApiModel> PredictPrice(RealEstate realEstate)
        {
            try
            {
                RealEstateApiModel realEstateApiModel = new RealEstateApiModel();
                realEstateApiModel.data = realEstate;

                var jsonRequestData = JsonSerializer.Serialize(realEstateApiModel);

                using (var request = new HttpRequestMessage(HttpMethod.Post, "/price"))
                {
                    request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await _httpClient.SendAsync(request);

                    var responseBodyDeserialized = new RealEstatePriceApiModel();

                    if (response.IsSuccessStatusCode)
                    {
                        string responseBody = await response.Content.ReadAsStringAsync();

                        responseBodyDeserialized = JsonSerializer.Deserialize<RealEstatePriceApiModel>(responseBody);
                    }
                    else
                    {
                        throw new CustomException($"An error occurred while predicting price: {response.StatusCode}");
                    }

                    return responseBodyDeserialized; 
                }
            }
            catch (Exception ex)
            {
                throw new CustomException(ex.Message);
            }
        }
    }
}
