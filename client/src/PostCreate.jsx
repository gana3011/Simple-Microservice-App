import React,{useState} from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title,setTitle] = useState('');

    const onSubmit = async (e) =>{
      e.preventDefault();
      try {
          await axios.post('http://posts.com/posts/create', { title });
      } catch (err) {
          console.error(err); // This will log the full error object
      }
        setTitle('');
    };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Create Post</h1>
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} type="text" />
        <button>Submit</button>  
      </form>
    </div>
  )
}

export default PostCreate;
