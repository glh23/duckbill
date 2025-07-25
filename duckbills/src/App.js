import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/homepage/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
