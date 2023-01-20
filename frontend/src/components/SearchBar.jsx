import { ReactComponent as SearchIcon } from '../assets/search.svg';

const SearchBar = ({ submitHandler, keyword, setKeyword }) => {
  return (
    <div className="searchScreen__searchbar">
      <form onSubmit={submitHandler} className="searchScreen__form shadow">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search here..."
          type="text"
          className="searchScreen__input"
        />
        <button className="searchScreen__button shadow" type="submit">
          <SearchIcon className="searchScreen__icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
