const PostPreview = function PostPreview({ author, date, title, description }) {
  return (
    <article className="post-card">
      <p>{author}</p>
      <p>{date}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#">Read post</a>
    </article>
  );
};

export default PostPreview;
