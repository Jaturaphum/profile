const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio("mp3/Forever Star.mp3");

audio.addEventListener("loadeddata", () => {
  const length = audioPlayer.querySelector(".time .length");
  length.textContent = getTimeCodeFromNum(audio.duration);
  audio.volume = 0.75;
}, false);

const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", (e) => {
  const timelineWidth = parseInt(window.getComputedStyle(timeline).width);
  audio.currentTime = (e.offsetX / timelineWidth) * audio.duration;
}, false);

timeline.addEventListener("mousedown", (e) => {
  const timelineWidth = parseInt(window.getComputedStyle(timeline).width);
  audio.currentTime = (e.offsetX / timelineWidth) * audio.duration;
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);

  function mouseMove(e) {
    const timelineWidth = parseInt(window.getComputedStyle(timeline).width);
    audio.currentTime = (e.offsetX / timelineWidth) * audio.duration;
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }
}, false);

const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener("click", (e) => {
  const sliderWidth = parseInt(window.getComputedStyle(volumeSlider).width);
  const newVolume = e.offsetX / sliderWidth;
  audio.volume = newVolume;
  const volumePercentage = audioPlayer.querySelector(".controls .volume-percentage");
  volumePercentage.style.width = newVolume * 100 + "%";
}, false);

volumeSlider.addEventListener("mousedown", (e) => {
  const sliderWidth = parseInt(window.getComputedStyle(volumeSlider).width);
  const newVolume = e.offsetX / sliderWidth;
  audio.volume = newVolume;
  const volumePercentage = audioPlayer.querySelector(".controls .volume-percentage");
  volumePercentage.style.width = newVolume * 100 + "%";
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);

  function mouseMove(e) {
    const sliderWidth = parseInt(window.getComputedStyle(volumeSlider).width);
    const newVolume = e.offsetX / sliderWidth;
    audio.volume = newVolume;
    volumePercentage.style.width = newVolume * 100 + "%";
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }
}, false);

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  const currentTime = audioPlayer.querySelector(".time .current");
  currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
    audio.play();
  } else {
    playBtn.classList.remove("pause");
  }
});

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
