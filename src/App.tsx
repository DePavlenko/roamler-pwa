import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/require-auth/require-auth";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Settings from "./pages/settings/settings";
import Header, { NavItem } from "./components/header/header";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactComponent as Logo } from "./assets/logo.svg";
import userAvatar from "./assets/user.jpg";
import { useAuth } from "./context/auth-context";
import { theme } from "./theme";

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Settings",
    path: "/settings",
  },
];

export function App() {
  const { isLogged } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        isLogged={isLogged}
        logo={Logo}
        navigation={navigation}
        avatar={userAvatar}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
