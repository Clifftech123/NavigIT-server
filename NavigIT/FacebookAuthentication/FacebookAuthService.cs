// Importing necessary libraries
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using log4net;
using NavigIT.Configuration;
using System.Net.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using NavigIT.Util;
using System.Text.Json.Serialization;

// Defining the namespace for Facebook Authentication
namespace NavigIT.FacebookAuthentication
{
    // FacebookAuthService class implementing the IFacebookAuthService interface
    public class FacebookAuthService : IFacebookAuthService
    {
        // Private variables for HttpClient, FacebookAuthConfig, and Logger
        private readonly HttpClient _httpClient;
        private readonly FacebookAuthConfig _facebookAuthConfig;
        private readonly ILog _logger;

        // Constructor for FacebookAuthService
        public FacebookAuthService(
            IHttpClientFactory httpClientFactory, 
            IConfiguration configuration, 
            IOptions<FacebookAuthConfig> facebookAuthConfig)
        {
            // Initializing HttpClient, FacebookAuthConfig, and Logger
            _httpClient = httpClientFactory.CreateClient("Facebook");
            _facebookAuthConfig = facebookAuthConfig.Value;
            _logger = LogManager.GetLogger(typeof(FacebookAuthService));
        }

        // Method to validate Facebook token
        public async Task<BaseResponse<FacebookTokenValidationResponse>> ValidateFacebookToken(string accessToken)
        {
            // Constructing the URL for token validation
            string tokenValidationUrl = _facebookAuthConfig.TokenValidationUrl;
            string url = $"{tokenValidationUrl}{accessToken}{_facebookAuthConfig.AppId}{_facebookAuthConfig.AppSecret}";

            HttpResponseMessage response;
            try
            {
                // Sending GET request to the URL
                response = await _httpClient.GetAsync(url);
            }
            catch (HttpRequestException ex)
            {
                // Logging any exceptions that occur during the request
                _logger.Error(ex.StackTrace, ex);
                return new BaseResponse<FacebookTokenValidationResponse>(null, "Failed to get response due to network error");
            }

            // Checking if the response was successful
            if (!response.IsSuccessStatusCode)
            {
                return new BaseResponse<FacebookTokenValidationResponse>(null, "Failed to get response");
            }

            // Reading the response content
            string responseAsString = await response.Content.ReadAsStringAsync();
            // Deserializing the response content
           FacebookTokenValidationResponse tokenValidationResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<FacebookTokenValidationResponse>(responseAsString);

            // Returning the response
            return new BaseResponse<FacebookTokenValidationResponse>(tokenValidationResponse);
        }

        // Method to get Facebook user information
        public async Task<BaseResponse<FacebookUserInfoResponse>> GetFacebookUserInformation(string accessToken) 
        {
            // Constructing the URL for getting user information
            string userInfoUrl = _facebookAuthConfig.UserInfoUrl;
            string url = $"{userInfoUrl}{accessToken}";

            HttpResponseMessage response;
            try
            {
                // Sending GET request to the URL
                response = await _httpClient.GetAsync(url);
            }
            catch (HttpRequestException ex)
            {
                // Logging any exceptions that occur during the request
                _logger.Error(ex.StackTrace, ex);
                return new BaseResponse<FacebookUserInfoResponse>(null, "Failed to get response due to network error");
            }

            // Checking if the response was successful
            if (!response.IsSuccessStatusCode)
            {
                return new BaseResponse<FacebookUserInfoResponse>(null, "Failed to get response");
            }

            // Reading the response content
            string responseAsString = await response.Content.ReadAsStringAsync();
            // Deserializing the response content
           FacebookUserInfoResponse userInfoResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<FacebookUserInfoResponse>(responseAsString);

            // Returning the response
            return new BaseResponse<FacebookUserInfoResponse>(userInfoResponse);
        }
    }
}