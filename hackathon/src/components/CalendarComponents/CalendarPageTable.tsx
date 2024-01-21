import { FC } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import Paper from '@mui/material/Paper';

const RedTableCell = styled(TableCell)(() => ({color: "red"}));
const GreenTableCell = styled(TableCell)(() => ({color: "green"}));

interface CalendarPageTableProps {
    happyCustomers: number;
    turnedAwayCustomers: number;
    totalRevenue: number;
    totalLoss: number;
}
export const CalendarPageTable: FC<CalendarPageTableProps> = (props) => {
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
                        <GreenTableCell align="center">{props.happyCustomers}</GreenTableCell>
                        <RedTableCell align="center">{props.turnedAwayCustomers}</RedTableCell>
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
                        <GreenTableCell align="center">{props.totalRevenue}</GreenTableCell>
                        <RedTableCell align="center">{props.totalLoss}</RedTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}