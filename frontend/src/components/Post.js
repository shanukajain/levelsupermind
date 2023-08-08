import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
const url="http://13.48.45.167:3006/post/"
let token=localStorage.getItem("token");
async function fetchdata(str){
        let res=await fetch(`${url+str}`,{
            headers: {
                Authorization: token
              },
        });
        let data=await res.json();
        return data;
}





const Post=()=>{
    const [Posttitle,setpostTitle]=useState([]);
    const [postbody,setpostbody]=useState([]);
    const [postuser,setpostuser]=useState([]);
    const [comments,setcomments]=useState([]);
    const [newcomment,setnewcomments]=useState("");
    const [title,settitle]=useState("");
    useEffect(()=>{
        fetchdata("title").then((data)=>{
            setpostTitle(prev=>data.titles);
        })
    },[])


    function handleclick(e){
        let stitle=e.target.innerText;
        settitle(pre=>stitle);
        let str=`body/?post_title=${title}`
        fetchdata(str).then((data)=>{
            setpostbody(pre=>data.data);
            setpostuser(pre=>data.postusers)
            setcomments(pre=>data.comments);
        })
    }

   async function handlecomments(e){
   let id=e.target.id;
   let body={
    postId:id,body:newcomment
   }
   let res=await fetch("http://13.48.45.167:3006/comment/create",{
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
body: JSON.stringify(body)
   });
   let data=await res.json();
   if(data.msg==="created"){
        let str=`body/?post_title=${title}`
       await fetchdata(str).then((data)=>{
            setpostbody(pre=>data.data);
            setpostuser(pre=>data.postusers)
            setcomments(pre=>data.comments);
            
        });
   }else {
    alert("someting went wrong");
   }
    }

async function handledeletecomment(e){
   let  id=e.target.id;
   let res=await fetch(`http://13.48.45.167:3006/comment//delete/${id}`,{
    method:"DELETE",
    headers:{
        Authorization: token
    }

   })
   let data=await res.json();
  
   if(data.msg==="done"){
    alert("comment deleted");
    let str=`body/?post_title=${title}`
    await fetchdata(str).then((data)=>{
         setpostbody(pre=>data.data);
         setpostuser(pre=>data.postusers)
         setcomments(pre=>data.comments);
     });
   }else {
    alert("Not possible");
   }
}


    return <div >
        <Link to="/Createpost"><h2 className="newpost">New Post</h2></Link>
        <div className="post">
  <div className="title" >
    
<h1>Post Titles</h1>
<ul>
{ Posttitle.map((el,i)=>{
    return (
        <div>
            <li key={i}>
            <h3 onClick={handleclick}>{el}</h3></li>
            </div>
    )
})}
</ul>
  </div>
  <div className="body">
    <h1>Posts </h1>
    <h2 className="titlename">{title}</h2>
    <ul className="postBody">
    { postbody.map((el,i)=>{
    return (
        <div className="posts" key={i}>
            <li key={i}>
            <h3>Author: {postuser[i]}</h3>
            <p> {el.body}</p>
            <p className="commentpost">Comments: </p>
            <ul>
                {
                 comments[i].map((ele,i)=>{
                  return(<div className="delete">
                    <p>{ele.body}</p>
                    <button onClick={handledeletecomment} id={ele.id}>Delete</button>
                    </div>)
                 })   
                }
            </ul>
            <input placeholder="comments" onChange={e => setnewcomments(e.target.value)}/>
            <button className="Enter" onClick={handlecomments} id={el.id}>Enter</button>
            </li>
            </div>
    )
})} 
    </ul>
  </div>
  </div>
    </div>
}

export default Post;