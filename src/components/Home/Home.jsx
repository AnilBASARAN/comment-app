import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import Navbar from "../NavBar/NavBar";
import { styled } from '@mui/material/styles';
import './Home.css';
import FilterSection from "../FilterSection";
import { Button } from "@mui/material";

const ContainerMain = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%', // Set to full width
    
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

const PAGE_SIZE = 6;

function Home() {
    const [pageIndex,setPageIndex] = useState(0);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const [filter,setFilter] = useState("ALL");
    const userId = null;

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
                let numPages;
            if(filter === "ALL"){
                 numPages = Math.ceil(postList.length / PAGE_SIZE);
               } else{
                 numPages = Math.ceil(postList.filter(x => x.title === filter  ).length / PAGE_SIZE);
            }

            
            const buttons = [];
            for(let i = 0; i< numPages ; i++){
                buttons.push(<Button onClick={()=> setPageIndex(i) } key= {i}>{i+1}</Button>)
            }


        return (
            <ContainerMain>
               
                <Navbar userName={null}></Navbar>
                {/* PostForm and Post components can also be inside the full-width ContainerMain */}
                <ContainerText>Select to filter:</ContainerText> 

                
                <FilterSection setFilter={setFilter} userId={userId}/>
                <div className="flex flex-col items-center py-10">

                    <div className="w-full  flex flex-wrap justify-center items-center" >

                    { filter === "ALL" ?  postList.slice(PAGE_SIZE * pageIndex , PAGE_SIZE * (pageIndex + 1 )).map(post => (
                    <Post 
                        likes={post.postLikes}
                        postId={post.id}
                        key={post.id}
                        userName={post.userName}
                        userId={post.userId}
                        title={post.title}
                        text={post.text}
                    />
                )) : postList.filter(x => x.title === filter  ).slice(PAGE_SIZE * pageIndex , PAGE_SIZE * (pageIndex + 1 )).map(post => (
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

                    </div>
                                <div className="buttons-container">
                                    {buttons}
                                </div>

                </div>
              

                
            </ContainerMain>
        );
    }
}

export default Home;
