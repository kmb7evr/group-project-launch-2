import Navbar from "./navbar";
import axios from "axios"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Forum from './IndivForum.js'
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Conversation() {
    const location = useLocation();
    const contact=location.state?.contact
    const userName=location.state?.userName
    const messageRef = useRef(null);
    const [conversation, setConversation]=useState()


    useEffect(() => {
        fetch("http://localhost:9000/inbox/indivConversation?name=" + userName + "?" + contact)
        .then((res) => res.json())
        .then((text) => setConversation(text.result))
        .catch((err) => console.log(err))
      }, [])


    const sendMessage = (e) => {
        e.preventDefault();  // no reloading the page
        var current = new Date();
        axios.post("http://localhost:9000/inbox/newMessage", {
            name: userName,
            otherUser: contact,
            Message: messageRef.current.value
        })

        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))

        messageRef.current.value=""
        window.location.reload(false);
    }
    
  return (
    <center>
    <div className="IndivConversation">
    <Link to="/Inbox">Return to Inbox</Link> 
    <h1>Conversation with: {contact}</h1>
    <form onSubmit={sendMessage} >
            <h1>New Message</h1>
            <input type="text" ref={messageRef}/> <br></br><br></br>
            <input type="submit" value="Send Message"/>
    </form>

    {conversation && conversation.map((c, index) => 
        <p>{c.message}</p>
    )}
    </div>
    </center>
  );
}

export default Conversation;

/*
    
*/