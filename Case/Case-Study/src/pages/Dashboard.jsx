
import React from 'react';
import { BookOpen, Check, Users, Clock } from "lucide-react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Avatar
} from "@mui/material";
import { motion } from 'framer-motion';

import { useLibrary } from "../context/LibraryContext";
import Card from "../components/Card";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const { books, members, borrowings } = useLibrary();

  const availableBooks = books.filter(b => b.available).length;
  const activeBorrowings = borrowings.filter(b => !b.returned).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <Typography variant="h5" fontWeight="800" mb={4}>
        Overview
      </Typography>

      <Grid container spacing={3} mb={5}>
        {/* Fix: Use 'size' instead of 'item' for MUI v6 Grid compatibility */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Collection"
            value={books.length}
            icon={BookOpen}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Available Titles"
            value={availableBooks}
            icon={Check}
            color="#2e7d32"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Registered Members"
            value={members.length}
            icon={Users}
            color="#7b1fa2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Borrows"
            value={activeBorrowings}
            icon={Clock}
            color="#ed6c02"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              New Additions
            </Typography>

            <Box display="flex" flexDirection="column" gap={1.5}>
              {books.slice().reverse().slice(0, 5).map((book, idx) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                    borderRadius={3}
                    sx={{ bgcolor: '#f9fafb', border: '1px solid rgba(0,0,0,0.02)' }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32, fontSize: 14 }}>
                        {book.title[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="700">
                          {book.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {book.author}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={book.available ? "Available" : "Borrowed"}
                      color={book.available ? "success" : "error"}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 600, border: 'none', bgcolor: book.available ? 'success.light' : 'error.light', color: 'white' }}
                    />
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Live Borrows
            </Typography>

            <Box display="flex" flexDirection="column" gap={1.5}>
              {borrowings
                .filter(b => !b.returned)
                .slice(0, 5)
                .map((borrowing, idx) => {
                  const book = books.find(b => b.id === borrowing.bookId);
                  const member = members.find(m => m.id === borrowing.memberId);

                  return (
                    <motion.div
                      key={borrowing.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Box
                        p={2}
                        borderRadius={3}
                        sx={{ bgcolor: '#f9fafb', border: '1px solid rgba(0,0,0,0.02)' }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                          <Box>
                            <Typography variant="body2" fontWeight="700">
                              {book?.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Borrowed by {member?.name}
                            </Typography>
                          </Box>
                          <Box textAlign="right">
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#ed6c02', bgcolor: '#fff3e0', px: 1, py: 0.2, borderRadius: 1 }}>
                              Due: {borrowing.dueDate}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  );
                })}
              {activeBorrowings === 0 && (
                <Box textAlign="center" py={4}>
                  <Typography variant="body2" color="text.secondary">No active borrowings</Typography>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Dashboard;
