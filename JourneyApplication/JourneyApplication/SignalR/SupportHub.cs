using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace JourneyApplication.SignalR
{
    public class SupportHub : Hub
    {
        public string User { get; set; }
        public string Id { get; set; }
        public void Send(string name, string message)
        {
           
            if(Context.QueryString["Admin"] == "chickens@live.se")
            {
                Clients.All.broadcastMessage(name, message);
            }
            if(Context.QueryString["user"] == "users")
            {
                Clients.All.broadcastMessage(name, message);
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