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
import { Link } from "react-router-dom";
import { useState } from 'react';
import './Post.css';





function Post(props) {
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
    <div className="postContainer">
      <Card sx={{ width: 800 }}>
        <CardHeader
        
          avatar={
            <Link to={`/users/${userId}`} className="linked">
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userName.split("")[0].toUpperCase()}
            </Avatar>
            </Link>
          }
    
          title={title}
          
        />
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
          onClick={handleLike}
          aria-label="add to favorites">
            <FavoriteIcon style={ liked? {color: "red "} : null} />
          </IconButton>
          <IconButton aria-label="share">
            
          </IconButton>
    
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Post;
