import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Page() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(100);

    const [availablePageCount, setAvailablePageCount] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setAvailablePageCount(Math.ceil(totalCount / limit));
    }, [limit, totalCount]);

    useEffect(() => {
        axios.get("/api/posts", {
            params: { page, limit, filter }
        })
        .then((response) => {
            setCurrentData(response.data.posts);
        })
        .catch((error) => {
            console.error("There was an error fetching the data!", error);
        });
    }, [limit, page, filter, totalCount]);

    return (
        <div>
            {/* Your component code here */}
        </div>
    );
}

export default Page;

/* @GetMapping
    public List<PostResponse> getAllPosts(@RequestParam Optional<Long> userId){
        return postService.getAllPosts(userId);
        //requestparam bize gelen requestin içerisindeki parametreleri parse et ve sağımda bulunan değişkenin içerisine at demek(userid)
    } */
