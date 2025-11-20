const assert = require("assert");
const app = require("../../src/app");

describe("tenants service", () => {
  let thisService;
  let tenantCreated;

  beforeEach(async () => {
    thisService = await app.service("tenants");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (tenants)");
  });

  describe("#create", () => {
    const options = {"partnerId":"aasdfasdfasdfadsfadfa","name":"new value","isActive":true};

    beforeEach(async () => {
      tenantCreated = await thisService.create(options);
    });

    it("should create a new tenant", () => {
      assert.strictEqual(tenantCreated.partnerId, options.partnerId);
assert.strictEqual(tenantCreated.name, options.name);
assert.strictEqual(tenantCreated.isActive, options.isActive);
    });
  });

  describe("#get", () => {
    it("should retrieve a tenant by ID", async () => {
      const retrieved = await thisService.get(tenantCreated._id);
      assert.strictEqual(retrieved._id, tenantCreated._id);
    });
  });

  describe("#update", () => {
    let tenantUpdated;
    const options = {"partnerId":"345345345345345345345","name":"updated value","isActive":false};

    beforeEach(async () => {
      tenantUpdated = await thisService.update(tenantCreated._id, options);
    });

    it("should update an existing tenant ", async () => {
      assert.strictEqual(tenantUpdated.partnerId, options.partnerId);
assert.strictEqual(tenantUpdated.name, options.name);
assert.strictEqual(tenantUpdated.isActive, options.isActive);
    });
  });

  describe("#delete", () => {
  let tenantDeleted;
    beforeEach(async () => {
      tenantDeleted = await thisService.remove(tenantCreated._id);
    });

    it("should delete a tenant", async () => {
      assert.strictEqual(tenantDeleted._id, tenantCreated._id);
    });
  });
});