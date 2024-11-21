import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <div>
      <PostCreate />
      <hr />
        <h3>Posts</h3>
        <PostList />
    </div>
  )
}

export default App;
