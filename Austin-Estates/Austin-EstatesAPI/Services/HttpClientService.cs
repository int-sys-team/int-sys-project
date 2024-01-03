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

        public async Task<Properties> GetProperties(int page, int count)
        {
            try
            {

                string responseBody = string.Empty;
                var responseBodyDeserialized = new Properties();

                var url = $"/db/properties?page={page}&count={count}";

                HttpResponseMessage response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    responseBody = await response.Content.ReadAsStringAsync();

                    responseBodyDeserialized = JsonSerializer.Deserialize<Properties>(responseBody);
                }
                else
                {
                    throw new CustomException($"An error occurred while getting properties: {response.StatusCode}");
                }

                return responseBodyDeserialized;
            }
            catch (Exception ex)
            {
                throw new CustomException(ex.Message);
            }
        }

        public async Task<string> CompareTwoProperties(Compare data)
        {
            try
            {
                var jsonRequestData = JsonSerializer.Serialize(data);

                using (var request = new HttpRequestMessage(HttpMethod.Post, "/llm/compare"))
                {
                    request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await _httpClient.SendAsync(request);

                    string responseBody = string.Empty;

                    if (response.IsSuccessStatusCode)
                    {
                        responseBody = await response.Content.ReadAsStringAsync();

                        if (data.stream == false)
                        {
                            var responseBodyDeserialized = new CompareResponseApiModel();

                            responseBodyDeserialized = JsonSerializer.Deserialize<CompareResponseApiModel>(responseBody);

                            responseBody = responseBodyDeserialized.response;
                        }
                    }
                    else
                    {
                        throw new CustomException($"An error occurred while comparing two properties: {response.StatusCode}");
                    }

                    return responseBody;
                }
            }
            catch (Exception ex)
            {
                throw new CustomException(ex.Message);
            }
        }


        public async Task<string> GenerateDescription(LLMInput data)
        {
            try
            {
                var jsonRequestData = JsonSerializer.Serialize(data);

                using (var request = new HttpRequestMessage(HttpMethod.Post, "/llm/description"))
                {
                    request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await _httpClient.SendAsync(request);

                    string responseBody = string.Empty;

                    if (response.IsSuccessStatusCode)
                    {
                        responseBody = await response.Content.ReadAsStringAsync();

                        if (data.stream == false)
                        {
                            var responseBodyDeserialized = new RealEstateDescriptionApiModel();

                            responseBodyDeserialized = JsonSerializer.Deserialize<RealEstateDescriptionApiModel>(responseBody);

                            responseBody = responseBodyDeserialized.description;
                        }
                    }
                    else
                    {
                        throw new CustomException($"An error occurred while generating description: {response.StatusCode}");
                    }

                    return responseBody;
                }
            }
            catch (Exception ex)
            {
                throw new CustomException(ex.Message);
            }
        }

        public async Task<Properties> GetPropertiesBasedOnQuery(Query data)
        {
            try
            {
                var jsonRequestData = JsonSerializer.Serialize(data);

                using (var request = new HttpRequestMessage(HttpMethod.Post, "/llm/properties"))
                {
                    request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await _httpClient.SendAsync(request);

                    string responseBody = string.Empty;
                    
                    var responseBodyDeserialized = new Properties();

                    if (response.IsSuccessStatusCode)
                    {
                        responseBody = await response.Content.ReadAsStringAsync();

                        responseBodyDeserialized = JsonSerializer.Deserialize<Properties>(responseBody); 
                    }
                    else
                    {
                        throw new CustomException($"An error occurred while getting properties based on query: {response.StatusCode}");
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

        public async Task<SimilarPropertyApiModel> GetSimilarProperties(SimilarPropertyInput id)
        {
            try
            {

                var jsonRequestData = JsonSerializer.Serialize(id);

                using (var request = new HttpRequestMessage(HttpMethod.Post, "/similar"))
                {
                    request.Content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await _httpClient.SendAsync(request);

                    var responseBodyDeserialized = new SimilarPropertyApiModel();

                    if (response.IsSuccessStatusCode)
                    {
                        string responseBody = await response.Content.ReadAsStringAsync();

                        responseBodyDeserialized = JsonSerializer.Deserialize<SimilarPropertyApiModel>(responseBody);
                    }
                    else
                    {
                        throw new CustomException($"An error occurred while getting similar properties: {response.StatusCode}");
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
