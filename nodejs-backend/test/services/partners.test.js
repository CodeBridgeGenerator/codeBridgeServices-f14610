const assert = require("assert");
const app = require("../../src/app");

describe("partners service", () => {
  let thisService;
  let partnerCreated;

  beforeEach(async () => {
    thisService = await app.service("partners");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (partners)");
  });

  describe("#create", () => {
    const options = {"userId":"aasdfasdfasdfadsfadfa","name":"new value","email":"new value","isActive":true};

    beforeEach(async () => {
      partnerCreated = await thisService.create(options);
    });

    it("should create a new partner", () => {
      assert.strictEqual(partnerCreated.userId, options.userId);
assert.strictEqual(partnerCreated.name, options.name);
assert.strictEqual(partnerCreated.email, options.email);
assert.strictEqual(partnerCreated.isActive, options.isActive);
    });
  });

  describe("#get", () => {
    it("should retrieve a partner by ID", async () => {
      const retrieved = await thisService.get(partnerCreated._id);
      assert.strictEqual(retrieved._id, partnerCreated._id);
    });
  });

  describe("#update", () => {
    let partnerUpdated;
    const options = {"userId":"345345345345345345345","name":"updated value","email":"updated value","isActive":false};

    beforeEach(async () => {
      partnerUpdated = await thisService.update(partnerCreated._id, options);
    });

    it("should update an existing partner ", async () => {
      assert.strictEqual(partnerUpdated.userId, options.userId);
assert.strictEqual(partnerUpdated.name, options.name);
assert.strictEqual(partnerUpdated.email, options.email);
assert.strictEqual(partnerUpdated.isActive, options.isActive);
    });
  });

  describe("#delete", () => {
  let partnerDeleted;
    beforeEach(async () => {
      partnerDeleted = await thisService.remove(partnerCreated._id);
    });

    it("should delete a partner", async () => {
      assert.strictEqual(partnerDeleted._id, partnerCreated._id);
    });
  });
});