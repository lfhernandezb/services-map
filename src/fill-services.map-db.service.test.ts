import { sequelize } from "./libs/sequelize";
import { fillServicesMapDB } from "./services/fill-services.map-db.service";

describe("Fill services DB", () => {
    let heavyWorkingService = fillServicesMapDB;

    beforeAll(async () => {
        // Setup logic if needed
        // Connect to the database before running any tests
        await sequelize.sync();
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await sequelize.close();
    });
  
     // We are marking the test function call as async
     test(("run correctly"), async () => {
       // we are awaiting heavyWorkingService to finish its job 
       await heavyWorkingService();
    });
  });
