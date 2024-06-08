import { useState } from "react";
import { SearchIcon } from "../icons/SearchIcon";
import { CloseIcon } from "../icons/CloseIcon";
import styles from "./CoinsList.module.css";

export const CoinsList = () => {
  const [query, setQuery] = useState("");

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const clearInput = () => {
    setQuery("");
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.inputWrapper}>
        <SearchIcon width="30px" />
        <input
          className={styles.queryInput}
          type="text"
          name="query"
          value={query}
          onChange={onQueryChange}
          autoFocus
        />
        <button
          type="button"
          onClick={clearInput}
          className={styles.clearInput}
          aria-label="clear input"
        >
          <CloseIcon color="#354B8C" width="10px" height="10px" />
        </button>
      </div>
    </div>
  );
};
