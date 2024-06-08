export const getCoins = async () => {
  try {
    const response = await fetch("https://api-eu.okotoki.com/coins");
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
