import { SearchIcon } from "../icons/SearchIcon";
import styles from "./SearchButton.module.css";

export const SearchButton = () => {
  return (
    <button className={styles.searchBtn}>
      <SearchIcon />
      <span className={styles.searchText}>Search</span>
    </button>
  );
};
