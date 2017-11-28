using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JourneyApplication.Controllers
{
    public class HomeController : Controller
    {
        private static readonly ILog Log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        [Authorize]
        public ActionResult Index()
        {
            log4net.Config.XmlConfigurator.Configure();
            Log.Debug("log Debug");
            Log.Info("log Info");
            Log.Warn("log Warn");
            Log.Error("log Error");
            Log.Fatal("log Fatal");
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