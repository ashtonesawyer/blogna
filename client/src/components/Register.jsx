import { useState } from 'react';

// main function for creating a new account
const Register = function Register() {
  // store user information entered into the form
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // handle registration form submission
  const handleSubmit = function handleSubmit(e) {
    // prevent page from refreshing when submitting form
    e.preventDefault();

    // check if the form is valid
    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      setSubmitted(false);
      return;
    }

    // show success message until backend is connected
    setSubmitted(true);
  };

  return (
    <main className="container mt-5">
      <h2>Register</h2>
      <p>Create an account to start posting on B'logna.</p>

      {/* show message when form is submitted */}
      {submitted && (
        <div className="alert alert-success" role="alert">
          Registration form submitted.
        </div>
      )}

      {/* registration form */}
      <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
        {/* full name input */}
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Full name
          </label>
          <input
            type="text"
            id="fullname"
            className="form-control"
            placeholder="Enter your full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            pattern=".*\S+.*"
          />
          <div className="invalid-feedback">Please enter your full name.</div>
        </div>
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
            required
          />
          <div className="invalid-feedback">Please enter a valid email.</div>
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
            minLength={10}
            maxLength={100}
            required
          />
          <div className="invalid-feedback">Please enter your password.</div>
        </div>
        {/* submit registration information */}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
