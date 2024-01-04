import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAuthenticated = await mockAuthentication(formData);

    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const mockAuthentication = async ({ username, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(username === 'demo' && password === 'password');
      }, 1000);
    });
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
