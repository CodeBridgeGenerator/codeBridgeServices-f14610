
import { faker } from "@faker-js/faker";
export default (user,count,partnerIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
partnerId: partnerIdIds[i % partnerIdIds.length],
name: faker.lorem.sentence(1),
isActive: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
