import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Header } from "./components/HeaderComponents/Header";
import { darkTheme, lightTheme } from "./themes";
import { useState } from "react";
import { ThemeColor } from "./types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Route, Routes } from "react-router-dom";
import { AppointmentPage } from "./components/AppointmentPage";
import { CalendarPage } from "./components/CalendarComponents/CalendarPage";
import HomePage from "./components/HomePage";

export function App() {
    const [themeColor, setThemeColor] = useState<ThemeColor>("dark");
    return (
        <ThemeProvider theme={themeColor === "dark" ? darkTheme : lightTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />
                <Header themeColor={themeColor} setThemeColor={setThemeColor}/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/appointment" element={<AppointmentPage/>}/>
                    <Route path="/calendar" element={<CalendarPage/>}/>
                </Routes>
            </LocalizationProvider>
        </ThemeProvider>
    );
}