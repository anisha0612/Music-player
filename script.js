"use strict";
// exports.__esModule = true;

var image = document.querySelector("img");
var title = document.getElementById("title");
var artist = document.getElementById("artist");
var music = document.querySelector("audio");
var progressContainer = document.querySelector(".progress-container");
var progress = document.getElementById("progress");
var currentTimeEle = document.getElementById("current-time");
var durationEle = document.getElementById("duration");
var prevBtn = document.getElementById("prev");
var playBtn = document.getElementById("play");
var nextBtn = document.getElementById("next");
// check if song is playing or not
var isPlaying = false;
// to store top 10 tracks
var songs = [];
// let genre = {
//   Hits: {},
// };
// play song
var playSong = function () {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
};
// pause song
var pauseSong = function () {
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
var songIndex = 0;
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
var apiCall = function () {
  var corsUrl = "https://cors-anywhere.herokuapp.com/";
  var topTracksUrl = "https://api.deezer.com/chart/0/tracks";
  var playlistUrl = "https://api.deezer.com/radio/37151/tracks";
  axios
    .get("" + (corsUrl + topTracksUrl))
    .then(function (response) {
      // console.log(response.data.data);
      songs = response.data.data;
      // console.log(songs);
      loadSong(songs[songIndex]);
    })
    ["catch"](function (err) {
      return console.log(err);
    });
};
apiCall();
playBtn.addEventListener("click", function () {
  isPlaying ? pauseSong() : playSong();
});
function updateProgressBar(e) {
  if (isPlaying) {
    var _a = e.srcElement,
      duration = _a.duration,
      currentTime = _a.currentTime;
    var progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // duration calculation
    var durationSeconds = Math.floor(duration);
    if (durationSeconds) {
      durationEle.textContent = "0:" + durationSeconds;
    }
    // current time calculation
    var currentTimeSeconds = Math.floor(currentTime);
    if (currentTimeSeconds < 10) {
      currentTimeSeconds = "0" + currentTimeSeconds;
    }
    if (currentTimeSeconds) {
      currentTimeEle.textContent = "0:" + currentTimeSeconds;
    }
  }
}
function setProgressBar(e) {
  var width = this.clientWidth;
  var clickX = e.offsetX;
  var duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
