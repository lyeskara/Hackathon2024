import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#f0f6fc",
        }
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#FFFFFF",
        },
        secondary: {
            main: "#000000",
        }
    },
    
});