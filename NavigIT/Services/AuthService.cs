using NavigIT.DTOs;
using NavigIT.Interfaces;
using NavigIT.Util;
using student_connect_server.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NavigIT.Services
{
    public class AuthService : IAuthService
    {
        public Task<BaseResponse<JwtResponseVM>> SignInWithFacebook(FacebookSignInVM model)
        {
            throw new NotImplementedException();
        }

        public Task<BaseResponse<JwtResponseVM>> SignInWithGoogle(GoogleSignInVM model)
        {
            throw new NotImplementedException();
        }
    }
}