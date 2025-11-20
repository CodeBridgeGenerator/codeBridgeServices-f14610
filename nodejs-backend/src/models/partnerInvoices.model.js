
    module.exports = function (app) {
        const modelName = "partner_invoices";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partnerId: { type: Schema.Types.ObjectId, ref: "partners", comment: "PartnerID, dropdown, false, true, true, true, true, true, true, partners, partners, one-to-one, name," },
paymentId: { type: Schema.Types.ObjectId, comment: "PaymentID, dropdown, false, true, true, true, true, true, true, payments, payments, , sessionId," },
period: { type: Date, comment: "Period, p_date, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "TotalAmount, p, false, true, true, true, true, true, true, , , , ," },
paymentStatus: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "PaymentStatus, p, false, true, true, true, true, true, true, , , , ," },
tenantInvoices: { type: Schema.Types.ObjectId, ref: "tenant_invoices", comment: "TenantInvoices, dropdown, false, true, true, true, true, true, true, tenantInvoices, tenant_invoices, one-to-one, tenantId," },
dueDate: { type: Date, comment: "DueDate, p_date, false, true, true, true, true, true, true, , , , ," },

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