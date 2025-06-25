import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { name: "Dashboard", to: "/" },
  { name: "Matérias", to: "/materias" },
  { name: "Estudos", to: "/estudos" },
  { name: "Revisões", to: "/revisoes" },
];

export default function Sidebar({ isMobile, open, onClose, sidebarWidth = 220 }) {
  const theme = useTheme();
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ p: 2 }}>
      <List>
        {links.map(({ name, to }) => {
          const active = location.pathname === to;
          return (
            <ListItemButton
              key={to}
              component={NavLink}
              to={to}
              selected={active}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  fontWeight: "bold",
                },
              }}
              onClick={onClose}
            >
              <ListItemText primary={name} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: "64px",
        left: 0,
        width: sidebarWidth,
        height: "calc(100vh - 64px)",
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 3,
        p: 2,
      }}
    >
      {drawerContent}
    </Box>
  );
}