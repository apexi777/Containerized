const Search = ({ value, setValue }) => {
  return (
    <form className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-4">
            Search:
          </h5>
          <div className="form-group mb-2">
          {/* <label htmlFor="username">Enter your search term:</label> */}
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          {/* <button disabled type="submit" className="btn btn-primary mb-2">
            Search
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default Search;
