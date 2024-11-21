import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.json());

app.post("/events", async(req,res)=>{
    const { type, data} = req.body;

    if(type == 'CommentCreated'){
        const status = data.content.includes("orange") ? "Rejected" : "Approved"

        await axios.post("http://event-bus-srv:4005/events",{
            type: "CommentModerated",
            data:{
                id: data.id,
                content:data.content,
                postId: data.postId,
                status
            }
        })
    }
})

app.listen(4003,()=>{
    console.log("listening on port 4003");
})