const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


window.onload = ()=>{
    brushBtn.classList.add("active");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 65;


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 65;
  redrawStrokes();
}

  

window.addEventListener("resize", () => {
  resizeCanvas();
});

canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseout", stopPainting);

let isPainting = false;
let mouseX = 0;
let mouseY = 0;
let currentStroke = null;
let strokes = [];

strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));




const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", () => {
  ctx.strokeStyle = colorPicker.value;
});


function startPainting(event) {
  isPainting = true;
  mouseX = event.clientX - canvas.offsetLeft;
  mouseY = event.clientY - canvas.offsetTop;
  ctx.beginPath();
  ctx.moveTo(mouseX, mouseY);
  
}
const eraserBtn = document.getElementById("eraserBtn");
const brushBtn = document.getElementById("brushBtn");
let bgColor = getComputedStyle(canvas).backgroundColor;


const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.attributeName === "style") {
     
      bgColor = getComputedStyle(canvas).backgroundColor;
    }
  });
});

observer.observe(canvas, { attributes: true, attributeFilter: ["style"] });

eraserBtn.addEventListener("click", () => {
  eraserBtn.classList.add("active");
  brushBtn.classList.remove("active");
  if (eraserBtn.classList.contains("active")) {
   
    ctx.strokeStyle = bgColor;
    ctx.globalCompositeOperation = "destination-out";
  } else {
    ctx.strokeStyle = colorPicker.value;
    ctx.globalCompositeOperation = "source-over";
  }
});

brushBtn.addEventListener("click", () => {
  brushBtn.classList.add("active");
  eraserBtn.classList.remove("active");
  if (brushBtn.classList.contains("active")) {
  
    ctx.strokeStyle = colorPicker.value;
    ctx.globalCompositeOperation = "source-over";
  } else {
    ctx.strokeStyle = bgColor;
    ctx.globalCompositeOperation = "destination-out";
  }
});


  
const drawInput = document.getElementById("draw");
const eraseInput = document.getElementById("erase");

function draw(event) {
  if (!isPainting) return;
  mouseX = event.clientX - canvas.offsetLeft;
  mouseY = event.clientY - canvas.offsetTop;
  if (eraserBtn.classList.contains("active")) {
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = eraseInput.value;
  } else {
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = drawInput.value;
  }
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();
}

drawInput.addEventListener("input", () => {
  ctx.lineWidth = drawInput.value;
});

eraseInput.addEventListener("input", () => {
  ctx.lineWidth = eraseInput.value;
});


function stopPainting() {
  isPainting = false;
  currentStroke = ctx.getImageData(0, 0, canvas.width, canvas.height);
  strokes.push(currentStroke);
}


  
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes = [];
  strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}


const resetBtn = document.getElementById("resetBtn");


resetBtn.addEventListener("click", reset);

const drawInputs = document.getElementById("draw");
const eraseInputs = document.getElementById("erase");

const drawSizeLabel = document.getElementById("drawSize");
const eraseSizeLabel = document.getElementById("eraseSize");

drawInputs.addEventListener("input", () => {
  drawSizeLabel.textContent = drawInput.value;
});

eraseInputs.addEventListener("input", () => {
  eraseSizeLabel.textContent = eraseInput.value;
});

function redrawStrokes() {
  ctx.putImageData(strokes[0], 0, 0); 
  for (let i = 1; i < strokes.length; i++) {
    ctx.putImageData(strokes[i], 0, 0);
  }
}
