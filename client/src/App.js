import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Booked from "./pages/booked/Booked";
import Allbooked from "./pages/allbooked/Allbooked";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/booked" element={<Booked/>}/>
        <Route path="/allbooked" element={<Allbooked/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
