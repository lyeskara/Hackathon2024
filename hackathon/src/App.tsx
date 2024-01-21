import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RouterProvider, useNavigate } from "react-router-dom";
import { Header } from "./components/HeaderComponents/Header";
import { routes } from "./routes";
import { darkTheme, lightTheme } from "./themes";
import { useState } from "react";
import { ThemeColor } from "./types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export function App() {
    const [themeColor, setThemeColor] = useState<ThemeColor>("dark");
    //const navigate = useNavigate();
    return (
        <ThemeProvider theme={themeColor === "dark" ? darkTheme : lightTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />
                <Header themeColor={themeColor} setThemeColor={setThemeColor}/>
                <RouterProvider router={routes}/>
            </LocalizationProvider>
        </ThemeProvider>
    );
}