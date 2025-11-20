const assert = require("assert");
const app = require("../../src/app");

describe("payments service", () => {
  let thisService;
  let paymentCreated;

  beforeEach(async () => {
    thisService = await app.service("payments");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (payments)");
  });

  describe("#create", () => {
    const options = {"sessionId":"new value","paymentStatus":"new value","paymentType":"new value","amount":23,"currency":"new value","paymentIntendId":"new value","payedAt":1763621698176};

    beforeEach(async () => {
      paymentCreated = await thisService.create(options);
    });

    it("should create a new payment", () => {
      assert.strictEqual(paymentCreated.sessionId, options.sessionId);
assert.strictEqual(paymentCreated.paymentStatus, options.paymentStatus);
assert.strictEqual(paymentCreated.paymentType, options.paymentType);
assert.strictEqual(paymentCreated.amount, options.amount);
assert.strictEqual(paymentCreated.currency, options.currency);
assert.strictEqual(paymentCreated.paymentIntendId, options.paymentIntendId);
assert.strictEqual(paymentCreated.payedAt, options.payedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a payment by ID", async () => {
      const retrieved = await thisService.get(paymentCreated._id);
      assert.strictEqual(retrieved._id, paymentCreated._id);
    });
  });

  describe("#update", () => {
    let paymentUpdated;
    const options = {"sessionId":"updated value","paymentStatus":"updated value","paymentType":"updated value","amount":100,"currency":"updated value","paymentIntendId":"updated value","payedAt":null};

    beforeEach(async () => {
      paymentUpdated = await thisService.update(paymentCreated._id, options);
    });

    it("should update an existing payment ", async () => {
      assert.strictEqual(paymentUpdated.sessionId, options.sessionId);
assert.strictEqual(paymentUpdated.paymentStatus, options.paymentStatus);
assert.strictEqual(paymentUpdated.paymentType, options.paymentType);
assert.strictEqual(paymentUpdated.amount, options.amount);
assert.strictEqual(paymentUpdated.currency, options.currency);
assert.strictEqual(paymentUpdated.paymentIntendId, options.paymentIntendId);
assert.strictEqual(paymentUpdated.payedAt, options.payedAt);
    });
  });

  describe("#delete", () => {
  let paymentDeleted;
    beforeEach(async () => {
      paymentDeleted = await thisService.remove(paymentCreated._id);
    });

    it("should delete a payment", async () => {
      assert.strictEqual(paymentDeleted._id, paymentCreated._id);
    });
  });
});