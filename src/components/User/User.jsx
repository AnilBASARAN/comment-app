import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import Navbar from '../NavBar/NavBar';
import { styled } from '@mui/material/styles';

const ContainerMain = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%', // Set to full width
    padding: '20px',
});

function User() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const { userId } = useParams();
    const [myName, setMyName] = useState(null);

    const getMyUser = useCallback(async () => {
        try {
            const result = await fetch("/users");
            const data = await result.json();

            let foundName = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == userId) {
                    foundName = data[i].userName;
                    break;
                }
            }

            setMyName(foundName);
        } catch (error) {
            setError(error);
        }
    }, [userId]);

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
        getMyUser();
        refreshPosts();
    }, [getMyUser]);

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Navbar userName={myName}></Navbar>
                <ContainerMain>
                    <div className='avatarmme'>
                      
                       {myName ? null : "Loading..."}
                    </div>
                    <PostForm refreshPosts={refreshPosts} userId={userId} userName={myName} />
                    {postList.filter(post => post.userId == userId).map(post => (
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
            </>
        );
    }
}

export default User;
