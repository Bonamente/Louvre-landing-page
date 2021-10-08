const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const overlay = document.querySelector('.overlay');

const handleClick = (e) => {
  e.preventDefault();

  popup.classList.add('popup--closed');
  popup.classList.remove('popup--opened');
  overlay.classList.add('overlay--closed');
  overlay.classList.remove('overlay--opened');  
};

closeButton.addEventListener('click', handleClick);
overlay.addEventListener('click', handleClick);
