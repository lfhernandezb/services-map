import { BackendServiceHost, BackendServiceHostAttributes } from "../../db/models/backend-service-host.model";


// Create a new BackendServiceHost entry
async function createBackendServiceHost(hostId: number, backendServiceId: number) {
  const entry = await BackendServiceHost.create({ hostId, backendServiceId });
  console.log('BackendServiceHost Created:', entry.toJSON());
  return entry;
}

// Get all BackendServiceHost entries
async function getBackendServiceHosts() {
  const entries = await BackendServiceHost.findAll();
  console.log('BackendServiceHosts:', entries.map(e => e.toJSON()));
}

// Get BackendServiceHost by ID
async function getBackendServiceHostById(id: number) {
  const entry = await BackendServiceHost.findByPk(id);
  if (entry) {
    console.log('BackendServiceHost:', entry.toJSON());
  } else {
    console.log('BackendServiceHost not found');
  }
}

// Get BackendServiceHost by ID
async function getBackendServiceHostByFks(hostId: number, backendServiceId: number) {
  const entry = await BackendServiceHost.findOne({
    where: {
      "hostId": hostId,
      "backendServiceId": backendServiceId
    },
  });;
  if (entry) {
    console.log('BackendServiceHost:', entry.toJSON());
  } else {
    console.log('BackendServiceHost not found');
  }

  return entry;
}

// Update BackendServiceHost
async function updateBackendServiceHost(id: number, newValues: Partial<Omit<BackendServiceHostAttributes, 'id' | 'createdAt'>>) {
  const entry = await BackendServiceHost.findByPk(id);
  if (entry) {
    await entry.update(newValues);
    console.log('BackendServiceHost Updated:', entry.toJSON());
  } else {
    console.log('BackendServiceHost not found');
  }
}

// Delete BackendServiceHost
async function deleteBackendServiceHost(id: number) {
  const deletedCount = await BackendServiceHost.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('BackendServiceHost deleted successfully');
  } else {
    console.log('BackendServiceHost not found');
  }
}

export { createBackendServiceHost, getBackendServiceHosts, getBackendServiceHostById, getBackendServiceHostByFks, updateBackendServiceHost, deleteBackendServiceHost };
