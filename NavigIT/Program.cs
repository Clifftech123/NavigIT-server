

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NavigIT.Configuration;
using NavigIT.Configuration.context;
using NavigIT.Context;
using NavigIT.Entities;
using NavigIT.FacebookAuthentication;
using NavigIT.GoogleAuthentication;
using NavigIT.Interfaces;
using NavigIT.Services;
using student_connect_server.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// 

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
object value = builder.Services.AddSwaggerGen();
builder.Services.AddIdentity<User, Role>(options =>
{
    options.Password.RequiredLength = 8;

    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
    options.Lockout.MaxFailedAccessAttempts = 3;
    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<ApplicationDbContext>()
  .AddDefaultTokenProviders();

builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
{
    options.TokenLifespan = TimeSpan.FromHours(24);
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
});

builder.Services.AddTransient<DbContext, ApplicationDbContext>();
builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();
builder.Services.AddScoped<IFacebookAuthService, FacebookAuthService>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.Configure<GoogleAuthConfig>(builder.Configuration.GetSection("Google"));
builder.Services.Configure<FacebookAuthConfig>(builder.Configuration.GetSection("Facebook"));

builder.Services.AddHttpClient("Facebook", c =>
{
    c.BaseAddress = new Uri(builder.Configuration.GetValue<string>("Facebook:BaseUrl"));
});

var jwtSection = builder.Configuration.GetSection("JWT");
builder.Services.Configure<Jwt>(jwtSection);

var appSettings = jwtSection.Get<Jwt>();
var secret = Encoding.ASCII.GetBytes(appSettings.Secret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(o =>
{
    o.RequireHttpsMetadata = true;
    o.SaveToken = true;
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = appSettings.ValidIssuer,
        ValidAudience = appSettings.ValidAudience,
        ValidateIssuerSigningKey = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        RequireExpirationTime = true,
        IssuerSigningKey = new SymmetricSecurityKey(secret)
    };

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
