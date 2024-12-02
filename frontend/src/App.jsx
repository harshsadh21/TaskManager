// import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
// import Note from "./components/Note";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/noteState";
import Note from "./components/Note";

// import Cookies from "js-cookie";

const App = () => {
  // const token = Cookies.get("token");
  return (
    <div className="  bg-black" style={{ minHeight: "100vh" }}>
      <NoteState>
        <Router>
          <Nav />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />

              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/note/:id" element={<Note />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
};

export default App;
