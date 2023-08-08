import { useState } from "react";
import Login from "./Login";
import Post from "./Post";
import SignUp from "./Sign_up";
import { Link,useNavigate } from "react-router-dom";
import '../App.css';

const Nav=({isLoggedIn,onLogout})=>{
    
   
   
   return<> 
        <div className="navbar"> 
        {isLoggedIn ? (
            <button onClick={onLogout}>Logout</button>
          ) : (<>
            <Link to="/login">Login</Link>
  <Link to="/signup">Sign_up</Link></>
)}
           
        </div>
    </>
}

export default Nav



// {!post && <><Login nextpage={gotoposts}/>
//     <SignUp nextpage={gotoposts}/></>}
//     {post && <Post></Post>}