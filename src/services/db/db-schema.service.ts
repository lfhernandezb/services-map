import { DBSchema, DBSchemaAttributes } from "../../db/models/db-schema.model";


// Create a new DBSchema entry
async function createDBSchema(name: string, dbengineId: number) {
  const schema = await DBSchema.create({ name, dbengineId });
  console.log('DBSchema Created:', schema.toJSON());
  return schema;
}

// Get all DBSchemas
async function getDBSchemas() {
  const schemas = await DBSchema.findAll();
  console.log('DBSchemas:', schemas.map(s => s.toJSON()));
  return schemas;
}

// Get DBSchema by ID
async function getDBSchemaById(id: number) {
  const schema = await DBSchema.findByPk(id);
  if (schema) {
    console.log('DBSchema:', schema.toJSON());
  } else {
    console.log('DBSchema not found');
  }

  return schema;
}

// Get DBSchema by name, dbengineId
async function getDBSchemaByFields(name: string, dbengineId: number) {
  const schema = await DBSchema.findOne({
    where: {
      "name": name,
      "dbengineId": dbengineId
    },
  });
  if (schema) {
    console.log('DBSchema:', schema.toJSON());
  } else {
    console.log('DBSchema not found');
  }

  return schema;
}

// Update DBSchema
async function updateDBSchema(id: number, newValues: Partial<Omit<DBSchemaAttributes, 'id' | 'createdAt'>>) {
  const schema = await DBSchema.findByPk(id);
  if (schema) {
    await schema.update(newValues);
    console.log('DBSchema Updated:', schema.toJSON());
  } else {
    console.log('DBSchema not found');
  }

  return schema;
}

// Delete DBSchema
async function deleteDBSchema(id: number) {
  const deletedCount = await DBSchema.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('DBSchema deleted successfully');
  } else {
    console.log('DBSchema not found');
  }
}

export {
  createDBSchema,
  getDBSchemas,
  getDBSchemaById,
  getDBSchemaByFields,
  updateDBSchema,
  deleteDBSchema,
};
