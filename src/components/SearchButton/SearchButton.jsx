import { useEffect, useState } from "react";
import { SearchIcon } from "../icons/SearchIcon";
import { CoinsList } from "../CoinsList/CoinsList";
import styles from "./SearchButton.module.css";

export const SearchButton = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  useEffect(() => {
    const shortcutOpenDropdown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsShowDropdown(true);
      }
    };
    document.addEventListener("keydown", shortcutOpenDropdown);

    return () => document.removeEventListener("keydown", shortcutOpenDropdown);
  }, []);

  const toggleDropdown = () => {
    setIsShowDropdown(!isShowDropdown);
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) setIsShowDropdown(false);
  };

  return (
    <>
      <div className={styles.searchBtnWrapper}>
        <button
          className={`${styles.searchBtn} ${isShowDropdown && styles.active}`}
          type="button"
          onClick={toggleDropdown}
        >
          <SearchIcon />
          <span className={styles.searchText}>Search</span>
        </button>

        {isShowDropdown && <CoinsList setIsShowDropdown={setIsShowDropdown} />}
      </div>
      {isShowDropdown && (
        <div className={styles.backdrop} onClick={onBackdropClick}></div>
      )}
    </>
  );
};
