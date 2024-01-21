import { Box, Button, FormControl, Paper, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { FC, useState } from "react";
import { disableAllYearsNot2022, disableDecemberToSeptember } from "../../utils";
import { CalendarPageTable } from "./CalendarPageTable";
import axios from "axios";

export const CalendarPage: FC = () => {    
    const [dateValue, setDateValue] = useState<Date>();
    const [generatedDateValue, setGeneratedDateValue] = useState<Date>();   
    const IP_ADDRESS = import.meta.env.VITE_API_URL
    const [happyCustomers, setHappyCustomers] = useState<number>(0);
    const [turnedAwayCustomers, setTurnedAwayCustomers] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [totalLoss, setTotalLoss] = useState<number>(0);
    const generateData = async () => {        
        if(dateValue){
            try {
                const response = await axios.get(`${IP_ADDRESS}/get_appointments`, {params: {date: dateValue.toISOString()}});                
                setGeneratedDateValue(dateValue);

                if (!response.data) {
                    // Handle non-OK responses
                    console.error('Error:', response.status, response.statusText);
                    return;
                }
                else{
                    console.log('Server response:', response.data);
                    console.log(response.data);
                    
                    setHappyCustomers(response.data.appointments.length);
                    setTotalRevenue(response.data.profit_made);
                    setTurnedAwayCustomers(response.data.turned_away);
                    setTotalLoss(response.data.money_lost);
                }
            }
            catch (error) {
                console.error('Error:', error);
            }
        }
    }

    return(
        <Box display="flex" justifyContent="center" marginTop="20px">
            <Paper sx={{width:"50%", minHeight:"75%", display:"flex", alignItems:"center", flexDirection:"column", alignSelf:"center"}}  elevation={3}>
                <Typography variant="h6" marginBottom="8px">Schedule</Typography>
                <FormControl sx={{width:"50%"}}>
                    <DateCalendar 
                        value={dateValue} 
                        onChange={(newValue) => setDateValue(newValue)}
                        shouldDisableMonth={disableDecemberToSeptember} 
                        shouldDisableYear={disableAllYearsNot2022}
                    />
                    <Box display="flex" justifyContent="center">
                        <Button onClick={generateData} variant='contained'>Generate Data</Button>
                    </Box>
                </FormControl>
                <Typography variant="h6" marginTop="10px">Data for: {generatedDateValue ? generatedDateValue.toString() : ""}</Typography>
                <CalendarPageTable 
                    happyCustomers={happyCustomers}
                    turnedAwayCustomers={turnedAwayCustomers}
                    totalRevenue={totalRevenue}
                    totalLoss={totalLoss}
                />
            </Paper>
        </Box>
    );
}