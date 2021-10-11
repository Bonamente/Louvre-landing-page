const images =  document.querySelectorAll('.tickets__img');  

const startImageTransition = () => {
  for (let i = 0; i < images.length; i += 1) {
    images[i].style.opacity = 1;    
  }

  let top = 1;
  let cur = images.length - 1;

  const changeImage = async () => {
    let nextImage = (1 + cur) % images.length;

    images[cur].style.zIndex = top + 1;
    images[nextImage].style.zIndex = top;

    await transition();

    images[cur].style.zIndex = top;
    images[nextImage].style.zIndex = top + 1;

    top += 1;
    images[cur].style.opacity = 1;    
    cur = nextImage;
  };

  setInterval(changeImage, 7000);

  const transition = () => new Promise((resolve, reject) => {
    let del = 0.01;

    const changeOpacity = () => {
      images[cur].style.opacity -= del;
      
      if (images[cur].style.opacity <= 0) {
        clearInterval(id);
        resolve();
      }
    };

    let id = setInterval(changeOpacity, 10);
  });  
};

startImageTransition();