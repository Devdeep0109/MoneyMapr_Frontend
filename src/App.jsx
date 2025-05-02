import React from "react";
import Home from "./pages/Home";
import ElaboratePage from "./pages/ElaboratePage";
import About from "./component/About";
import Contact from "./component/Contact";
import NewCar from "./component/NewCar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import CICalculator from "./component/CICalculator";
import SuggestionPage from "./pages/SuggestionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cicalculator" element={<CICalculator />} />
        <Route path="/elaborate" element={<ElaboratePage />} />
        <Route path="/suggestion" element={<SuggestionPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/newcar" element={<NewCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
