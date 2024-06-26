import React, { useState, useEffect, useRef } from 'react';
import CurrencyClicker from './components/CurrencyClicker';
import UpgradeMenu from './components/UpgradeMenu';

function WoWClicker() {
  const [totalCurrency, setTotalCurrency] = useState(0);
  const intervalRef = useRef(null); // Use ref to store interval ID

  // Autoclicker logic
  useEffect(() => {
    // Set up the interval only once
    intervalRef.current = setInterval(() => {
      let miningPickCount = parseInt(localStorage.getItem('miningPickCount')) || 0;
      if (miningPickCount > 0) {
        setTotalCurrency(prevCurrency => prevCurrency + miningPickCount);
      }
    }, 10000); // 10 seconds interval

    // Clear the interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []); // Empty dependency array means this runs once on mount

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
