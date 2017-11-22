using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace JourneyApplication.Models
{
    public class Errand
    {
        public int Id { get; set; }
        public string StartAdress { get; set; }
        public string Destination { get; set; }
        public string Matter { get; set; }
        public string Notes { get; set; }
        public int StartKm { get; set; }
        public int ArrivalKm { get; set; }
        public bool Done { get; set; }
        public DateTime Added { get; set; }
        public virtual Vehicle Vehicle { get; set; }
        public virtual ApplicationUser User { get; set; }
        public DateTime DriveDate { get; set; }

        [NotMapped]
        public int VehicleId { get; set; }
        public Errand()
        {

        }
    }
}