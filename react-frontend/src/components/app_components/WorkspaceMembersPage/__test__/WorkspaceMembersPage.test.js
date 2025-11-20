import React from "react";
import { render, screen } from "@testing-library/react";

import WorkspaceMembersPage from "../WorkspaceMembersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders workspaceMembers page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WorkspaceMembersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("workspaceMembers-datatable")).toBeInTheDocument();
    expect(screen.getByRole("workspaceMembers-add-button")).toBeInTheDocument();
});
