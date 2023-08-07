import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

const url="http://localhost:4000/users/login"
async function fetchdata(body){
  let res=await fetch(url,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  let data=await res.json();
  if(data.token){
    return data.token;
  }else {
    alert("you are not a user please sign_up your self");
    return false
  }
}

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [login,setlogin]=useState(false);
  const [nextpage,setnextpage]=useState(false)

  const handleLogin = () => {
    if(username && password){
      setlogin(prev=>true);
    }else{
      alert("fill all the fields");
    }
  };
  useEffect(()=>{
    if(login){
      let body={username,password};
    fetchdata(body).then((data)=>{
      if(data){
        console.log(data);
        localStorage.setItem('token', data);
        localStorage.setItem('username',username);
       setnextpage(prev=>true); 
      }
     });
      setlogin(prev=>false);
    }
  },[login])


  return (
    <>
    {!nextpage&&<div className='sign_up'>
      {!nextpage&&<><h2>LogIn</h2>
      <input
        type="test"
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
      <button onClick={handleLogin}>Login</button>
      <Link to="./Sign_up.js">Sign_up</Link></>}
    </div>
}
    {nextpage&&<Post></Post>}
    </>
  );
};

export default Login;