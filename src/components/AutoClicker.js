import React, { useEffect } from 'react';

function AutoClickerProvider({ upgradeCounts, totalCurrency, setTotalCurrency }) {
    useEffect(() => {
        console.log('Upgrade Counts From Auto Clicker:', upgradeCounts);

        let interval;

        if (upgradeCounts['mining-pick'] > 0) {
            console.log('Mining Pick is active!');

            clearInterval(interval);

            interval = setInterval(() => {
                console.log('Mining Pick Interval');

                console.log('Total Currency Before Mining:', totalCurrency);

                // get number of mining picks from local storage

                let miningPickCount = parseInt(localStorage.getItem('miningPickCount')) || 0;

                setTotalCurrency(prevCurrency => prevCurrency + miningPickCount);
            }, 10000); // 10 seconds
        }

        return () => clearInterval(interval);
    }, [upgradeCounts, totalCurrency, setTotalCurrency]);

    return null;
}

export default AutoClickerProvider;
