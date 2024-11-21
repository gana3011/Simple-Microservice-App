import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({postId}) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://posts.com/posts/${postId}/comments`, { content });
      setContent('');
    } catch (error) {
      console.error('Error occurred while submitting comment:', error);
      alert('There was an error submitting your comment. Please try again later.');
    }
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Enter Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          ></input>
          </div>
          <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
