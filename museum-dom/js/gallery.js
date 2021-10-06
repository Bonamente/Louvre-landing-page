const pictureInnerContainer = document.querySelector('.gallery__picture-inner-container');

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

shuffle(imageNumbers);

const elements = imageNumbers.map((num) => {
  let imgType;

  switch (num) {  
    case 1: 
    case 4:
    case 10:
    case 11:
    case 15:  
      imgType = 'square';
      break;

    case 12:
    case 13:
      imgType = 'horizontal';
      break;
  
    default:
      imgType = 'vertical';
  }

  return  `<div class="gallery__item gallery__item--${imgType}"><div class="gallery__ratio"><img src="./assets/img/gallery/galery${num}.jpg" alt="gallery${num}" loading="lazy"></div></div>`;

});

pictureInnerContainer.innerHTML = elements.join('\n');