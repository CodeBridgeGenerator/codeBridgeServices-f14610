import React from "react";
import { render, screen } from "@testing-library/react";

import WorkspaceMembersEditDialogComponent from "../WorkspaceMembersEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders workspaceMembers edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WorkspaceMembersEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("workspaceMembers-edit-dialog-component")).toBeInTheDocument();
});
