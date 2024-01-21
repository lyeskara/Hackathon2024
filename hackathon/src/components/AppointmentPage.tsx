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
import { Button, Snackbar } from '@mui/material';
import { disableAllYearsNot2022, disableDecemberToSeptember } from '../utils';
import axios from 'axios';

export const AppointmentPage = () => {
    const [vehicule, setVehicule] = useState<VehicleType | "">("");
    const [dayValue, setDayValue] = useState<Date | null>(null);
    const [timeValue, setTimeValue] = useState<Date | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const IP_ADDRESS = import.meta.env.VITE_API_URL

    const addAppointment = async () => {
        if(vehicule && dayValue && timeValue){
            try {
                const newDay = new Date(dayValue)
                const newTime = new Date(timeValue)
                const month = newDay.getMonth();
                const day = newDay.getDate();
                const hour = newTime.getHours();
                const minute = newTime.getMinutes();
                const bookingTime = new Date(2022, month, day, hour, minute);

                const formData = new FormData();                
                formData.append('vehicule', vehicule);
                formData.append('bookingTime', bookingTime.toISOString());

                const response = await axios.post(
                    `${IP_ADDRESS}/add_appointment`, 
                    formData,
                    {headers: {'Content-Type': 'multipart/form-data'}} );                

                console.log(response.data);
                    
                if (!response.data) {
                    // Handle non-OK responses
                    console.log('Error:', response.status, response.statusText);
                    setSnackbarOpen(true);
                    return;
                }
                else{
                    console.log('Server response:', response.data);
                
                }
            }
            catch (error) {
                console.log('Error:', error);
            }
        }
    };

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
                        onChange={(newVehicule: SelectChangeEvent<VehicleType>) => setVehicule(newVehicule.target.value as VehicleType)}
                        fullWidth
                    >
                        <MenuItem value={VehicleType.Compact}>Compact</MenuItem>
                        <MenuItem value={VehicleType.Medium}>Medium</MenuItem>
                        <MenuItem value={VehicleType.FullSize}>Full Size</MenuItem>
                        <MenuItem value={VehicleType.ClassOneTruck}>Class 1 Truck</MenuItem>
                        <MenuItem value={VehicleType.ClassTwoTruck}>Class 2 Truck</MenuItem>
                    </Select>
                    <DateCalendar value={dayValue} onChange={(newDate) => setDayValue(newDate)} shouldDisableMonth={disableDecemberToSeptember} shouldDisableYear={disableAllYearsNot2022}/>
                    <TimePicker value={timeValue} onChange={(newTime) => setTimeValue(newTime)} label="Basic time picker" />
                    <Box display="flex" justifyContent="center" marginTop="10px">
                        <Button onClick={addAppointment} variant='contained'>Submit</Button>
                    </Box>
                </FormControl>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Appointment is already taken"
                color='error'
            />
        </Box>
    );
}
