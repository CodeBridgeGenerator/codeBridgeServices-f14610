const assert = require("assert");
const app = require("../../src/app");

describe("tenantInvoices service", () => {
  let thisService;
  let tenantInvoiceCreated;

  beforeEach(async () => {
    thisService = await app.service("tenantInvoices");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (tenantInvoices)");
  });

  describe("#create", () => {
    const options = {"tenantId":"aasdfasdfasdfadsfadfa","period":1763621698165,"totalAmount":"new value","usageLogs":"aasdfasdfasdfadsfadfa","generatedAt":1763621698165};

    beforeEach(async () => {
      tenantInvoiceCreated = await thisService.create(options);
    });

    it("should create a new tenantInvoice", () => {
      assert.strictEqual(tenantInvoiceCreated.tenantId, options.tenantId);
assert.strictEqual(tenantInvoiceCreated.period, options.period);
assert.strictEqual(tenantInvoiceCreated.totalAmount, options.totalAmount);
assert.strictEqual(tenantInvoiceCreated.usageLogs, options.usageLogs);
assert.strictEqual(tenantInvoiceCreated.generatedAt, options.generatedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a tenantInvoice by ID", async () => {
      const retrieved = await thisService.get(tenantInvoiceCreated._id);
      assert.strictEqual(retrieved._id, tenantInvoiceCreated._id);
    });
  });

  describe("#update", () => {
    let tenantInvoiceUpdated;
    const options = {"tenantId":"345345345345345345345","period":null,"totalAmount":"updated value","usageLogs":"345345345345345345345","generatedAt":null};

    beforeEach(async () => {
      tenantInvoiceUpdated = await thisService.update(tenantInvoiceCreated._id, options);
    });

    it("should update an existing tenantInvoice ", async () => {
      assert.strictEqual(tenantInvoiceUpdated.tenantId, options.tenantId);
assert.strictEqual(tenantInvoiceUpdated.period, options.period);
assert.strictEqual(tenantInvoiceUpdated.totalAmount, options.totalAmount);
assert.strictEqual(tenantInvoiceUpdated.usageLogs, options.usageLogs);
assert.strictEqual(tenantInvoiceUpdated.generatedAt, options.generatedAt);
    });
  });

  describe("#delete", () => {
  let tenantInvoiceDeleted;
    beforeEach(async () => {
      tenantInvoiceDeleted = await thisService.remove(tenantInvoiceCreated._id);
    });

    it("should delete a tenantInvoice", async () => {
      assert.strictEqual(tenantInvoiceDeleted._id, tenantInvoiceCreated._id);
    });
  });
});