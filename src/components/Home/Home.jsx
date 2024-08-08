
import Post from "../Post/Post";
import React,{useState,useEffect} from "react";
import PostForm from "../Post/PostForm";
import './Home.css';



function Home(){

    const [error,setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
  
const refreshPosts = () =>{
    fetch("/posts")
    .then(res=>res.json())
    .then(
        (result)=>{
            setIsLoaded(true);
            setPostList(result)
        },
        (error)=>{
            setIsLoaded(true);
            setError(error);
        }
    )
}

    useEffect(()=>{
     refreshPosts()
    },[postList])

    if(error){
        return <div>Error !!!</div>
    }else if(!isLoaded){
        return <div>Loading...</div>
    }else{
        return (

    
            <div className="container-main">
                <PostForm refreshPosts = {refreshPosts} userId= {1} userName= {"beybiboy"}></PostForm>
              {postList.map(post=>(
               <Post  userName = {post.userName} userId = {post.userId} title={post.title} text={post.text}/>
            ))}
            </div>
         

        );
    }

}

export default Home;