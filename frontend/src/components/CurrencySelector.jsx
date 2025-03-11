import React, { useEffect, useState } from "react";
import { Select, notification } from "antd";
import axios from "axios";

const fetchCurrencyRate = async (fromCurrency) => {
  try {
    const response = await axios.get(
      `https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=${fromCurrency}&u4=KRW&u8=down&u2=1`
    );

    const currencyData = response.data?.country || [];

    if (currencyData.length < 2) {
      throw new Error("Unexpected API response format");
    }

    const krwRate = currencyData[1]?.subValue || "N/A"; 
    const currencyRate = currencyData[0]?.subValue || "N/A";

    return { krwRate, currencyRate };
  } catch (error) {
    console.error("Error fetching currency rate:", error.message);
    return { krwRate: "N/A", currencyRate: "N/A" };
  }
};

const CurrencySelector = () => {
  const [currencyRate, setCurrencyRate] = useState("Loading...");
  const [krwRate, setKrwRate] = useState("Loading...");
  const [previousKrwRate, setPreviousKrwRate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const availableCurrencies = [
    { code: "USD", name: "🇺🇸 달러" },
    { code: "JPY", name: "🇯🇵 엔" },
    { code: "EUR", name: "🇪🇺 유로" },
    { code: "CNY", name: "🇨🇳 위안" },
    { code: "GBP", name: "🇬🇧 파운드" },
  ];

  useEffect(() => {
    const updateRate = async () => {
      const { krwRate, currencyRate } = await fetchCurrencyRate(selectedCurrency);

      if (previousKrwRate && krwRate !== previousKrwRate) {
        notification.info({
          message: "KRW Exchange Rate Updated",
          description: `${selectedCurrency} → KRW: ${currencyRate} (Previous: ${previousKrwRate})`,
          duration: 3,
        });
      }

      setPreviousKrwRate(krwRate);
      setKrwRate(krwRate);
      setCurrencyRate(currencyRate);
    };

    updateRate();
    const interval = setInterval(updateRate, 60000); // ✅ Updates every 60 seconds

    return () => clearInterval(interval);
  }, [selectedCurrency, previousKrwRate]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Currency Dropdown */}
      <Select
        value={selectedCurrency}
        onChange={(value) => setSelectedCurrency(value)}
        style={{ width: 120 }}
      >
        {availableCurrencies.map((currency) => (
          <Select.Option key={currency.code} value={currency.code}>
            {currency.name}
          </Select.Option>
        ))}
      </Select>

      {/* Currency Rate Display */}
      <span
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          transition: "color 0.5s ease",
          color: previousKrwRate && krwRate !== previousKrwRate ? "red" : "blue",
        }}
      >
        {currencyRate} = {krwRate}
      </span>
    </div>
  );
};

export default CurrencySelector;
