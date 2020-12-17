const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.getElementById("progress");
const currentTimeEle = document.getElementById("current-time");
const durationEle = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// check if song is playing or not
let isPlaying = false;

// to store top 10 tracks
let songs = [];
let genre = {
  Hits: {},
};

// play song
const playSong = () => {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
};

// pause song
const pauseSong = () => {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
};

function loadSong(song) {
  //   console.log(song.album.title);
  title.textContent = song.album.title;
  artist.textContent = song.artist.name;
  music.src = song.preview;
  image.src = song.album.cover_medium;
}

let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

const apiCall = () => {
  const corsUrl = "https://cors-anywhere.herokuapp.com/";
  const topTracksUrl = "https://api.deezer.com/chart/0/tracks";
  const playlistUrl = "https://api.deezer.com/radio/37151/tracks";
  const genreUrl = "https://api.deezer.com/radio";

  axios
    .get(`${corsUrl + topTracksUrl}`)
    .then((response) => {
      // console.log(response.data.data);
      songs = response.data.data;
      console.log(songs);
      loadSong(songs[songIndex]);
    })

    .catch((err) => console.log(err));
};

apiCall();

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // duration calculation
    const durationSeconds = Math.floor(duration);
    if (durationSeconds) {
      durationEle.textContent = `0:${durationSeconds}`;
    }
    // current time calculation
    let currentTimeSeconds = Math.floor(currentTime);
    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`;
    }
    if (currentTimeSeconds) {
      currentTimeEle.textContent = `0:${currentTimeSeconds}`;
    }
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
