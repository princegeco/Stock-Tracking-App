import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import stocksOnPhone from '../Images/phone_with_stocks.jpg';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const [loginStatus, setLoginStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/', formData);
      console.log(response.data);
      setLoginStatus('Login successful');
      // Handle successful login, e.g., store user information in state or session
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.status === 401) {
        setLoginStatus('Invalid credentials');
        // Handle invalid credentials, e.g., show an error message
      } else {
        setLoginStatus('Failed to connect to the server');
        // Handle connection failure, e.g., show an error message
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 p-0 position-relative">
          <div className="welcome-text position-absolute top-50 start-0 translate-middle-y p-4 text-white">
            <h1 className="display-4">Stockify</h1>
            <p className="lead">An Easy Way to Get Personalized Stock Updates</p>
          </div>
          <img
            src={stocksOnPhone}
            alt="Background"
            className="img-fluid w-100 vh-100" // height to vh-100
            style={{ objectFit: 'cover', objectPosition: 'top left' }}
          />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card" style={{ width: '60%', margin: 'auto' }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                  Login
                </button>
              </form>
              <p className={`mt-3 text-center ${loginStatus.includes('successful') ? 'text-success' : 'text-danger'}`}>
                {loginStatus}
              </p>
              <div className="text-center mt-3">
                <Link to="/signup">Don't have an account? Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );   
};

export default Login;