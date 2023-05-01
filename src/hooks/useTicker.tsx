import React, { useCallback, useEffect, useState } from "react";

function useTicker(): { symbol: string; price: string }[] {
  const [priceList, setPriceList] = useState<
    { symbol: string; price: string }[]
  >([]);
  const symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "MATICUSDT",
    "XRPUSDT",
    "SOLUSDT",
    "DOGEBUSD",
    "SOLBUSD",
    "SHIBBUSD",
    "APEBUSD",
    "NEARBUSD",
    "LUNCBUSD",
    "LTCBTC",
    "BNBBTC",
    "NEOBTC",
    "QTUMETH",
    "EOSETH",
    "SNTETH",
    "BNTETH",
    "BCCBTC",
  ];

  const url = `https://api.binance.com/api/v3/ticker/price?symbols=${JSON.stringify(
    symbols
  )}`;
  const fetchTokenPrice = useCallback(async () => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((prices) => {
          setPriceList(prices);
          //   console.log({ prices });
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    // fetchTokenPrice();
    const timer = setInterval(fetchTokenPrice, 1000);
    return () => clearInterval(timer);
  }, []);
  return priceList;
}

export default useTicker;
