
    module.exports = function (app) {
        const modelName = "usage_logs";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            tenantServices: { type: Schema.Types.ObjectId, ref: "tenant_services", comment: "TenantServices, dropdown, false, true, true, true, true, true, true, tenantServices, tenant_services, one-to-one, serviceId," },
apiKey: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "ApiKey, p, false, true, true, true, true, true, true, , , , ," },
requestId: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "RequestID, p, false, true, true, true, true, true, true, , , , ," },
unitsConsumed: { type: Number, max: 99999999, comment: "UnitsConsumed, p_number, false, true, true, true, true, true, true, , , , ," },
unitRate: { type: Number, max: 99999999, comment: "UnitRate, p_number, false, true, true, true, true, true, true, , , , ," },
cost: { type: Number, max: 99999999, comment: "Cost, p_number, false, true, true, true, true, true, true, , , , ," },
metaData: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "MetaData, p, false, true, true, true, true, true, true, , , , ," },
dateOfUsage: { type: Date, comment: "DateOfUsage, p_date, false, true, true, true, true, true, true, , , , ," },

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