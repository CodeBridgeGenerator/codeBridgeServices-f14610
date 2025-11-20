const assert = require("assert");
const app = require("../../src/app");

describe("services service", () => {
  let thisService;
  let serviceCreated;

  beforeEach(async () => {
    thisService = await app.service("services");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (services)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","initialPrice":23,"metricName":"new value","metricUnit":"new value","ratePerUnit":23,"isActive":true,"calculationFn":"new value"};

    beforeEach(async () => {
      serviceCreated = await thisService.create(options);
    });

    it("should create a new service", () => {
      assert.strictEqual(serviceCreated.name, options.name);
assert.strictEqual(serviceCreated.description, options.description);
assert.strictEqual(serviceCreated.initialPrice, options.initialPrice);
assert.strictEqual(serviceCreated.metricName, options.metricName);
assert.strictEqual(serviceCreated.metricUnit, options.metricUnit);
assert.strictEqual(serviceCreated.ratePerUnit, options.ratePerUnit);
assert.strictEqual(serviceCreated.isActive, options.isActive);
assert.strictEqual(serviceCreated.calculationFn, options.calculationFn);
    });
  });

  describe("#get", () => {
    it("should retrieve a service by ID", async () => {
      const retrieved = await thisService.get(serviceCreated._id);
      assert.strictEqual(retrieved._id, serviceCreated._id);
    });
  });

  describe("#update", () => {
    let serviceUpdated;
    const options = {"name":"updated value","description":"updated value","initialPrice":100,"metricName":"updated value","metricUnit":"updated value","ratePerUnit":100,"isActive":false,"calculationFn":"updated value"};

    beforeEach(async () => {
      serviceUpdated = await thisService.update(serviceCreated._id, options);
    });

    it("should update an existing service ", async () => {
      assert.strictEqual(serviceUpdated.name, options.name);
assert.strictEqual(serviceUpdated.description, options.description);
assert.strictEqual(serviceUpdated.initialPrice, options.initialPrice);
assert.strictEqual(serviceUpdated.metricName, options.metricName);
assert.strictEqual(serviceUpdated.metricUnit, options.metricUnit);
assert.strictEqual(serviceUpdated.ratePerUnit, options.ratePerUnit);
assert.strictEqual(serviceUpdated.isActive, options.isActive);
assert.strictEqual(serviceUpdated.calculationFn, options.calculationFn);
    });
  });

  describe("#delete", () => {
  let serviceDeleted;
    beforeEach(async () => {
      serviceDeleted = await thisService.remove(serviceCreated._id);
    });

    it("should delete a service", async () => {
      assert.strictEqual(serviceDeleted._id, serviceCreated._id);
    });
  });
});