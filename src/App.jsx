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

import Questions from "./pages/dashboard/questions/Questions";
import AddQuestion from "./pages/dashboard/questions/AddQuestion";
import ShowQuestion from "./pages/dashboard/questions/ShowQuestion";
import EditQuestion from "./pages/dashboard/questions/EditQuestion";

import Answers from "./pages/dashboard/answers/Answers";
import AddAnswer from "./pages/dashboard/answers/AddAnswer";
import ShowAnswer from "./pages/dashboard/answers/ShowAnswer";
import EditAnswer from "./pages/dashboard/answers/EditAnswer";

function App() {

  // const token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/index" element={<Index />} />
        {/* <Route path="/dashboard/index" element={token ? <Index/> : <Login/> }></Route> */}

        <Route path="/dashboard/polls/" element={<Polls />} />
        <Route path="/dashboard/polls/add" element={<AddPoll />} />
        <Route path="/dashboard/polls/edit/:poll" element={<EditPoll />} />
        <Route path="/dashboard/polls/show/:poll" element={<ShowPoll />} />

        <Route path="/dashboard/questions/" element={<Questions />} />
        <Route path="/dashboard/questions/add" element={<AddQuestion />} />
        <Route path="/dashboard/questions/edit/:question" element={<EditQuestion />} />
        <Route path="/dashboard/questions/show/:question" element={<ShowQuestion />} />

        <Route path="/dashboard/answers/" element={<Answers />} />
        <Route path="/dashboard/answers/add" element={<AddAnswer />} />
        <Route path="/dashboard/answers/edit/:answer" element={<EditAnswer />} />
        <Route path="/dashboard/answers/show/:answer" element={<ShowAnswer />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
