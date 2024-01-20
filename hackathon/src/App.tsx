import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { Header } from "./components/Header";
import { routes } from "./routes";
import { darkTheme, lightTheme } from "./themes";
import { useState } from "react";
import { ThemeColor } from "./types";

export function App() {
    const [themeColor, setThemeColor] = useState<ThemeColor>("dark");
    return (
        <ThemeProvider theme={themeColor === "dark" ? darkTheme : lightTheme}>
            <CssBaseline />
            <Header themeColor={themeColor} setThemeColor={setThemeColor}/>
            <RouterProvider router={routes}/>
        </ThemeProvider>
    );
}