
import React from 'react';
import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid rgba(0,0,0,0.05)',
          background: `linear-gradient(135deg, white 0%, #f9fafb 100%)`,
          transition: "0.3s",
          "&:hover": { 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            borderColor: color 
          }
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3
          }}
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="800" sx={{ color: '#1a202c' }}>
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: color || "primary.main",
              width: 52,
              height: 52,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 14px 0 ${color}40`,
            }}
          >
            <Icon style={{ color: "white", fontSize: 26 }} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
