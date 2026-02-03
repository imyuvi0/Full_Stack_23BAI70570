
import React from 'react';
import { TextField } from "@mui/material";

const Input = ({ label, ...props }) => {
  return (
    <TextField
      label={label}
      fullWidth
      size="small"
      variant="outlined"
      margin="dense"
      sx={{ 
        '& .MuiOutlinedInput-root': { borderRadius: 2 }
      }}
      {...props}
    />
  );
};

export default Input;
