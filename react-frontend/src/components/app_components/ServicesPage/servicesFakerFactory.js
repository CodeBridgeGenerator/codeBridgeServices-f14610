
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
initialPrice: faker.lorem.sentence(""),
metricName: faker.lorem.sentence(""),
metricUnit: faker.lorem.sentence(""),
ratePerUnit: faker.lorem.sentence(""),
isActive: faker.lorem.sentence(""),
calculationFn: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
