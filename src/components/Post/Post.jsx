import React, { useState, useEffect, useRef } from 'react';
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
import { Link } from 'react-router-dom';
import CommentForm from '../Comment/CommentForm';
import Comment from '../Comment/Comment';
import { styled } from '@mui/material/styles';
import './Post.css';

// Custom-styled IconButton with rotation
const ExpandIconButton = styled(IconButton)(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(1deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { postId, title, text, userId, userName, likes } = props;
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);
  const [isLiked,setIsLiked] = useState(false);
  const [likeCount,setLikeCount] = useState(likes.length);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if(isLiked) setLikeCount(likeCount-1);
    else setLikeCount(likeCount+1)
  };

  const refreshComments = () => {
    fetch(`/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCommentList(result);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  useEffect(()=>{checkLikes()},[])

  const checkLikes = ()=>{
    var likeControl = likes.find((like =>like.userId == userId));
    if(likeControl != null) setIsLiked(true);
  }

  useEffect(() => {
    if (expanded) {
      refreshComments(); // Fetch comments when expanded
    }
  }, [expanded]); // Fetch comments when `expanded` changes

  return (
    <div className="postContainer">
      <Card sx={{ border: 1, height:275 , width:400 , padding:1 }} >
        <CardHeader
          avatar={
            <Link to={`/users/${userId}`} className="linked">
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.split('')[0].toUpperCase()}
              </Avatar>
            </Link>
          }
          
          title={`Title : ${title}`}
        />
 
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {userName} : {text}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          {/* Flex container with space between like button and comment icon */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>

            {/* Like button and like count together */}
            <div style={{ display: 'flex', alignItems: 'center' }}> 
              <IconButton
               onClick={handleLike}
               aria-label="add to favorites">
                <FavoriteIcon style={isLiked ? { color: 'red' } : null} />
              </IconButton>
              <Typography>{likeCount}</Typography>
            </div>

            {/* Comment button on the right side */}
            <div>
              <ExpandIconButton
                expanded={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show comments"
              >
                <CommentIcon />
                <ExpandMoreIcon />
              </ExpandIconButton>
            </div>
            
          </div>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {isLoaded ? (
              <div>
                <Typography variant="h6">Comments:</Typography>
                {commentList.map((comment) => (
                  <div key={comment.id}>
                    <Typography variant="body2" color="text.secondary"></Typography>
                    
                    <Comment
                      style={{ padding: '9px' }}
                      userId={userId}
                      postId={postId}
                      userName={userName}
                      text={comment.text}
                    ></Comment>
                  </div>
                ))}

                <CommentForm refreshComments={refreshComments} userName={'XANAX'} userId={userId} postId={postId}></CommentForm>
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
