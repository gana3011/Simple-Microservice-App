import bodyParser from "body-parser";
import axios from "axios";
import express from 'express';


const app = express();
app.use(bodyParser.json());

let events = [];


app.post("/events",(req,res)=>{

    const event = req.body;

    events.push(event);
    
    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err.message);
      });
      axios.post('http://comments-srv:4001/events', event).catch((err) => {
        console.log(err.message);
      });
      axios.post('http://query-srv:4002/events', event).catch((err) => {
        console.log(err.message);
      });
      axios.post('http://moderation-srv:4003/events', event).catch((err) => {
        console.log(err.message);
      });
    
      res.status(201).send({ status: 'OK' });
});

app.get("/events",(req,res)=>{
  res.send(events);
})

app.listen(4005, ()=>{
    console.log("listening on 4005");
})