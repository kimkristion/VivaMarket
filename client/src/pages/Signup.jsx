import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import showOn from '../assets/visibilityOn.png'
import showOff from '../assets/visibilityOff.png'

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import AuthService from '../utils/auth';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formData },
      });

      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='signup-page'>
      <h2>Sign Up</h2>

      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="form-input"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label htmlFor="firstName">First Name:</label>
          <input
            className="form-input"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="form-input"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Create a password:</label>
          <div className="password-input-container">
            <input
              className="form-input password-input"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={handleTogglePassword}
            >
             {showPassword ? (
                <img src={showOn} alt="Show Password" className="password-icon" />
              ) : (
                <img src={showOff} alt="Hide Password" className="password-icon" />
              )}
            </button>
          </div>
          <button
            className="create-account"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Create Account
          </button>
        </form>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default SignupPage;
