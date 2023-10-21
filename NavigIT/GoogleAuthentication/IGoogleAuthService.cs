using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NavigIT.Entities;
using NavigIT.Util;
using student_connect_server.DTOs;

namespace NavigIT.GoogleAuthentication
{
    public interface IGoogleAuthService
    {
      Task <BaseResponse<User>> GoogleSignIn(GoogleSignInVM model);
    }
}