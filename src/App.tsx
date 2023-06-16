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
} from "./scenes";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext, useMode } from "./theme";
import Team from "./scenes/Team/Team";
import EditTRailer from "./scenes/EditTrailer/EditTrailer";
import Login from "./scenes/Login/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./scenes/Signup/Signup";

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
        <Route path="/trailer/:id" element={<TrailerDetails />} />
        <Route path="/trailer/add" element={<AddTrailer />} />
        <Route path="/trailer/:id/edit" element={<EditTRailer />} />

        <Route path="/config" element={<Config />} />
        <Route path="/team" element={<Team />} />

        <Route path="/week/:id" element={<Week />} />
        <Route path="/day/:id" element={<Day />} />

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
