import { useState } from 'react';

// main function for creating/editing post
//    post: existing post info to edit, null for new
//    onSave: func passed from parent to save post info (for future backend)
const WritePost = function WritePost({ post = null, onSave }) {
  // store title/content of post OR use existing info for editing
  const [title, setTitle] = useState(post?.title ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [validated, setValidated] = useState(false);

  // if editing, change format of page
  const isEditing = post !== null;

  // handle publishing or editing a post
  const handlePublish = function handlePublish(e) {
    // prevent page from refreshing when submitting form
    e.preventDefault();

    // check if the form is valid
    const isValid = e.currentTarget.checkValidity();
    setValidated(true);

    if (!isValid) {
      return;
    }

    // prepare the information for the backend
    const postData = {
      title: title.trim(),
      content: content.trim(),
    };

    // pass the post information to the save function
    if (onSave) {
      onSave(postData);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEditing ? 'Edit Post' : 'Write a Post'}</h2>

      <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handlePublish}>
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
            required
          />
          <div className="invalid-feedback">Please enter a post title.</div>
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
            required
          />
          <div className="invalid-feedback">Please enter post content.</div>
        </div>

        {/* submit post information (connect onSave to backend later) */}
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Save Changes' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default WritePost;
