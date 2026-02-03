
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Slide
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  const { children, ...other } = props;
  return (
    <Slide direction="up" ref={ref} {...other}>
      {children}
    </Slide>
  );
});

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Transition}
      hideBackdrop={false}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "90vh",
          borderRadius: 4,
          p: 1
        }
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 'bold'
        }}
      >
        {title}
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Box>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
