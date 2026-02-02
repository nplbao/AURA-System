import { useState } from 'react';
import { Layout } from '../components/Layout';
import './Dashboard.css';

export const UserMessages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const mockChats = [
    { id: '1', doctorName: 'Dr. Smith', lastMessage: 'Your results look good...', unread: 2 },
    { id: '2', doctorName: 'Dr. Johnson', lastMessage: 'Please schedule a follow-up', unread: 0 },
  ];

  const mockMessages = [
    { id: '1', sender: 'doctor', text: 'Hello, I have reviewed your latest analysis.', time: '10:30 AM' },
    { id: '2', sender: 'doctor', text: 'The results show improvement from last time.', time: '10:31 AM' },
    { id: '3', sender: 'user', text: 'Thank you doctor!', time: '11:00 AM' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Implement send message
      setMessage('');
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Messages</h1>

        <div className="messages-container">
          <div className="chats-list">
            <h3>Conversations</h3>
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat === chat.id ? 'selected' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="chat-info">
                  <h4>{chat.doctorName}</h4>
                  <p>{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
              </div>
            ))}
          </div>

          {selectedChat && (
            <div className="chat-window">
              <div className="chat-header">
                <h3>{mockChats.find((c) => c.id === selectedChat)?.doctorName}</h3>
              </div>
              <div className="messages-list">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.sender === 'user' ? 'sent' : 'received'}`}
                  >
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="btn-primary">
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
