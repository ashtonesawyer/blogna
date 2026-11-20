/*
Provide the B'logna branding in addition to classes needed for 
horizontal naviagation. 
---
UPDATE:
Shared navigation. 
The single-post page supplies session details
and a sign-in link pointing to its comment login form.
*/
const Navbar = function Navbar({
  user = null,
  onSignOut,
  signingOut = false,
  signInHref = '/login',
}) {
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

          {user ? (
            <>
              <li className="nav-user">{user.fullname || 'Community member'}</li>
              <li>
                <button
                  className="nav-signout"
                  type="button"
                  onClick={onSignOut}
                  disabled={signingOut}
                >
                  {signingOut ? 'Signing out…' : 'Sign out'}
                </button>
              </li>
            </>
          ) : (
            <li>
              <a href={signInHref}>Sign in</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
