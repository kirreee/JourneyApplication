namespace JourneyApplication.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateDataBase : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Errands", "VehicleId", "dbo.Vehicles");
            DropIndex("dbo.Errands", new[] { "VehicleId" });
            RenameColumn(table: "dbo.Errands", name: "VehicleId", newName: "Vehicle_Id");
            AlterColumn("dbo.Errands", "Vehicle_Id", c => c.Int());
            CreateIndex("dbo.Errands", "Vehicle_Id");
            AddForeignKey("dbo.Errands", "Vehicle_Id", "dbo.Vehicles", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Errands", "Vehicle_Id", "dbo.Vehicles");
            DropIndex("dbo.Errands", new[] { "Vehicle_Id" });
            AlterColumn("dbo.Errands", "Vehicle_Id", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.Errands", name: "Vehicle_Id", newName: "VehicleId");
            CreateIndex("dbo.Errands", "VehicleId");
            AddForeignKey("dbo.Errands", "VehicleId", "dbo.Vehicles", "Id", cascadeDelete: true);
        }
    }
}
