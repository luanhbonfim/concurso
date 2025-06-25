import {
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Checkbox,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Revisoes() {
  const [revisoes, setRevisoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, severity: "info", message: "" });

  const fetchRevisoes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/revisoes");
      setRevisoes(data);
    } catch {
      setToast({ open: true, severity: "error", message: "Erro ao carregar revisões." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevisoes();
  }, []);

  const revisoesPorMateria = revisoes.reduce((acc, revisao) => {
    const nomeMateria = revisao.estudo?.materia?.titulo || "Sem Matéria";
    if (!acc[nomeMateria]) acc[nomeMateria] = [];
    acc[nomeMateria].push(revisao);
    return acc;
  }, {});

  const handleToggleRevisao = async (id, atualRevisada) => {
    try {
      const { data } = await api.patch(`/revisoes/${id}/marcar`, {
        revisada: !atualRevisada,
      });

      setRevisoes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, revisada: data.revisada } : r))
      );

      setToast({
        open: true,
        severity: "success",
        message: data.revisada
          ? "Revisão marcada como feita."
          : "Revisão desmarcada.",
      });
    } catch {
      setToast({ open: true, severity: "error", message: "Erro ao atualizar revisão." });
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3} color="primary">
        Revisões Pendentes
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : revisoes.length === 0 ? (
        <Typography>Sem revisões para hoje.</Typography>
      ) : (
        Object.entries(revisoesPorMateria).map(([materia, revisoesMateria]) => (
          <Accordion key={materia} sx={{ mb: 2, borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                {materia}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {revisoesMateria.map(({ id, dataRevisao, revisada }) => (
                  <Paper
                    key={id}
                    elevation={1}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: revisada ? "action.selected" : "background.paper",
                    }}
                  >
                    <ListItem
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          checked={revisada || false}
                          onChange={() => handleToggleRevisao(id, revisada)}
                        />
                      }
                    >
                      <Typography
                        sx={{
                          textDecoration: revisada ? "line-through" : "none",
                          fontWeight: revisada ? "normal" : "bold",
                        }}
                      >
                        Revisar em: {new Date(dataRevisao).toLocaleDateString()}
                      </Typography>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      )}

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
