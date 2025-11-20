
import { faker } from "@faker-js/faker";
export default (user,count,ownerIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ownerId: ownerIdIds[i % ownerIdIds.length],
name: faker.lorem.sentence(1),
isDefault: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
