window.onload = function initComparisons() {
  let x = document.getElementsByClassName('explore__overlay');  

  for (let i = 0; i < x.length; i += 1) {
    compareImages(x[i]);
  }

  function compareImages(img) {
    let clicked = 0;
    let w = img.offsetWidth;
    let h = img.offsetHeight;    
    
    let slider = document.createElement('DIV');
    slider.setAttribute('class', 'explore__comp-slider');

    img.parentElement.insertBefore(slider, img);
    img.style.width = (w / 2) + (slider.offsetHeight * 2) + 'px';    
    
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) + (slider.offsetWidth * 1.5) + "px";
   
    slider.addEventListener('mousedown', slideReady);   
    window.addEventListener('mouseup', slideFinish);   
    slider.addEventListener('touchstart', slideReady);     
    window.addEventListener('touchend', slideFinish);

    function slideReady(e) {
      /* Prevent any other actions that may occur when moving over the image: */
      e.preventDefault();
      
      clicked = 1;
     
      window.addEventListener('mousemove', slideMove);
      window.addEventListener('touchmove', slideMove);
    }

    function slideFinish() {
      clicked = 0;
    }

    function slideMove(e) {
      let pos;
     
      if (clicked == 0) return false;
     
      pos = getCursorPos(e)
     
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      
      slide(pos);
    }

    function getCursorPos(e) {
      let x = 0;

      e = (e.changedTouches) ? e.changedTouches[0] : e;
      
      let a = img.getBoundingClientRect();
      
      x = e.pageX - a.left;      
      x = x - window.pageXOffset;

      return x;
    }

    function slide(x) {
      img.style.width = x + 'px';      
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + 'px';
    }
  }
}
