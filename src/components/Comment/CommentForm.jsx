import React, { useState } from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';

// Styled components
const CommentContainer = styled(CardContent)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
  margin: "0px",
  padding:"0px"
});

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  boxShadow: "none",
  color: "white",
});

function CommentForm(props) {
  const { userId, userName, postId,refreshComments} = props;
  const [text, setText] = useState("");

  const saveComment = async () => {
    try {
      console.log('Sending comment:', { postId, userId, text }); // Debug log

      const res = await fetch("/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          userId: userId,
          text: text,
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      console.log('Comment saved:', result); // Debug log
      return result;
    } catch (err) {
      console.error("Error saving comment:", err);
      throw err; // Re-throw the error to be handled by the calling function
    }
  }

  const handleSubmit2 = () => {
    saveComment()
      .then(() => {
        refreshComments();  // Refresh comments after successfully saving the new post
        setText(""); // Clear the text only if the comment is saved successfully
      })
      .catch((err) => {
        console.error("Error saving comment:", err);
        // Optionally, show some error feedback to the user
      });
  }

  const handleTextChange = (event) => {
    setText(event.target.value);
  }

  return (
    <CommentContainer
    style={{  margin:"15px" , padding:"5px"}}>
      <OutlinedInput
        id='outlined-adornment-amount'
        multiline
        placeholder='Text'
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={handleTextChange}
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <StyledLink to={`/users/${userId}`}>
              <SmallAvatar aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </SmallAvatar>
            </StyledLink>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant='contained'
              onClick={handleSubmit2}
            >
              Comment
            </Button>
          </InputAdornment>
        }
        style={{ color: "black", backgroundColor: "white" }}
      />
    </CommentContainer>
  );
}

export default CommentForm;
