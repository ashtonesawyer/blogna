/* 
REPLACE hardcoded homepage with actual posts.
*/

import { useEffect, useState } from 'react';
import PostPreview from './PostPreview';
import { formatDate, requestJSON } from '../postUtils';

const PostFeed = function PostFeed() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    requestJSON('/api/posts', { signal: controller.signal })
      .then((data) => setPosts(data.posts))
      .catch((failure) => {
        if (!controller.signal.aborted) setError(failure.message);
      });

    return () => controller.abort();
  }, []);

  if (error) return <p role="alert">{error}</p>;
  if (posts === null) return <p role="status">Loading stories…</p>;
  if (posts.length === 0) return <p>No stories have been published yet.</p>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostPreview
          key={post.id}
          id={post.id}
          author={post.authorName || 'Community member'}
          date={formatDate(post.createdAt)}
          title={post.title}
          description={post.excerpt}
        />
      ))}
    </div>
  );
};

export default PostFeed;
