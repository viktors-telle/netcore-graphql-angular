using System;
using backend.Entities;

namespace backend.Contracts
{
    public class AccountViewModel
    {
        public Guid Id { get; set; }

        public TypeOfAccount Type { get; set; }

        public string Description { get; set; }

        public Guid OwnerId { get; set; }

        public OwnerViewModel Owner { get; set; }
    }
}