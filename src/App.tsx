import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {
  Home,
  Dashboard,
  Week,
  Day,
  AddTrailer,
  TrailerDetails,
  Config,
  EditTrailer,
  Login,
  Signup,
} from "./scenes";

import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer/Footer";

import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext, useMode } from "./theme";
import ReactGA from "react-ga4";
import ScrollToTopOnNavigate from "./ScrollToTopOnNavigate";

ReactGA.initialize(process.env.REACT_APP_MEASURMENT_ID!);

const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" index element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trailer/:id"
          element={
            <ProtectedRoute>
              <TrailerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trailer/add"
          element={
            <ProtectedRoute>
              <AddTrailer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trailer/:id/edit"
          element={
            <ProtectedRoute>
              <EditTrailer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/config"
          element={
            <ProtectedRoute>
              <Config />
            </ProtectedRoute>
          }
        />
        <Route
          path="/week/:startDay"
          element={
            <ProtectedRoute>
              <Week />
            </ProtectedRoute>
          }
        />
        <Route
          path="/day/:date"
          element={
            <ProtectedRoute>
              <Day />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

const Root = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Navbar />
        </div>
        <div>
          <ScrollToTopOnNavigate /> {/* Just to scroll to the top */}
        </div>
        <div>
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
