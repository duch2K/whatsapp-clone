import React, { useState } from 'react';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';

import db from '../firebase';
import { useStateValue } from '../StateProvide';
import './Chat.scss';

function Chat() {
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();

  React.useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId)
        .onSnapshot((snapshot) => 
          setRoomName(snapshot.data().name)
        );

      db.collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('Input', input);

    db.collection('rooms').doc(roomId)
      .collection('messages').add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="https://i.pravatar.cc/" />

        <div className="chat__headerInfo">
          <h3>{ roomName ? roomName : 'No room name' }</h3>
          <p>
            Last seen{' '}
            {new Date(messages[messages.length - 1]?.timestamp
              ?.toDate()).toUTCString()
            }
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <div className={`chat__message ${message.name === user.dispatch && 'chat__reciever'}`}>
            <span className="chat__name">{ message.name }</span>
            { message.message }
            <span className="chat__timestamp">
              { new Date(message.timestamp?.toDate()).toUTCString() }
            </span>
          </div>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">Send</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
