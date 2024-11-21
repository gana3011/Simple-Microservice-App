import React,{useState, useEffect} from 'react';
import axios from 'axios';

const CommentList = ({comments}) => {
// const [comments,setComments] = useState([]);

// const getCommments = async() =>{
//     // const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
//     setComments(res.data);
// }
 
// useEffect(()=>{
//     getCommments();
// },[])

const renderedComments = comments.map(comment=>{
    let content;

    if(comment.status === "Approved") content = comment.content;

    if(comment.status === "Pending") content = "This comment is awaiting moderation";

    if(comment.status === "Rejected") content = "Comment Rejected";

    return <li key={comment.id}> {content}</li>
})
    return (
    <div>
      <ul>{renderedComments} </ul>
    </div>
  )
}

export default CommentList;
