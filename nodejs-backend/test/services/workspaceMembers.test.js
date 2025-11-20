const assert = require("assert");
const app = require("../../src/app");

describe("workspaceMembers service", () => {
  let thisService;
  let workspaceMemberCreated;

  beforeEach(async () => {
    thisService = await app.service("workspaceMembers");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (workspaceMembers)");
  });

  describe("#create", () => {
    const options = {"workspaceId":"aasdfasdfasdfadsfadfa","userId":"aasdfasdfasdfadsfadfa","role":"new value"};

    beforeEach(async () => {
      workspaceMemberCreated = await thisService.create(options);
    });

    it("should create a new workspaceMember", () => {
      assert.strictEqual(workspaceMemberCreated.workspaceId, options.workspaceId);
assert.strictEqual(workspaceMemberCreated.userId, options.userId);
assert.strictEqual(workspaceMemberCreated.role, options.role);
    });
  });

  describe("#get", () => {
    it("should retrieve a workspaceMember by ID", async () => {
      const retrieved = await thisService.get(workspaceMemberCreated._id);
      assert.strictEqual(retrieved._id, workspaceMemberCreated._id);
    });
  });

  describe("#update", () => {
    let workspaceMemberUpdated;
    const options = {"workspaceId":"345345345345345345345","userId":"345345345345345345345","role":"updated value"};

    beforeEach(async () => {
      workspaceMemberUpdated = await thisService.update(workspaceMemberCreated._id, options);
    });

    it("should update an existing workspaceMember ", async () => {
      assert.strictEqual(workspaceMemberUpdated.workspaceId, options.workspaceId);
assert.strictEqual(workspaceMemberUpdated.userId, options.userId);
assert.strictEqual(workspaceMemberUpdated.role, options.role);
    });
  });

  describe("#delete", () => {
  let workspaceMemberDeleted;
    beforeEach(async () => {
      workspaceMemberDeleted = await thisService.remove(workspaceMemberCreated._id);
    });

    it("should delete a workspaceMember", async () => {
      assert.strictEqual(workspaceMemberDeleted._id, workspaceMemberCreated._id);
    });
  });
});