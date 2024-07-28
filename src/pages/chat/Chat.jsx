// ChatComponent.js (or any component where you want to use Socket.io)

import React, { useEffect } from 'react';
import io from 'socket.io-client';

// Replace with your server URL

const Chat = () => {


  return (
    <div>
      <h1>Chat Component</h1>
      <button >Send Message</button>
    </div>
  );
};

export default Chat;
