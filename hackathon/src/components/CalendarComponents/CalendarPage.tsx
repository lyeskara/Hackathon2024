import { Box, Button, FormControl, Paper, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { FC } from "react";
import { disableAllYearsNot2022, disableDecemberToSeptember } from "../../utils";
import { CalendarPageTable } from "./CalendarPageTable";

export const CalendarPage: FC = () => {
    return(
        <Box display="flex" justifyContent="center" marginTop="20px">
            <Paper sx={{width:"50%", minHeight:"75%", display:"flex", alignItems:"center", flexDirection:"column", alignSelf:"center"}}  elevation={3}>
                <Typography variant="h6" marginBottom="8px">Schedule</Typography>
                <FormControl sx={{width:"50%"}}>
                    <DateCalendar shouldDisableMonth={disableDecemberToSeptember} shouldDisableYear={disableAllYearsNot2022}/>
                    <Box display="flex" justifyContent="center">
                        <Button variant='contained'>Generate Data</Button>
                    </Box>
                </FormControl>
                <Typography variant="h6" marginTop="10px">Data for: </Typography>
                <CalendarPageTable />
            </Paper>
        </Box>
    );
}