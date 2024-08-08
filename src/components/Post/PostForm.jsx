import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { InputAdornment, OutlinedInput } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useState } from 'react';
import './Post.css';





function PostForm(props) {
  const {title,text,userId,userName} = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked,setLiked] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleLike = ()=>{
    setLiked(!liked);
  }

  return (
    <div sx={{ width: 400 }} className="postContainer">
      <Card >
        <CardHeader
        
          avatar={
            <Link to={`/users/${userId}`} className="linked">
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
             
            </Avatar>
            </Link>
          }
    
          title={<OutlinedInput
            id='outlined-adornment-amount'
            multiline
            placeholder='Title'
            inputProps={{maxLength: 25}}
            fullWidth
            
          >

          </OutlinedInput>}
          
        />
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          <OutlinedInput
            id='outlined-adornment-amount'
            multiline
            placeholder='Text'
            inputProps={{maxLength: 250}}
            fullWidth
            endAdornment ={
                <InputAdornment position='end' >
                <Button variant='contained'>Post</Button>
                </InputAdornment>
            }
          >

          </OutlinedInput>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
         {/*  <IconButton
          onClick={handleLike}
          aria-label="add to favorites">
            <FavoriteIcon style={ liked? {color: "red "} : null} />
          </IconButton>
          <IconButton aria-label="share">
            
          </IconButton> */}
    
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}


export default PostForm;
