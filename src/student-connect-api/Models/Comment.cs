namespace student_connect_api.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

        // Foreign key and navigation property for UserProfile
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        // Foreign key and navigation property for Post
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
