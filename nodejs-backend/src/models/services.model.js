
    module.exports = function (app) {
        const modelName = "services";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
initialPrice: { type: Number, max: 99999999, comment: "InitialPrice, p_number, false, true, true, true, true, true, true, , , , ," },
metricName: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "MetricName, p, false, true, true, true, true, true, true, , , , ," },
metricUnit: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "MetricUnit, p, false, true, true, true, true, true, true, , , , ," },
ratePerUnit: { type: Number, max: 99999999, comment: "RatePerUnit, p_number, false, true, true, true, true, true, true, , , , ," },
isActive: { type: Boolean, required: false, comment: "IsActive, p_boolean, false, true, true, true, true, true, true, , , , ," },
calculationFn: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "CalculationFn, p, false, true, true, true, true, true, true, , , , ," },

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