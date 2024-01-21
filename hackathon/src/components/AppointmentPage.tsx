import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { VehicleType } from "../types";
import { useState } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers';
import { Button } from '@mui/material';
import { disableAllYearsNot2022, disableDecemberToSeptember } from '../utils';

export const AppointmentPage = () => {
    const [vehicule, setVehicule] = useState<VehicleType | "">("");
    const handleChangeVehicule = () => {};

    return (
        <Box display="flex" justifyContent="center" marginTop="-30px" height="90vh">
            <Paper sx={{width:"50%", height:"85%", display:"flex", alignItems:"center", flexDirection:"column", alignSelf:"center"}}  elevation={3}>
                <Typography variant="h6" marginBottom="8px">Add An Appointment</Typography>
                <FormControl sx={{width:"50%"}}>
                    <InputLabel id="vehicle-type-label">Vehicule Type</InputLabel>
                    <Select
                        labelId="vehicule-type-label"
                        id="vehicule-type"
                        value={vehicule}
                        label="Vehicule Type"
                        onChange={handleChangeVehicule}
                        fullWidth
                    >
                        <MenuItem value={VehicleType.Compact}>Compact</MenuItem>
                        <MenuItem value={VehicleType.Medium}>Medium</MenuItem>
                        <MenuItem value={VehicleType.FullSize}>Full Size</MenuItem>
                        <MenuItem value={VehicleType.ClassOneTruck}>Class 1 Truck</MenuItem>
                        <MenuItem value={VehicleType.ClassTwoTruck}>Class 2 Truck</MenuItem>
                    </Select>
                    <DateCalendar shouldDisableMonth={disableDecemberToSeptember} shouldDisableYear={disableAllYearsNot2022}/>
                    <TimePicker label="Basic time picker" />
                    <Box display="flex" justifyContent="center" marginTop="10px">
                        <Button variant='contained'>Submit</Button>
                    </Box>
                </FormControl>
            </Paper>
        </Box>
    );
}
