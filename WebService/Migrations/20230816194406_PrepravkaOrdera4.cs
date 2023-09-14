using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebService.Migrations
{
    public partial class PrepravkaOrdera4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelivered",
                table: "Orders");

            migrationBuilder.AddColumn<DateTime>(
                name: "orderExpiration",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "orderExpiration",
                table: "Orders");

            migrationBuilder.AddColumn<string>(
                name: "IsDelivered",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
