using System.ComponentModel.DataAnnotations;
namespace student_connect_server.DTOs
{
    public class GoogleSignInVM
    {
        [Required]

       public string TokenId { get; set; }
        public object IdToken { get; internal set; }
    }
}
