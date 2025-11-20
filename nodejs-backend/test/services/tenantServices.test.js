const assert = require("assert");
const app = require("../../src/app");

describe("tenantServices service", () => {
  let thisService;
  let tenantServiceCreated;

  beforeEach(async () => {
    thisService = await app.service("tenantServices");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (tenantServices)");
  });

  describe("#create", () => {
    const options = {"tenantId":"aasdfasdfasdfadsfadfa","paymentId":"aasdfasdfasdfadsfadfa","serviceId":"aasdfasdfasdfadsfadfa","paymentStatus":"new value","apiKey":"new value","isActive":true};

    beforeEach(async () => {
      tenantServiceCreated = await thisService.create(options);
    });

    it("should create a new tenantService", () => {
      assert.strictEqual(tenantServiceCreated.tenantId, options.tenantId);
assert.strictEqual(tenantServiceCreated.paymentId, options.paymentId);
assert.strictEqual(tenantServiceCreated.serviceId, options.serviceId);
assert.strictEqual(tenantServiceCreated.paymentStatus, options.paymentStatus);
assert.strictEqual(tenantServiceCreated.apiKey, options.apiKey);
assert.strictEqual(tenantServiceCreated.isActive, options.isActive);
    });
  });

  describe("#get", () => {
    it("should retrieve a tenantService by ID", async () => {
      const retrieved = await thisService.get(tenantServiceCreated._id);
      assert.strictEqual(retrieved._id, tenantServiceCreated._id);
    });
  });

  describe("#update", () => {
    let tenantServiceUpdated;
    const options = {"tenantId":"345345345345345345345","paymentId":"345345345345345345345","serviceId":"345345345345345345345","paymentStatus":"updated value","apiKey":"updated value","isActive":false};

    beforeEach(async () => {
      tenantServiceUpdated = await thisService.update(tenantServiceCreated._id, options);
    });

    it("should update an existing tenantService ", async () => {
      assert.strictEqual(tenantServiceUpdated.tenantId, options.tenantId);
assert.strictEqual(tenantServiceUpdated.paymentId, options.paymentId);
assert.strictEqual(tenantServiceUpdated.serviceId, options.serviceId);
assert.strictEqual(tenantServiceUpdated.paymentStatus, options.paymentStatus);
assert.strictEqual(tenantServiceUpdated.apiKey, options.apiKey);
assert.strictEqual(tenantServiceUpdated.isActive, options.isActive);
    });
  });

  describe("#delete", () => {
  let tenantServiceDeleted;
    beforeEach(async () => {
      tenantServiceDeleted = await thisService.remove(tenantServiceCreated._id);
    });

    it("should delete a tenantService", async () => {
      assert.strictEqual(tenantServiceDeleted._id, tenantServiceCreated._id);
    });
  });
});