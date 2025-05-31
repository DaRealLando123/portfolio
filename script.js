const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let width, height, dpr, gridPoints = [];

function resize() {
  dpr = window.devicePixelRatio || 1;
  width = window.innerWidth * 1.5;
  height = window.innerHeight * 4.5;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  createGrid();
}

function createGrid() {
  gridPoints = [];
  const cols = 15;
  const rows = 25;
  const spacingX = width / cols;
  const spacingY = height / rows;

  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      gridPoints.push({
        x: x * spacingX,
        y: y * spacingY,
        offsetX: Math.random() * 50 - 25,
        offsetY: Math.random() * 50 - 25,
        angle: Math.random() * Math.PI * 2
      });
    }
  }
}

let mouse = { x: width / 2, y: height / 2 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#00f0ff33';
  ctx.lineWidth = 1;

  const time = Date.now() * 0.001;

  for (let i = 0; i < gridPoints.length; i++) {
    const p = gridPoints[i];
    const nx = p.x + Math.sin(time + p.angle) * p.offsetX;
    const ny = p.y + Math.cos(time + p.angle) * p.offsetY;
    p._nx = nx;
    p._ny = ny;

    ctx.beginPath();
    ctx.arc(nx, ny, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  const cols = 16;
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 12; x++) {
      const i = y * cols + x;
      const a = gridPoints[i];
      const b = gridPoints[i + 1];
      const c = gridPoints[i + cols];
      if (b && a) {
        ctx.beginPath();
        ctx.moveTo(a._nx, a._ny);
        ctx.lineTo(b._nx, b._ny);
        ctx.stroke();
      }
      if (c && a) {
        ctx.beginPath();
        ctx.moveTo(a._nx, a._ny);
        ctx.lineTo(c._nx, c._ny);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

// Parallax Effect
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  targetX = x * 30;
  targetY = y * 30;
});

function updateParallax() {
  currentX += (targetX - currentX) * 0.05;
  currentY += (targetY - currentY) * 0.05;

  canvas.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
  document.querySelector('.content').style.transform = `translate3d(${currentX * 0.4}px, ${currentY * 0.4}px, 0)`;

  requestAnimationFrame(updateParallax);
}

resize();
draw();
updateParallax();
window.addEventListener('resize', resize);

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.buttons a[href="#info"]').forEach(link => {
    link.addEventListener('click', function () {
        const section = this.getAttribute('data-section');
        const infoBox = document.getElementById('info-content');

        // Swap content based on clicked button
        if (section === 'apps') {
            infoBox.innerHTML = '<h1>Apps</h1><p class="infobox">Details about apps go here.</p>';
        } else if (section === 'projects') {
            infoBox.innerHTML = '<h1>Projects</h1><p class="infobox">Details about projects go here.</p>';
        } else if (section === 'about') {
            infoBox.innerHTML = `<h1>About Me</h1><h2 class="infobox">Passion programmer and designer.</h2>`;
        }
    });
});

const bgImage = document.getElementById('bg-image');

document.querySelectorAll('.buttons a[href="#info"]').forEach(link => {
    link.addEventListener('click', () => {
        canvas.classList.add('zoom-out');

        // Delay the image fade-in (e.g., 500ms)
        setTimeout(() => {
            bgImage.style.opacity = '1';
        }, 500); // Adjust time to sync with your zoom animation
    });
});


document.querySelectorAll('.buttons a[href="#top"]').forEach(link => {
    link.addEventListener('click', () => {
        canvas.classList.remove('zoom-out');

        // Reset canvas
        canvas.style.opacity = '0';
        canvas.style.transform = 'scale(1) translate(0, 0)';
        setTimeout(() => {
            canvas.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            canvas.style.opacity = '1';
            canvas.style.transform = 'scale(1) translate(0, 0)';
        }, 50);

        // Hide background image
        bgImage.style.opacity = '0';
    });
});
