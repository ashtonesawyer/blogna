import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import PostFeed from './components/PostFeed';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import SinglePost from './components/SinglePost';
import WritePost from './components/WritePost';

const App = function App() {
  //pathname excludes query strings.
  //No affect on path.
  const page = window.location.pathname;

  //Match single-post URL, such as /posts/1 or /posts/12.
  const postMatch = page.match(/^\/posts\/([^/]+)\/?$/);

  //SinglePost supplies its own Navbar and main element.
  //Key resets its state when a different post is opened.
  if (postMatch) {
    return <SinglePost key={postMatch[1]} postId={postMatch[1]} />;
  }

  //Preserve the existing writing page.
  if (page === '/write') {
    return (
      <>
        <Navbar />
        <main>
          <WritePost />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section id="stories">
          <div className="stories-header">
            <h2>Latest Stories</h2>
            <SearchBar />
          </div>

          <div className="content">
            {/* Load real post summaries and their database IDs. */}
            <PostFeed />

            <Sidebar />
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
