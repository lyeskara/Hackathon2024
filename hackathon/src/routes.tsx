import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";

export const routes = createBrowserRouter([
    {
        path: "",
        element: <HomePage/>
    }
])