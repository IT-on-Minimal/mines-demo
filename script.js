const grid = document.getElementById("gameGrid");
const signalBtn = document.getElementById("getSignalBtn");
const bgBtn = document.getElementById("changeBgBtn");

let currentSize = 5;
let signalsCount = 0;

// Фоны
const backgrounds = [
  "back_1.png",
  "back_2.png",
  "back_3.png",
  "back_4.png",
  "back_5.png",
  "back_6.png",
];
let currentBgIndex = 0;

function setBackground(index) {
  document.body.style.backgroundImage = `url(${backgrounds[index]})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}

bgBtn.addEventListener("click", () => {
  currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
  setBackground(currentBgIndex);
});

// Вероятности прогнозов от клиента
function getRandomSignalsCount() {
  const rand = Math.random() * 100;
  if (rand < 53) return 3;
  else if (rand < 83) return 4;
  else if (rand < 93) return 5;
  else if (rand < 98) return 6;
  else return 7;
}

// Генерация поля
function generateGrid(size) {
  grid.innerHTML = "";
  const dynamicGap = Math.max(2, 12 - size);
  grid.style.gap = `${dynamicGap}px`;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  if (signalsCount > 0) placeSignals(signalsCount);
}

// Размещение сигналов
function placeSignals(count) {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.innerHTML = ""));
  count = Math.min(count, cells.length);
  const usedIndexes = new Set();

  while (usedIndexes.size < count) {
    const randIndex = Math.floor(Math.random() * cells.length);
    usedIndexes.add(randIndex);
  }

  usedIndexes.forEach((index) => {
    cells[
      index
    ].innerHTML = `<img src="diamond_rounded_10px.png" alt="diamond" class="diamond-img">`;
  });
}

// Получить сигнал
signalBtn.addEventListener("click", () => {
  signalsCount = getRandomSignalsCount();
  placeSignals(signalsCount);
});

// Первый запуск
generateGrid(currentSize);
setBackground(currentBgIndex);
