import React, { useState } from 'react';
import loading from '../img/earth.gif';
import arrow from '../img/arrow.png';
import '../css/login.css';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://klima-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          // Store the token in sessionStorage
          sessionStorage.setItem('token', data.token);
          
          // Redirect to the desired page after a brief loading state
          setTimeout(() => {
            setIsLoading(false);
            window.location.href = '/downloadpage';
          }, 1000);
        } else {
          setError('Invalid credentials or token not found.');
          setIsLoading(false);
        }
      } else {
        setError('Login failed. Please check your credentials.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="background_login">
      {isLoading ? (
        <div className='loading_container'>
          <div className="loading_screen">
            <img src={loading} alt="Loading..." />
          </div>
        </div>
      ) : (
        <div className="login">
          <header className="header" id="header"></header>
          <main className="main">
            <section className="login section" id="login">
              <div className="login_container">
                <form className="login_form" onSubmit={handleSubmit}>
                  <h2 className="login_title">LOG IN</h2>
                  <input
                    type="text"
                    className='email_txtbox'
                    placeholder="EMAIL OR USERNAME"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    className='pass_txtbox'
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="forgotpass_btn"><a href="/forgotpass">FORGOT PASSWORD</a></p>
                  <button type="submit" className="loginbtn">
                    <img src={arrow} alt="Arrow" />
                  </button>
                  <p className="signup_btn"><a href="/signup">CREATE ACCOUNT</a></p>
                </form>
                {error && (
                  <div className='modal'>
                    <div className="modal_content">
                      <p className='modal_description'>{error}</p>
                      <button className="modal_close" onClick={() => setError('')}>Close</button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>

        </div>
      )}
    </div>
  );
};

export default Login;