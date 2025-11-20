
    module.exports = function (app) {
        const modelName = "partners";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userId: { type: Schema.Types.ObjectId, ref: "users", comment: "UserID, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
name: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
isActive: { type: Boolean, required: false, comment: "IsActive, p_boolean, false, true, true, true, true, true, true, , , , ," },

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