//import React from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './App.css'

//import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  );
}

export default App;
