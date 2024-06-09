import { useEffect, useState } from "react";
import { getCoins } from "@/api/getCoins";
import { CloseIcon } from "../icons/CloseIcon";
import { EmptyStarIcon } from "../icons/EmptyStarIcon";
import { FilledStarIcon } from "../icons/FilledStarIcon";
import { SearchIcon } from "../icons/SearchIcon";
import styles from "./CoinsList.module.css";

export const CoinsList = () => {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

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

      <div className={styles.tabsWrapper}>
        <button
          className={`${styles.tab} ${activeTab === "all" && styles.active}`}
          onClick={() => setActiveTab("all")}
        >
          <FilledStarIcon width="18px" height="18px" />{" "}
          <span className={styles.coinTicker}>FAVORITES</span>
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "favorites" && styles.active
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          ALL COINS
        </button>
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
