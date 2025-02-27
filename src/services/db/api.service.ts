import { API, APIAttributes, findBackendIdByPath } from "../../db/models/api.model";


// Create a new API entry
async function createAPI(name: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, backendServiceId: number) {
  return API.create({ name, method, path, backendServiceId });
  //console.log('API Created:', api.toJSON());
  //return api;
}

// Get all APIs
async function getAPIs() {
  return API.findAll();
  //console.log('APIs:', apis.map(a => a.toJSON()));
  //return apis;
}

// Get all APIs by method and path
async function getAPIsByPath(method: string, path: string) {
  return API.findAll({
    where: {
      "method": method,
      "path": path
    },
  });
  /*
  console.log('APIs:', apis.map(a => a.toJSON()));
  return apis;
  */
}

// Get API by ID
async function getAPIById(id: number) {
  return API.findByPk(id);
  /*
  if (api) {
    console.log('API:', api.toJSON());
  } else {
    console.log('API not found');
  }

  return api;
  */
}

// Get API by beservice, method and path
async function getAPIByFields(method: string, path: string, backendServiceId: number) {
  return API.findOne({
    where: {
      "method": method,
      "path": path,
      "backendServiceId": backendServiceId
    },
  });
  /*
  if (api) {
    console.log('API:', api.toJSON());
  } else {
    console.log('API not found');
  }

  return api;
  */
}

// Get backend_id from path
async function getBackendIdByPath(method: string, path: string) {
  console.log('getBackendIdByPath ' + method + ' ' + path);
  return findBackendIdByPath(method, path);
}

// Update API
async function updateAPI(id: number, newValues: Partial<Omit<APIAttributes, 'id' | 'createdAt'>>) {
  const api = await API.findByPk(id);
  if (api) {
    await api.update(newValues);
    console.log('API Updated:', api.toJSON());
  } else {
    console.log('API not found');
  }

  return api;
}

// Delete API
async function deleteAPI(id: number) {
  const deletedCount = await API.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('API deleted successfully');
  } else {
    console.log('API not found');
  }
}

export { createAPI, getAPIs, getAPIsByPath, getAPIById, getAPIByFields, updateAPI, getBackendIdByPath, deleteAPI };
