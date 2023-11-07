using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NavigIT.DTOs
{
    public class FacebookSignInVM
    {
        
     [ Required ]
     public string AccessToken { get; set; }    
    }
}