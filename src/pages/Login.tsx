import * as React from 'react';
import { Box } from '@mui/system';
import { Button, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { OidcSecure } from '@axa-fr/react-oidc';

export default function Auth() {
  const [signup, setSignup] = React.useState(false);


  const handleClick = () => {
    setSignup(!signup);
  };



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box
        component="form"
        sx={{
          width: 1000,
          height: 500,
          borderRadius: 1,
          bgcolor: blue[50],
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" component="h2" color="white" bgcolor="purple" sx={{ px: 5, p: 1, m: 3, borderRadius: '5px' }}>
          {signup ? 'SIGNUP PAGE' : 'SIGNIN PAGE'}
        </Typography>

        <div>
          <FormControl sx={{ m: 3, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username" sx={{ color: 'gray', fontSize: '15px', fontWeight: 'bold' }}>Username</InputLabel>
            <OutlinedInput id="outlined-adornment-username" label="Username" />
          </FormControl>
          <FormControl sx={{ m: 3, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: 'gray', fontSize: '15px', fontWeight: 'bold' }}>Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="password"
              label="Password"
            />
          </FormControl>
        </div>

        <Button variant="contained" sx={{ px: 6, m: 3, fontSize: '18px' }}>
          {signup ? 'Sign Up' : 'Sign In'}
        </Button>

        <div style={{ padding: '10px 20px', margin: '10px 20px', textAlign: 'center', fontSize: '13px' }}>
          {signup ? 'Already have an account?' : "Don't have an account?"}
          <button type="button" style={{ border: 'none', color: 'rgb(21, 158, 212)', fontSize: '13px', fontWeight: '400' }} onClick={handleClick}>
            {signup ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </Box>

      <OidcSecure>
        <Button>Login</Button>
      </OidcSecure>
    </div>
  );
}
