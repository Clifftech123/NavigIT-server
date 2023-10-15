namespace student_connect_api.Models
{
    public class Post
    {
       public  int Id { get; set; }
        public  string Title { get; set; }
        public  string  Context { get; set; }
        public DateTime CreatedAt { get; set; }


     // Foreign Key
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        public List<Comment> Comments { get; set; }



    }
}
