import { useState } from "react"
const url="http://localhost:4000/post/create"
const CreatePost=()=>{
    let [title,settitle]=useState("");
    let [body,setbody]=useState("");

    const handleclick=async()=>{
        let token=localStorage.getItem("token");
        let body1={
            title,
            body
        }
        console.log(body1);
       let res= await fetch(url,{
            method:"POST",
           headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                  },
            body: JSON.stringify(body1)
        });
        let data=await res.json();
        console.log(data);

    }
    return <div className="sign_up" id="create">
    <h2>Create New post</h2>
    <input type="text" placeholder="post title" value={title}
        onChange={e => settitle(e.target.value)}/>
    <input className="postbody" placeholder="Post Body" value={body}
        onChange={e => setbody(e.target.value)}/>
    <button onClick={handleclick}>Enter</button>
    </div>
}

export default CreatePost;