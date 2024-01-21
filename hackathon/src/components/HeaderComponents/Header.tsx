import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ToggleColorMode } from './ColorPaletteButton';
import { FC, useState } from 'react';
import { ThemeColor } from '../../types';
import { HeaderDrawer } from './HeaderDrawer';
import TireRepairIcon from '@mui/icons-material/TireRepair';

interface HeaderProps {
    themeColor: ThemeColor;
    setThemeColor: React.Dispatch<React.SetStateAction<ThemeColor>>;
}

export const Header: FC<HeaderProps> = (props: HeaderProps): JSX.Element => {  
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
    return (
        <Box>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                aria-label="menu"
                onClick={() => setDrawerIsOpen(true)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <TireRepairIcon />
                The Tire Shop
            </Typography>
            <ToggleColorMode setColorTheme={props.setThemeColor} themeColor={props.themeColor} />
            </Toolbar>
        </AppBar>
        <HeaderDrawer drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen} />
        </Box>
    );
}