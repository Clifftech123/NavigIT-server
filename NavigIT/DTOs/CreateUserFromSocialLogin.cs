using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NavigIT.DTOs
{
    public class CreateUserFromSocialLogin
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ProfilePicture { get; set; }
        public string LoginProviderSubject { get; set; }

    }
}