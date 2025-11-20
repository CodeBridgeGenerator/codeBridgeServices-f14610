
    module.exports = function (app) {
        const modelName = "tenant_invoices";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            tenantId: { type: Schema.Types.ObjectId, ref: "tenants", comment: "TenantID, dropdown, false, true, true, true, true, true, true, tenants, tenants, one-to-one, name," },
period: { type: Date, comment: "Period, p_date, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "TotalAmount, p, false, true, true, true, true, true, true, , , , ," },
usageLogs: { type: Schema.Types.ObjectId, ref: "usage_logs", comment: "UsageLogs, dropdown, false, true, true, true, true, true, true, usageLogs, usage_logs, one-to-one, requestId," },
generatedAt: { type: Date, comment: "GeneratedAt, p_date, false, true, true, true, true, true, true, , , , ," },

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