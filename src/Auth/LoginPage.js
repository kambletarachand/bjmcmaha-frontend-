import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginVisitor } from '../redux/slices/visitorSlice';
import Layout from '../components/Layout';
import SignupModal from './SignupModal';
import '../styles/login_css/login.css';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, visitor } = useSelector((state) => state.visitor);

  // Redirect after successful login
  useEffect(() => {
    console.log('[useEffect] Checking isAuthenticated and verified...');
    if (isAuthenticated && visitor?.verified) {
      console.log('[Redirect] Login successful, redirecting to dashboard...');
      navigate('/dashboard');
    }
  }, [isAuthenticated, visitor, navigate]);

  useEffect(() => {
    console.log('[useEffect] Applying login CSS...');
    document.body.classList.add('login-open');
    return () => {
      document.body.classList.remove('login-open');
    };
  }, []);

  const validateEmail = (value) => {
    console.log('[validateEmail] Validating:', value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const error = !regex.test(value) ? 'Invalid email format' : '';
    console.log('[validateEmail] Result:', error);
    setEmailError(error);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    console.log('[handleEmailChange] Email input changed:', value);
    setEmail(value);
    validateEmail(value);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    console.log('[handleNext] Step 1 submit clicked. Email:', email);

    if (!email || emailError) {
      console.warn('[handleNext] Invalid email or format error.');
      return;
    }

    try {
      console.log('[handleNext] Fetching visitor by email...');
      const response = await fetch(`http://localhost:8989/api/visitors/${email}`);

      if (response.status === 200) {
        const user = await response.json();
        console.log('[handleNext] Visitor found:', user);

        if (user.verified) {
          if (!user.password || user.password.trim() === '') {
            console.log('[handleNext] No password found. Opening SignupModal...');
            setShowSignupModal(true);
          } else {
            console.log('[handleNext] Password exists. Moving to Step 2 (password input)...');
            setStep(2);
          }
        } else {
          console.warn('[handleNext] Email not verified.');
          setEmailError('Your email is not verified. Please check your inbox for the verification link.');
        }

      } else if (response.status === 202) {
        console.warn('[handleNext] Verification link sent.');
        setEmailError('A verification link has been sent to your email. Please check your inbox before logging in.');
      } else {
        console.error('[handleNext] Unexpected error status:', response.status);
        setEmailError('Unexpected error. Try again.');
      }
    } catch (err) {
      console.error('[handleNext] Network error or user not found:', err);
      setEmailError('Network error or user not found.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('[handleLogin] Submitting login for:', email);

    if (!email || !password || emailError) {
      console.warn('[handleLogin] Missing email or password or has error.');
      return;
    }

    dispatch(loginVisitor({ email, password }));
    console.log('[handleLogin] Dispatched loginVisitor action.');
  };

  const handleSignupClose = () => {
    console.log('[handleSignupClose] Closing signup modal...');
    setShowSignupModal(false);
  };

  const handleSignupComplete = () => {
    console.log('[handleSignupComplete] Signup complete. Moving to Step 2...');
    setShowSignupModal(false);
    setPassword('');
    setStep(2);
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
