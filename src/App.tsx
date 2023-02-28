import './App.css';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E424D',
      light: '#EAEBED'
    },
    secondary: {
      main: '#5B8291',
      light: '#98DAD9'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
