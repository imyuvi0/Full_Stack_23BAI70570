import { Button, TextField, Card, CardContent } from '@mui/material';
function App() {
return (
<Card style={{ width: 300, margin: '20px auto' }}>
<CardContent>
<h3>Material UI Form</h3>
<TextField label="Name" fullWidth margin="normal" />
<Button variant="contained" fullWidth>Submit</Button>
</CardContent>
</Card>
);
}
export default App;