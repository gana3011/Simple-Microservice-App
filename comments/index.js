import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const getPostsById = {};

app.get("/posts/:id/comments",(req,res)=>{
  res.send( getPostsById[req.params.id] || []);
}) 

app.post('/posts/:id/comments', async(req,res)=>{
  const commentId = randomBytes(4).toString('hex');
  const {content} = req.body;
  const comments = getPostsById[req.params.id] || [];
  comments.push({id:commentId, content, status:'pending'});
  getPostsById[req.params.id] = comments;

  await axios.post("http://event-bus-srv:4005/events",{
    type: 'CommentCreated',
    data:{
      id:commentId, content, postId: req.params.id, status:"Pending"
    }
  }).catch((err)=>{
    console.log(err.message);
  })
  
  res.status(201).send(comments);
})

app.post("/events", async (req, res) => {
  console.log("Event received:" + req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, content, postId, status } = data;

    const comments = getPostsById[postId];

    const comment = comments.find(comment => comment.id === id);

    comment.status = status;

    try {
      await axios.post("http://event-bus-srv:4005/events", {
        type: 'CommentUpdated',
        data: { id, content, postId, status }
      });
      res.status(200).send({ message: 'Comment updated successfully' });
    } catch (error) {
      console.error('Error sending event:', error);
      res.status(500).send({ error: 'Failed to send event' });
    }
  }
});

app.listen(4001,()=>{
  console.log("listening on 4001");
})
