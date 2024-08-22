import React, { useState, useEffect } from 'react';
import Post from './Post/Post';
import { Button } from '@mui/material';
import Navbar from './NavBar/NavBar';
import FilterSection from './FilterSection';
import styled from '@emotion/styled/macro';

const ContainerText = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "5px",
    marginTop: "10px",
    width: '100%', // Set to full width
});

function Page() {
    const userId = null;
    const [page, setPage] = useState(0);
    const [limit] = useState(10);
    const [totalCount, setTotalCount] = useState(0); // Initialize totalCount to 0
    const [error, setError] = useState(null);
    const [availablePageCount, setAvailablePageCount] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [filter, setFilter] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    // Update availablePageCount whenever totalCount or limit changes
    useEffect(() => {
        setAvailablePageCount(Math.ceil(totalCount / limit));
    }, [totalCount, limit]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false);
            try {
                const response = await fetch(`/posts?page=${page}&limit=${limit}&filter=${filter}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCurrentData(data.posts);
                setTotalCount(data.totalCount); // Update totalCount based on the response
                setIsLoaded(true);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
                setError(error);
                setIsLoaded(true); // Set isLoaded to true even if there is an error
            }
        };
        fetchData();
    }, [page, limit, filter]); // Ensure fetchData is called whenever page, limit, or filter changes

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        const buttons = [];
        for (let i = 0; i < availablePageCount; i++) {
            buttons.push(
                <Button 
                    onClick={() => setPage(i)} 
                    key={i} 
                    variant={page === i ? 'contained' : 'outlined'} // Highlight the current page
                >
                    {i + 1}
                </Button>
            );
        }

        return (
            <>
                <Navbar userName={null} />
                <ContainerText>Select to filter:</ContainerText>
                <FilterSection setFilter={setFilter} userId={userId} />
                <div className="flex flex-col items-center py-10">
                    <div className="w-full flex flex-wrap justify-center items-center">
                        {Array.isArray(currentData) && currentData.length > 0 ? (
                            currentData.map((post) => (
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
                        ) : (
                            <p>No posts available</p> // Fallback message if no posts are found
                        )}
                    </div>
                    <div className="buttons-container">
                        {buttons}
                    </div>
                </div>
            </>
        );
    }
}

export default Page;
