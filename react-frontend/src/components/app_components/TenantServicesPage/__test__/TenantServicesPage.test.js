import React from "react";
import { render, screen } from "@testing-library/react";

import TenantServicesPage from "../TenantServicesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders tenantServices page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TenantServicesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tenantServices-datatable")).toBeInTheDocument();
    expect(screen.getByRole("tenantServices-add-button")).toBeInTheDocument();
});
