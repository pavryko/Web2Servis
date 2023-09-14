using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebService.Models;

namespace WebService.Infrastructure.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            //username
           
            builder.Property(x => x.UserName).IsRequired();
            builder.HasIndex(x => x.UserName).IsUnique();
            builder.Property(x => x.UserName).HasMaxLength(50);
            //password
            builder.Property(x => x.Password).IsRequired();
            //email
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.Email).IsRequired();
            //Name
            builder.Property(x => x.Name).HasMaxLength(50);
            //Surname
            builder.Property(x => x.Surname).HasMaxLength(50);
            //address
            builder.Property(x => x.Address).HasMaxLength(100);
            //token
            builder.Property(x => x.Token).HasMaxLength(200);
            //typeofuser
            builder.Property(x => x.TypeOfUser).HasMaxLength(200);


        }


    }
}
