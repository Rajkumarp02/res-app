// AddButton.js
import React from 'react';
import { Button } from '@mui/material';

export default function Buttons({ handleOpen,name,color,sx }:any) {
  return (
   <Button variant="contained" color={color} onClick={handleOpen}
    sx={sx}
    >
     {name}
    </Button>
   );
}



