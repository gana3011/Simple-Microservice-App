import express from "express";
import {randomBytes} from "crypto";
import bodyParser from "body-parser";
import cors from 'cors';
import axios from "axios";

const app = express();
app.use(bodyParser.json())
app.use(cors());

let posts = {};

app.get("/posts",(req,res)=>{
  res.send(posts);
})

app.post("/posts/create", async(req,res)=>{
 const id = randomBytes(4).toString("hex");
 const {title} = req.body
 posts[id]={
    id,title
 };

 await axios.post("http://event-bus-srv:4005/events",{
  type:'PostCreated',
  data:{
    id,title
  }
 })

 res.status(201).send(posts[id]);
})

app.post("/events",(req,res)=>{
  console.log("Event received:"+ req.body.type);
})


app.listen(4000,()=>{
  console.log("updated v2");
    console.log("listening on 4000");
})