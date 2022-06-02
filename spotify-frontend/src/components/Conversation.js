import Navbar from "./navbar";
import axios from "axios"
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Forum from './IndivForum.js'
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IndivForum from "./IndivForum.js";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { border } from "@mui/system";

function Conversation() {
    const location = useLocation();
    const contact = location.state?.contact
    const userName = location.state?.userName
    const messageRef = useRef(null);
    const [conversation, setConversation] = useState()

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

        messageRef.current.value = ""
        window.location.reload(false);
    }

    return (
        <div className="IndivConversation">
            <div style={{

                margin: "20px"
            }}>
                <Link to="/Inbox">Return to Inbox</Link>
                <h1>{contact}</h1>
            </div>
            <center>
                <form onSubmit={sendMessage} >
                    <textarea type="text" ref={messageRef} rows="2" cols="50"
                        style={{ borderRadius: '25px' }} />
                    <input type="submit" value="Send Message" style={{
                        display: 'flex',
                        alignItems: 'right',
                        justifyContent: 'center',
                        color: 'blue',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        height: "50px",
                        width: "200px",
                        fontSize: '20px',
                        borderRadius: '10px',
                        padding: '20px'
                    }} />
                </form>
                <hr></hr>
            </center>

            {conversation && conversation.map((c, index) => {
                return c.sent ?
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'black',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            borderRadius: '25px',
                            backgroundColor: '#1982FC',
                            display: 'inline-block',
                            padding: '5px',
                            marginLeft: '50px',
                            marginBottom: '5px',
                            marginTop: '5px',
                            position: 'relative',
                            left: "1100px"
                        }}>
                            <p>{c.message}</p>
                        </div> <br></br>
                    </div> :
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'black',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            borderRadius: '25px',
                            backgroundColor: '#D3D3D3',
                            display: 'inline-block',
                            padding: '5px',
                            marginLeft: '50px',
                            marginBottom: '5px',
                            marginTop: '5px',
                            position: 'relative',
                            left: "700px"
                        }}>
                            <p>{c.message}</p>
                        </div><br></br>
                    </div>
            }
            )}
        </div>
    );
}
export default Conversation;