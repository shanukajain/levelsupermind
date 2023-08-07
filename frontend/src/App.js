import React, { useState } from 'react';
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import SignUp from './components/Sign_up';
import Login from './components/Login';
import Nav from './components/Nav';
import CreatePost from './components/Createpost';
import './App.css';
const App = () => {
 
  return (
    <BrowserRouter>
    <div>
     <Nav></Nav>
     <hr></hr>
    <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/Createpost" Component={CreatePost} />

    </Routes>
    </div>
    </BrowserRouter>
  );
};

export default App;