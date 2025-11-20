import React from "react";
import { render, screen } from "@testing-library/react";

import PartnersPage from "../PartnersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partners page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartnersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partners-datatable")).toBeInTheDocument();
    expect(screen.getByRole("partners-add-button")).toBeInTheDocument();
});
