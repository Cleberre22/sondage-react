import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/dashboard/Index";

function App() {

  const token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard/index" element={<Index />} /> */}
        <Route path="/dashboard/index" element={token ? <Index/> : <Login/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
