using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WaitSpark.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddJobs1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_tenants_users_user_id",
                table: "tenants");

            migrationBuilder.DropIndex(
                name: "ix_tenants_user_id",
                table: "tenants");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "tenants");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "tenants",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_tenants_user_id",
                table: "tenants",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_tenants_users_user_id",
                table: "tenants",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id");
        }
    }
}
