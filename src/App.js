import { ToastContainer } from "react-toastify";
import "./App.css";
import Read from "./Components/Read.js";
function App() {
  return (
    <div className="App">
      <Read />
      <ToastContainer />
    </div>
    //Here we defining routing bcz we want to redirecting our page to the table page when we click on submit button for crud of app.
  );
}

export default App;
