using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JourneyApplication.Controllers
{
    public class HomeController : Controller
    {

        //[Authorize]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AdminSupport()
        {
            return View();
        }

        public ActionResult UserSupport()
        {
            return View();
        }
    }
}