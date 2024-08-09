import React from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';



// Styled components
const CommentContainer = styled(CardContent)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
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
  const { text, userId, userName } = props;

  const handleSubmit=()=>{}

  return (
    <CommentContainer>
      <OutlinedInput
        id='outlined-adornment-amount'
        multiline
        placeholder='Title'
        inputProps={{ maxLength: 25 }}
        fullWidth
       
        startAdornment={
          <InputAdornment position="start">
            <StyledLink to={`/users/${userId}`}>
              <SmallAvatar aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </SmallAvatar>
            </StyledLink>
          </InputAdornment>
        }
        endAdornment={<InputAdornment position="end">
            <Button
                variant='contained'
                onClick={handleSubmit} >Post
            </Button>
        </InputAdornment>}
        style={{ color: "black", backgroundColor: "white" }}
      />
    </CommentContainer>
  );
}

export default CommentForm;
