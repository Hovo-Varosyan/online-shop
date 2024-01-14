import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./component/header";
import axios from "axios";
import PrivateRoute from "./component/privatrouter";
import LoginRoute from "./component/loginrouter";
import Login from "./pages/login";
import Registr from "./pages/registr";
import Cart from "./pages/cart";
import Home from "./pages/home";

function App() {


  axios.defaults.withCredentials = true;


  return (
    <>
      <Header />
      <Routes>
        <Route element={<LoginRoute />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/registr" element={<Registr />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
