const tracks = [
  {
    title: "Imagine",
    artist: "John Lennon",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "imagine.jpg"
  },
  {
    title: "Canon in D",
    artist: "Pachelbel",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "canon.jpg"
  },
  {
    title: "Nocturne Op.9 No.2",
    artist: "Chopin",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "chopin.jpg"
  }
];

let currentTrackIndex = 0;
let isRepeat = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const volumeSlider = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playPauseIcon = document.querySelector(".playpause-track i");
const randomBtn = document.querySelector('.random-track');
const repeatBtn = document.querySelector('.repeat-track');
const repeatIcon = repeatBtn.querySelector('i');


function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;
  audio.load();
}

function playTrack() {
  audio.play();
  playPauseIcon.classList.remove("fa-play-circle");
  playPauseIcon.classList.add("fa-pause-circle");
  cover.classList.add("rotating");
}

function pauseTrack() {
  audio.pause();
  playPauseIcon.classList.remove("fa-pause-circle");
  playPauseIcon.classList.add("fa-play-circle");
  cover.classList.remove("rotating");
}

function playpauseTrack() {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function randomTrack() {
  let randomIndex = Math.floor(Math.random() * tracks.length);
  while(randomIndex === currentTrackIndex) {
    randomIndex = Math.floor(Math.random() * tracks.length);
  }
  currentTrackIndex = randomIndex;
  loadTrack(currentTrackIndex);
  playTrack();
}

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    playTrack(); 
   } else {
    nextTrack();
  }
});

audio.addEventListener("timeupdate", () => {
  const progress = document.getElementById("progress");
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

document.getElementById("progress").addEventListener("input", (e) => {
  const seekTime = (audio.duration / 100) * e.target.value;
  audio.currentTime = seekTime;
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatIcon.style.color = isRepeat ? "#00ffff" : "white";
});

window.addEventListener("DOMContentLoaded", () => {
  loadTrack(currentTrackIndex);
  audio.volume = 0.5;
});


audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    playTrack();
  } else {
    nextTrack();
  }
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

const bars = document.querySelectorAll('.audio-visualizer .bar');
bars.forEach((bar, i) => {
  bar.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
  bar.style.animationDelay = (i * 0.1) + 's';
});

loadTrack(currentTrackIndex);
const progress = document.getElementById('progress');

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});
