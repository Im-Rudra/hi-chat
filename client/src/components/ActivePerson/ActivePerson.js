import React from 'react';
import './ActivePerson.css';

const ActivePerson = ({ data }) => (
  <div className="active-person">
    <div className="avater">{data.name?.split('')[0]}</div>
    <h3>{data.name}</h3>
  </div>
);

export default ActivePerson;
