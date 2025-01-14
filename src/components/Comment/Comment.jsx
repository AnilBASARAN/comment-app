import React from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
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

function Comment(props) {
  const { text, userId, userName } = props;

  return (
    <CommentContainer
    style={{  marginRight: "15px" ,marginLeft: "15px" , padding:"5px"}}>
      <OutlinedInput
        disabled
        id='outlined-adornment-amount'
        multiline
        
        inputProps={{ maxLength: 25 }}
        fullWidth
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
        style={{ color: "black", backgroundColor: "white", margin: "0" , padding:"8px"}}
      />
    </CommentContainer>
  );
}

export default Comment;
