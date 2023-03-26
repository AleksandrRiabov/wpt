import './App.css';
import { Route, createHashRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, Dashboard, Week, Day } from './pages';
import Footer from './components/Footer/Footer';


const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/week/:id" element={<Week />} />
        <Route path="/day/:id" element={<Day />} />
        <Route path='*' element={<Home />} />
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
        <Footer />
      </div>
    </>
  )
}

export default App;
