import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarWidth = 220;

  return (
    <>
      <Header onMenuClick={() => setOpenSidebar(true)} />
      <Sidebar
        isMobile={isMobile}
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        sidebarWidth={sidebarWidth}
      />
      <Box
        component="main"
        sx={{
          marginLeft: { xs: 0, sm: `${sidebarWidth}px` },
          paddingTop: "64px",
          paddingX: { xs: 2, sm: 3 },
          minHeight: "calc(100vh - 64px)",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </Box>
    </>
  );
}
