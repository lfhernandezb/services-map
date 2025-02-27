import { FrontendService, FrontendServiceAttributes } from "../../db/models/frontend-service.model";



// Create a new FrontendService entry
async function createFrontendService(name: string) {
  console.log('createFrontendService ' + name)
  return FrontendService.create({ name });
  // console.log('FrontendService Created:', service.toJSON());
  // return service;
}

// Get all FrontendServices
async function getFrontendServices() {
  const services = await FrontendService.findAll();
  console.log('FrontendServices:', services.map(s => s.toJSON()));
}

// Get FrontendService by ID
async function getFrontendServiceById(id: number) {
  console.log('createFrontendService ' + id)
  return FrontendService.findByPk(id);
  /*
  if (service) {
    console.log('FrontendService:', service.toJSON());
  } else {
    console.log('FrontendService not found');
  }
  */
}

// Get FrontendService by name
async function getFrontendServiceByName(name: string) {
  console.log('getFrontendServiceByName ' + name)
  return FrontendService.findOne({
    where: {
      name: name,
    },
  });
  /*
  if (service) {
    console.log('FrontendService:', service.toJSON());
  } else {
    console.log('FrontendService not found');
  }

  return service;
  */
}

// Update FrontendService
async function updateFrontendService(id: number, newValues: Partial<Omit<FrontendServiceAttributes, 'id' | 'createdAt'>>) {
  const service = await FrontendService.findByPk(id);
  if (service) {
    await service.update(newValues);
    console.log('FrontendService Updated:', service.toJSON());
  } else {
    console.log('FrontendService not found');
  }
}

// Delete FrontendService
async function deleteFrontendService(id: number) {
  const deletedCount = await FrontendService.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('FrontendService deleted successfully');
  } else {
    console.log('FrontendService not found');
  }
}

export { createFrontendService, getFrontendServices, getFrontendServiceById, getFrontendServiceByName, updateFrontendService, deleteFrontendService };
