import './App.css';
import { Route, createHashRouter, createRoutesFromElements, RouterProvider, Outlet} from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home';

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

const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" index element={<Home />} />
        <Route path='*' element={<Home/>} />
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

const Root = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        Footer
      </div>
    </>
  )
}

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <div className="App">
//         <Navbar />
//         <Routes>
//           <Route path='/' element={<Home />} />
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

export default App;
