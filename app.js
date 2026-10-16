// Local In-Memory Question Database (Modular Scalable Base)
const questionDB = {
  class5_6: [
    {
      topic: "Class 5th: Pizza Fractions",
      q: "Ek pizza ke 8 equal slices hain. Rohit ne 2 slices khaye aur Ananya ne 2 slices khaye. Ab kitna hissa bacha hai?",
      options: ["1/4", "1/2 (Aadha Pizza)", "3/8", "1/8"],
      correct: 1,
      sol: "Total slices = 8. Khaye gaye = 2 + 2 = 4. Bache = 8 - 4 = 4. Fraction = 4/8, jise divide karne par 1/2 banta hai."
    },
    {
      topic: "Class 6th: Geometry Perimeter",
      q: "Ek square ground ki ek side 15 meters hai. Uske charo taraf 1 pura chakkar lagane par total kitna distance cover hoga?",
      options: ["45 meters", "60 meters", "225 meters", "30 meters"],
      correct: 1,
      sol: "Square perimeter = 4 × Side. Isliye 4 × 15 = 60 meters."
    }
  ],
  class7_8: [
    {
      topic: "Class 7th: Speed & Motion",
      q: "Ek train 2 ghante me 120 km cover karti hai. Train ki speed m/s me calculate karein:",
      options: ["60 m/s", "16.67 m/s", "30 m/s", "25 m/s"],
      correct: 1,
      sol: "Speed = 120 / 2 = 60 km/h. Meter/sec ke liye: 60 × (5/18) = 16.67 m/s."
    }
  ],
  class9_10: [
    {
      topic: "Class 9th: Newton's Laws (NDA / JEE Base)",
      q: "Jab ek running bus achanak sharp right turn leti hai, toh passengers left ki taraf kyu jhookte hain?",
      options: ["Inertia of Rest", "Inertia of Direction", "Gravity", "Frictional Drag"],
      correct: 1,
      sol: "Newton ke 1st Law (Inertia of Direction) ke hisaab se body apni seedhi motion retain karna chahti hai."
    }
  ]
};

let currentClass = 'class5_6';
let currentIndex = 0;
let xp = 0;
let answered = false;

function switchClass(classKey) {
  currentClass = classKey;
  currentIndex = 0;
  
  // Update Tab Styling
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  document.getElementById('sol-panel').style.display = 'none';

  const set = questionDB[currentClass];
  const qData = set[currentIndex];

  document.getElementById('q-topic').innerText = qData.topic;
  document.getElementById('q-text').innerText = qData.q;

  const optBox = document.getElementById('options-box');
  optBox.innerHTML = '';

  qData.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerText = optText;
    btn.onclick = () => selectOption(idx, btn);
    optBox.appendChild(btn);
  });
}

function selectOption(selectedIdx, btnElement) {
  if (answered) return;
  answered = true;

  const qData = questionDB[currentClass][currentIndex];
  const allBtns = document.querySelectorAll('.opt-btn');

  if (selectedIdx === qData.correct) {
    btnElement.classList.add('correct');
    xp += 50;
    document.getElementById('xp-val').innerText = xp;
  } else {
    btnElement.classList.add('wrong');
    allBtns[qData.correct].classList.add('correct');
  }

  document.getElementById('sol-text').innerText = qData.sol;
  document.getElementById('sol-panel').style.display = 'block';
}

function loadNextQuestion() {
  const set = questionDB[currentClass];
  if (currentIndex < set.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    alert("Shabash! Is class set ke sabhi sawal complete ho gaye.");
    currentIndex = 0;
    renderQuestion();
  }
}

// Digital Slate Logic
const canvas = document.getElementById('roughSlate');
const ctx = canvas.getContext('2d');
let drawing = false;

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
setTimeout(resizeCanvas, 150);

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  return { x, y };
}

function startDrawing(e) {
  drawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
}

function draw(e) {
  if (!drawing) return;
  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDrawing() { drawing = false; }
function clearSlate() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

canvas.addEventListener('mousedown', startDrawing);
window.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
window.addEventListener('touchmove', draw);
window.addEventListener('touchend', stopDrawing);

// Initialize
renderQuestion();
