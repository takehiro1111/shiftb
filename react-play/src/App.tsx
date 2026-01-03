// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import { Articles, ArticleDetails } from "./Components/Articles";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header";



function App() {
  return (
    <>
    <Header />
      <div>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/posts/:id" element={<ArticleDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
