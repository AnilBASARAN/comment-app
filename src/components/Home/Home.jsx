import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import Navbar from "../NavBar/NavBar";
import { styled } from '@mui/material/styles';
import './Home.css';

const ContainerMain = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%', // Set to full width
    
});

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
    }, []);

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ContainerMain>
                <Navbar userName={null}></Navbar>
                {/* PostForm and Post components can also be inside the full-width ContainerMain */}
                {postList.map(post => (
                    <Post 
                        likes={post.postLikes}
                        postId={post.id}
                        key={post.id}
                        userName={post.userName}
                        userId={post.userId}
                        title={post.title}
                        text={post.text}
                    />
                ))}
            </ContainerMain>
        );
    }
}

export default Home;
