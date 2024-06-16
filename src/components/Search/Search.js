const Search = ({ value, setValue }) => {
  return (
    <form className="mt-5">
      <div className="card">
        <div className="card-body">
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button disabled type="submit" className="btn btn-primary mb-2">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
