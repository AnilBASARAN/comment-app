import * as React from 'react';
import { useState } from 'react';
import { CardHeader, Avatar, OutlinedInput, Select, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { InputAdornment, Card, Snackbar, Alert, Button } from '@mui/material';
import { Link } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import './Post.css';
import "./PostForm.css";

const titleOptions = ["CSS", "HTML", "REACT", "JAVASCRIPT"];

function PostForm(props) {
    const { userId, userName, refreshPosts } = props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const savePost = async () => {
        try {
            const response = await fetch("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error saving post:", error);
            throw error; // Re-throw the error to be caught by the calling function
        }
    }

    const handleSubmit = () => {
        savePost()
            .then(() => {
                setIsSent(true);
                setTitle("");
                setText("");
                refreshPosts();  // Refresh posts after successfully saving the new post
            })
            .catch((err) => {
                console.error("Error saving post:", err);
                setIsSent(false);
            })
            .finally(() => setOpen(true)); // Show snackbar after attempting to submit
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    return (
        <div id='formContainer' className="postContainer">
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Your post has been sent successfully!
                </Alert>
            </Snackbar>

            <Card>
                <CardHeader
                    avatar={
                        <Link to={`/users/${userId}`} className="linked">
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={
                        <>
                          {/* Select Dropdown */}
                          <Select
                            id="select-dropdown"
                            value={title}  // Bind the select value to the title
                            onChange={handleTitle}  // Handle the change event directly with handleTitle
                            displayEmpty
                            fullWidth
                          >
                            <MenuItem value="" disabled>
                              Select a subject
                            </MenuItem>
                            {titleOptions.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      }
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id='outlined-adornment-amount'
                            multiline
                            placeholder='Text'
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <Button
                                        variant='contained'
                                        onClick={handleSubmit}
                                    >
                                        Post
                                    </Button>
                                </InputAdornment>
                            }
                        />
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default PostForm;
