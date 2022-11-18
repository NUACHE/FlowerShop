import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import CartPage from './pages/cart/cartPage';
import Admin from './pages/admin/admin';
import FlowerDetails from './pages/search/flowerDetailsPage';
import SearchPage from './pages/search/search';
import NotFound from './global-components/404';

function App() {
  return (
    <div className=" bg-stone-200 h-full">
      <BrowserRouter>
        <Routes>
          {/* PAGE ROUTES */}
          <Route path={'/'} element = {<Home/>}/>
          {/* <Route path={'/shop'} element = {<ShopPage/>}/> */}
          <Route path={'/products'} element = {<SearchPage/>}/>
          <Route path={'/details/:id'} element = {<FlowerDetails/>}/>
          <Route path={'/cart'} element = {<CartPage/>}/>
          <Route path={'/admin'} element = {<Admin/>}/>
          <Route path={'*'} element = {<NotFound/>}/>

                  </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
