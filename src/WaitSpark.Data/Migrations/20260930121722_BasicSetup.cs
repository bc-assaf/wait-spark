using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WaitSpark.Data.Migrations
{
    /// <inheritdoc />
    public partial class BasicSetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tenants_Users_OwnerUserId",
                table: "Tenants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tenants",
                table: "Tenants");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "Tenants",
                newName: "tenants");

            migrationBuilder.RenameColumn(
                name: "Uid",
                table: "users",
                newName: "uid");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "users",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "users",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "users",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "DisplayName",
                table: "users",
                newName: "display_name");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "users",
                newName: "created_at");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Uid",
                table: "users",
                newName: "ix_users_uid");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Email",
                table: "users",
                newName: "ix_users_email");

            migrationBuilder.RenameColumn(
                name: "Tagline",
                table: "tenants",
                newName: "tagline");

            migrationBuilder.RenameColumn(
                name: "Summary",
                table: "tenants",
                newName: "summary");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "tenants",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tenants",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "StatusChangedAt",
                table: "tenants",
                newName: "status_changed_at");

            migrationBuilder.RenameColumn(
                name: "PublicId",
                table: "tenants",
                newName: "public_id");

            migrationBuilder.RenameColumn(
                name: "PrimaryWebsiteUrl",
                table: "tenants",
                newName: "primary_website_url");

            migrationBuilder.RenameColumn(
                name: "OwnerUserId",
                table: "tenants",
                newName: "owner_user_id");

            migrationBuilder.RenameColumn(
                name: "OgImageUrl",
                table: "tenants",
                newName: "og_image_url");

            migrationBuilder.RenameColumn(
                name: "IconUrl",
                table: "tenants",
                newName: "icon_url");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "tenants",
                newName: "created_at");

            migrationBuilder.RenameIndex(
                name: "IX_Tenants_PublicId",
                table: "tenants",
                newName: "ix_tenants_public_id");

            migrationBuilder.RenameIndex(
                name: "IX_Tenants_OwnerUserId",
                table: "tenants",
                newName: "ix_tenants_owner_user_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_users",
                table: "users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_tenants",
                table: "tenants",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_tenants_users_owner_user_id",
                table: "tenants",
                column: "owner_user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_tenants_users_owner_user_id",
                table: "tenants");

            migrationBuilder.DropPrimaryKey(
                name: "pk_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "pk_tenants",
                table: "tenants");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "tenants",
                newName: "Tenants");

            migrationBuilder.RenameColumn(
                name: "uid",
                table: "Users",
                newName: "Uid");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Users",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "display_name",
                table: "Users",
                newName: "DisplayName");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "Users",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "ix_users_uid",
                table: "Users",
                newName: "IX_Users_Uid");

            migrationBuilder.RenameIndex(
                name: "ix_users_email",
                table: "Users",
                newName: "IX_Users_Email");

            migrationBuilder.RenameColumn(
                name: "tagline",
                table: "Tenants",
                newName: "Tagline");

            migrationBuilder.RenameColumn(
                name: "summary",
                table: "Tenants",
                newName: "Summary");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Tenants",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Tenants",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "status_changed_at",
                table: "Tenants",
                newName: "StatusChangedAt");

            migrationBuilder.RenameColumn(
                name: "public_id",
                table: "Tenants",
                newName: "PublicId");

            migrationBuilder.RenameColumn(
                name: "primary_website_url",
                table: "Tenants",
                newName: "PrimaryWebsiteUrl");

            migrationBuilder.RenameColumn(
                name: "owner_user_id",
                table: "Tenants",
                newName: "OwnerUserId");

            migrationBuilder.RenameColumn(
                name: "og_image_url",
                table: "Tenants",
                newName: "OgImageUrl");

            migrationBuilder.RenameColumn(
                name: "icon_url",
                table: "Tenants",
                newName: "IconUrl");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "Tenants",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "ix_tenants_public_id",
                table: "Tenants",
                newName: "IX_Tenants_PublicId");

            migrationBuilder.RenameIndex(
                name: "ix_tenants_owner_user_id",
                table: "Tenants",
                newName: "IX_Tenants_OwnerUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tenants",
                table: "Tenants",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tenants_Users_OwnerUserId",
                table: "Tenants",
                column: "OwnerUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
