
import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
  Paper
} from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';

import { useLibrary } from "../context/LibraryContext";
import Modal from "../components/Modal";
import Select from "../components/Select";
import Button from "../components/Button";

const BorrowingsPage = () => {
  const { books, members, borrowings, borrowBook, returnBook } = useLibrary();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ bookId: "", memberId: "" });

  const handleSubmit = () => {
    if (formData.bookId && formData.memberId) {
      borrowBook(
        parseInt(formData.bookId),
        parseInt(formData.memberId)
      );
      setIsModalOpen(false);
      setFormData({ bookId: "", memberId: "" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" fontWeight="800">
          Circulation
        </Typography>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: 8 }} />
          New Transaction
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f9fafb' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Book</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Member</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Borrow Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <AnimatePresence initial={false}>
              {borrowings.map((borrowing) => {
                const book = books.find(b => b.id === borrowing.bookId);
                const member = members.find(m => m.id === borrowing.memberId);

                return (
                  <TableRow
                    component={motion.tr}
                    key={borrowing.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{book?.title}</TableCell>
                    <TableCell>{member?.name}</TableCell>
                    <TableCell>{borrowing.borrowDate}</TableCell>
                    <TableCell>{borrowing.dueDate}</TableCell>

                    <TableCell>
                      <Chip
                        label={borrowing.returned ? "Returned" : "Active"}
                        color={borrowing.returned ? "success" : "warning"}
                        size="small"
                        sx={{ fontWeight: 600, borderRadius: 1.5 }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      {!borrowing.returned && (
                        <Button
                          variant="success"
                          onClick={() => returnBook(borrowing.id)}
                        >
                          Return
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Borrowing Record"
      >
        <Box display="flex" flexDirection="column" gap={3}>
          <Select
            label="Choose Available Book"
            value={formData.bookId}
            onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
            options={books
              .filter(b => b.available)
              .map(b => ({ value: b.id, label: b.title }))}
          />

          <Select
            label="Choose Member"
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            options={members.map(m => ({ value: m.id, label: m.name }))}
          />

          <Box display="flex" gap={2} mt={1}>
            <Button onClick={handleSubmit} fullWidth>
              Confirm Issue
            </Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} fullWidth>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </motion.div>
  );
};

export default BorrowingsPage;
