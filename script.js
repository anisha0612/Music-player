const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// check if song is playing or not
let isPlaying = false;

// to store top 10 tracks
let songs = [];

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
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

const apiCall = () => {
  const corsUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://api.deezer.com/chart/0/tracks";
  axios
    .get(`${corsUrl + apiUrl}`)
    .then((response) => {
      //   console.log(response.data.data);
      songs = response.data.data;
      console.log(songs);
      return response.data.data;
    })
    .then((result) => loadSong(result[4]))
    .catch((err) => console.log(err));
};

apiCall();

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
