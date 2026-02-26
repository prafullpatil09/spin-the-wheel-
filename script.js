const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const updateBtn = document.getElementById('update-btn');
const input = document.getElementById('options-input');

let sectors = [];
const colors = ['#6c5ce7', '#ff7675', '#fdcb6e', '#00b894', '#0984e3', '#e84393'];

let angle = 0;
let spinAngle = 0;
let isSpinning = false;

function drawWheel() {
    const vals = input.value.split('\n').filter(t => t.trim() !== "");
    sectors = vals;
    const arc = (2 * Math.PI) / sectors.length;

    ctx.clearRect(0, 0, 500, 500);

    sectors.forEach((label, i) => {
        const sectorAngle = angle + i * arc;
        ctx.fillStyle = colors[i % colors.length];
        
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 240, sectorAngle, sectorAngle + arc);
        ctx.lineTo(250, 250);
        ctx.fill();
        ctx.stroke();

        // Labels
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(sectorAngle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px Arial";
        ctx.fillText(label, 220, 10);
        ctx.restore();
    });
}

function rotate() {
    if (!isSpinning) return;
    spinAngle *= 0.98; // Friction
    if (spinAngle < 0.01) {
        isSpinning = false;
        return;
    }
    angle += spinAngle;
    drawWheel();
    requestAnimationFrame(rotate);
}

spinBtn.onclick = () => {
    if (isSpinning) return;
    spinAngle = Math.random() * 0.5 + 0.5;
    isSpinning = true;
    rotate();
};

updateBtn.onclick = drawWheel;
drawWheel();