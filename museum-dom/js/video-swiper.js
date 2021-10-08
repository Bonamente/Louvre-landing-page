const swiper2 = new Swiper('.video__swiper', {
  slidesPerView: 2,
  spaceBetween: 20,
  speed: 1000,
  loop: true,

  breakpoints: {
    // when window width is >= 769px
    769: {
      slidesPerView: 3,
      spaceBetween: 42
    }    
  },

  pagination: {
    el: '.video__swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
});

const videoMain = document.querySelector('.video__main');
const mainPlayBtn = document.querySelector('.video__button--main-play');
const smallPlayIcon = document.querySelector('use[href="#play-icon"]');
const pauseIcon = document.querySelector('use[href="#pause"]');

swiper2.on('slideChange', () => {
  const curIndex = swiper2.realIndex;

  mainPlayBtn.style.display = 'block';
  smallPlayIcon.classList.remove('hidden');
  pauseIcon.classList.add('hidden');
 
  videoMain.setAttribute('poster', `./assets/video/poster${curIndex}.jpg`);
  videoMain.setAttribute('src', `./assets/video/video${curIndex}.mp4`); 
});


