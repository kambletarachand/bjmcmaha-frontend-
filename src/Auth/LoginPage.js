import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginVisitor } from '../redux/slices/visitorSlice';
import Layout from '../components/Layout';
import SignupModal from './SignupModal';
import '../styles/login_css/login.css';
import '../styles/login_css/profile.css';
import '../styles/login_css/signupmodal.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, visitor } = useSelector((state) => state.visitor);

  // On successful login, navigate to dashboard
  useEffect(() => {
    if (isAuthenticated && visitor?.verified) {
      navigate('/dashboard');
    } else if (isAuthenticated && !visitor?.verified) {
      setEmailSent(true);
      setShowSignupModal(true);
    }
  }, [isAuthenticated, visitor, navigate]);

  useEffect(() => {
    document.body.classList.add('login-open');
    return () => {
      document.body.classList.remove('login-open');
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email) ? 'Invalid email format' : '');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailError || !password) return;
    dispatch(loginVisitor({ email, password }));
  };

  const handleSignupClose = () => {
    setShowSignupModal(false);
    setEmailSent(true);
  };

  const handleSignupComplete = () => {
    setShowSignupModal(false);
    setEmailSent(false);
    setPassword('');
  };

  return (
    <Layout>
      <div className="login-overlay">
        <div className="login-floating-container">
          <div className="login-container">
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
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

              <button type="submit" disabled={loading || !!emailError}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {emailError && <p className="error-message">{emailError}</p>}
            {error && <p className="error-message">{error}</p>}
            {emailSent && (
              <p className="success-message">
                A verification email has been sent to <strong>{email}</strong>. Please check your inbox.
              </p>
            )}
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


