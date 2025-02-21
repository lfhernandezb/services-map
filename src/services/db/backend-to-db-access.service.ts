import { BackendToDBAccess, BackendToDBAccessAttributes } from "../../db/models/backend-to-db-access.model";

// Create a new BackendToDBAccess entry
async function createBackendToDBAccess(backendServiceId: number, dbschemaId: number) {
  const access = await BackendToDBAccess.create({ backendServiceId, dbschemaId });
  console.log('BackendToDBAccess Created:', access.toJSON());
}

// Get all BackendToDBAccess records
async function getBackendToDBAccessList() {
  const accessList = await BackendToDBAccess.findAll();
  console.log('BackendToDBAccess List:', accessList.map(a => a.toJSON()));
}

// Get BackendToDBAccess by ID
async function getBackendToDBAccessById(id: number) {
  const access = await BackendToDBAccess.findByPk(id);
  if (access) {
    console.log('BackendToDBAccess:', access.toJSON());
  } else {
    console.log('BackendToDBAccess not found');
  }
}

// Update BackendToDBAccess
async function updateBackendToDBAccess(
  id: number,
  newValues: Partial<Omit<BackendToDBAccessAttributes, 'id' | 'createdAt'>>
) {
  const access = await BackendToDBAccess.findByPk(id);
  if (access) {
    await access.update(newValues);
    console.log('BackendToDBAccess Updated:', access.toJSON());
  } else {
    console.log('BackendToDBAccess not found');
  }
}

// Delete BackendToDBAccess
async function deleteBackendToDBAccess(id: number) {
  const deletedCount = await BackendToDBAccess.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('BackendToDBAccess deleted successfully');
  } else {
    console.log('BackendToDBAccess not found');
  }
}

export {
  createBackendToDBAccess,
  getBackendToDBAccessList,
  getBackendToDBAccessById,
  updateBackendToDBAccess,
  deleteBackendToDBAccess,
};
