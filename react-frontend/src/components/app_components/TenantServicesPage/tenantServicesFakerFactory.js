
import { faker } from "@faker-js/faker";
export default (user,count,tenantIdIds,paymentIdIds,serviceIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
tenantId: tenantIdIds[i % tenantIdIds.length],
paymentId: paymentIdIds[i % paymentIdIds.length],
serviceId: serviceIdIds[i % serviceIdIds.length],
paymentStatus: faker.lorem.sentence(1),
apiKey: faker.lorem.sentence(1),
isActive: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
