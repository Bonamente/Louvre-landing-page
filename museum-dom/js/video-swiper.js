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