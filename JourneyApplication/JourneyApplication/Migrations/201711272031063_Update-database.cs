namespace JourneyApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Updatedatabase : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Errands", "Vehicle_Id", "dbo.Vehicles");
            DropIndex("dbo.Errands", new[] { "Vehicle_Id" });
            RenameColumn(table: "dbo.Errands", name: "Vehicle_Id", newName: "VehicleId");
            AlterColumn("dbo.Errands", "VehicleId", c => c.Int(nullable: false));
            CreateIndex("dbo.Errands", "VehicleId");
            AddForeignKey("dbo.Errands", "VehicleId", "dbo.Vehicles", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Errands", "VehicleId", "dbo.Vehicles");
            DropIndex("dbo.Errands", new[] { "VehicleId" });
            AlterColumn("dbo.Errands", "VehicleId", c => c.Int());
            RenameColumn(table: "dbo.Errands", name: "VehicleId", newName: "Vehicle_Id");
            CreateIndex("dbo.Errands", "Vehicle_Id");
            AddForeignKey("dbo.Errands", "Vehicle_Id", "dbo.Vehicles", "Id");
        }
    }
}
