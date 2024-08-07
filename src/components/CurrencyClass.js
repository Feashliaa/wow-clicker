import elwynnForestImage from './background-images/elwynn-forest.jpg';
import westfallImage from './background-images/westfall.jpg';
import duskwoodImage from './background-images/duskwood.jpg';

const COPPER_THRESHOLD = 100;
const SILVER_THRESHOLD = 100;

class CurrencyClass {

    constructor() {
        this.copper = 0;
        this.silver = 0;
        this.gold = 0;
    }

    convertCurrency(totalCurrency) {
        let remainingCurrency = totalCurrency;
        let newCopper = remainingCurrency % COPPER_THRESHOLD;
        remainingCurrency = Math.floor(remainingCurrency / COPPER_THRESHOLD);
        let newSilver = remainingCurrency % SILVER_THRESHOLD;
        let newGold = Math.floor(remainingCurrency / SILVER_THRESHOLD);

        this.copper = newCopper;
        this.silver = newSilver;
        this.gold = newGold;

        console.log(`Copper: ${this.copper}, Silver: ${this.silver}, Gold: ${this.gold}`);

        return { newCopper, newSilver, newGold };
    }

    handleColorChange(newSilver, newGold) {
        const currencyClickElement = document.getElementById('coin');
        const currencyAmountElement = document.getElementById('currency-amount');
        const currencyDisplayElement = document.getElementById('currencyDisplay');

        console.log(currencyClickElement);
        console.log(currencyAmountElement);

        if (!currencyClickElement) {
            console.error("Element with ID 'coin' not found in the DOM.");

            if (newGold > 0) {
                currencyAmountElement.style.color = '#FFD700'; // Gold
                // set the border color of the currency display element
                currencyDisplayElement.style.borderColor = '#FFD700'; // Gold
            } else if (newSilver > 0) {
                currencyAmountElement.style.color = '#C0C0C0'; // Silver
                // set the border color of the currency display element
                currencyDisplayElement.style.borderColor = '#C0C0C0'; // Silver
            } else {
                currencyAmountElement.style.color = '#B87333'; // Bronze (Copper)
                // set the border color of the currency display element
                currencyDisplayElement.style.borderColor = '#B87333'; // Bronze (Copper)
            }

            return;
        }

        if (newGold > 0) {
            currencyClickElement.style.backgroundColor = '#FFD700'; // Gold
            currencyAmountElement.style.color = '#FFD700'; // Gold
            currencyDisplayElement.style.borderColor = '#FFD700'; // Gold
        } else if (newSilver > 0) {
            currencyClickElement.style.backgroundColor = '#C0C0C0'; // Silver
            currencyAmountElement.style.color = '#C0C0C0'; // Silver
            currencyDisplayElement.style.borderColor = '#C0C0C0'; // Silver
        } else {
            currencyClickElement.style.backgroundColor = '#B87333'; // Bronze (Copper)
            currencyAmountElement.style.color = '#B87333'; // Bronze (Copper)
            currencyDisplayElement.style.borderColor = '#B87333'; // Bronze (Copper)
        }
    }


    setBackGroundImage(newSilver, newGold) {
        const currencyClickElements = document.getElementsByClassName('currency-clicker');

        if (newGold > 0) {
            // Handle when gold is greater than 0
            Array.from(currencyClickElements).forEach(element => {
                element.style.backgroundImage = `url(${duskwoodImage})`;
            });
        } else if (newSilver > 0) {
            // Set background image to westfall.jpg for all currency-clicker elements
            Array.from(currencyClickElements).forEach(element => {
                element.style.backgroundImage = `url(${westfallImage})`;
            });
        } else {
            // Set background image to elwynn-forest.jpg for all currency-clicker elements
            Array.from(currencyClickElements).forEach(element => {
                element.style.backgroundImage = `url(${elwynnForestImage})`;
            });
        }
    }

}

export default CurrencyClass;