
    module.exports = function (app) {
        const modelName = "tenant_services";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            tenantId: { type: Schema.Types.ObjectId, ref: "tenants", comment: "TenantID, dropdown, false, true, true, true, true, true, true, tenants, tenants, one-to-one, name," },
paymentId: { type: Schema.Types.ObjectId, ref: "payments", comment: "PaymentID, dropdown, false, true, true, true, true, true, true, payments, payments, one-to-one, sessionId," },
serviceId: { type: Schema.Types.ObjectId, ref: "services", comment: "ServiceID, dropdown, false, true, true, true, true, true, true, services, services, one-to-one, name," },
paymentStatus: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PaymentStatus, p, false, true, true, true, true, true, true, , , , ," },
apiKey: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "ApiKey, p, false, true, true, true, true, true, true, , , , ," },
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