import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      onSubmit(value);
    } else {
      toast.error("Can not be blank!");
    }
  };

  return (
    <header>
      <div>
        <Toaster />
      </div>
      <form className={css.header} onSubmit={handleSubmit}>
        <input
          className={css.headerInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
