import React, { useState, useEffect, useRef } from 'react';
import './CurrencyClicker.css';
import CurrencyClass from './CurrencyClass.js';
import UpgradeMenu from './UpgradeMenu';
import Coin from './Coin';

localStorage.clear()

function CurrencyClicker({ totalCurrency, setTotalCurrency }) {

    // get number of mining picks from local storage
    let miningPickCount = parseInt(localStorage.getItem('miningPickCount')) || 0;
    let peonCount = parseInt(localStorage.getItem('peonCount')) || 0;


    const [showUpgradeMenu, setShowUpgradeMenu] = useState(false);
    const [showCoinMenu, setShowCoinMenu] = useState(false);

    const currencyClassRef = useRef(new CurrencyClass());

    const [copper, setCopper] = useState(0);
    const [silver, setSilver] = useState(0);
    const [gold, setGold] = useState(0);

    useEffect(() => {
        const { newCopper, newSilver, newGold } = currencyClassRef.current.convertCurrency(totalCurrency);
        setCopper(newCopper);
        setSilver(newSilver);
        setGold(newGold);

        currencyClassRef.current.handleColorChange(newSilver, newGold);
        currencyClassRef.current.setBackGroundImage(newSilver, newGold);
    }, [totalCurrency]);

    const handleCoinMenu = () => {
        setShowCoinMenu(!showCoinMenu); // Toggle the state
        setShowUpgradeMenu(false); // Close the upgrade menu
    };

    const handleUpgradeMenu = () => {
        setShowUpgradeMenu(!showUpgradeMenu); // Toggle the state
        setShowCoinMenu(false); // Close the coin menu
        console.log(totalCurrency);
    };

    const handleSpecialMenu = () => {
        // Sends user to SpecialMenu.js
    };

    const handleStatsMenu = () => {
        // Sends user to StatsMenu.js
    };

    const handleMiscMenu = () => {
        // Sends user to MiscMenu.js
    };

    let copperPerFiveSecond = ((miningPickCount) + (peonCount * 2));
    let copperPerSecond = copperPerFiveSecond / 5;
    let copperText = copperPerSecond > 0 ? `+${copperPerSecond} Copper per Second` : '';

    return (
        <div className="currency-clicker">
            <div className="currency-display" id="currencyDisplay">
                <p id="currency-amount">
                    {gold} Gold, {silver} Silver, {copper} Copper
                    <br />
                    <sub>
                        {copperText}
                    </sub>
                </p>
            </div>

            {!showUpgradeMenu && (
                <Coin totalCurrency={totalCurrency} setTotalCurrency={setTotalCurrency} />
            )}

            <div id="menu-bar" className="menu-bar">
                <div className="menu-item" id="coin-menu" onClick={handleCoinMenu}>
                    Coin
                </div>
                <div className="menu-item" id="upgrade-menu" onClick={handleUpgradeMenu}>
                    Upgrade
                </div>
                <div className="menu-item" id="special-menu" onClick={handleSpecialMenu}>
                    Special
                </div>
                <div className="menu-item" id="stats-menu" onClick={handleStatsMenu}>
                    Stats
                </div>
                <div className="menu-item" id="misc-menu" onClick={handleMiscMenu}>
                    Misc
                </div>
            </div>
            {showUpgradeMenu && <UpgradeMenu totalCurrency={totalCurrency} setTotalCurrency={setTotalCurrency} />}
        </div>
    );
}

export default CurrencyClicker;
