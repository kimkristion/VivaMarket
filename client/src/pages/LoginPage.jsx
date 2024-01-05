import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Auth from '../utils/auth.js';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations.js';

const Login = (props) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
    console.log(formData);

    try {
      const { data } = await login({
        variables: { ...formData },
      });

      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
      alert('Invalid Login');
    };

      // clear form values
      setFormData({
        username: '',
        password: '',
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

export default Login;
