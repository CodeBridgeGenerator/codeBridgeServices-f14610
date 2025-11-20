
import { faker } from "@faker-js/faker";
export default (user,count,tenantServicesIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
tenantServices: tenantServicesIds[i % tenantServicesIds.length],
apiKey: faker.lorem.sentence(1),
requestId: faker.lorem.sentence(1),
unitsConsumed: faker.lorem.sentence(1),
unitRate: faker.lorem.sentence(1),
cost: faker.lorem.sentence(1),
metaData: faker.lorem.sentence(1),
dateOfUsage: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
