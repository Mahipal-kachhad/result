import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "./components/form";
import { Route, Routes } from "react-router-dom";
import Menubar from "./components/menubar";

function App() {
  return (
    <div>
      <Menubar/>
      <Routes>
        <Route path="/Form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
