import { ThemeProvider } from "@emotion/react";
import { Box, Container, Typography, createTheme } from "@mui/material";
import { deepOrange, deepPurple, red } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";

const RowCount  = () => {
    const[data,setData] = useState([]);

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '1px solid white',
        p: 4,
        outline: "none",
        borderRadius: "12px",
        boxShadow:"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
      
      };
    
    useEffect(() => {
        const fetchData =  () => {
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
            .then((data:any)=> {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [data]); 

  return (
    <div>
        <ThemeProvider theme={darkTheme}>
        <Container fixed sx={{
            ...modalStyle, "&:hover":{
                bgcolor:deepPurple[300]
             }
        }}>
        <Box sx={{
         width:700,height:300,display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column",
        }}>
       <Typography variant="h5" color={"white"} fontSize={"21px"} fontWeight={"500"}>
       Total Count Of Data
       </Typography>
       <br/>
       <Typography variant="h1" color={"GrayText"} fontWeight={"500"} sx={{
       "&:hover":{
        color:"white"
     }
       }}>
       {data?.length}
       </Typography>
        </Box>
   
        </Container>
        </ThemeProvider>
    </div>
  );
};

export default RowCount ;
