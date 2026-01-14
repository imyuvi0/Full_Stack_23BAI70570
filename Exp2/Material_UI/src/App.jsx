import { Button, TextField, Card, CardContent, Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ width: 300 }}>
        <CardContent>
          <h3>Material UI Form</h3>
          <TextField label="Name" fullWidth margin="normal" />
          <Button variant="contained" fullWidth>
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
