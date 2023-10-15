namespace student_connect_api.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string EducationalBackground { get; set; }
        public List<string> Interests { get; set; }

        // Navigation properties
        public List<Post> Posts { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
