import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { Chat as ChatIcon, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';

import db from '../firebase';
import { useStateValue } from '../StateProvide';
import SidebarChat from './SidebarChat';
import './Sidebar.scss';

function Sidebar() {
  const [rooms, setRooms] = React.useState([]);
  const [{ user }, dispatch] = useStateValue();

  React.useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => (
      setRooms(snapshot.docs.map((doc) => 
        ({
          id: doc.id,
          data: doc.data()
        })
      ))
    ));

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text"/>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id}
            name={room.data.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar;
