import { FrontendServiceHost, FrontendServiceHostAttributes } from "../../db/models/frontend-service-host.model";


// Create a new FrontendServiceHost entry
async function createFrontendServiceHost(hostId: number, frontendServiceId: number) {
  const entry = await FrontendServiceHost.create({ hostId, frontendServiceId });
  console.log('FrontendServiceHost Created:', entry.toJSON());
  return entry;
}

// Get all FrontendServiceHost entries
async function getFrontendServiceHosts() {
  const entries = await FrontendServiceHost.findAll();
  console.log('FrontendServiceHosts:', entries.map(e => e.toJSON()));
}

// Get FrontendServiceHost by ID
async function getFrontendServiceHostById(id: number) {
  const entry = await FrontendServiceHost.findByPk(id);
  if (entry) {
    console.log('FrontendServiceHost:', entry.toJSON());
  } else {
    console.log('FrontendServiceHost not found');
  }
}

// Get FrontendServiceHost by hostId and frontendId
async function getFrontendServiceHostByFks(hostId: number, frontendServiceId: number) {
  const entry = await FrontendServiceHost.findOne({
    where: {
      "hostId": hostId,
      "frontendServiceId": frontendServiceId
    },
  });
  if (entry) {
    console.log('FrontendServiceHost:', entry.toJSON());
  } else {
    console.log('FrontendServiceHost not found');
  }

  return entry;
}

// Update FrontendServiceHost
async function updateFrontendServiceHost(id: number, newValues: Partial<Omit<FrontendServiceHostAttributes, 'id' | 'createdAt'>>) {
  const entry = await FrontendServiceHost.findByPk(id);
  if (entry) {
    await entry.update(newValues);
    console.log('FrontendServiceHost Updated:', entry.toJSON());
  } else {
    console.log('FrontendServiceHost not found');
  }
}

// Delete FrontendServiceHost
async function deleteFrontendServiceHost(id: number) {
  const deletedCount = await FrontendServiceHost.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('FrontendServiceHost deleted successfully');
  } else {
    console.log('FrontendServiceHost not found');
  }
}

export { createFrontendServiceHost, getFrontendServiceHosts, getFrontendServiceHostById, getFrontendServiceHostByFks, updateFrontendServiceHost, deleteFrontendServiceHost };
