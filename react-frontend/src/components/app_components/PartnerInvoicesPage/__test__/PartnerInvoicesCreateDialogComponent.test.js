import React from "react";
import { render, screen } from "@testing-library/react";

import PartnerInvoicesCreateDialogComponent from "../PartnerInvoicesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partnerInvoices create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartnerInvoicesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partnerInvoices-create-dialog-component")).toBeInTheDocument();
});
