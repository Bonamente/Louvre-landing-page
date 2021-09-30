const swiper2 = new Swiper('.video__swiper', {
  slidesPerView: 3,
  spaceBetween: 42,
  speed: 1000,
  loop: true,

  pagination: {
    el: '.video__swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
});