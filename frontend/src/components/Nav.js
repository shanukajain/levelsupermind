import { useState } from "react";
import Login from "./Login";
import Post from "./Post";
import SignUp from "./Sign_up";
import { Link } from "react-router-dom";
import '../App.css';

const Nav=()=>{
    const [post,setpost]=useState(false);
    function gotoposts(){
      setpost(pre=>true);
    }
   return<> 
        <div className="navbar"> 
           <Link to="/login">Login</Link>
           <Link to="/signup">Sign_up</Link>
        </div>
    </>
}

export default Nav



// {!post && <><Login nextpage={gotoposts}/>
//     <SignUp nextpage={gotoposts}/></>}
//     {post && <Post></Post>}