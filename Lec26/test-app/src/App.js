import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
function App() {
  const [incrementor, setIncrementor] = useState(0);
  return <Navbar incrementor={incrementor} setIncrementor={setIncrementor} />;
}

export default App;
