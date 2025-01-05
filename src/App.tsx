import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { LoginPage } from './components/LoginPage';
import { Home } from "./components/Home";
import Order  from "./components/Order";
import { DashBoard } from "./components/DashBoard";
import { AddUser } from "./components/AddCard";
import { ProductUpdate } from "./components/ProductUpdate";
import { ChangePassword } from "./components/ChangePassword";
import { AddProduct } from "./components/AddProduct";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/dashBoard" element={<DashBoard />} />
          <Route path="/adduser" element={<AddUser/>} />
          <Route path="/products" element={<ProductUpdate/>} />
          <Route path="/changePassword" element={<ChangePassword/>} />
          <Route path="/addProduct" element={<AddProduct/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
