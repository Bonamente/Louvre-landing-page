const swiper = new Swiper('.welcome__swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 1000,
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const currentNumber = document.querySelector('.current-slide-number');
const totalNumber = document.querySelector('.total-number');

totalNumber.textContent = `0${swiper.slides.length - 2}`

swiper.on('slideChange', () => {  
  currentNumber.textContent = `0${swiper.realIndex + 1}`;
});
