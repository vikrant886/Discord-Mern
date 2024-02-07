// eslint-disable-next-line

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Login from "./pages/Login";
import Register from './pages/regiser';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;