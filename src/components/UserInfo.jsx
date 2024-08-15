import React from "react";
import { useParams } from "react-router-dom";

const UserInfo = () => {
    
    const { userId } = useParams();


  return(
  <>
    <div>User info</div>
  <div>USER ID: {userId}</div>
 
    </>
  )
}

export default UserInfo;