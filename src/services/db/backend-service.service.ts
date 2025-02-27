import { BackendService, BackendServiceAttributes } from "../../db/models/backend-service.model";



// Create a new BackendService entry
async function createBackendService(name: string) {
  return BackendService.create({ name });
  //console.log('BackendService Created:', service.toJSON());
  //return service;
}

// Get all BackendServices
async function getBackendServices() {
  const services = await BackendService.findAll();
  console.log('BackendServices:', services.map(s => s.toJSON()));
}

// Get BackendService by ID
async function getBackendServiceById(id: number) {
  return BackendService.findByPk(id);
  /*
  if (service) {
    console.log('BackendService:', service.toJSON());
  } else {
    console.log('BackendService not found');
  }
  */
}

// Get BackendService by name
async function getBackendServiceByName(name: string) {
  return BackendService.findOne({
    where: {
      name: name,
    },
  });
  /*
  if (service) {
    console.log('BackendService:', service.toJSON());
  } else {
    console.log('BackendService not found');
  }

  return service;
  */
}

// Update BackendService
async function updateBackendService(id: number, newValues: Partial<Omit<BackendServiceAttributes, 'id' | 'createdAt'>>) {
  const service = await BackendService.findByPk(id);
  if (service) {
    await service.update(newValues);
    console.log('BackendService Updated:', service.toJSON());
  } else {
    console.log('BackendService not found');
  }
}

// Delete BackendService
async function deleteBackendService(id: number) {
  const deletedCount = await BackendService.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('BackendService deleted successfully');
  } else {
    console.log('BackendService not found');
  }
}

export { createBackendService, getBackendServices, getBackendServiceById, getBackendServiceByName, updateBackendService, deleteBackendService };
