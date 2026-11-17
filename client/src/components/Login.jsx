import { useState } from 'react';

// main function for logging into an account
const Login = function Login() {
  // store email and password entered by user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handle login form submission
  const handleSubmit = function handleSubmit(e) {
    // prevent page from refreshing when submitting form
    e.preventDefault();

    // make sure email and password are not empty
    if (!email.trim() || !password.trim()) {
      alert('Please enter your email and password.');
      return;
    }

    // backend authentication will be added later
    alert('Login form submitted.');
  };

  return (
    <main className="container mt-5">
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
        {/* email input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* submit login information (backend added later) */}
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default Login;
