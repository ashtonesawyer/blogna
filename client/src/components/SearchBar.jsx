function SearchBar() {
  return (
    <form className="search-bar">
      <label htmlFor="search" className="form-label">
        Search posts
      </label>
      <input
        id="search"
        type="text"
        className="form-control"
        placeholder="Search by titles or keyword"
      />
    </form>
  );
}

export default SearchBar;
