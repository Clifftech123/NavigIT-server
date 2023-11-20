namespace ExternalAuthProviders
{
    public static class FacebookAuthentication
    {
        public static void AddFacebookAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<FacebookAuthConfig>(configuration.GetSection("Facebook"));

            services.AddHttpClient("Facebook", c =>
            {
                c.BaseAddress = new Uri(configuration.GetValue<string>("Facebook:BaseUrl"));
            });
        }
    }
}