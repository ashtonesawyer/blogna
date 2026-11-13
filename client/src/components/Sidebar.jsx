/* Green writing inviation and registration section below */
function Sidebar() {
  return (
    <aside id="sidebar" aria-label="Join the community">
      <section className="write-callout" aria-labelledby="write-title">
        <h3 id="write-title">A space for your voice.</h3>
        <p>Have a thought to share? Turn it into a post and start a conversation.</p>
        <a className="blogna-button" href="/write">
          Start writing
        </a>
      </section>

      <section className="signup-callout" aria-labelledby="signup-title">
        <h3 id="signup-title">New here?</h3>
        <a href="/register">Create an account →</a>
        <p>Sign in to publish and join the conversation.</p>
      </section>
    </aside>
  );
}

export default Sidebar;
