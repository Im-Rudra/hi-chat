/* eslint-disable prettier/prettier */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const reduxFormData = useSelector((state) => state.user.value);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleFormInput = (e) => {
    const { name, value } = e.target;
    const dataObj = { ...formData };
    dataObj[name] = value;
    setFormData(dataObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    const data = { ...formData };
    for (const objKey in data) {
      data[objKey] = '';
    }
    // e.target.reset();
    setFormData(data);
    navigate('/chat');
  };

  console.log('redux', reduxFormData);
  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Username</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleFormInput}
          />
          <h2>Email</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormInput}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
