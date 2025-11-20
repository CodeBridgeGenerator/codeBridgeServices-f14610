import React from "react";
import { render, screen } from "@testing-library/react";

import TenantServicesEditDialogComponent from "../TenantServicesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders tenantServices edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TenantServicesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tenantServices-edit-dialog-component")).toBeInTheDocument();
});
