import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function Header({ onMenuClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
      elevation={4}
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ px: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", letterSpacing: 1.5 }}
        >
          Dra. Mayara Alves
        </Typography>
        <Box>
          {isMobile && (
            <IconButton onClick={onMenuClick} color="inherit">
              <Menu />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
