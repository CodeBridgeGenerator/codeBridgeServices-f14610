import React from "react";
import { render, screen } from "@testing-library/react";

import WorkspacesPage from "../WorkspacesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders workspaces page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WorkspacesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("workspaces-datatable")).toBeInTheDocument();
    expect(screen.getByRole("workspaces-add-button")).toBeInTheDocument();
});
