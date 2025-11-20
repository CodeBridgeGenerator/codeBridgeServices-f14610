
const workspaces = require("./workspaces/workspaces.service.js");
const workspaceMembers = require("./workspaceMembers/workspaceMembers.service.js");
const partners = require("./partners/partners.service.js");
const partnerInvoices = require("./partnerInvoices/partnerInvoices.service.js");
const tenants = require("./tenants/tenants.service.js");
const tenantInvoices = require("./tenantInvoices/tenantInvoices.service.js");
const payments = require("./payments/payments.service.js");
const usageLogs = require("./usageLogs/usageLogs.service.js");
const tenantServices = require("./tenantServices/tenantServices.service.js");
const services = require("./services/services.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    
  app.configure(workspaces);
  app.configure(workspaceMembers);
  app.configure(partners);
  app.configure(partnerInvoices);
  app.configure(tenants);
  app.configure(tenantInvoices);
  app.configure(payments);
  app.configure(usageLogs);
  app.configure(tenantServices);
  app.configure(services);
    // ~cb-add-configure-service-name~
};
