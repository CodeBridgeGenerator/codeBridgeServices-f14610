
import { faker } from "@faker-js/faker";
export default (user,count,tenantIdIds,usageLogsIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
tenantId: tenantIdIds[i % tenantIdIds.length],
period: faker.date.past(""),
totalAmount: faker.date.past(""),
usageLogs: usageLogsIds[i % usageLogsIds.length],
generatedAt: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
