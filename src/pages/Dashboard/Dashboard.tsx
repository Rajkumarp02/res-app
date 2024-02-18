import { Box, Card, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, createTheme, tableCellClasses } from "@mui/material";
import Student from "../Student";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { deepOrange } from "@mui/material/colors";




const Dashboard = () => {
 

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            fontSize: 18,
            color: "gray",
            backgroundColor: "white",
            textAlign: 'center',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 18,
            textAlign: 'center',
            margin: "20px",
            backgroundColor: "slategrey",
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "white",

        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            return new Promise((resolve, reject) => {
                axios.get("http://localhost:8000/students")
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

        fetchData()
            .then((data: any) => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [data]);
    const recentData = data?.slice(0, 4);
    return (

        <div>
            <Box sx={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            m: { md: 22, p: 12 } , 
            }}>
                <ListItem sx={{ 
                     width: 700,
                     height: 500,
                     borderRadius: "12px",
                     border: '2px solid #cfd8dc',
                     display:"flex",
                     justifyContent:"flex-start",
                     textAlign:"flex-start",
                     alignItems:"start",
                     flexDirection:"column"
                 }}>
                   <div>
                   <Paper sx={{
                    background: deepOrange[800],
                    color:"whitesmoke",
                    marginBottom: 1,
                    p: 1,
                    minWidth:200
                }}>
                    <Typography variant="h5" fontWeight="600">
                        Recent History
                    </Typography>
                </Paper>
                   </div>
                   <div>
                    <TableContainer component={Paper} sx={{
                       mt:{md:5}
                    }}>
                        <Table  aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Age</StyledTableCell>
                                    <StyledTableCell align="right">Grade</StyledTableCell>
                                    <StyledTableCell align="right">Email</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentData.map((row: any) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" align="justify" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="justify">{row.age}</StyledTableCell>
                                        <StyledTableCell align="justify">{row.grade}</StyledTableCell>
                                        <StyledTableCell align="justify">{row.email}</StyledTableCell>
                                        <StyledTableCell align="justify">
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    </div>
                </ListItem>
                <ListItem
                    sx={{
                        width: 700,
                        height: 500,
                        borderRadius: "12px",
                        border: '2px solid #cfd8dc',
                        outline: "none",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Typography variant="h4"
                            fontWeight={"600"}
                        >
                            Total Count Of Data
                        </Typography>

                        <Typography variant="h1" color={"GrayText"} fontWeight={"600"} sx={{ 
                            textAlign: 'center',
                        }}>
                            {data?.length}
                        </Typography>
                    </div>
                </ListItem>

            </Box>
        </div>
    );
};

export default Dashboard;
