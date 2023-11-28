let money = 0;
const jarValues = [100, 1000, 10000, 100000, 1000000];

const moneyDisplay = document.getElementById('money');
const jars = document.querySelectorAll('.jar');
const clickButton = document.getElementById('clickButton');

clickButton.addEventListener('click', () => {
  money += 1;
  moneyDisplay.textContent = money;

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

    if(jarMoney === jarValue) {
      // Jar is full
      coinsDisplay.style.height = '0%';
    }
    // Remove the coin after the animation ends
    setTimeout(() => {
      coin.remove();
    }, 500); // Set timeout to match animation duration (0.5s)
  });
});
