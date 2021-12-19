/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useNavigate } from 'react-router-dom';
import Message from './Message/Message';
import { message as Msg } from '../../redux/messagesSlice';
import ActivePerson from '../../components/ActivePerson/ActivePerson';
import { addActiveUser } from '../../redux/activeUserSlice';

const ENDPOINT = 'https://im-rudra-chat.herokuapp.com/';
let socket;

const Chat = () => {
  const [scrollHeight, setScrollHeight] = useState(38);
  const [message, setMessage] = useState('');
  const userData = useSelector((state) => state.user.value);
  const messages = useSelector((state) => state.messages.value);
  const allActiveUsers = useSelector((state) => state.activeusers.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket = io.connect(ENDPOINT);
    socket.emit('join', {
      name: userData.username,
      email: userData.email,
      room: 'rudra-chat'
    });

    socket.on('message', (data) => {
      dispatch(Msg(data));
    });

    socket.on('updateUser', (data) => {
      dispatch(addActiveUser(data));
      // setActiveUsers(data);
      console.log(data);
    });

    socket.on('reLogin', () => {
      navigate('/');
    });

    return () => {
      // socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT]);

  const textAreaChangeHandler = (e) => {
    setMessage(e.target.value);
    // setScrollHeight(document.querySelector('.message-textarea').scrollHeight);
    setTimeout(() => {
      setScrollHeight(38);
      setScrollHeight(e.target.scrollHeight);
    }, 0);
  };

  const submitHandler = () => {
    if (message.trim() === '') return;
    const data = {
      user: userData.username,
      message,
      timeStamp: Date.now()
    };
    socket.emit('message', data);
    setMessage('');
    setScrollHeight(38);
  };

  const textAreaSubmit = (e) => {
    if (e.code === 'Enter' && e.ctrlKey) {
      submitHandler();
    }
  };

  return (
    <div className="chat-page-container">
      <div className="chat-info">
        <h2>Active People</h2>
        {allActiveUsers?.map((user) => (
          <ActivePerson key={user.name} data={user} />
        ))}
      </div>
      <div className="chat-box">
        <div className="chat-header">
          <div className="person-info">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="person"
            />
            <p className="person-name">{userData?.username}</p>
            <div className="active-status" />
          </div>
        </div>
        <div className="message-box">
          <ScrollToBottom className="messages">
            {messages?.map((msg) => (
              <Message
                key={msg.timeStamp}
                msgName={msg.user}
                message={msg.message}
                timeStamp={msg.timeStamp}
              />
            ))}
          </ScrollToBottom>
          <div className="message-send-box">
            <textarea
              value={message}
              onChange={textAreaChangeHandler}
              onKeyPress={textAreaSubmit}
              className="message-textarea"
              name="message"
              style={{
                maxHeight: '74px',
                height: `${scrollHeight}px`,
                overflowY: scrollHeight > 74 ? 'auto' : 'hidden'
              }}
            />
            <button onClick={submitHandler} type="submit">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
