using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class IdentityAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9a9dc95d-af8a-43a4-8935-2816d4ecd3c7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1dec530-6420-451c-bed4-e79bc3a75e64");

            // ❌ Do NOT rename or add the 'UserName' column. Identity manages this.

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "463d2917-856a-4e02-a679-da03097f83e3", "ef3fa786-9f3e-4ab4-9281-0bceac7be694", "Admin", "ADMIN" },
                    { "aa5f21b0-e9a0-4ae7-b6a3-04a5626064ba", "d4301cff-867d-486e-8e87-8bae0b98c731", "Member", "MEMBER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "463d2917-856a-4e02-a679-da03097f83e3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aa5f21b0-e9a0-4ae7-b6a3-04a5626064ba");

            // ❌ Do NOT drop or rename UserName

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9a9dc95d-af8a-43a4-8935-2816d4ecd3c7", "9c9917b3-422b-4559-b1f1-6cc04ee155e7", "Member", "MEMBER" },
                    { "a1dec530-6420-451c-bed4-e79bc3a75e64", "d12c3a70-d10f-4269-8025-82a59fb9ec8a", "Admin", "ADMIN" }
                });
        }
    }
}
