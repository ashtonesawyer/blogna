import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { formatDate, initials, requestJSON } from '../postUtils';
import './SinglePost.css';

//Use the login API that already exists in the repo.
const CommentSignIn = function CommentSignIn({ onSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      await requestJSON('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const { user } = await requestJSON('/api/auth/me');
      onSignedIn(user);
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form id="comment-login" className="comment-login" onSubmit={handleLogin} aria-busy={busy}>
      <h3>Sign in to join the conversation</h3>

      <label htmlFor="reader-email">Email</label>
      <input
        id="reader-email"
        type="email"
        autoComplete="username"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="reader-password">Password</label>
      <input
        id="reader-password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error && (
        <p role="alert" className="post-error">
          {error}
        </p>
      )}

      <button className="blogna-button" type="submit" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
};

const SinglePost = function SinglePost({ postId }) {
  const [page, setPage] = useState({
    status: 'loading',
    post: null,
    comments: [],
    user: null,
    commentsError: '',
  });
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  useEffect(() => {
    const controller = new AbortController();
    const options = { signal: controller.signal };

    const load = async function load() {
      //Failed comments request should still allow the article to be read.
      const [postResult, commentsResult, userResult] = await Promise.allSettled([
        requestJSON(`/api/posts/${postId}`, options),
        requestJSON(`/api/posts/${postId}/comments`, options),
        requestJSON('/api/auth/me', options),
      ]);

      if (controller.signal.aborted) return;

      if (postResult.status === 'rejected') {
        setPage({ status: 'error', error: postResult.reason.message });
        return;
      }

      setPage({
        status: 'ready',
        post: postResult.value.post,
        comments: commentsResult.status === 'fulfilled' ? commentsResult.value.comments : [],
        commentsError: commentsResult.status === 'rejected' ? commentsResult.reason.message : '',
        user: userResult.status === 'fulfilled' ? userResult.value.user : null,
      });
    };

    load();

    // Cancel unfinished requests when the component leaves the page.
    return () => controller.abort();
  }, [postId]);

  const handleComment = async function handleComment(event) {
    event.preventDefault();

    const content = draft.trim();

    if (!content || content.length > 255) {
      setFeedback({ error: 'Write a comment between 1 and 255 characters.', success: '' });
      return;
    }

    setSending(true);
    setFeedback({ error: '', success: '' });

    try {
      const { comment } = await requestJSON(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });

      // Display the record confirmedw by the database before clearing the draft.
      setPage((previous) => ({
        ...previous,
        comments: [...previous.comments, comment],
      }));
      setDraft('');
      setFeedback({ error: '', success: 'Your comment was posted.' });
    } catch (failure) {
      if (failure.status === 401) {
        setPage((previous) => ({ ...previous, user: null }));
        setFeedback({
          error: 'Please sign in again. Your comment draft has been kept.',
          success: '',
        });
      } else {
        setFeedback({ error: failure.message, success: '' });
      }
    } finally {
      setSending(false);
    }
  };

  const handleSignOut = async function handleSignOut() {
    setSigningOut(true);

    try {
      await requestJSON('/api/auth/logout', { method: 'POST' });
      setPage((previous) => ({ ...previous, user: null }));
      setFeedback({ error: '', success: 'You have signed out.' });
    } catch (failure) {
      setFeedback({ error: failure.message, success: '' });
    } finally {
      setSigningOut(false);
    }
  };

  if (page.status === 'loading') {
    return (
      <>
        <Navbar />
        <main className="single-post">
          <p role="status">Loading story…</p>
        </main>
      </>
    );
  }

  if (page.status === 'error') {
    return (
      <>
        <Navbar />
        <main className="single-post">
          <a href="/">← All stories</a>
          <h1>Unable to open this story</h1>
          <p role="alert">{page.error}</p>
        </main>
      </>
    );
  }

  const { post, comments, user, commentsError } = page;
  const authorName = post.authorName || 'Community member';

  return (
    <>
      <Navbar
        user={user}
        onSignOut={handleSignOut}
        signingOut={signingOut}
        signInHref="#comment-login"
      />

      <main className="single-post">
        <a className="all-stories" href="/">
          ← All stories
        </a>

        <article aria-labelledby="single-post-title">
          <header>
            <div className="post-meta">
              <span className="post-avatar" aria-hidden="true">
                {initials(authorName)}
              </span>
              <div>
                <strong>{authorName}</strong>
                <time dateTime={post.createdAt || undefined}>{formatDate(post.createdAt)}</time>
              </div>
            </div>

            <h1 id="single-post-title">{post.title}</h1>
          </header>

          {/* React renders text safely, whilst CSS preserves the author's line breaks. */}
          <div className="post-body">{post.content}</div>
        </article>

        <section className="post-comments" aria-labelledby="conversation-title">
          <div className="conversation-heading">
            <h2 id="conversation-title">The conversation</h2>
            {!commentsError && (
              <span>
                {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
              </span>
            )}
          </div>

          {commentsError && (
            <p role="alert" className="post-error">
              {commentsError} Reload the page to try again.
            </p>
          )}

          {!commentsError && comments.length === 0 && <p>Be the first to add a comment.</p>}

          {comments.map((comment) => (
            <article key={comment.id} className="reader-comment">
              <div className="post-meta">
                <span className="post-avatar" aria-hidden="true">
                  {initials(comment.authorName || 'Community member')}
                </span>
                <div>
                  <strong>{comment.authorName || 'Community member'}</strong>
                  <time dateTime={comment.createdAt || undefined}>
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
              </div>
              <p className="comment-content">{comment.content}</p>
            </article>
          ))}

          {feedback.error && (
            <p className="post-error" role="alert">
              {feedback.error}
            </p>
          )}
          <p role="status">{feedback.success}</p>

          {!user && (
            <CommentSignIn
              onSignedIn={(signedInUser) =>
                setPage((previous) => ({ ...previous, user: signedInUser }))
              }
            />
          )}

          {user && (
            <p className="signed-in-reader">Commenting as {user.fullname || 'Community member'}</p>
          )}

          <form className="comment-form" onSubmit={handleComment} aria-busy={sending}>
            <label htmlFor="comment-content">Your comment</label>
            <textarea
              id="comment-content"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={4}
              maxLength={255}
              required
              disabled={!user || sending || Boolean(commentsError)}
              aria-describedby="comment-limit"
              placeholder="Add to the conversation…"
            />

            <div className="comment-form-footer">
              <small id="comment-limit">{draft.length}/255 characters</small>
              <button
                className="blogna-button"
                type="submit"
                disabled={!user || sending || !draft.trim() || Boolean(commentsError)}
              >
                {sending ? 'Posting…' : 'Post comment'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default SinglePost;
