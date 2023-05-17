using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using WebApplication3.Data;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly AppDBContext dbContext;

        public ContactsController(AppDBContext dbContext)
        {

            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            return Ok(await dbContext.Contacts.ToListAsync());

        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetSinContact([FromRoute] Guid id) {
            var contact = await dbContext.Contacts.FindAsync(id);
            if(contact == null) { return NotFound(); }
            else { return Ok(contact); }
        }
        
        [HttpPost]
        public async Task<IActionResult> AddContact(ADDContactrequest addContactRequest) {

            var contact = new Contact()
            {

                Id = Guid.NewGuid(),
                Address = addContactRequest.Address,
                Email = addContactRequest.Email,
                Name = addContactRequest.Name,
                Phone = addContactRequest.Phone,
                City = addContactRequest.City,
                Region = addContactRequest.Region,
            };

            await dbContext.Contacts.AddAsync(contact);
            await dbContext.SaveChangesAsync();

            return Ok(contact);
        }

        
        
        
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, UpdateContactrequest updateContactrequest) { 

            var contact =await dbContext.Contacts.FindAsync(id);

            if (contact != null)
            {
                contact.Name = updateContactrequest.Name;
                contact.Phone = updateContactrequest.Phone; 
                contact.City = updateContactrequest.City;
                contact.Region = updateContactrequest.Region;
                contact.Email = updateContactrequest.Email;


                await dbContext.SaveChangesAsync();
                return Ok(contact);
            }
            return NotFound();
            
        }


        [HttpDelete]
        [Route("{id:Guid}")]

        public async Task<IActionResult> DeleteContact([FromRoute] Guid id) {

            var contact = await dbContext.Contacts.FindAsync(id);
            if (contact != null) { 
                dbContext.Contacts.Remove(contact);
                dbContext.SaveChanges();
                return Ok(contact);
            }
            return NotFound();
        }

    }
}
