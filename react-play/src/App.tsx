import { Articles } from "./Components/Articles";
import { ArticleDetails } from "./Components/ArticleDetails";
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
