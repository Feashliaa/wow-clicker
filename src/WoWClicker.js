import React, { useState, useEffect, useRef } from 'react';
import CurrencyClicker from './components/CurrencyClicker';
import UpgradeMenu from './components/UpgradeMenu';

function WoWClicker() {
  const [totalCurrency, setTotalCurrency] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      let miningPickCount = parseInt(localStorage.getItem('miningPickCount')) || 0;
      let peonCount = parseInt(localStorage.getItem('peonCount')) || 0;

      // Calculate currency increment per second
      let currencyIncrementPerSecond = (miningPickCount / 5) + (peonCount * 2 / 5);

      if (currencyIncrementPerSecond > 0) {
        setTotalCurrency(prevCurrency => Math.floor(prevCurrency + currencyIncrementPerSecond));
      }
    }, 1000); // 1 second interval

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="App">
      <CurrencyClicker
        totalCurrency={totalCurrency}
        setTotalCurrency={setTotalCurrency}
      />
      <UpgradeMenu
        totalCurrency={totalCurrency}
        setTotalCurrency={setTotalCurrency}
      />
    </div>
  );
}

export default WoWClicker;
