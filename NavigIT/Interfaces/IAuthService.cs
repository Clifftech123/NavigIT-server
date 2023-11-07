using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NavigIT.DTOs;
using NavigIT.Util;
using student_connect_server.DTOs;

namespace NavigIT.Interfaces
{
    public interface IAuthService
    {
         Task<BaseResponse<JwtResponseVM>> SignInWithGoogle(GoogleSignInVM model);
      Task<BaseResponse<JwtResponseVM>> SignInWithFacebook(FacebookSignInVM model);
    }
}