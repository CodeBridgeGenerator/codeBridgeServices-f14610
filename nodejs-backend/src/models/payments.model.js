
    module.exports = function (app) {
        const modelName = "payments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            sessionId: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "SessionID, p, false, true, true, true, true, true, true, , , , ," },
paymentStatus: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PaymentStatus, p, false, true, true, true, true, true, true, , , , ," },
paymentType: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PaymentType, p, false, true, true, true, true, true, true, , , , ," },
amount: { type: Number, max: 99999999, comment: "Amount, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
paymentIntendId: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PaymentIntendID, p, false, true, true, true, true, true, true, , , , ," },
payedAt: { type: Date, comment: "PayedAt, p_date, false, true, true, true, true, true, true, , , , ," },

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