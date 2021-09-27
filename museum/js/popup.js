const buyButton = document.querySelector('.form__buy-btn');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');

const handleClick = (e) => {
  e.preventDefault();

  if (popup.classList.contains('popup--closed')) {
    popup.classList.remove('popup--closed');
    popup.classList.add('popup--opened');
    overlay.classList.remove('overlay--closed');
    overlay.classList.add('overlay--opened');
  } else {
    popup.classList.add('popup--closed');
    popup.classList.remove('popup--opened');
    overlay.classList.add('overlay--closed');
    overlay.classList.remove('overlay--opened');
  }
}

buyButton.addEventListener('click', handleClick);
closeButton.addEventListener('click', handleClick);
