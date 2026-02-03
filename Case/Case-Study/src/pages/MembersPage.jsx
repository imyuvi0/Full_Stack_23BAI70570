
import React, { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputAdornment,
  TableContainer,
  Paper,
  IconButton
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from 'framer-motion';

import { useLibrary } from "../context/LibraryContext";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";

const MembersPage = () => {
  const { members, addMember, updateMember, deleteMember } = useLibrary();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    editingMember
      ? updateMember(editingMember.id, formData)
      : addMember(formData);

    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone
    });
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ md: "center" }}
        gap={2}
        mb={4}
      >
        <Typography variant="h5" fontWeight="800">
          Members Registry
        </Typography>

        <Box display="flex" gap={2} width={{ xs: "100%", md: "auto" }}>
          <TextField
            size="small"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="disabled" />
                </InputAdornment>
              ),
            }}
          />

          <Button onClick={() => {
            setEditingMember(null);
            setFormData({ name: "", email: "", phone: "" });
            setIsModalOpen(true);
          }}>
            <Plus size={18} style={{ marginRight: 8 }} />
            Add Member
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f9fafb' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Contact Number</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Joined On</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <AnimatePresence>
              {filteredMembers.map((member) => (
                <TableRow
                  component={motion.tr}
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: 50 }}
                  sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>

                  <TableCell align="right">
                    <Box display="flex" gap={1} justifyContent="flex-end">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(member)}
                        sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)' }}
                      >
                        <Edit size={16} />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteMember(member.id)}
                        sx={{ bgcolor: 'rgba(211, 47, 47, 0.05)' }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMember ? "Update Member Profile" : "Register New Member"}
      >
        <Box display="flex" flexDirection="column" gap={2.5}>
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Box display="flex" gap={2} mt={2}>
            <Button onClick={handleSubmit} fullWidth>
              {editingMember ? "Save Changes" : "Confirm Registration"}
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

export default MembersPage;
