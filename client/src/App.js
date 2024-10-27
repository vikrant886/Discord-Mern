// eslint-disable-next-line

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Login from "./pages/Login";
import Register from './pages/regiser';
// import CallModal from "./components/videoCall/callinitiateModal";
// import ChessHome from './components/chess_integration/components/home'
// import Play from "./components/chess_integration/components/play";
// import SelectBoard from "./components/chess_integration/components/select_board";
// import Room from "./components/chess_integration/components/room";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* <Route path='call' element={<CallModal/>}></Route> */}
          {/* <Route path="/chesshome" element={<ChessHome />} />
          <Route path="/play/:room/:mode/:color/" element={<Play />} />
          <Route path="/select_board/:room/:color" element={<SelectBoard />} />
          <Route path="/room" element={<Room />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;