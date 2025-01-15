// Variables
const playPauseButton = document.getElementById("play-pause");
let currentYear = 2014; // Año inicial
let interval;

// Mostrar el mapa del año activo
function showMap(year) {
  // Ocultar todos los mapas
  document.querySelectorAll(".map-frame").forEach((iframe) => {
    iframe.classList.remove("active");
  });

  // Mostrar el mapa correspondiente al año
  const activeMap = document.querySelector(`.map-frame[data-year="${year}"]`);
  if (activeMap) {
    activeMap.classList.add("active");
  }
}

// Actualizar el paso activo
function updateActiveStep(stepElement) {
  document.querySelectorAll(".step").forEach((el) => el.classList.remove("active"));
  stepElement.classList.add("active");
}

// Play/Pause
function togglePlayPause() {

  // Mostrar el contenedor de mapas y ocultar gráficos relacionados
  document.getElementById('map-container').classList.remove('d-none');
  document.getElementById('region-chart-container').classList.add('d-none');

  if (playPauseButton.textContent === "Play") {
    playPauseButton.textContent = "Pausa";
    startAutoPlay();
  } else {
    playPauseButton.textContent = "Play";
    stopAutoPlay();
  }
}

// Play
function startAutoPlay() {
  interval = setInterval(() => {
    const nextYear = currentYear + 1;
    if (nextYear > 2023) {
      currentYear = 2014;
    } else {
      currentYear = nextYear;
    }

    showMap(currentYear);
    const nextStep = document.querySelector(`.step[data-year="${currentYear}"]`);
    if (nextStep) {
      updateActiveStep(nextStep);
    }
  }, 700);
}

// Stop
function stopAutoPlay() {
  clearInterval(interval);
}

// Detector de eventos para el botón Play/Pausa
playPauseButton.addEventListener("click", togglePlayPause);

// Se agrega evento clic para los pasos
document.querySelectorAll(".step").forEach((step) => {
  step.addEventListener("click", () => {

    // Detener la reproducción automática
    stopAutoPlay();
    playPauseButton.textContent = "Play";

    // Mostrar el contenedor de mapas y ocultar gráficos relacionados
    document.getElementById('map-container').classList.remove('d-none');
    document.getElementById('region-chart-container').classList.add('d-none');

    currentYear = parseInt(step.dataset.year, 10);
    showMap(currentYear);
    updateActiveStep(step);
  });
});

// Mostrar el mapa inicial
showMap(currentYear);

const legendItems = document.querySelectorAll('.legend-item');

// Se agrega evento clic a cada 'legend-item'
legendItems.forEach(item => {
  item.addEventListener('click', () => {

    // Se detiene la reproducción automática
    stopAutoPlay();
    playPauseButton.textContent = "Play";

    legendItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');

    const region = item.getAttribute('data-region');

    // Se ocultan mapas y se muestra el contenedor de gráficos
    document.getElementById('map-container').classList.add('d-none');
    document.getElementById('region-chart-container').classList.remove('d-none');

    // Se muestra el gráfico de la región
    showRegionChart(region);
  });
});

function showRegionChart(region) {
  const regionCharts = {
    'Andalucía': "https://datawrapper.dwcdn.net/NO3QU/1/",
    'Aragón': "https://datawrapper.dwcdn.net/idevD/1/",
    'Cantabria': "https://datawrapper.dwcdn.net/YTC74/1/",
    'Castilla - La Mancha': "https://datawrapper.dwcdn.net/SBaNR/1/",
    'Castilla y León': "https://datawrapper.dwcdn.net/jvIvJ/1/ ",
    'Catalunya': "https://datawrapper.dwcdn.net/W2Ftg/1/",
    'Comunidad Autónoma de Madrid': "https://datawrapper.dwcdn.net/bxW1k/1/",
    'Comunidad Foral de Navarra': "https://datawrapper.dwcdn.net/I6H8b/1/",
    'Comunitat Valenciana': "https://datawrapper.dwcdn.net/hCaYX/1/",
    'Extremadura': "https://datawrapper.dwcdn.net/k0qyq/1/",
    'Galicia': "https://datawrapper.dwcdn.net/V6s58/1/",
    'Illes Balears': "https://datawrapper.dwcdn.net/1g16K/1/",
    'País Vasco': "https://datawrapper.dwcdn.net/dT2HT/1/",
    'Región de Murcia': "https://datawrapper.dwcdn.net/I0G6m/1/"
  };

  const regionChartContainer = document.getElementById('region-chart-container');

  if (regionCharts[region]) {
    regionChartContainer.innerHTML = `
      <iframe
        src="${regionCharts[region]}"
        width="80%"
        height="600"
        frameborder="0"
        allowfullscreen
        title="Gráfico de ${region}">
      </iframe>
    `;
  } else {
    regionChartContainer.innerHTML = `<p>No hay datos disponibles para ${region}</p>`;
  }
}
