
import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

const SelectMUI = ({ label, options, ...props }) => {
  const labelId = `${label?.replace(/\s+/g, "-").toLowerCase()}-label`;

  return (
    <FormControl fullWidth size="small" margin="dense">
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        label={label}
        sx={{ borderRadius: 2 }}
        {...props}
      >
        <MenuItem value="">
          <em>Select...</em>
        </MenuItem>

        {options.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMUI;
