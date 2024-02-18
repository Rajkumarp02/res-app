import styled from "@emotion/styled";
import {Box, Button, CssBaseline, Grid, ListItem, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "./Crud/Button";
import UpdateModal from "./Crud/Edit";
import AddModal from "./Crud/Add";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 18,
    backgroundColor: "#9900ff",
    color: "white",
    textAlign: 'start',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    textAlign: 'start',
    margin:"20px",
    backgroundColor:"slategrey",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor:"white",

  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Student {
  id: number;
  name: string;
  age: number;
  email:string;
  grade:string;
}

const Student = () => {
  const [data, setData] = useState<Student[]>([]);
  //console.log(data);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
 

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
    setOpenUpdateModal(false);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenUpdateModal = (student:any) => {
    setEditData(student);
    setOpenUpdateModal(true);
    setOpenAddModal(false); 
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  useEffect(() => {
     const fetchData = async () => {
      const fetch = await axios.get("http://localhost:8000/students");
      const res = fetch.data;
      setData(res);
    }
    fetchData()
  }, [data])

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const DeleteModal = async () => {
    try {
      if(data.length > 0){
      const idToDelete = data[0].id;
      const confirmDelete = window.confirm('Are you sure you want to delete this studentData?');

      if (confirmDelete) {
        await axios.delete(`http://localhost:8000/students/${idToDelete}`);
        toast.warning('Student data deleted successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    }
  }
    } catch (error) {
      toast.error('Failed to delete student', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <CssBaseline/>
     {/* */}
    <Box sx={{
          width:"100%",
          height:"100vh",
          borderRadius: 1,
          bgcolor: deepPurple[500],
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}>
          
    <Grid container direction="row" justifyContent="center" spacing={2}>
   <Grid item xs={12} md={12}>
   <Buttons handleOpen={handleOpenAddModal} name="Add Data"  sx={{ml:{md:6}, m:4}}/>
    <ListItem>
    <TableContainer component={Paper} sx={{ml:{md:4},mr:{md:4}}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Grade</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((row : any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" align="justify" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="justify">{row.age}</StyledTableCell>
              <StyledTableCell align="justify">{row.grade}</StyledTableCell>
              <StyledTableCell align="justify">{row.email}</StyledTableCell>
              <StyledTableCell align="justify">
                <Buttons handleOpen={() => handleOpenUpdateModal(row)} name="Edit" color="success" />
                </StyledTableCell>
              <StyledTableCell align="justify">
                <Button variant="contained" color="error" onClick={DeleteModal}>Delete</Button>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        
      </Table>
      <Pagination  
      count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="secondary"
        shape="rounded"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          p:1,
        }} 
        />
    </TableContainer>
    </ListItem>
  </Grid>
  
</Grid>
</Box>
<AddModal open={openAddModal} handleClose={handleCloseAddModal} />
    
<UpdateModal open={openUpdateModal} handleClose={handleCloseUpdateModal} studentData={editData} />

  </div>
  );
};

export default Student;
