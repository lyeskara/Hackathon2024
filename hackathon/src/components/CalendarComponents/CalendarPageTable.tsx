import { FC, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import Paper from '@mui/material/Paper';

const RedTableCell = styled(TableCell)(() => ({color: "red"}));
const GreenTableCell = styled(TableCell)(() => ({color: "green"}));
export const CalendarPageTable: FC  = () => {
    const [happyCustomers, setHappyCustomers] = useState<number>(0);
    const [turnedAwayCustomers, setTurnedAwayCustomers] = useState<number>(0);

    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [totalLoss, setTotalLoss] = useState<number>(0);

    return(
        <TableContainer component={Paper}>
            <Table id="Number of customers table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="50%"># Of Satisfied Customers</TableCell>
                        <TableCell align="center" width="50%"># Of Turned Away Customers</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <GreenTableCell align="center">2</GreenTableCell>
                        <RedTableCell align="center">2</RedTableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Table id="Total money">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="50%">Total Revenue</TableCell>
                        <TableCell align="center" width="50%">Total Loss</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <GreenTableCell align="center">2</GreenTableCell>
                        <RedTableCell align="center">2</RedTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}