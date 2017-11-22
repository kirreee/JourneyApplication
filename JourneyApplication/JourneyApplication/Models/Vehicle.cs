using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JourneyApplication.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string RegistrationNumber { get; set; }
        public bool Active { get; set; }
        public bool Default { get; set; }

        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
    }
}