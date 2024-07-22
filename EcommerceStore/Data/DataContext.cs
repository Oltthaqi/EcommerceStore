using Microsoft.EntityFrameworkCore;

using Ecomerce_Store.Model;

namespace Ecomerce_Store.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Order>()
                .HasKey(o => o.Id);

            modelBuilder.Entity<Order>()
                .Property(o => o.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);

          

            modelBuilder.Entity<Order>()
                .OwnsOne(o => o.ProductList, pl =>
                {
                    pl.Property<List<int>>(nameof(ProductList.ProductIds))
                        .HasColumnName("ProductIds")
                        .HasConversion(
                            v => string.Join(',', v),  // Convert List<int> to comma-separated string for storage
                            v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList()); // Convert string back to List<int>
                });
        }















    }
}
