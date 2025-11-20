import React from "react";
import { render, screen } from "@testing-library/react";

import TenantInvoicesPage from "../TenantInvoicesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders tenantInvoices page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TenantInvoicesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tenantInvoices-datatable")).toBeInTheDocument();
    expect(screen.getByRole("tenantInvoices-add-button")).toBeInTheDocument();
});
