import React from "react";
import { render, screen } from "@testing-library/react";

import UsageLogsPage from "../UsageLogsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders usageLogs page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UsageLogsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("usageLogs-datatable")).toBeInTheDocument();
    expect(screen.getByRole("usageLogs-add-button")).toBeInTheDocument();
});
