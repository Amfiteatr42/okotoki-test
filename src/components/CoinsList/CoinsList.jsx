import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { getCoins } from "@/api/getCoins";
import { CloseIcon } from "../icons/CloseIcon";
import { EmptyStarIcon } from "../icons/EmptyStarIcon";
import { FilledStarIcon } from "../icons/FilledStarIcon";
import { SearchIcon } from "../icons/SearchIcon";
import styles from "./CoinsList.module.css";

export const CoinsList = () => {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchCoins = async () => {
      const coins = await getCoins();
      setCoins(coins);
      setFilteredCoins(coins);
    };
    fetchCoins();
  }, []);

  const onQueryChange = (e) => {
    const searchText = e.target.value.trim();
    setQuery(searchText);

    if (!searchText) return setFilteredCoins(coins);

    const fuse = new Fuse(coins);
    const result = fuse.search(searchText);
    const filteredCoins = result.map(({ item }) => item);
    setFilteredCoins(filteredCoins);
  };

  const clearInput = () => {
    setQuery("");
    setFilteredCoins(coins);
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
          className={`${styles.tab} ${
            activeTab === "favorites" && styles.active
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          <FilledStarIcon width="18px" height="18px" />{" "}
          <span className={styles.coinTicker}>FAVORITES</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === "all" && styles.active}`}
          onClick={() => setActiveTab("all")}
        >
          ALL COINS
        </button>
      </div>

      {coins?.length > 0 && (
        <div className={styles.coinsWrapper}>
          {filteredCoins.map((coin) => (
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
