import { useState } from 'react';

// main function for creating/editing post
//    post: existing post info to edit, null for new
//    onSave: func passed from parent to save post info (for future backend)
function WritePost({ post = null, onSave }) {
  // store title/content of post OR use existing info for editing
  const [title, setTitle] = useState(post?.title ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [error, setError] = useState('');

  // if editing, change format of page
  const isEditing = post !== null;

  // Handle publishing or editing a post
  function handlePublish() {
    // Make sure the title and content are not empty
    if (title.trim() === '' || content.trim() === '') {
      setError('Please enter a title and content before publishing.');
      return;
    }

    setError('');

    // Prepare the information for the backend
    const postData = {
      title: title.trim(),
      content: content.trim(),
    };

    // Pass the post information to the save function
    if (onSave) {
      onSave(postData);
    }
  }

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Edit Post' : 'Write a Post'}</h2>

      {/* set title of post */}
      <div className="mb-3">
        <label htmlFor="postTitle" className="form-label">
          Post Title
        </label>

        <input
          type="text"
          id="postTitle"
          className="form-control"
          placeholder="Enter your post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* set content of post */}
      <div className="mb-3">
        <label htmlFor="postContent" className="form-label">
          Post Content
        </label>

        <textarea
          id="postContent"
          className="form-control"
          rows="10"
          placeholder="Start writing your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {/* error handling */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {/* button to save post (update onSave for backend) */}
      <button type="button" className="btn btn-primary" onClick={handlePublish} disabled={!onSave}>
        {isEditing ? 'Save Changes' : 'Publish Post'}
      </button>
    </div>
  );
}

export default WritePost;
