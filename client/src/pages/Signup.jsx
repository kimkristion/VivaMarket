import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations.js';

import AuthService from '../utils/auth.js';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  //const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
                ) : 
                
                (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                      className="form-input"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="username">Email:</label>
                    <input
                      className="form-input"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="username">Password:</label>
                    <input
                      className="form-input"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      className="btn btn-block btn-primary"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}
    
                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
                  </div>
    )}
                

export default SignupPage;
