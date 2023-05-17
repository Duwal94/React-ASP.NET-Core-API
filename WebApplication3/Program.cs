using Microsoft.EntityFrameworkCore;
using WebApplication3.Controllers;
using WebApplication3.Data;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
        });

});

builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddDbContext<AppDBContext>(options => options.UseInMemoryDatabase("ContactsDb"));
builder.Services.AddDbContext<AppDBContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("ContactsApiConnectionString")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");
app.UseAuthorization();
app.MapControllers();



app.Run();


