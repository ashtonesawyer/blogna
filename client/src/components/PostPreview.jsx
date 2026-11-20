const PostPreview = function PostPreview({ id, author, date, title, description }) {
  return (
    <article className="post-card">
      <p>{author}</p>
      <p>{date}</p>
      <h3>{title}</h3>
      <p>{description}</p>

      {/* Open the full article using its database ID. */}
      <a href={`/posts/${id}`}>Read post →</a>
    </article>
  );
};

export default PostPreview;
