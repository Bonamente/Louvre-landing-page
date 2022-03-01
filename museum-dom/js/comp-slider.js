const before = document.querySelector('#exploreBefore');
const resizer = document.querySelector('#exploreResizer');
const exploreRange = document.querySelector('#exploreRange');

function compare() {
  const currentValue = this.value;
  
  before.style.clipPath = `polygon(0% 0%, ${currentValue}% 0%, ${currentValue}% 100%, 0% 100%)`;  
  resizer.style.left = `calc(${currentValue}% - 20px)`;
}

exploreRange.addEventListener('input', compare);

compare();
