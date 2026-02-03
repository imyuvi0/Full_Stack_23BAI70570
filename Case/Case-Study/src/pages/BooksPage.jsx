
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card as MuiCard,
  CardContent,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from 'framer-motion';

import { useLibrary } from "../context/LibraryContext";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";

const BooksPage = () => {
  const { books, addBook, updateBook, deleteBook } = useLibrary();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: ""
  });

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    editingBook
      ? updateBook(editingBook.id, formData)
      : addBook(formData);

    setIsModalOpen(false);
    setEditingBook(null);
    setFormData({ title: "", author: "", isbn: "", category: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" fontWeight="800">
          Books Library
        </Typography>

        <Box display="flex" gap={2}>
          <TextField
            size="small"
            placeholder="Search titles or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 280, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="disabled" />
                </InputAdornment>
              ),
            }}
          />

          <Button onClick={() => {
            setEditingBook(null);
            setFormData({ title: "", author: "", isbn: "", category: "" });
            setIsModalOpen(true);
          }}>
            Add New Book
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <AnimatePresence>
          {filteredBooks.map((book) => (
            /* Fix: Use 'size' instead of 'item' for MUI v6 Grid */
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={book.id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <MuiCard sx={{ 
                  borderRadius: 3, 
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
                  transition: '0.3s'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box mb={2}>
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        by {book.author}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                      <Typography variant="caption" sx={{ px: 1.5, py: 0.5, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 10, fontWeight: 600 }}>
                        {book.category}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ISBN: {book.isbn}
                      </Typography>
                    </Box>

                    <Box display="flex" gap={1.5}>
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={() => {
                          setEditingBook(book);
                          setFormData(book);
                          setIsModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        fullWidth
                        onClick={() => deleteBook(book.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </MuiCard>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBook ? "Edit Book" : "Add Book"}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Input
            label="Book Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            label="Author Name"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <Input
            label="ISBN Number"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          />
          <Input
            label="Genre / Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <Box mt={2}>
            <Button onClick={handleSubmit} fullWidth>
              {editingBook ? "Update Book" : "Create Book Entry"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </motion.div>
  );
};

export default BooksPage;
