import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateInterest } from "./components/CreateInterest.tsx";
import { Recommendations } from "./components/Recommendations.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <div>
        <main>
          <Routes>
            <Route path="/create-interest" element={<CreateInterest />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </StrictMode>
);
