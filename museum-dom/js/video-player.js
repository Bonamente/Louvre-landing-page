const video = document.getElementById('video');
const videoSpeed = document.querySelector('.video__speed-info');
const videoControls = document.getElementById('video-controls');
const playButton = document.getElementById('play');
const playbackIcons = document.querySelectorAll('.playback-icons use');
const mainPlayButton = document.querySelector('.video__button--main-play');
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');
const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeOn = document.querySelector('use[href="#volume-on"]');
const volume = document.getElementById('volume');
const fullscreenButton = document.getElementById('fullscreen-button');
const videoContainer = document.getElementById('video-container');
const fullscreenIcons = fullscreenButton.querySelectorAll('use');

const initializeVideo = () => {
  const videoDuration = Math.round(video.duration);

  seek.setAttribute('max', videoDuration);
  progressBar.setAttribute('max', videoDuration);
  video.playbackRate = 1;
};

const togglePlay = () => {
  if (video.paused || video.ended) {
    mainPlayButton.style.display = 'none';
    video.play();
  } else {
    video.pause();
    mainPlayButton.style.display = 'block';
  }
};

const updatePlayButton = () => {
  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));

  if (video.paused) {
    playButton.setAttribute('data-title', 'Play (k)');
  } else {
    playButton.setAttribute('data-title', 'Pause (k)');
  }
};

const updateProgress = () => {
  seek.value = Math.floor(video.currentTime);
  progressBar.value = Math.floor(video.currentTime);
};

const skipAhead = (e) => {
  const skipTo = e.target.dataset.seek
    ? e.target.dataset.seek
    : e.target.value;

  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
};

const updateVolume = () => {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
};

const updateVolumeIcon = () => {
  volumeIcons.forEach((icon) => {
    icon.classList.add('hidden');
  });

  volumeButton.setAttribute('data-title', 'Mute (m)');

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove('hidden');
    volumeButton.setAttribute('data-title', 'Unmute (m)');
  } else {
    volumeOn.classList.remove('hidden');
  }
};

const toggleMute = () => {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
};

const toggleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    videoControls.style.position = 'relative';
    videoControls.style.bottom = 'unset';
  } else if (document.webkitFullscreenElement) {
    // for Safari
    document.webkitExitFullscreen();
    videoControls.style.position = 'absolute';
    videoControls.style.bottom = '0';
  } else if (videoContainer.webkitRequestFullscreen) {
    // for Safari
    videoContainer.webkitRequestFullscreen();
    videoControls.style.position = 'absolute';
    videoControls.style.bottom = '0';
  } else {
    videoContainer.requestFullscreen();
    videoControls.style.position = 'absolute';
    videoControls.style.bottom = '0';
  }
}

const updateFullscreenButton = () => {
  fullscreenIcons.forEach((icon) => icon.classList.toggle('hidden'));

  if (document.fullscreenElement) {
    fullscreenButton.setAttribute('data-title', 'Exit full screen (f)');
  } else {
    fullscreenButton.setAttribute('data-title', 'Full screen (f)');
  }
};

const hideControls = () => {
  if (video.paused) return;  

  videoControls.classList.add('hide');
};

const showControls = () => {
  videoControls.classList.remove('hide');
};

const keyboardShortcuts = (e) => {
  const { code } = e;

  switch (code) {
    case 'KeyM':
      toggleMute();
      break;
    case 'KeyF':
      toggleFullScreen();
      break;
  }
};

const playSpaceShortCut = (e) => {
  if (e.key == " " && e.target == document.body) {
    e.preventDefault;
    togglePlay();
  }
};

const speedUp = (e) => {
  if (e.shiftKey && e.code === 'Period') {
    const prevSpeed = video.playbackRate;
    const curSpeed = prevSpeed + 0.5;

    video.playbackRate = (curSpeed <= 2) ? curSpeed : 2;
    videoSpeed.textContent = `${video.playbackRate}x`;   
    videoSpeed.style.display = 'block';
    
    const id = setTimeout(() => {
      videoSpeed.style.display = 'none';
      clearInterval(id);     
    }, 500);
  }
};

const speedDown = (e) => {
  if (e.shiftKey && e.code === 'Comma') {
    const prevSpeed = video.playbackRate;
    const curSpeed = prevSpeed - 0.5;

    video.playbackRate = (curSpeed >= 0.5) ? curSpeed : 0.5;
    videoSpeed.textContent = `${video.playbackRate}x`;    
    videoSpeed.style.display = 'block'; 

    const id = setTimeout(() => {
      videoSpeed.style.display = 'none';
      clearInterval(id);     
    }, 500);
  } 
};

const videoOptions = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
};

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      document.removeEventListener('keyup', keyboardShortcuts);
      document.removeEventListener('keyup', speedUp);
      document.removeEventListener('keyup', playSpaceShortCut);
      document.removeEventListener('keyup', speedDown);
    } else {
      document.addEventListener('keyup', playSpaceShortCut);
      document.addEventListener('keyup', keyboardShortcuts);
      document.addEventListener('keyup', speedUp);
      document.addEventListener('keyup', speedDown);
    }
  });
},
videoOptions);

videoObserver.observe(video);


// document.addEventListener('keyup', playSpaceShortCut);
// document.addEventListener('keyup', keyboardShortcuts);
// document.addEventListener('keyup', speedUp);
// document.addEventListener('keyup', speedDown);

mainPlayButton.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('volumechange', updateVolumeIcon);
video.addEventListener('click', togglePlay);
video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
videoControls.addEventListener('mouseenter', showControls);
videoControls.addEventListener('mouseleave', hideControls);
seek.addEventListener('input', skipAhead);
volume.addEventListener('input', updateVolume);
volumeButton.addEventListener('click', toggleMute);
fullscreenButton.addEventListener('click', toggleFullScreen);
videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);

initializeVideo();
