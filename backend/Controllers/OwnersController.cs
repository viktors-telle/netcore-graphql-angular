using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.Contracts;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        private readonly IOwnerRepository ownerRepository;
        private readonly IMapper mapper;

        public OwnersController(IOwnerRepository ownerRepository, IMapper mapper)
        {
            this.ownerRepository = ownerRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OwnerViewModel>>> Get()
        {
            var owners = await this.ownerRepository.GetAll(true);
            return Ok(this.mapper.Map<List<OwnerViewModel>>(owners));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OwnerViewModel>> GetById(Guid id)
        {
            var owner = await this.ownerRepository.GetById(id);
            return Ok(this.mapper.Map<OwnerViewModel>(owner));
        }

        [HttpPost]
        public async Task<ActionResult<OwnerViewModel>> Post([FromBody] OwnerViewModel owner)
        {
            var ownerEntity = this.mapper.Map<Owner>(owner);
            ownerEntity = await this.ownerRepository.CreateOwner(ownerEntity);
            return CreatedAtAction(nameof(GetById), new { id = ownerEntity.Id }, ownerEntity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<OwnerViewModel>> Put(Guid id, [FromBody] OwnerViewModel owner)
        {
            var dbOwner = await this.ownerRepository.GetById(id);
            if (dbOwner == null)
            {
                return BadRequest();
            }

            var newDbOwner = this.mapper.Map<Owner>(owner);
            await this.ownerRepository.UpdateOwner(dbOwner, newDbOwner);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var dbOwner = await this.ownerRepository.GetById(id);
            if (dbOwner == null)
            {
                return BadRequest();
            }
            await this.ownerRepository.DeleteOwner(dbOwner);
            return NoContent();
        }
    }
}