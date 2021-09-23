const progressVideo = document.querySelector('.video__progress--video');
const progressVolume = document.querySelector('.video__progress--volume');

const handleInput = function() {
  const value = (this.value-this.min)/(this.max-this.min)*100;

  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
};

progressVideo.addEventListener('input', handleInput);
progressVolume.addEventListener('input', handleInput);
