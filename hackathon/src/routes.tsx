import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import { AppointmentPage } from "./components/AppointmentPage";

export const routes = createBrowserRouter([
    {
        path: "",
        element: <HomePage/>
    },
    {
        path: "/appointment",
        element: <AppointmentPage/>
    },
])