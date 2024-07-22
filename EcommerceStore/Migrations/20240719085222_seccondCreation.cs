using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ecomerce_Store.Migrations
{
    public partial class seccondCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imgbase64",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imgbase64",
                table: "Products");
        }
    }
}
