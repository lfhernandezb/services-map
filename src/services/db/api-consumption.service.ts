import { APIConsumption, APIConsumptionAttributes } from "../../db/models/api-consumption.model";

// Create a new APIConsumption entry
async function createAPIConsumption(consumerType: 'frontend' | 'backend', consumerId: number, backendServiceId: number) {
  console.log('APIConsumption:', consumerType, consumerId, backendServiceId);
  return APIConsumption.create({ consumerType, consumerId, backendServiceId, });
  //console.log('APIConsumption Created:', consumption.toJSON());
}

// Get all APIConsumptions
async function getAPIConsumptions() {
  return APIConsumption.findAll();
  //console.log('API Consumptions:', consumptions.map(c => c.toJSON()));
}

// Get APIConsumption by ID
async function getAPIConsumptionById(id: number) {
  return APIConsumption.findByPk(id);
  /*
  if (consumption) {
    console.log('APIConsumption:', consumption.toJSON());
  } else {
    console.log('APIConsumption not found');
  }
  */
}

// Get APIConsumption by consumerType, consumerId and backendserviceId
async function getAPIConsumptionByFields(consumerType: 'frontend' | 'backend', consumerId: number, backendServiceId: number) {
  return APIConsumption.findOne({
    where: {
      consumerType: consumerType,
      consumerId: consumerId,
      backendServiceId: backendServiceId,
    }
  });
  /*
  if (consumption) {
    console.log('APIConsumption:', consumption.toJSON());
  } else {
    console.log('APIConsumption not found');
  }
  */
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
  getAPIConsumptionByFields,
  updateAPIConsumption,
  deleteAPIConsumption,
};
