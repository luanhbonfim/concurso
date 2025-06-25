import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Materias from "../pages/Materias";
import Estudos from "../pages/Estudos";
import Revisoes from "../pages/Revisoes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/materias" element={<Materias />} />
      <Route path="/estudos" element={<Estudos />} />
      <Route path="/revisoes" element={<Revisoes />} />
    </Routes>
  );
}
