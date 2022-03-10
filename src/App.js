import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Chapter from "./pages/chapter/Chapter";
import ComicDetail from "./pages/comicDetail/ComicDetail";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/detail/:nameComic' element={<ComicDetail />}></Route>
        <Route path='/detail/:nameComic/:chapId/:hashId' element={<Chapter />}></Route>
      </Routes>
    </>
  );
}

export default App;
