import { createTheme } from "@mui/material/styles";

const themeConfig = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#f06292" },
            background: { default: "#fff0f5", paper: "#fce4ec" },
            text: { primary: "#880e4f" },
          }
        : {
            primary: { main: "#f48fb1" },
            background: { default: "#2a0a1f", paper: "#4a0033" },
            text: { primary: "#fce4ec" },
          }),
    },
    typography: {
      fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  });

export default themeConfig;
