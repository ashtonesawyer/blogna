/*
Provide the B'logna branding in addition to classes needed for 
horizontal naviagation. 
*/
function Navbar() {
  return (
  <header className="site-header">
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="/" aria-label="B'logna home">
       B'logna
      </a>
      
      <ul className="nav-links">
        <li>
          <a href="/">Discover</a>
        </li>
        <li>
          <a className="blogna-button" href="/write">
           Write a Post
          </a>
        </li>
        <li>
          <a href="/login">Sign in</a>
        </li>
      </ul>
    </nav>
  </header>
  );
}

export default Navbar;
