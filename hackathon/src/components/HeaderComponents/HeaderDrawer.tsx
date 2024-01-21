import { Button, Divider, Drawer, IconButton } from "@mui/material"
import { Box } from "@mui/system";
import { FC } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from "react-router";
import CarRepairIcon from '@mui/icons-material/CarRepair';

interface HeaderDrawerProps {
    drawerIsOpen: boolean;
    setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderDrawer: FC<HeaderDrawerProps> = (props: HeaderDrawerProps): JSX.Element => {
    const navigate = useNavigate();
    const goToHomePage = () => {navigate("/"); props.setDrawerIsOpen(false)};
    const goToCalendarPage = () => {navigate("/calendar"); props.setDrawerIsOpen(false)};
    const goToAppointmentPage = () => {navigate("/appointment"); props.setDrawerIsOpen(false)};

    return (
        <Drawer
            anchor="left"
            open={props.drawerIsOpen}
            onClose={() => {props.setDrawerIsOpen(false)}}
            PaperProps={{sx: {width: "20%"}}}
        >
            <Box width="100%" display="flex" justifyContent="right" flexDirection="column">
                <Box display="flex" justifyContent="right">
                    <IconButton aria-label="closedrawer" onClick={() => props.setDrawerIsOpen(false)}>
                        <ClearIcon />
                    </IconButton>
                </Box>
                <Divider/>
                <Button onClick={() => goToHomePage()} sx={{width: "80%", display: "flex", justifyContent: "space-between", alignSelf:"center"}} endIcon={<HomeIcon/>}>Home</Button>
                <Button onClick={() => goToAppointmentPage()} sx={{width: "80%", display: "flex", justifyContent: "space-between", alignSelf:"center"}} endIcon={<CarRepairIcon/>}>Appointment</Button>
                <Button onClick={() => goToCalendarPage()} sx={{width: "80%", display: "flex", justifyContent: "space-between", alignSelf:"center"}} endIcon={<CalendarMonthIcon/>}>Calendar</Button>
            </Box>
        </Drawer>
    );
}