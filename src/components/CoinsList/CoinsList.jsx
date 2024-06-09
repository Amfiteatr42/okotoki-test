import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { getCoins } from "@/api/getCoins";
import { CloseIcon } from "../icons/CloseIcon";
import { EmptyStarIcon } from "../icons/EmptyStarIcon";
import { FilledStarIcon } from "../icons/FilledStarIcon";
import { SearchIcon } from "../icons/SearchIcon";
import styles from "./CoinsList.module.css";

const FAVORITES_KEY = "favorites";

export const CoinsList = () => {
  const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState(savedFavorites);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [isShowAllCoins, setIsShowAllCoins] = useState(true);

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

  const toggleFavorites = (coin) => {
    if (favorites.includes(coin)) {
      setFavorites((state) => state.filter((item) => item !== coin));
    } else {
      setFavorites((state) => [...state, coin]);
    }
  };

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const showFavorites = () => {
    setIsShowAllCoins(false);
    setFilteredCoins(favorites);
  };

  const showAllCoins = () => {
    setIsShowAllCoins(true);
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
          className={`${styles.tab} ${!isShowAllCoins && styles.active}`}
          onClick={showFavorites}
        >
          <FilledStarIcon width="18px" height="18px" />{" "}
          <span className={styles.coinTicker}>FAVORITES</span>
        </button>
        <button
          className={`${styles.tab} ${isShowAllCoins && styles.active}`}
          onClick={showAllCoins}
        >
          ALL COINS
        </button>
      </div>

      {coins?.length > 0 && (
        <div className={styles.coinsWrapper}>
          {filteredCoins.map((coin) => (
            <div className={styles.coin} key={coin}>
              <button
                className={styles.favoritesBtn}
                type="button"
                onClick={() => toggleFavorites(coin)}
              >
                {favorites.includes(coin) ? (
                  <FilledStarIcon width="18px" height="18px" />
                ) : (
                  <EmptyStarIcon width="18px" height="18px" />
                )}
              </button>
              <span className={styles.coinTicker}>{coin}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
