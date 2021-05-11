import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import db from '../firebase';
import './SidebarChat.scss';

function SidebarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = React.useState([]);
  // const [seed, setSeed] = React.useState('');

  React.useEffect(() => {
    if (id) {
      db.collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }

    // setSeed(Math.floor(Math.random() * 5000));
  }, [id]);

  const createChat = () => {
    const roomName = prompt('Please, enter name for chat');

    if (roomName) {
      db.collection('rooms').add({
        name: roomName
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/${id}`}>
      <div className="sidebarChat">
        {/* <Avatar src={`https://avatars.dicebar.com/api/human/${seed}.svg`} /> */}
        <Avatar src="https://i.pravatar.cc/" />
        <div className="sidebarChat__info">
          <h2>{ name }</h2>
          <p>{ messages[0]?.messages }</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;