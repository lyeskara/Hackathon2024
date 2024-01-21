import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import { AppointmentPage } from "./components/AppointmentPage";
import { CalendarPage } from "./components/CalendarComponents/CalendarPage";
import { FC } from "react";

export const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/appointment" element={<AppointmentPage/>}/>
                <Route path="/calendar" element={<CalendarPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}