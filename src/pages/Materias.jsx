import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  TextField,
  Stack,
  IconButton,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Materias() {
  const [materias, setMaterias] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [toast, setToast] = useState({ open: false, severity: "info", message: "" });

  const fetchMaterias = async () => {
    try {
      const { data } = await api.get("/materias");
      setMaterias(data);
    } catch {
      setToast({ open: true, severity: "error", message: "Erro ao carregar matérias." });
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleAdd = async () => {
    if (!titulo.trim()) {
      setToast({ open: true, severity: "warning", message: "Informe o título da matéria." });
      return;
    }
    try {
      const { data } = await api.post("/materias", { titulo: titulo.trim() });
      setMaterias((prev) => [...prev, data]);
      setTitulo("");
      setToast({ open: true, severity: "success", message: "Matéria adicionada com sucesso!" });
    } catch {
      setToast({ open: true, severity: "error", message: "Erro ao adicionar matéria." });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/materias/${id}`);
      setMaterias((prev) => prev.filter((m) => m.id !== id));
      setToast({ open: true, severity: "success", message: "Matéria removida." });
    } catch {
      setToast({ open: true, severity: "error", message: "Erro ao remover matéria." });
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3} color="primary">
        Minhas Matérias
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
        <TextField
          label="Nova Matéria"
          placeholder="Ex: Ética Profissional"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdd}>
          Adicionar
        </Button>
      </Stack>

      <List>
        {materias.map(({ id, titulo }) => (
          <Paper key={id} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 3 }}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(id)} color="error">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Typography fontWeight="bold">{titulo}</Typography>
            </ListItem>
          </Paper>
        ))}
      </List>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
