// Obtenemos referencias a los elementos
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progress-bar');
const playlist = document.getElementById('playlist').getElementsByTagName('li');

// Creamos un array de canciones a partir de la lista <li>
let tracks = [];
for (let i = 0; i < playlist.length; i++) {
  const li = playlist[i];
  tracks.push({
    cover: li.getAttribute('data-cover'),
    src: li.getAttribute('data-src'),
    title: li.textContent
  });
}

// Índice de la canción que se está reproduciendo
let currentTrackIndex = 0;

// Función para cargar una canción según índice
function loadTrack(index) {
  currentTrackIndex = index;
  audio.src = tracks[index].src;
  cover.src = tracks[index].cover;
  audio.load();
}

// Función para reproducir/pausar
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

// Función para siguiente canción
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// Función para canción anterior
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// Actualizar barra de progreso
function updateProgress() {
  if (!audio.paused && !audio.ended) {
    const progressValue = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressValue;
  }
}

// Cambiar la posición de reproducción al mover la barra
function setProgress() {
  const newTime = (progressBar.value * audio.duration) / 100;
  audio.currentTime = newTime;
}

// ====== EVENTOS ====== //
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// Actualizar icono de play/pause cuando termina la canción
audio.addEventListener('ended', () => {
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  // Opcional: pasar automáticamente a la siguiente canción
  // nextTrack();
});

// Actualizar la barra de progreso cada cierto tiempo
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('change', setProgress);

// Clic en la playlist
for (let i = 0; i < playlist.length; i++) {
  playlist[i].addEventListener('click', () => {
    loadTrack(i);
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  });
}

// ====== AL INICIAR ====== //
loadTrack(currentTrackIndex); // Cargamos la primera canción
