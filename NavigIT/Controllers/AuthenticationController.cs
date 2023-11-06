using Microsoft.AspNetCore.Mvc;
using NavigIT.Services;
using NavigIT.Util;
using student_connect_server.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NavigIT.Controllers
{
    public class AuthenticationController : BaseController
    {
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
        public async Task<IActionResult> GoogleSignIn(GoogleSignInVM model)
        {
            try
            {
                return ReturnResponse(await _authService.SignInWithGoogle(model));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


    }
}