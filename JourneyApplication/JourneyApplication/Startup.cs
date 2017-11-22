using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(JourneyApplication.Startup))]
namespace JourneyApplication
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
