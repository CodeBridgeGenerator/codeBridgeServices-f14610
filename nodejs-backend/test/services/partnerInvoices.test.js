const assert = require("assert");
const app = require("../../src/app");

describe("partnerInvoices service", () => {
  let thisService;
  let partnerInvoiceCreated;

  beforeEach(async () => {
    thisService = await app.service("partnerInvoices");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (partnerInvoices)");
  });

  describe("#create", () => {
    const options = {"partnerId":"aasdfasdfasdfadsfadfa","paymentId":"aasdfasdfasdfadsfadfa","period":1763621698137,"totalAmount":"new value","paymentStatus":"new value","tenantInvoices":"aasdfasdfasdfadsfadfa","dueDate":1763621698137};

    beforeEach(async () => {
      partnerInvoiceCreated = await thisService.create(options);
    });

    it("should create a new partnerInvoice", () => {
      assert.strictEqual(partnerInvoiceCreated.partnerId, options.partnerId);
assert.strictEqual(partnerInvoiceCreated.paymentId, options.paymentId);
assert.strictEqual(partnerInvoiceCreated.period, options.period);
assert.strictEqual(partnerInvoiceCreated.totalAmount, options.totalAmount);
assert.strictEqual(partnerInvoiceCreated.paymentStatus, options.paymentStatus);
assert.strictEqual(partnerInvoiceCreated.tenantInvoices, options.tenantInvoices);
assert.strictEqual(partnerInvoiceCreated.dueDate, options.dueDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a partnerInvoice by ID", async () => {
      const retrieved = await thisService.get(partnerInvoiceCreated._id);
      assert.strictEqual(retrieved._id, partnerInvoiceCreated._id);
    });
  });

  describe("#update", () => {
    let partnerInvoiceUpdated;
    const options = {"partnerId":"345345345345345345345","paymentId":"345345345345345345345","period":null,"totalAmount":"updated value","paymentStatus":"updated value","tenantInvoices":"345345345345345345345","dueDate":null};

    beforeEach(async () => {
      partnerInvoiceUpdated = await thisService.update(partnerInvoiceCreated._id, options);
    });

    it("should update an existing partnerInvoice ", async () => {
      assert.strictEqual(partnerInvoiceUpdated.partnerId, options.partnerId);
assert.strictEqual(partnerInvoiceUpdated.paymentId, options.paymentId);
assert.strictEqual(partnerInvoiceUpdated.period, options.period);
assert.strictEqual(partnerInvoiceUpdated.totalAmount, options.totalAmount);
assert.strictEqual(partnerInvoiceUpdated.paymentStatus, options.paymentStatus);
assert.strictEqual(partnerInvoiceUpdated.tenantInvoices, options.tenantInvoices);
assert.strictEqual(partnerInvoiceUpdated.dueDate, options.dueDate);
    });
  });

  describe("#delete", () => {
  let partnerInvoiceDeleted;
    beforeEach(async () => {
      partnerInvoiceDeleted = await thisService.remove(partnerInvoiceCreated._id);
    });

    it("should delete a partnerInvoice", async () => {
      assert.strictEqual(partnerInvoiceDeleted._id, partnerInvoiceCreated._id);
    });
  });
});