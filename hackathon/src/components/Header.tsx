import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ToggleColorMode } from './ColorPaletteButton';
import { FC } from 'react';
import { ThemeColor } from '../types';

interface HeaderProps {
  themeColor: ThemeColor;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColor>>;
}

export const Header: FC<HeaderProps> = (props: HeaderProps): JSX.Element => {  
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tire Shop
          </Typography>
          <ToggleColorMode setColorTheme={props.setThemeColor} themeColor={props.themeColor} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}