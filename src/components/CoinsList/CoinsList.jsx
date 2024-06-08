import { useEffect, useState } from "react";
import { SearchIcon } from "../icons/SearchIcon";
import { CloseIcon } from "../icons/CloseIcon";
import { getCoins } from "../../api/getCoins";
import { EmptyStarIcon } from "../icons/EmptyStarIcon";
import styles from "./CoinsList.module.css";

export const CoinsList = () => {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    getCoins().then(setCoins);
  }, []);

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const clearInput = () => {
    setQuery("");
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.inputWrapper}>
        <SearchIcon width="24px" height="24px" />
        <input
          className={styles.queryInput}
          type="text"
          name="query"
          value={query}
          onChange={onQueryChange}
          placeholder="Search..."
          autoFocus
        />
        <div className={styles.clearBtnPlaceholder}>
          {query && (
            <button
              type="button"
              onClick={clearInput}
              className={styles.clearInput}
              aria-label="clear input"
            >
              <CloseIcon color="#354B8C" width="10px" height="10px" />
            </button>
          )}
        </div>
      </div>

      {coins.length > 0 && (
        <div className={styles.coinsWrapper}>
          {coins.map((coin) => (
            <div className={styles.coin}>
              <button className={styles.favoritesBtn} type="button">
                <EmptyStarIcon width="18px" height="18px" />
              </button>
              <span className={styles.coinTicker}>{coin}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
