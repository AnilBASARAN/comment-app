import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import Navbar from '../NavBar/NavBar';
import FilterSection from "../FilterSection";
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

const ContainerText = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "5px",
    marginTop: "10px",
    width: '100%', // Set to full width
    
});

function User() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const { userId: myUserId } = useParams();
    const [myName, setMyName] = useState(null);
    const [personalFilter, setPersonalFilter] = useState("ALL");

    const getMyUser = useCallback(async () => {
        try {
            const result = await fetch("/users/" + myUserId);
            const data = await result.json();
            setMyName(data.userName);
        } catch (error) {
            setError(error);
        }
    }, [myUserId]);

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
/////////////////////////////////////////////////


    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Navbar userId={myUserId} userName={myName} />
                <ContainerMain>
                    <div className='avatarmme'>
                        {myName ? null : "Loading..."}
                    </div>
                    <ContainerText>Select to filter:</ContainerText> 

                    <FilterSection setPersonalFilter={setPersonalFilter} userId={myUserId} />
                    <br/>

                    <ContainerText>Write a Post:</ContainerText> 
                    <PostForm refreshPosts={refreshPosts} userId={myUserId} userName={myName} />

                    {personalFilter === "ALL"
                        ? postList.map(post => (
                            <Post 
                                likes={post.postLikes}
                                postId={post.id}
                                key={post.id}
                                userName={post.userName}
                                userId={post.userId}
                                title={post.title}
                                text={post.text}
                            />
                          ))
                        : personalFilter === "WRITTENBYME"
                            ? postList.filter(post => post.userId == myUserId).map(post => (
                                <Post 
                                    likes={post.postLikes}
                                    postId={post.id}
                                    key={post.id}
                                    userName={post.userName}
                                    userId={post.userId}
                                    title={post.title}
                                    text={post.text}
                                />
                              ))
                            : null}
                </ContainerMain>
            </>
        );
    }
}

export default User;
