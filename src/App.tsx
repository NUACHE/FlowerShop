import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar';
import Home from './features/home/home';
import Footer from './components/footer';
import ShopPage from './features/shop/shopPage';
import CartPage from './features/cart/cartPage';
import Admin from './features/admin/admin';
import FlowerDetails from './features/shop/flowerDetailsPage';

function App() {
  return (
    <div className=" bg-stone-200 h-full">
      <BrowserRouter>
        <Routes>
          {/* PAGE ROUTES */}
          <Route path={'/'} element = {<Home/>}/>
          <Route path={'/shop'} element = {<ShopPage/>}/>
          <Route path={'/details/:id'} element = {<FlowerDetails/>}/>
          <Route path={'/cart'} element = {<CartPage/>}/>
          <Route path={'/admin'} element = {<Admin/>}/>
                  </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
