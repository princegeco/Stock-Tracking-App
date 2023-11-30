import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailExists(false);
    setUsernameExists(false);
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log(response.data.message);
      setSignupSuccess(true);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes('Email')) {
            setEmailExists(true);
          }
          if (errorMessage.includes('Username')) {
            setUsernameExists(true);
          }
        }
      } 
      console.error('Signup error:', error);
      // Handle other signup errors (display error message, etc.)
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Sign Up</h2>
                {signupSuccess ? (
                  <p className="text-success text-center">Signup successful! You can now <Link to="/">login</Link>.</p>
                ) : (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        {emailExists ? (<p className="text-danger">Email is already in use.</p>) : null}
                      </div>
                      <div className="form-group">
                        <label>First Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Username:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                        {usernameExists && <p className="text-danger">Username is already in use.</p>}
                      </div>
                      <div className="form-group">
                        <label>Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-success btn-block mt-4" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                        Sign Up
                      </button>
                    </form>
                    
                    <p className="text-center mt-3">
                      Already have an account? <Link to="/">Login</Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
