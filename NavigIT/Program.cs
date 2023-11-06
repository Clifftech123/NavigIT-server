

using NavigIT.Configuration;
using NavigIT.FacebookAuthentication;
using NavigIT.GoogleAuthentication;
using student_connect_server.Configuration;

var builder = WebApplication.CreateBuilder(args);
// 

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
object value = builder.Services.AddSwaggerGen();


//  Register  GoofleAuthService and GoogleAuthConfig
builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();
builder.Services.Configure<GoogleAuthConfig>(builder.Configuration.GetSection("Google"));

// Register FacebookAuthService and FacebookAuthConfig
builder.Services.AddScoped<IFacebookAuthService, FacebookAuthService>();
builder.Services.Configure<FacebookAuthConfig>(builder.Configuration.GetSection("Facebook"));
//Using Named Client
builder.Services.AddHttpClient("Facebook", c =>
{
   c.BaseAddress = new Uri(builder.Configuration.GetValue<string>("Facebook:BaseUrl"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
