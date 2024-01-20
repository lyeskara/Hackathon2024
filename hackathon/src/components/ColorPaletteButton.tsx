import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeColor } from '../types';
import { FC } from 'react';

interface ColorPaletteButtonProps{
    themeColor: ThemeColor;
    setColorTheme: React.Dispatch<React.SetStateAction<ThemeColor>>;
}

export const ToggleColorMode: FC<ColorPaletteButtonProps> = (props: ColorPaletteButtonProps): JSX.Element => {  
    function toggleColorMode() {
        if (props.themeColor === "dark") {
            props.setColorTheme("light");
        } else {
            props.setColorTheme("dark");
        }
    }

    return (
        <Box>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {props.themeColor === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
}