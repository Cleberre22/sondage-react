import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/dashboard/Index";

import Polls from "./pages/dashboard/polls/Polls";
import AddPoll from "./pages/dashboard/polls/AddPoll";
import ShowPoll from "./pages/dashboard/polls/ShowPoll";
import EditPoll from "./pages/dashboard/polls/EditPoll";

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

        <Route path="/dashboard/polls/" element={<Polls />} />
        <Route path="/dashboard/polls/add" element={<AddPoll />} />
        <Route path="/dashboard/polls/edit/:poll" element={<EditPoll />} />
        <Route path="/dashboard/polls/show/:poll" element={<ShowPoll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
