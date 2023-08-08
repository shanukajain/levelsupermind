import React, { useState } from 'react';
import { BrowserRouter , Route,Routes } from 'react-router-dom'
;import SignUp from './components/Sign_up';
import Login from './components/Login';
import Nav from './components/Nav';
import CreatePost from './components/Createpost';
import './App.css';
import Post from './components/Post';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <BrowserRouter>
    <div>
    <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout} />
     <hr></hr>
    <Routes>
    <Route path="/login" element={<Login onLogin={handleLogin} />}>
          
        </Route>
        <Route path="/signup" Component={SignUp} />
        <Route path="/Createpost" Component={CreatePost} />
        <Route path="/post" Component={Post} />
    </Routes>
    
    </div>
    </BrowserRouter>
  );
};

export default App;