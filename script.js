const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// check if song is playing or not
let isPlaying = false;

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

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

function loadSong(song) {
  //   console.log(song.album.title);
  title.textContent = song.album.title;
  artist.textContent = song.artist.name;
  music.src = song.preview;
  image.src = song.album.cover_medium;
}

const apiCall = () => {
  const corsUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://api.deezer.com/chart/0/tracks";
  axios
    .get(`${corsUrl + apiUrl}`)
    .then((response) => {
      //   console.log(response.data.data);
      return response.data.data;
    })
    .then((result) => loadSong(result[4]))
    .catch((err) => console.log(err));
};

apiCall();
