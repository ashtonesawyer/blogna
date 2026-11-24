import { Link } from 'react-router';

/*
Provide the B'logna branding in addition to classes needed for 
horizontal naviagation. 
*/
const Navbar = function Navbar() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="B'logna home">
          B'logna
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Discover</Link>
          </li>
          <li>
            <Link className="blogna-button" to="/write">
              Write a Post
            </Link>
          </li>
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
