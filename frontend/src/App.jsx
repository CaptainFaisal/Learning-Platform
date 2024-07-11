import React from 'react';
import "./App.css";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Verify from './pages/auth/Verify';
import Courses from './pages/courses/Courses';
import Footer from './components/footer/Footer';
import About from './pages/about/About';
import Account from './pages/account/Account';

const App = () => {
  return <>

  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='/courses' element={<Courses />} />
      <Route path='/about' element={<About/>} />
      <Route path='/account' element={<Account/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
    <Footer/>
  </BrowserRouter>

  </>;
}

export default App