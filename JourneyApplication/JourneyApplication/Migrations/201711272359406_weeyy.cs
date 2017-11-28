namespace JourneyApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class weeyy : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.Logs");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Logs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.DateTime(nullable: false),
                        Thread = c.String(nullable: false, maxLength: 255),
                        Level = c.String(nullable: false, maxLength: 50),
                        Logger = c.String(nullable: false, maxLength: 255),
                        Message = c.String(nullable: false, maxLength: 4000),
                        Exception = c.String(nullable: false, maxLength: 2000),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
