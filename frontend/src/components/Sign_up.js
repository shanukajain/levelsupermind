import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import Login from './Login';

const url="http://localhost:4000/users/sign_up"
async function fetchdata(body){
  let res=await fetch(url,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  let data=await res.json();
  if(data.msg==="account created"){
    return true;
  }else {
    alert("username already exits");
    return false
  }
}

const SignUp = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [nextpage,setnextpage]=useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signup,setsignup]=useState(false);
  const [isLoggedIn, setisLoggedIn]=useState(false);
  useEffect(()=>{
    if(signup){
      let body={username,password};
    fetchdata(body).then((data)=>{
      if(data){
        setnextpage(prev=>true); 

      }
     });
      setsignup(prev=>false);
    }
  },[signup])

  const handleSignUp = () => {
    // Add user registration logic here
    if(password===confirmPassword && username){
      setsignup(prev=>true);
      
    }else {
      alert("password doesnt match")
    }
  };

  return (
        <div className='sign_up'>
     {!nextpage && <><h2>Sign Up</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={e => setusername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      
      <Link to="./Login.js">Login</Link></>}
     {nextpage&&<Login></Login>}
    </div>
  );
};

export default SignUp;
