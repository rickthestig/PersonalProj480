let money = 0;

const moneyDisplay = document.getElementById('money');
const coinsDisplay = document.getElementById('coins');
const clickButton = document.getElementById('clickButton');

clickButton.addEventListener('click', () => {
  money += 1;
  moneyDisplay.textContent = money;

  // Create a falling coin element
  const coin = document.createElement('div');
  coin.classList.add('coin');

  // Append the coin to the coins display area
  coinsDisplay.appendChild(coin);

  // Set random horizontal position within the jar
  const randomHorizontalPos = Math.random() * (coinsDisplay.clientWidth - 20); // 20 is the width of the coin
  coin.style.left = `${randomHorizontalPos}px`;

  // Calculate percentage of jar filled
  const percentageFilled = Math.min((money / 100) * 100, 100); // Assuming the jar is full at 100 money

  // Update jar's visual filling
  coinsDisplay.style.height = percentageFilled + '%';

  // Remove the coin after the animation ends
  setTimeout(() => {
    coin.remove();
  }, 500); // Set timeout to match animation duration (0.5s)
});
