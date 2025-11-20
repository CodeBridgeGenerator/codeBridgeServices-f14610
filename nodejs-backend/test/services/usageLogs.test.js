const assert = require("assert");
const app = require("../../src/app");

describe("usageLogs service", () => {
  let thisService;
  let usageLogCreated;

  beforeEach(async () => {
    thisService = await app.service("usageLogs");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (usageLogs)");
  });

  describe("#create", () => {
    const options = {"tenantServices":"aasdfasdfasdfadsfadfa","apiKey":"new value","requestId":"new value","unitsConsumed":23,"unitRate":23,"cost":23,"metaData":"new value","dateOfUsage":1763621698192};

    beforeEach(async () => {
      usageLogCreated = await thisService.create(options);
    });

    it("should create a new usageLog", () => {
      assert.strictEqual(usageLogCreated.tenantServices, options.tenantServices);
assert.strictEqual(usageLogCreated.apiKey, options.apiKey);
assert.strictEqual(usageLogCreated.requestId, options.requestId);
assert.strictEqual(usageLogCreated.unitsConsumed, options.unitsConsumed);
assert.strictEqual(usageLogCreated.unitRate, options.unitRate);
assert.strictEqual(usageLogCreated.cost, options.cost);
assert.strictEqual(usageLogCreated.metaData, options.metaData);
assert.strictEqual(usageLogCreated.dateOfUsage, options.dateOfUsage);
    });
  });

  describe("#get", () => {
    it("should retrieve a usageLog by ID", async () => {
      const retrieved = await thisService.get(usageLogCreated._id);
      assert.strictEqual(retrieved._id, usageLogCreated._id);
    });
  });

  describe("#update", () => {
    let usageLogUpdated;
    const options = {"tenantServices":"345345345345345345345","apiKey":"updated value","requestId":"updated value","unitsConsumed":100,"unitRate":100,"cost":100,"metaData":"updated value","dateOfUsage":null};

    beforeEach(async () => {
      usageLogUpdated = await thisService.update(usageLogCreated._id, options);
    });

    it("should update an existing usageLog ", async () => {
      assert.strictEqual(usageLogUpdated.tenantServices, options.tenantServices);
assert.strictEqual(usageLogUpdated.apiKey, options.apiKey);
assert.strictEqual(usageLogUpdated.requestId, options.requestId);
assert.strictEqual(usageLogUpdated.unitsConsumed, options.unitsConsumed);
assert.strictEqual(usageLogUpdated.unitRate, options.unitRate);
assert.strictEqual(usageLogUpdated.cost, options.cost);
assert.strictEqual(usageLogUpdated.metaData, options.metaData);
assert.strictEqual(usageLogUpdated.dateOfUsage, options.dateOfUsage);
    });
  });

  describe("#delete", () => {
  let usageLogDeleted;
    beforeEach(async () => {
      usageLogDeleted = await thisService.remove(usageLogCreated._id);
    });

    it("should delete a usageLog", async () => {
      assert.strictEqual(usageLogDeleted._id, usageLogCreated._id);
    });
  });
});