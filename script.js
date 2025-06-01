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
        if (section === 'skills') {
            infoBox.innerHTML = `
<div style="display: flex; gap: 40px; flex-wrap: nowrap; overflow: hidden; justify-content: center;">
  <div style="flex: 0 0 auto; width: 30%;">
    <a href="https://www.credly.com/badges/43fcc8bf-c51a-48ef-ab8e-803a61a02907/public_url"><img src="it-specialist-html-and-css.png" style="max-width: 100%;"></a>
    <h2>Web Development</h2>
    <h4>Certified 🗸</h4>
    <div class="infobox">
      <p>Specialist in front-end technologies including HTML, CSS, and JavaScript.</p>
    </div>
  </div>

  <div style="flex: 0 0 auto; width: 30%;">
  <a href="https://www.credly.com/badges/b7419fc7-3a49-4a30-bec6-c7495381b137/public_url"><img src="office.png" style="max-width: 100%;"></a>
    <a href="https://www.credly.com/badges/02a5f8e9-e5c3-4974-b6f3-1cd740dc6129/public_url"><img src="excel.png" style="max-width: 100%;"></a>
    <a href="https://www.credly.com/badges/506866b0-14e4-40ca-a81a-d4833ffae6d6/public_url"><img src="word.png" style="max-width: 100%;"></a>
    <a href="https://www.credly.com/badges/011fedc9-ec3c-4dd8-84ba-542032196db8/public_url"><img src="powerpoint.png" style="max-width: 100%;"></a>
    <h2>Office Apps</h2>
    <h4>Certified 🗸</h4>
    <div class="infobox">
      <p>Specialist and associate in a multitude of Microsoft apps; quick and efficient typist.</p>
    </div>
  </div>

  <div style="flex: 0 0 auto; width: 30%;">
    <a href="https://www.credly.com/badges/db60b1eb-9644-41cb-99b7-48b699b004ac/public_url"><img src="adobe.png" style="max-width: 100%;"></a>
    <a href="https://www.credly.com/badges/ce72ba0c-a2ef-45b8-bd77-4e45657de6b0/public_url"><img src="photoshop.png" style="max-width: 100%;"></a>
    <a href="https://www.credly.com/badges/40f2088b-193d-4519-8717-548b5145f9eb/public_url"><img src="illustrator.png" style="max-width: 100%;"></a>
    <h2>Digital Design</h2>
    <h4>Certified 🗸</h4>
    <div class="infobox">
      <p>Professional in design principles, creating modern, clean illustrations and edits using Adobe Illustrator and Photoshop.</p>
    </div>
  </div>
</div>
`;
        } else if (section === 'projects') {
            infoBox.innerHTML = '<h1>Projects</h1><p class="infobox">Some of my projects are listed here.</p>';
        } else if (section === 'about') {
            infoBox.innerHTML = `<h1>About Me</h1><h2 class="infobox">Passion programmer and designer.</h2>`;
        }
    });
});

const bgImage = document.getElementById('bg-image');

document.querySelectorAll('.buttons a[href="#info"]').forEach(link => {
    link.addEventListener('click', () => {
        canvas.classList.add('zoom-out');

        var newBg = link.getAttribute('data-section');
        bgImage.style.backgroundImage = `url(${newBg+".png"})`;

        // Delay the image fade-in (e.g., 500ms)
        setTimeout(() => {
            bgImage.style.opacity = '.5';
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
