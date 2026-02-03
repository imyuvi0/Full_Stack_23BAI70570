
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from "@mui/material";
import { motion } from 'framer-motion';

import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useLibrary } from "../context/LibraryContext";

const Navigation = () => {
  const { currentPage, setCurrentPage } = useLibrary();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <HomeIcon /> },
    { id: "books", label: "Books", icon: <MenuBookIcon /> },
    { id: "members", label: "Members", icon: <PeopleIcon /> },
    { id: "borrowings", label: "Borrowings", icon: <AccessTimeIcon /> }
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <MenuBookIcon color="primary" sx={{ fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5, color: '#1a202c' }}>
              Library<span style={{ color: '#1976d2' }}>OS</span>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  startIcon={item.icon}
                  onClick={() => setCurrentPage(item.id)}
                  sx={{
                    px: 2,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    position: 'relative',
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.05)' }
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: '3px',
                        backgroundColor: '#1976d2',
                        borderRadius: '4px 4px 0 0'
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
