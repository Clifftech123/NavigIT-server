using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using NavigIT.Context;
using NavigIT.Entities;
using NavigIT.Util;
using student_connect_server.Configuration;
using student_connect_server.DTOs;

namespace NavigIT.GoogleAuthentication
{
    public class GoogleAuthService : IGoogleAuthService
    {

        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;

        private readonly GoogleAuthConfig _googleAuthConfig;
        private readonly ILogger<GoogleAuthService> _logger;


//  create a constructor that takes in the following parameters:
       public GoogleAuthService(
              UserManager<User> userManager,
              ApplicationDbContext context,
              IOptions<GoogleAuthConfig> googleAuthConfig,
              ILogger<GoogleAuthService> logger
              )
         {
                _userManager = userManager;
                _context = context;
                _googleAuthConfig = googleAuthConfig.Value;
                _logger = logger;
         }

         public async Task<BaseResponse<User>> GooleSignIn(GoogleSignInVM model)
         {
             try
             {
                 var payload = await GoogleJsonWebSignature.ValidateAsync(model.IdToken, new GoogleJsonWebSignature.ValidationSettings()
                 {
                     Audience = new List<string>() { _googleAuthConfig.ClientId }
                 });

                 var user = await _userManager.FindByEmailAsync(payload.Email);

                 if (user == null)
                 {
                     user = new User()
                     {
                         Email = payload.Email,
                         UserName = payload.Email,
                         FirstName = payload.GivenName,
                         LastName = payload.FamilyName,
                         EmailConfirmed = true
                     };

                     var result = await _userManager.CreateAsync(user);

                     if (!result.Succeeded)
                     {
                         return new BaseResponse<User>("An error occured while creating the user", result.Errors.Select(e => e.Description).ToList());
                     }
                 }

                 return new BaseResponse<User>(user);
             }
             catch (Exception ex)
             {
                 _logger.LogError(ex, "An error occurred while signing in with Google");
                 return new BaseResponse<User>("An error occurred while signing in with Google");
             }
         }

        
    }
}