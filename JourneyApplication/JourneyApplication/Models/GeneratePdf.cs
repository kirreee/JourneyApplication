using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JourneyApplication.Models
{
    public class GeneratePdf
    {
        public int VehicleId { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }

        public GeneratePdf()
        {

        }
    }
}