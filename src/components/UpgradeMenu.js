import React, { useState, useEffect } from 'react';
import './UpgradeMenu.css';
import miningPick from './icons/miningPick.png';
import peon from './icons/peon.png';

function UpgradeMenu({ totalCurrency, setTotalCurrency }) {
    // Initialize mining pick count from localStorage or default to 0
    const initialMiningPickCount = parseInt(localStorage.getItem('miningPickCount')) || 0;
    const initialPeonCount = parseInt(localStorage.getItem('peonCount')) || 0;

    // Calculate initial upgrade cost with a 15% increase each time
    const initialUpgradeCost = Math.round(10 * Math.pow(1.15, initialMiningPickCount));
    const initialPeonCost = Math.round(50 * Math.pow(1.15, initialPeonCount));

    const [upgradeCosts, setUpgradeCosts] = useState({ 
        'miningPick': initialUpgradeCost,
        'peon': initialPeonCost
    });


    const [upgradeCounts, setUpgradeCounts] = useState({ 
        'miningPick': initialMiningPickCount,
        'peon': initialPeonCount
    });

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

            // Update count in localStorage based on the upgradeId
            localStorage.setItem(upgradeId + 'Count', upgradeCounts[upgradeId] + 1);

            console.log('Purchased upgrade:', upgradeId);
            console.log(upgradeId + 'Count', upgradeCounts[upgradeId] + 1);

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
                        Mining Pick - {upgradeCounts['miningPick']}
                        <br />
                        <sub>Autoclicks Once Every 10 Seconds</sub>
                    </div>
                    <div
                        className='buy_button'
                        onClick={() => handlePurchase('miningPick')}
                    >
                        Buy (Cost: {upgradeCosts['miningPick']} Copper)
                    </div>
                    <div className='info_button'
                    >Info</div>
                </div>

                <div id="upgrade-menu-item" className="upgrade-menu-item">
                    <div
                        className='upgrade_menu_icon'
                        id="upgrade_menu_icon"
                        style={{ backgroundImage: `url(${peon})` }}
                    ></div>
                    <div className='upgrade_menu_text'>
                        Peon - {upgradeCounts['peon']}
                        <br />
                        <sub>Provides 2 currency every 5 seconds</sub>
                    </div>
                    <div
                        className='buy_button'
                        onClick={() => handlePurchase('peon')}
                    >
                        Buy (Cost: {upgradeCosts['peon']} Copper)
                    </div>
                    <div className='info_button'>Info</div>
                </div>
            </div>
        </div>
    );
}

export default UpgradeMenu;
