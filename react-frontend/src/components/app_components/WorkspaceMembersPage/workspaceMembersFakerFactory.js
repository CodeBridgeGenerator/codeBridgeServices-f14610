
import { faker } from "@faker-js/faker";
export default (user,count,workspaceIdIds,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
workspaceId: workspaceIdIds[i % workspaceIdIds.length],
userId: userIdIds[i % userIdIds.length],
role: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
