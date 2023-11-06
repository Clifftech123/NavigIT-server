using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NavigIT.Configuration
{
    public class FacebookAuthConfig
    {
        public string TokenValidationUrl { get; set; }
        public string UserInfoUrl { get; set; }
        public string AppId { get; set; }
        public string AppSecret { get; set; }

    }
}