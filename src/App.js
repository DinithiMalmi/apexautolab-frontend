import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* All forms combined in one page */}
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
