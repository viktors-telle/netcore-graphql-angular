using System;
using System.Collections.Generic;

namespace backend.Contracts
{
    public class OwnerViewModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }

        public List<AccountViewModel> Accounts { get; set; }
    }
}