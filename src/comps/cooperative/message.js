import React from 'react';
import "../css/message.css";
import { FaMap } from 'react-icons/fa'

function Message(props) {
    return (
        <div className='message' >
            <h1><span style={{ fontSize: "3vh", padding: "8px" }}><FaMap /></span>Welcome to cooperative cars store<span style={{ fontSize: "3vh", padding: "8px" }}><FaMap /></span></h1>
            <h3 className='mt-4 mb-4 p-4'>With us, you can turn your vehicle into a shared car!</h3>
            <h5>Here you can publish a vehicle, edit it, get real-time data on shared vehicles nearby and more...</h5>
            <button onClick={() => {
                let message = document.querySelector(".message")
                message.style.display = "none"
            }} className='btn'>GO!</button>
        </div>
    )
}

export default Message;