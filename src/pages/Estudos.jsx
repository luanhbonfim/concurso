import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Estudos() {
  const [estudos, setEstudos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [materiaId, setMateriaId] = useState("");
  const [notas, setNotas] = useState("");
  const [duracaoMin, setDuracaoMin] = useState("");
  const [toast, setToast] = useState({ open: false, severity: "info", message: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [materiaRes, estudoRes] = await Promise.all([
          api.get("/materias"),
          api.get("/estudos"),
        ]);
        setMaterias(materiaRes.data);
        setEstudos(estudoRes.data);
      } catch {
        setToast({ open: true, severity: "error", message: "Erro ao carregar dados." });
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!materiaId || !notas || !duracaoMin) {
      setToast({ open: true, severity: "warning", message: "Preencha todos os campos." });
      return;
    }

    try {
      const { data } = await api.post("/estudos", {
        materiaId: Number(materiaId),
        notas,
        duracaoMin: Number(duracaoMin),
      });
      setEstudos((prev) => [...prev, data]);
      setMateriaId("");
      setNotas("");
      setDuracaoMin("");
      setToast({ open: true, severity: "success", message: "Estudo registrado!" });
    } catch {
      setToast({ open: true, severity: "error", message: "Erro ao salvar estudo." });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/estudos/${id}`);
      setEstudos((prev) => prev.filter((e) => e.id !== id));
      setToast({ open: true, severity: "success", message: "Estudo removido." });
    } catch {
      setToast({ open: true, severity: "error", message: "Erro ao remover estudo." });
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3} color="primary">
        Registro de Estudos
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Matéria</InputLabel>
        <Select
          value={materiaId}
          label="Matéria"
          onChange={(e) => setMateriaId(e.target.value)}
        >
          {materias.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.titulo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Notas"
        placeholder="Anotações importantes"
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Duração (minutos)"
        type="number"
        value={duracaoMin}
        onChange={(e) => setDuracaoMin(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2, mb: 4 }} onClick={handleAdd}>
        Salvar Estudo
      </Button>

      <List>
        {estudos.map(({ id, materia, notas, duracaoMin }) => (
          <Paper key={id} sx={{ p: 2, mb: 2, borderRadius: 3 }} elevation={2}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(id)} color="error">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Box>
                <Typography fontWeight="bold">{materia?.titulo}</Typography>
                <Typography>{notas}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Duração: {duracaoMin} minutos
                </Typography>
              </Box>
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
