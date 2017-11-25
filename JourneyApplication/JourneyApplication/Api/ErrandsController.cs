using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using JourneyApplication.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using iTextSharp.text.pdf;
using System.Web;
using iTextSharp.text;
using System.IO;

namespace JourneyApplication.Api
{
    public class ErrandsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        protected UserManager<ApplicationUser> UserManager { get; set; }

        public ErrandsController()
        {
            UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.db));
        }

        // GET: api/Errands
        public IHttpActionResult GetErrands()
        {
            var userId = User.Identity.GetUserId();
            var errands = db.Errands
                .Include(x => x.Vehicle)
                .Where(x => x.Vehicle.User.Id == userId)
                .ToList();
            return Ok(errands);
        }

        //GET: api/Errands-ongoing
        [Route("api/Errands-ongoing")]
        [HttpGet]
        public IHttpActionResult GetOngoingErrands()
        {
            var userId = User.Identity.GetUserId();
            var errands = db.Errands
                .Include(x => x.Vehicle)
                .Where(x => x.User.Id == userId
                && x.Done == false)
                .ToList();
            return Ok(errands);
        }


        [HttpPost]
        [Route("api/pdf/generate")]
        public IHttpActionResult GeneratePdf(GeneratePdf vm)
        {
            if (vm.VehicleId < 1)
            {
                return null;
            }

            var errands = db.Errands
                .Where(x => x.Vehicle.Id == vm.VehicleId
                && x.Added < vm.ToDate
                && x.Added > vm.FromDate)
                .ToList();


            PdfPTable table = new PdfPTable(7);
            table.WidthPercentage = 100;
            table.AddCell("StartAdress");
            table.AddCell("Destination");
            table.AddCell("Ankomst");
            table.AddCell("Anteckningar");
            table.AddCell("StartKm");
            table.AddCell("ArrivalKm");
            table.AddCell("Added");
            var printVar = "Fordon: " + errands[0].Vehicle.RegistrationNumber + "\n \n";

            foreach (var errand in errands)
            {
                table.AddCell(errand.StartAdress);
                table.AddCell(errand.Destination);
                table.AddCell(errand.Destination);
                table.AddCell(errand.Notes);
                table.AddCell(errand.StartKm.ToString());
                table.AddCell(errand.ArrivalKm.ToString());
                table.AddCell(errand.Added.ToLongDateString());
            }

            var guidUrl = "demo-" + Guid.NewGuid().ToString() + ".pdf";
            var savePath = HttpContext.Current.Request.PhysicalApplicationPath + "/PDF/" + guidUrl;
            using (Document doc = new Document(PageSize.A4))
            {
                using (PdfWriter writer = PdfWriter.GetInstance(doc, new FileStream(savePath, FileMode.Create)))
                {
                    doc.Open();
                    doc.Add(table);
                    doc.Close();
                }
            }


            return Ok("/PDF/" + guidUrl);
        }

        // GET: api/Errands/5
        [ResponseType(typeof(Errand))]
        public IHttpActionResult GetErrand(int id)
        {
            Errand errand = db.Errands.Find(id);
            if (errand == null)
            {
                return NotFound();
            }

            return Ok(errand);
        }

        // PUT: api/Errands/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutErrand(int id, Errand errand)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != errand.Id)
            {
                return BadRequest();
            }
            var vId = db.Vehicles.Find(errand.VehicleId);
            errand.Vehicle = vId;
            errand.Done = true;
            errand.ArrivalKm = errand.ArrivalKm;
            db.Entry(errand).State = EntityState.Modified;
           
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ErrandExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Errands
        [ResponseType(typeof(Errand))]
        public IHttpActionResult PostErrand(Errand errand)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var vehicle = db.Vehicles.Find(errand.VehicleId);
            errand.Vehicle = vehicle;
            if (vehicle == null)
            {
                return BadRequest("Fordonet finns ej!");
            }
            errand.DriveDate = DateTime.Now.AddDays(7);
            ApplicationUser user = UserManager.FindById(User.Identity.GetUserId());
            errand.User = user;
            errand.Added = DateTime.Now;

            //Return errand to false if input field is empty.
           if(errand.StartAdress == null
                || DateTime.Now <= errand.DriveDate)
            {
                errand.Done = false;
            }
            else
            {
                errand.Done = true;
            }

          
            db.Errands.Add(errand);
            db.Entry(errand.Vehicle).State = EntityState.Unchanged;
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = errand.Id }, errand);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ErrandExists(int id)
        {
            return db.Errands.Count(e => e.Id == id) > 0;
        }
    }
}