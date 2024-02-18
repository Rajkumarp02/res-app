import { Alert, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
//import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer').min(18, 'Age must be at least 18 years old'),
  grade: Yup.string().required('Grade is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});


const AddModal = ({ open, handleClose }:any) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 104,
    p: 4,
    outline: "none",
    borderRadius: "15px"
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      grade: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axios.post("http://localhost:8000/students", values);
        toast.success('Data added successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setSubmitting(false);
        handleClose();
        resetForm();
      } catch (err) {
        console.log(err);
        setSubmitting(false);
        toast.error('Failed to add data, Please check it.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          //transition: Bounce,
        });
      }
    },
  });

  return (
    <>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={{ ...modalStyle }}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
             Add Student
            </Typography>
          <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={
                formik.touched.name && typeof formik.errors.name === 'string' && formik.errors.name
              }
            />
            </Box>

            <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="age"
              name="age"
              label="Age"
              variant="outlined"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={
                formik.touched.age && typeof formik.errors.age === 'string' && formik.errors.age
              }
            />
            </Box>

             <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="grade"
              name="grade"
              label="Grade"
              variant="outlined"
              value={formik.values.grade}
              onChange={formik.handleChange}
              error={formik.touched.grade && Boolean(formik.errors.grade)}
              helperText={
                formik.touched.grade && typeof formik.errors.grade === 'string' && formik.errors.grade
              }
            />
           </Box>

         <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email&& typeof formik.errors.email === 'string' && formik.errors.email
              }
            />
            </Box>
          
            <Button type="submit" variant="contained" sx={{ mt: 2, mr: 1 }} disabled={formik.isSubmitting}>
              Add
            </Button>
            <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
              Cancel
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
      </>
  );
}
export default AddModal;