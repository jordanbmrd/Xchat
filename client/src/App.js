import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as generateUuid } from 'uuid'
import Login from './Login';
import Chat from './Chat';
import './App.css';

let socket;
const CONNECTION_PORT = 'localhost:3001/';

function App() {
  // Before login
  const [loggedIn, setLoggedIn] = useState(false);
  const [uuid, setUuid] = useState();
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  // After login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [file, setFile] = useState(); // undefined by default

  useEffect(() => {
    socket = io(CONNECTION_PORT, { transports : ['websocket'] });
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    setUuid(generateUuid());
    socket.emit('join_room', room);
  };

  const sendMessage = () => {
    let messageContents = {
      room,
      content: {
        uuid,
        author: username,
        message,
        file,
      },
    };

    if (message || file) {
      socket.emit('send_message', messageContents);
      setMessageList([...messageList, messageContents.content]);
    }

    setMessage('');
    setFile();
  };

  const selectFile = e => {
    setFile(e.target.files[0]);
  }

  return (
    <div className="app">
      { !loggedIn ? 
      <Login
      setUsername={ setUsername }
      setRoom={ setRoom }
      connectToRoom={ connectToRoom } /> :
      <Chat
      message={ message }
      setMessage={ setMessage }
      sendMessage={ sendMessage }
      messageList={ messageList }
      uuid={ uuid }
      selectFile={ selectFile } /> }
    </div>
  );
}

export default App;
