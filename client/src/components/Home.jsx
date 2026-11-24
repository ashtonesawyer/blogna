import Hero from './Hero';
import PostPreview from './PostPreview';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

// main page for displaying blog posts
const Home = function Home() {
  return (
    <main>
      {/* Hero is for prominent sections of page */}
      <Hero />

      <section id="stories">
        <div className="stories-header">
          <h2>Latest Stories</h2>
          <SearchBar />
        </div>

        <div className="content">
          {/* temporary posts until backend is connected */}
          <PostPreview
            author="Ryan Gosling"
            date="November 1, 2026"
            title="Life may be a beach, but YOU are KENOUGH"
            description="Ways to take your mind off heartbreak, and embrace beach..."
          />

          <PostPreview
            author="Ryan Gosling"
            date="November 1, 2026"
            title="Life may be a beach, but YOU are KENOUGH"
            description="Ways to take your mind off heartbreak, and embrace beach..."
          />

          <Sidebar />
        </div>
      </section>
    </main>
  );
};

export default Home;
