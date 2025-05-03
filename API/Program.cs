using API.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddDbContext<API.Data.StoreContext>(options => 

    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")
    ));
builder.Services.AddCors();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(Options =>

{
    Options.AddDefaultPolicy(
        policy=>
        {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline
app.UseMiddleware<ExceptionMiddleware>();

{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt =>
{
   opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000"); 
});

app.UseCors();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run(); 