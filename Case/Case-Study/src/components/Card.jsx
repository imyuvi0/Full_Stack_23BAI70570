
import React from 'react';
import { Card as MuiCard, CardContent } from "@mui/material";
import { motion } from 'framer-motion';

const Card = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-100"
    >
      <MuiCard
        elevation={3}
        sx={{
          borderRadius: 3,
          height: "100%",
          transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: 8,
            transform: 'translateY(-4px)'
          }
        }}
        className={className}
      >
        <CardContent sx={{ p: 3 }}>
          {children}
        </CardContent>
      </MuiCard>
    </motion.div>
  );
};

export default Card;
