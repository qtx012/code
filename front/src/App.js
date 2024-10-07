import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./component/main";
import Predict from "./component/predict";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/predict" element={<Predict />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
