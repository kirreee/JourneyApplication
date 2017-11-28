using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Journey
{
    [Authorize]
    public class SupportHub : Hub
    {
        public string User { get; set; }
        public string Id { get; set; }

        [Authorize]
        public void Send(string name, string message)
        {

            try
            {
                if (Context.QueryString["Admin"] == "admin@live.se")
                {
                    Clients.All.broadcastMessage(name, message);
                }
                if (Context.QueryString["user"] == "users")
                {
                    Clients.All.broadcastMessage(name, message);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }



        }
        public override Task OnConnected()
        {
            var id = Context.ConnectionId;
            var User = Context.QueryString["user"];

            return base.OnConnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }
        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }
    }
}