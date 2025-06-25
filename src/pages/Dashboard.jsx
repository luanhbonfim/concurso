import { Box, Typography, Paper, useTheme } from "@mui/material";

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Bem-vinda ao app de estudos!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Aqui você poderá organizar suas matérias, estudos e revisões para conquistar sua aprovação no concurso.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          borderLeft: `5px solid ${theme.palette.primary.main}`,
          background: theme.palette.mode === "light" ? "#fff" : theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Dica do dia ✨
        </Typography>
        <Typography>
          Revise o conteúdo estudado ontem e dedique 10 minutos para revisar flashcards antes de iniciar um novo assunto.
        </Typography>
      </Paper>
    </Box>
  );
}
