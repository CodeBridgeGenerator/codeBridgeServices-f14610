import React from "react";
import { render, screen } from "@testing-library/react";

import TenantsPage from "../TenantsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders tenants page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TenantsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tenants-datatable")).toBeInTheDocument();
    expect(screen.getByRole("tenants-add-button")).toBeInTheDocument();
});
