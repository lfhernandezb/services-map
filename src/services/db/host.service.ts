import { Host, HostAttributes } from "../../db/models/host.model";

// Create a new Host entry
async function createHost(name: string, ipAddress: string, type: string) {
  return Host.create({ name, ipAddress, type });
  console.log('createFrontendService ' + name + ' ' + ipAddress + ' ' + type)
  //console.log('Host Created:', host.toJSON());
  //return host;
}

// Get all Hosts
async function getHosts() {
  const hosts = await Host.findAll();
  console.log('Hosts:', hosts.map(h => h.toJSON()));
}

// Get Host by ID
async function getHostById(id: number) {
  console.log('createFrontendService ' + id)
  return Host.findByPk(id);
  /*
  if (host) {
    console.log('Host:', host.toJSON());
  } else {
    console.log('Host not found');
  }
  */
}

// Get Host by Name
async function getHostByName(name: string) {
  console.log('createFrontendService ' + name)
  return Host.findOne({
    where: {
      name: name,
    },
  });
  /*
  if (host) {
    console.log('Host:', host.toJSON());
  } else {
    console.log('Host not found');
  }

  return host;
  */
}

// Update Host
async function updateHost(id: number, newValues: Partial<Omit<HostAttributes, 'id' | 'createdAt'>>) {
  const host = await Host.findByPk(id);
  if (host) {
    await host.update(newValues);
    console.log('Host Updated:', host.toJSON());
  } else {
    console.log('Host not found');
  }
}

// Delete Host
async function deleteHost(id: number) {
  const deletedCount = await Host.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('Host deleted successfully');
  } else {
    console.log('Host not found');
  }
}

export { createHost, getHosts, getHostById, getHostByName, updateHost, deleteHost };
