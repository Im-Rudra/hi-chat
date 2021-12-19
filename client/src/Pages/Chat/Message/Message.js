/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Message = ({ msgName, message, timeStamp }) => {
  const user = useSelector((state) => state.user.value);
  const time = moment(timeStamp).format('lll');
  return (
    <>
      {user?.username === msgName ? (
        <div className="message message-me">
          <div className="message-head head-me">
            <p>{time}</p> <h3>{msgName}</h3>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <div className="message message-other">
          <div className="message-head head-other">
            <h3>{msgName}</h3> <p>{time}</p>
          </div>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Message;
