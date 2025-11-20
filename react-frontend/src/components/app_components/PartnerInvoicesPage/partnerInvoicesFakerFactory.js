
import { faker } from "@faker-js/faker";
export default (user,count,partnerIdIds,tenantInvoicesIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
partnerId: partnerIdIds[i % partnerIdIds.length],
period: faker.lorem.sentence(1),
totalAmount: faker.lorem.sentence(1),
paymentStatus: faker.lorem.sentence(1),
tenantInvoices: tenantInvoicesIds[i % tenantInvoicesIds.length],
dueDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
