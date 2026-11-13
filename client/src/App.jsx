import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import PostPreview from './components/PostPreview';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';

const App = function App() {
  return (
    <>
      {/* For header + links */}
      <Navbar />

      <main>
        {/* Hero is for prominent sections of page. */}
        <Hero />

        <section id="stories">
          <div className="stories-header">
            <h2>Latest Stories</h2>
            <SearchBar />
          </div>

          <div className="content">
            {/* For the PostCards, these are placeholders. We will update to retrieve information from the backend. */}
            <PostPreview
              author="Ryan Gosling"
              date="November 1, 2026"
              title="Life may be a beach, but YOU are KENOUGH"
              description="Ways to take your mind of heartbreak, and embrace beach..."
            />

            <PostPreview
              author="Ryan Gosling"
              date="November 1, 2026"
              title="Life may be a beach, but YOU are KENOUGH"
              description="Ways to take your mind of heartbreak, and embrace beach..."
            />

            <Sidebar />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
