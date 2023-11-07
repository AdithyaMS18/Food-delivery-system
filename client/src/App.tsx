import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Landing" element={<Landing/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Login/>}/>

    </Routes>

      
    </BrowserRouter>
  );
}

export default App;
