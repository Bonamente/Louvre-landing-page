const pageHeader = document.querySelector('.page-header__container');
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');
const welcomeTitle = document.querySelector('.welcome__title');
const welcomeText = document.querySelector('.welcome__text');
const welcomeLink = document.querySelector('.welcome__link');
const burgerMenuLinks = document.querySelectorAll('.main-nav__item > a');

const openMenu = () => {
  navToggle.setAttribute("aria-expanded", true);
  pageHeader.classList.remove('nav-closed');
  pageHeader.classList.add('nav-opened');
  navMain.classList.remove('main-nav--closed');
  navMain.classList.add('main-nav--opened');
  welcomeTitle.style.opacity = 0;
  welcomeText.style.opacity = 0;
  welcomeLink.style.opacity = 0;
};

const closeMenu = () => {
  navToggle.setAttribute("aria-expanded", false);
  pageHeader.classList.add('nav-closed');
  pageHeader.classList.remove('nav-opened');
  navMain.classList.add('main-nav--closed');
  navMain.classList.remove('main-nav--opened')
  welcomeTitle.style.opacity = 1;
  welcomeText.style.opacity = 1;
  welcomeLink.style.opacity = 1;
}

document.addEventListener('click', (e) => { 
  if (e.target.closest('.main-nav')) return;
  if (navToggle !== e.target) closeMenu();
});

navToggle.addEventListener('click', () => {
  navMain.classList.contains('main-nav--closed') 
    ? openMenu()
    : closeMenu();
});

[...burgerMenuLinks].forEach((link) => {
  link.addEventListener('click', closeMenu)
});
