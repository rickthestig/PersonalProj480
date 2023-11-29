let money = 0;
const jarValues = [100, 1000, 10000, 100000, 1000000];
let canUseSecondSet = false;

const moneyDisplay = document.getElementById('money');
const jars = document.querySelectorAll('.jar');
const clickButton = document.querySelectorAll('.clickButton');
const upgrade = document.querySelectorAll('.upgradeButton');

let income1 = 1; //basic level of income for starting
let incomeMultiplier = 1; //multiplier for income
let incomeMultiplierCost = 10; //cost of multiplier
let incomeMultiplierLevel = 1; //level of multiplier
let incomeMultiplierDisplay = document.getElementById('upgradeMultiplier');
let incomeMultiplierCostDisplay = document.getElementById('upgradeCost');
let incomeMultiplierLevelDisplay = document.getElementById('upgradeLevel');
incomeMultiplierDisplay.textContent = incomeMultiplier;
incomeMultiplierCostDisplay.textContent = incomeMultiplierCost;
incomeMultiplierLevelDisplay.textContent = incomeMultiplierLevel;
let income2 = 10; //income for second level
let incomeMultiplier2 = 1; //multiplier for second level
let incomeMultiplierCost2 = 100; //cost of multiplier
let incomeMultiplierLevel2 = 1; //level of multiplier
let incomeMultiplierDisplay2 = document.getElementById('upgradeMultiplier2');
let incomeMultiplierCostDisplay2 = document.getElementById('upgradeCost2');
let incomeMultiplierLevelDisplay2 = document.getElementById('upgradeLevel2');
incomeMultiplierDisplay2.textContent = incomeMultiplier2;
incomeMultiplierCostDisplay2.textContent = incomeMultiplierCost2;
incomeMultiplierLevelDisplay2.textContent = incomeMultiplierLevel2;

upgrade.forEach((button, index) => {
  button.addEventListener('click', () => {
    if(index === 0) {
      if(money >= incomeMultiplierCost) {
        money -= incomeMultiplierCost;
        incomeMultiplierCost *= 2;
        incomeMultiplierLevel++;
        incomeMultiplier *= 2;
        incomeMultiplierDisplay.textContent = incomeMultiplier;
        incomeMultiplierCostDisplay.textContent = incomeMultiplierCost;
        incomeMultiplierLevelDisplay.textContent = incomeMultiplierLevel;
        moneyDisplay.textContent = money;
      }
    }
    if(index === 1 && canUseSecondSet) {
      if(money >= incomeMultiplierCost2) {
        money -= incomeMultiplierCost2;
        incomeMultiplierCost2 *= 2;
        incomeMultiplierLevel2++;
        incomeMultiplier2 *= 2;
        incomeMultiplierDisplay2.textContent = incomeMultiplier2;
        incomeMultiplierCostDisplay2.textContent = incomeMultiplierCost2;
        incomeMultiplierLevelDisplay2.textContent = incomeMultiplierLevel2;
        moneyDisplay.textContent = money;
      }
    }
  });
});
// Unlock button functionality
const unlockButton = document.getElementById('unlockButton');
unlockButton.addEventListener('click', () => {
  if (!canUseSecondSet && money >= 100) {
    // Unlock the second set for 100 money
    money -= 100;
    moneyDisplay.textContent = money;
    canUseSecondSet = true;
    document.getElementById('item2').disabled = false;
    document.getElementById('upgrade2').disabled = false;
  }
});


//add functions for increasing income after press of button
clickButton.forEach((button, index) => {
  button.addEventListener('click', () => {
    if(index === 0) {
      money += income1 * incomeMultiplier;
      moneyDisplay.textContent = money;
    }
    if(index === 1) {
      money += income2 * incomeMultiplier2;
      moneyDisplay.textContent = money;
    }

    if (money >= 1000000 && !document.body.classList.contains('raining-coins')) {
        alert('Congratulations! You have reached 1 million money!');
        // Trigger raining coins effect
        document.body.classList.add('raining-coins');
      
        const createCoin = () => {
          const coin = document.createElement('div');
          coin.classList.add('coin');
          const randomHorizontalPos = Math.random() * (document.body.clientWidth - 20);
          coin.style.left = `${randomHorizontalPos}px`;
          document.body.appendChild(coin);
          coin.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
          // Remove the coin after animation ends
          setTimeout(() => {
            coin.remove();
          }, 3000); // Set timeout to match animation duration (3s)
        };
      
        // Create new coins at intervals to simulate raining effect
        const rainingInterval = setInterval(createCoin, 50); // Interval between creating new coins (100ms)
      
        // Stop the raining effect after a certain duration
        setTimeout(() => {
          clearInterval(rainingInterval); // Clear the interval
        }, 5000);
      }

    jars.forEach((jar, index) => {
      const coinsDisplay = jar.querySelector('.coins');
      const jarValue = jarValues[index];

      // Create a falling coin element
      const coin = document.createElement('div');
      coin.classList.add('coin');

      // Append the coin to the coins display area
      coinsDisplay.appendChild(coin);

      // Set random horizontal position within the jar
      const randomHorizontalPos = Math.random() * (jar.clientWidth - 20); // 20 is the width of the coin
      coin.style.left = `${randomHorizontalPos}px`;

      // Calculate percentage of jar filled
      const jarMoney = Math.min(money, jarValue);
      const percentageFilled = (jarMoney / jarValue) * 100;

      // Update jar's visual filling
      coinsDisplay.style.height = percentageFilled + '%';

      // Remove the coin after the animation ends
      setTimeout(() => {
        coin.remove();
      }, 500); // Set timeout to match animation duration (0.5s)
    });
  });
});
