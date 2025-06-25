import { ThemeProvider, CssBaseline } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import themeConfig from "./theme";

export default function App() {
  // Usando modo fixo "light"
  const theme = themeConfig("light");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
  );
}
