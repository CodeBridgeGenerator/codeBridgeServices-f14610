const assert = require("assert");
const app = require("../../src/app");

describe("workspaces service", () => {
  let thisService;
  let workspaceCreated;

  beforeEach(async () => {
    thisService = await app.service("workspaces");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (workspaces)");
  });

  describe("#create", () => {
    const options = {"ownerId":"aasdfasdfasdfadsfadfa","name":"new value","isDefault":true};

    beforeEach(async () => {
      workspaceCreated = await thisService.create(options);
    });

    it("should create a new workspace", () => {
      assert.strictEqual(workspaceCreated.ownerId, options.ownerId);
assert.strictEqual(workspaceCreated.name, options.name);
assert.strictEqual(workspaceCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a workspace by ID", async () => {
      const retrieved = await thisService.get(workspaceCreated._id);
      assert.strictEqual(retrieved._id, workspaceCreated._id);
    });
  });

  describe("#update", () => {
    let workspaceUpdated;
    const options = {"ownerId":"345345345345345345345","name":"updated value","isDefault":false};

    beforeEach(async () => {
      workspaceUpdated = await thisService.update(workspaceCreated._id, options);
    });

    it("should update an existing workspace ", async () => {
      assert.strictEqual(workspaceUpdated.ownerId, options.ownerId);
assert.strictEqual(workspaceUpdated.name, options.name);
assert.strictEqual(workspaceUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let workspaceDeleted;
    beforeEach(async () => {
      workspaceDeleted = await thisService.remove(workspaceCreated._id);
    });

    it("should delete a workspace", async () => {
      assert.strictEqual(workspaceDeleted._id, workspaceCreated._id);
    });
  });
});