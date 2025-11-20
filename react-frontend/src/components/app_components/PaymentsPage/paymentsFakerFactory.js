
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
sessionId: faker.lorem.sentence(1),
paymentStatus: faker.lorem.sentence(1),
paymentType: faker.lorem.sentence(1),
amount: faker.lorem.sentence(1),
currency: faker.lorem.sentence(1),
paymentIntendId: faker.lorem.sentence(1),
payedAt: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
