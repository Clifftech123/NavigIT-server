using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NavigIT.Util;

namespace NavigIT.FacebookAuthentication
{
    public interface IFacebookAuthService
    {
       Task<BaseResponse<FacebookTokenValidationResponse>> ValidateFacebookToken(string accessToken);
        Task<BaseResponse<FacebookUserInfoResponse>> GetFacebookUserInformation(string accessToken);
    }
}