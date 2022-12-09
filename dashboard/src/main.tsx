import "@tremor/react/dist/esm/tremor.css";
import "./theme/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import store from "./store";
import theme from "./theme";
import { RoutePaths } from "./util/routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={RoutePaths.Dashboard} />
    },
    {
        path: RoutePaths.Dashboard,
        element: <DashboardPage />
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ReduxProvider store={store}>
                <RouterProvider router={router}/>
            </ReduxProvider>
        </ChakraProvider>
    </React.StrictMode>
);

