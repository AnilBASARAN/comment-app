import Post from "../Post/Post";
import React, { useState, useEffect } from "react";
import PostForm from "../Post/PostForm";
import './Home.css';

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
  
    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then((result) => {
                setPostList(result);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoaded(true);
            });
    };
    
    useEffect(() => {
        refreshPosts();
    }, []);  // Empty array as dependency to run once on mount

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container-main">
                <PostForm refreshPosts={refreshPosts} userId={1} userName={"beybiboy"} />
                {postList.map(post => (
                    <Post postId={post.id} key={post.id} userName={post.userName} userId={post.userId} title={post.title} text={post.text} />
                ))}
            </div>
        );
    }
}

export default Home;
