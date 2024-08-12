import { styled } from '@mui/material/styles';
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import { Button } from '@mui/material';

// Styled components
const ContainerMain = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Full viewport height
    padding: '20px', // Add padding if needed
});

const ButtonsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: "5px"
});

function User() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const { userId } = useParams();
    const [myName, setMyName] = useState(null); // Initially set to null

    const getMyUser = useCallback(async () => {
        try {
            const result = await fetch("/users");
            const data = await result.json();
            
            let foundName = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == userId) { // Use === for comparison
                    foundName = data[i].userName;
                    break; // No need to continue loop if name is found
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
    }, [getMyUser]); // Include getMyUser in the dependency array

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ContainerMain>
                <div className='avatarmme'>
                    UserID: {userId} <br />
                    Username: {myName ? myName : "Loading..."} {/* Display "Loading..." until the name is fetched */}
                </div>
                {/* Uncomment and customize buttons if needed */}
                {/* <ButtonsContainer>
                    <Button variant='contained'>my comments</Button>
                    <Button variant='contained'>all</Button>
                </ButtonsContainer> */}
              
                <PostForm refreshPosts={refreshPosts} userId={userId} userName={myName} />
             
                {postList.filter(post => post.userId == userId).map(post => ( // Use === for comparison
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

export default User;
