// Routine cards data
const routines = [
  { text: "Wake Up", img: "https://img.icons8.com/color/96/000000/sunrise.png" },
  { text: "Brush Teeth", img: "https://img.icons8.com/color/96/000000/toothbrush.png" },
  { text: "Breakfast", img: "https://img.icons8.com/color/96/000000/breakfast.png" },
  { text: "Go to School", img: "https://img.icons8.com/color/96/000000/school-building.png" },
  { text: "Lunch", img: "https://img.icons8.com/color/96/000000/lunch.png" },
  { text: "Play Time", img: "https://img.icons8.com/color/96/000000/playtime.png" },
  { text: "Dinner", img: "https://img.icons8.com/color/96/000000/dinner.png" },
  { text: "Bed Time", img: "https://img.icons8.com/color/96/000000/bedtime.png" }
];

let currentOrder = [...routines];

// Render visual schedule cards
const board = document.getElementById('schedule-board');

function renderCards(arr) {
  board.innerHTML = "";
  arr.forEach((routine, idx) => {
    const card = document.createElement('div');
    card.className = "card";
    card.draggable = true;
    card.dataset.index = idx;
    card.innerHTML = `<img src="${routine.img}" alt="${routine.text}"><span>${routine.text}</span>`;
    board.appendChild(card);
  });
}
renderCards(currentOrder);

// Drag-and-drop cards
let draggingIdx = null;

board.addEventListener('dragstart', function(e) {
  if (e.target.classList.contains('card')) {
    draggingIdx = Number(e.target.dataset.index);
    e.target.classList.add('dragging');
  }
});
board.addEventListener('dragend', function(e) {
  if (e.target.classList.contains('card')) {
    e.target.classList.remove('dragging');
  }
});

board.addEventListener('dragover', function(e) {
  e.preventDefault();
  const dragOverCard = e.target.closest('.card');
  if (!dragOverCard) return;
  const overIdx = Number(dragOverCard.dataset.index);
  if (overIdx !== draggingIdx) {
    const temp = currentOrder.splice(draggingIdx, 1)[0];
    currentOrder.splice(overIdx, 0, temp);
    renderCards(currentOrder);
    draggingIdx = overIdx;
  }
});

// Reset button restores original order
document.getElementById('reset-btn').onclick = function() {
  currentOrder = [...routines];
  renderCards(currentOrder);
};
