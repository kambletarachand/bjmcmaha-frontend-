import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginVisitor } from '../redux/slices/visitorSlice';
import Layout from '../components/Layout';
import SignupModal from './SignupModal';
import '../styles/login_css/login.css';

const LoginPage = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, visitor } = useSelector((state) => state.visitor);

  // Redirect after successful login
  useEffect(() => {
    if (isAuthenticated && visitor?.verified) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, visitor, navigate]);

  useEffect(() => {
    document.body.classList.add('login-open');
    return () => {
      document.body.classList.remove('login-open');
    };
  }, []);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!regex.test(value) ? 'Invalid email format' : '');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleNext = async (e) => {
  e.preventDefault();
  if (!email || emailError) return;

  try {
    const response = await fetch(`http://localhost:8989/api/visitors/${email}`);

    if (response.status === 200) {
      const user = await response.json();
      if (user.verified) {
        setStep(2); // Verified → allow password entry
      } else {
        setEmailError('Your email is not verified. Please check your inbox for the verification link.');
      }
    } else if (response.status === 202) {
      const message = await response.text();
      setEmailError('A verification link has been sent to your email. Please check your inbox before logging in.');
    } else {
      setEmailError('Unexpected error. Try again.');
    }
  } catch (err) {
    setEmailError('Network error or user not found.');
  }
};

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password || emailError) return;
    dispatch(loginVisitor({ email, password }));
  };

  const handleSignupClose = () => {
    setShowSignupModal(false);
  };

  const handleSignupComplete = () => {
    setShowSignupModal(false);
    setPassword('');
    setStep(2); // After verification, allow login
  };

  return (
    <Layout>
      <div className="login-overlay">
        <div className="login-floating-container">
          <div className="login-container">
            <h1>Login Page</h1>

            {step === 1 && (
              <form onSubmit={handleNext}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <button type="submit" disabled={loading || !!emailError}>
                  {loading ? 'Checking...' : 'Next'}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            )}

            {emailError && <p className="error-message">{emailError}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>

        {showSignupModal && (
          <SignupModal
            isOpen={showSignupModal}
            onClose={handleSignupClose}
            initialEmail={email}
            onComplete={handleSignupComplete}
          />
        )}
      </div>
    </Layout>
  );
};

export default LoginPage;
