
    module.exports = function (app) {
        const modelName = "workspaces";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ownerId: { type: Schema.Types.ObjectId, ref: "users", comment: "OwnerID, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
name: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
isDefault: { type: Boolean, required: false, comment: "IsDefault, p_boolean, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };