import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "./components/form";
import { Route, Routes } from "react-router-dom";
import Menubar from "./components/menubar";
import Data from "./components/Data";

function App() {
  return (
    <div>
      <Menubar />
      <Routes>
        <Route path="/Form" element={<Form />} />
        <Route path="/Data" element={<Data />} />
      </Routes>
    </div>
  );
}

export default App;
