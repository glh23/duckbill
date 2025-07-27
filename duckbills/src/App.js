import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/homepage/Homepage";
import Createaccount from "./pages/createaccount/Createaccount";
import Login from './pages/login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<Createaccount/>}/>
        <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
