
import React from 'react';
import { Button as MuiButton } from "../../node_modules/@mui/material"; 
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false
}) => {
  const variantMap = {
    primary: { color: "primary", variant: "contained" },
    success: { color: "success", variant: "contained" },
    danger: { color: "error", variant: "contained" },
    secondary: { color: "secondary", variant: "contained" },
    outline: { color: "primary", variant: "outlined" }
  };

  const muiProps = variantMap[variant] || variantMap.primary;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : 'auto' }}
    >
      <MuiButton
        {...muiProps}
        onClick={onClick}
        disabled={disabled}
        className={className}
        fullWidth={fullWidth}
        sx={{ 
          textTransform: "none", 
          fontWeight: 500,
          borderRadius: 1.5,
          px: 3,
          py: 0.8
        }}
      >
        {children}
      </MuiButton>
    </motion.div>
  );
};

export default Button;
