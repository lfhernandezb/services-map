import { DBEngineType, DBEngineTypeAttributes } from "../../db/models/db-engine-type.model";


// Create a new DBEngineType entry
async function createDBEngineType(description: string) {
  const engineType = await DBEngineType.create({ description });
  console.log('DBEngineType Created:', engineType.toJSON());
  return engineType;
}

// Get all DBEngineTypes
async function getDBEngineTypes() {
  const engineTypes = await DBEngineType.findAll();
  console.log('DBEngineTypes:', engineTypes.map(e => e.toJSON()));
}

// Get DBEngineType by ID
async function getDBEngineTypeById(id: number) {
  const engineType = await DBEngineType.findByPk(id);
  if (engineType) {
    console.log('DBEngineType:', engineType.toJSON());
  } else {
    console.log('DBEngineType not found');
  }

  return engineType;
}

// Get DBEngineType by description
async function getDBEngineTypeByDescription(description: string) {
  const engineType = await DBEngineType.findOne({
    where: {
      "description": description
    },
  });
  if (engineType) {
    console.log('DBEngineType:', engineType.toJSON());
  } else {
    console.log('DBEngineType not found');
  }

  return engineType;
}

// Update DBEngineType
async function updateDBEngineType(id: number, newValues: Partial<Omit<DBEngineTypeAttributes, 'id' | 'createdAt'>>) {
  const engineType = await DBEngineType.findByPk(id);
  if (engineType) {
    await engineType.update(newValues);
    console.log('DBEngineType Updated:', engineType.toJSON());
  } else {
    console.log('DBEngineType not found');
  }
}

// Delete DBEngineType
async function deleteDBEngineType(id: number) {
  const deletedCount = await DBEngineType.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('DBEngineType deleted successfully');
  } else {
    console.log('DBEngineType not found');
  }
}

export { createDBEngineType, getDBEngineTypes, getDBEngineTypeById, getDBEngineTypeByDescription, updateDBEngineType, deleteDBEngineType };
