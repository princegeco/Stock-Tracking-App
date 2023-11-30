import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import stocksOnPhone from '../Images/phone_with_stocks.jpg';
import './Login.css';
import Navbar from './Navbar';
import stockLogo from '../Images/colorful_stock_logo.png'

const Login = () => {

  // 'Start Tracking' button behavior
  const loginSectionRef = useRef(null);

  const handleStartTrackingClick = () => {
    loginSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Logging in
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
      console.log(response.data.message);
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
    <div>
      <Navbar/>
        
        <section className='pt-5'> 
          <div className='container'> 

            {/* Entire Landing Section */}
            <div className='row'>
              {/* Image col */}
              <div className='col-sm-6 d-sm-flex justify-content-center'>
                <img src={stocksOnPhone} alt="Stocks on a man's phone" className='img-fluid d-none d-sm-block' style={{maxHeight:'80vh', width:'31vw'}}/>
              </div>
              {/* Text col */}
              <div className='col-sm-6 d-sm-flex text-center align-items-center flex-column justify-content-center'> {/* align... will center vertically, just..centers horizontally but only with flex, text-center centers the text when viewport is small! */}
                <div>
                  <img src={stockLogo} alt="Stockify Logo" className='img-fluid mx-auto d-block'/>
                </div>
                <h1 className='text-success' style={{fontSize:'80px', maxWidth:'100%'}}>Stockify</h1>     
                <h5>Personalized stock tracking</h5>
                <button className='btn mt-5 start-tracking-btn' onClick={handleStartTrackingClick}>Start Tracking</button>
              </div>
            </div>

            {/* Horizontal Marker */}
            <div className='row my-5'>
              <hr className='' />
            </div>

            {/* Login */}
            <div ref={loginSectionRef} className='row m-5'>
              <h2 className='text-center'>Login</h2>
              <form onSubmit={handleSubmit} className='col-sm-4 offset-sm-4'>
                  <div className="form-group mb-2">
                    <label>Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="btn btn-success mx-auto d-block">
                    Login
                  </button>
                </form>
                <p className={`mt-3 text-center ${loginStatus.includes('successful') ? 'text-success' : 'text-danger'}`}>
                  {loginStatus}
                </p>
                <div className="text-center mt-1">
                  <Link to="/signup">Don't have an account? Sign up</Link>
                </div>
            </div>

          </div>
        </section>
    </div>
  );
};

export default Login;
