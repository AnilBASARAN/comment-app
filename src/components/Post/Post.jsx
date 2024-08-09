import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles'; // Import styled here
import './Post.css';

// Custom-styled IconButton with rotation
const ExpandIconButton = styled(IconButton)(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(1deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { postId, title, text, userId, userName } = props;
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const refreshComments = () => {
    fetch(`/comments?postId=${postId}`)
      .then(res => res.json())
      .then(result => {
        setCommentList(result);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error("Error fetching comments:", error);
      });
  };

  useEffect(() => {
    if (expanded) {
      refreshComments(); // Fetch comments when expanded
    }
  }, [expanded]); // Fetch comments when `expanded` changes

  return (
    <div className="postContainer">
      <Card>
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
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={liked ? { color: "red" } : null} />
          </IconButton>

          <ExpandIconButton
            expanded={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
          >
            <CommentIcon />
            {expanded ? <ExpandMoreIcon /> : <ExpandMoreIcon />} {/* Toggle icon based on state */}
          </ExpandIconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {isLoaded ? (
              <div>
                <Typography variant="h6">Comments:</Typography>
                {commentList.map(comment => (
                  <div key={comment.id}>
                    <Typography variant="body2" color="text.secondary">
                      {comment.text}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Loading comments...
              </Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

Post.propTypes = {
  postId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Post;
