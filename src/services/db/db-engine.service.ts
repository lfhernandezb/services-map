import { DBEngine, DBEngineAttributes } from "../../db/models/db-engine.model";


// Create a new DBEngine entry
async function createDBEngine(name: string, hostId: number, dbEngineTypeId: number) {
  const dbEngine = await DBEngine.create({ name, hostId, dbEngineTypeId });
  console.log('DBEngine Created:', dbEngine.toJSON());
  return dbEngine;
}

// Get all DBEngines
async function getDBEngines() {
  const dbEngines = await DBEngine.findAll();
  console.log('DBEngines:', dbEngines.map(e => e.toJSON()));
  return dbEngines;
}

// Get DBEngine by ID
async function getDBEngineById(id: number) {
  const dbEngine = await DBEngine.findByPk(id);
  if (dbEngine) {
    console.log('DBEngine:', dbEngine.toJSON());
  } else {
    console.log('DBEngine not found');
  }

  return dbEngine;
}

// Get DBEngine by hostId, dbEngineTypeId
async function getDBEngineByFields(hostId: number, dbEngineTypeId: number) {
  const dbEngine = await DBEngine.findOne({
    where: {
      "hostId": hostId,
      "dbEngineTypeId": dbEngineTypeId
    },
  });
  if (dbEngine) {
    console.log('DBEngine:', dbEngine.toJSON());
  } else {
    console.log('DBEngine not found');
  }

  return dbEngine;
}

// Update DBEngine
async function updateDBEngine(id: number, newValues: Partial<Omit<DBEngineAttributes, 'id' | 'createdAt'>>) {
  const dbEngine = await DBEngine.findByPk(id);
  if (dbEngine) {
    await dbEngine.update(newValues);
    console.log('DBEngine Updated:', dbEngine.toJSON());
  } else {
    console.log('DBEngine not found');
  }

  return dbEngine;
}

// Delete DBEngine
async function deleteDBEngine(id: number) {
  const deletedCount = await DBEngine.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('DBEngine deleted successfully');
  } else {
    console.log('DBEngine not found');
  }
}

export { createDBEngine, getDBEngines, getDBEngineById, getDBEngineByFields, updateDBEngine, deleteDBEngine };
