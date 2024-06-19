import React, { useState, useEffect } from 'react';
import './UpgradeMenu.css';
import miningPick from './icons/mining-pick.png';

function UpgradeMenu({ totalCurrency, setTotalCurrency }) {
    // Initialize mining pick count from localStorage or default to 0
    const initialMiningPickCount = parseInt(localStorage.getItem('miningPickCount')) || 0;

    // Calculate initial upgrade cost with a 15% increase each time
    const initialUpgradeCost = Math.round(10 * Math.pow(1.15, initialMiningPickCount));

    const [upgradeCosts, setUpgradeCosts] = useState({ 'mining-pick': initialUpgradeCost });

    const [upgradeCounts, setUpgradeCounts] = useState({ 'mining-pick': initialMiningPickCount });
    const [currentUpgrade, setCurrentUpgrade] = useState(null);

    const handlePurchase = (upgradeId) => {
        const cost = upgradeCosts[upgradeId];
        if (cost && totalCurrency >= cost) {
            const updatedCurrency = totalCurrency - cost;
            setTotalCurrency(updatedCurrency);

            // Increase the upgrade count for the purchased upgrade
            setUpgradeCounts((prevCounts) => ({
                ...prevCounts,
                [upgradeId]: prevCounts[upgradeId] + 1
            }));

            // Update the upgrade cost only when a purchase is made
            setUpgradeCosts((prevCosts) => ({
                ...prevCosts,
                [upgradeId]: Math.round(prevCosts[upgradeId] * 1.15)
            }));

            // Update mining pick count in localStorage with the updated value
            localStorage.setItem('miningPickCount', upgradeCounts[upgradeId] + 1);

            setCurrentUpgrade(upgradeId);
        } else {
            console.log('Insufficient currency to purchase upgrade:', upgradeId);
        }
    };

    return (
        <div className='upgrade-menu-container'>
            <div className='upgrade-menu' id='upgrade-menu'>
                <div id="upgrade-menu-item" className="upgrade-menu-item">
                    <div
                        className='upgrade_menu_icon'
                        id="upgrade_menu_icon"
                        style={{ backgroundImage: `url(${miningPick})` }}
                    ></div>
                    <div className='upgrade_menu_text'>
                        Mining Pick - {upgradeCounts['mining-pick']}
                        <br />
                        <sub>Autoclicks Once Every 10 Seconds</sub>
                    </div>
                    <div
                        className='buy_button'
                        onClick={() => handlePurchase('mining-pick')}
                    >
                        Buy (Cost: {upgradeCosts['mining-pick']} Copper)
                    </div>
                    <div className='info_button'>Info</div>
                </div>
            </div>
        </div>
    );
}

export default UpgradeMenu;
