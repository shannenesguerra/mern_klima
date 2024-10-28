import React, { useState } from 'react';
import arrow from '../img/arrow.png';
import { useNavigate } from 'react-router-dom';
import '../css/signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill('')); // Initialize OTP array for 6 digits
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const lowercaseCheck = /[a-z]/.test(password);
    const uppercaseCheck = /[A-Z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return lengthCheck && lowercaseCheck && uppercaseCheck && numberCheck && specialCharCheck;
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include a mix of lowercase and uppercase letters, numbers, and special symbols."
      );
      return;
    }

    try {
      const response = await fetch('https://klima-backend.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSignupModalOpen(true);
        setTimeout(() => {
          setIsSignupModalOpen(false);
          setIsOtpModalOpen(true);
        }, 3000);
      } else if (data.message === 'Username is taken') {
        setUsernameError('Username is already taken.');
      } else {
        setPasswordError(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setPasswordError('Signup failed. Please try again later.');
    }
  };

  const handleOtpVerification = async () => {
    try {
      const otpCode = otp.join(''); // Convert array to string
      const response = await fetch('https://klima-backend.onrender.com/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode })
      });

      const data = await response.json();

      if (response.ok) {
        setIsOtpModalOpen(false);
        navigate('/login');
      } else {
        alert(`OTP verification failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('OTP verification failed. Please try again later.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && (value.length <= 1)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to the next input if the current one is filled
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="background_signup">
      <div className="signup">
        <header className="header" id="header">
          <div className="logo_img"></div>
        </header>

        <main className="main">
          <section className="signup section" id="signup">
            <div className="signup_container">
              <form className="signup_form" onSubmit={handleSignup}>
                <h2 className="signup_title">SIGN UP</h2>
                <input
                  type="text"
                  className='user_txtbox'
                  placeholder="USERNAME"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className='email_txtbox'
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className='pass_txtbox'
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className='confirmpass_txtbox'
                  placeholder="CONFIRM PASSWORD"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {usernameError && <p className="error_text">{usernameError}</p>}
                {passwordError && <p className="error_text">{passwordError}</p>}
                {confirmPasswordError && <p className="error_text">{confirmPasswordError}</p>}

                <button type="submit" className="signupbtn">
                  <img src={arrow} alt="Arrow" />
                </button>
                <p className="login_btn"><a href="/login">ALREADY HAVE AN ACCOUNT?</a></p>
              </form>
            </div>
          </section>
        </main>

        {/* Signup success modal */}
        {isSignupModalOpen && (
          <div className="modal">
            <div className="modal_content">
              <h3 className='modal_title'>Signup Successful!</h3>
              <p className='modal_phrase'>Welcome, <strong>{username}!</strong> Redirecting to OTP verification...</p>
            </div>
          </div>
        )}

        {/* OTP verification modal */}
        {isOtpModalOpen && (
          <div className="modal">
            <div className="modal_content">
              <h3 className='modal_title'>OTP Verification</h3>
              <p className='vmodal_phrase'>Enter the OTP sent to <strong>{email}</strong>:</p>
              <div className="otp-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength={1}
                    className="otp-input"
                    placeholder=""
                  />
                ))}
              </div>
              <button className='verify_button' onClick={handleOtpVerification}>Verify OTP</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
