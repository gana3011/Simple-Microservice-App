import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import axios from 'axios';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type,data)=>{
  if(type==='PostCreated'){
    const {id, title} = data;
    posts[id] = {id, title, comments:[] };
  }

  if(type === 'CommentCreated'){
    const{id, content, postId, status} = data;
    const post = posts[postId]
    post.comments.push({id, content, status});
  }

  if(type === 'CommentUpdated'){
    const{id, content, postId, status} = data;
    const post = posts[postId];
    const comment = post.comments.find(comment=>{
      return comment.id === id;
    })
    comment.status = status;
    comment.content = content;
    
  }
}

app.get("/posts",(req,res)=>{
 res.send(posts);
});

app.post("/events",(req,res)=>{
  const { type, data} = req.body;
  
  handleEvent(type,data);
 
  res.send({});
});

app.listen(4002, async()=>{
    console.log('listening on port 4002');

    try{
      const res = await axios.get("http://event-bus-srv:4005/events");
      console.log(res.data);

      for(let events of res.data){
        console.log("Processing event "+ events.type);
        handleEvent(events.type, events.data);
      }
    }
    catch(error){
      console.log(error.message);
    }
})