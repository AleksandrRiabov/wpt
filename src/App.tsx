import "./App.css";
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Home, Dashboard, Week, Day } from "./scenes";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext, useMode } from "./theme";
import Team from "./scenes/Team/Team";

const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/week/:id" element={<Week />} />
        <Route path="/day/:id" element={<Day />} />
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
