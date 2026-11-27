import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CadastroPage from "./pages/CadastroPage";
import LoginPage from "./pages/LoginPage";
import PainelPage from "./pages/PainelPage";
import { RotaProtegida } from "./routes/RotaProtegida";
import { DashboardLayout } from "./layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/painel" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route
          path="/painel"
          element={
            <RotaProtegida>
              <DashboardLayout>
                <PainelPage />
              </DashboardLayout>
            </RotaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
