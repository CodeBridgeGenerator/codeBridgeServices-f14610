import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleWorkspacesPage from "../components/app_components/WorkspacesPage/SingleWorkspacesPage";
import WorkspaceProjectLayoutPage from "../components/app_components/WorkspacesPage/WorkspaceProjectLayoutPage";
import SingleWorkspaceMembersPage from "../components/app_components/WorkspaceMembersPage/SingleWorkspaceMembersPage";
import WorkspaceMemberProjectLayoutPage from "../components/app_components/WorkspaceMembersPage/WorkspaceMemberProjectLayoutPage";
import SinglePartnersPage from "../components/app_components/PartnersPage/SinglePartnersPage";
import PartnerProjectLayoutPage from "../components/app_components/PartnersPage/PartnerProjectLayoutPage";
import SinglePartnerInvoicesPage from "../components/app_components/PartnerInvoicesPage/SinglePartnerInvoicesPage";
import PartnerInvoiceProjectLayoutPage from "../components/app_components/PartnerInvoicesPage/PartnerInvoiceProjectLayoutPage";
import SingleTenantsPage from "../components/app_components/TenantsPage/SingleTenantsPage";
import TenantProjectLayoutPage from "../components/app_components/TenantsPage/TenantProjectLayoutPage";
import SingleTenantInvoicesPage from "../components/app_components/TenantInvoicesPage/SingleTenantInvoicesPage";
import TenantInvoiceProjectLayoutPage from "../components/app_components/TenantInvoicesPage/TenantInvoiceProjectLayoutPage";
import SinglePaymentsPage from "../components/app_components/PaymentsPage/SinglePaymentsPage";
import PaymentProjectLayoutPage from "../components/app_components/PaymentsPage/PaymentProjectLayoutPage";
import SingleUsageLogsPage from "../components/app_components/UsageLogsPage/SingleUsageLogsPage";
import UsageLogProjectLayoutPage from "../components/app_components/UsageLogsPage/UsageLogProjectLayoutPage";
import SingleTenantServicesPage from "../components/app_components/TenantServicesPage/SingleTenantServicesPage";
import TenantServiceProjectLayoutPage from "../components/app_components/TenantServicesPage/TenantServiceProjectLayoutPage";
import SingleServicesPage from "../components/app_components/ServicesPage/SingleServicesPage";
import ServiceProjectLayoutPage from "../components/app_components/ServicesPage/ServiceProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
<Route path="/workspaces/:singleWorkspacesId" exact element={<SingleWorkspacesPage />} />
<Route path="/workspaces" exact element={<WorkspaceProjectLayoutPage />} />
<Route path="/workspaceMembers/:singleWorkspaceMembersId" exact element={<SingleWorkspaceMembersPage />} />
<Route path="/workspaceMembers" exact element={<WorkspaceMemberProjectLayoutPage />} />
<Route path="/partners/:singlePartnersId" exact element={<SinglePartnersPage />} />
<Route path="/partners" exact element={<PartnerProjectLayoutPage />} />
<Route path="/partnerInvoices/:singlePartnerInvoicesId" exact element={<SinglePartnerInvoicesPage />} />
<Route path="/partnerInvoices" exact element={<PartnerInvoiceProjectLayoutPage />} />
<Route path="/tenants/:singleTenantsId" exact element={<SingleTenantsPage />} />
<Route path="/tenants" exact element={<TenantProjectLayoutPage />} />
<Route path="/tenantInvoices/:singleTenantInvoicesId" exact element={<SingleTenantInvoicesPage />} />
<Route path="/tenantInvoices" exact element={<TenantInvoiceProjectLayoutPage />} />
<Route path="/payments/:singlePaymentsId" exact element={<SinglePaymentsPage />} />
<Route path="/payments" exact element={<PaymentProjectLayoutPage />} />
<Route path="/usageLogs/:singleUsageLogsId" exact element={<SingleUsageLogsPage />} />
<Route path="/usageLogs" exact element={<UsageLogProjectLayoutPage />} />
<Route path="/tenantServices/:singleTenantServicesId" exact element={<SingleTenantServicesPage />} />
<Route path="/tenantServices" exact element={<TenantServiceProjectLayoutPage />} />
<Route path="/services/:singleServicesId" exact element={<SingleServicesPage />} />
<Route path="/services" exact element={<ServiceProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
        </Routes>
    );
}

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
