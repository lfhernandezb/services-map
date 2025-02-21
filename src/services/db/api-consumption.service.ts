import { APIConsumption, APIConsumptionAttributes } from "../../db/models/api-consumption.model";

// Create a new APIConsumption entry
async function createAPIConsumption(apiId: number, consumerType: 'frontend' | 'backend', consumerId: number) {
  const consumption = await APIConsumption.create({ apiId, consumerType, consumerId });
  console.log('APIConsumption Created:', consumption.toJSON());
}

// Get all APIConsumptions
async function getAPIConsumptions() {
  const consumptions = await APIConsumption.findAll();
  console.log('API Consumptions:', consumptions.map(c => c.toJSON()));
}

// Get APIConsumption by ID
async function getAPIConsumptionById(id: number) {
  const consumption = await APIConsumption.findByPk(id);
  if (consumption) {
    console.log('APIConsumption:', consumption.toJSON());
  } else {
    console.log('APIConsumption not found');
  }
}

// Update APIConsumption
async function updateAPIConsumption(id: number, newValues: Partial<Omit<APIConsumptionAttributes, 'id' | 'createdAt'>>) {
  const consumption = await APIConsumption.findByPk(id);
  if (consumption) {
    await consumption.update(newValues);
    console.log('APIConsumption Updated:', consumption.toJSON());
  } else {
    console.log('APIConsumption not found');
  }
}

// Delete APIConsumption
async function deleteAPIConsumption(id: number) {
  const deletedCount = await APIConsumption.destroy({ where: { id } });
  if (deletedCount > 0) {
    console.log('APIConsumption deleted successfully');
  } else {
    console.log('APIConsumption not found');
  }
}

export {
  createAPIConsumption,
  getAPIConsumptions,
  getAPIConsumptionById,
  updateAPIConsumption,
  deleteAPIConsumption,
};
