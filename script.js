gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const svg = document.getElementById('circuitBoard');
const width = window.innerWidth;
const height = window.innerHeight;

svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

const NUM_PATHS = 40;
const circuitPaths = [];

for (let i = 0; i < NUM_PATHS; i++) {
  const isVertical = Math.random() > 0.5;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  if (isVertical) {
    const x = Math.random() * width;
    const controlOffset = (Math.random() - 0.5) * 200;
    path.setAttribute("d", `M${x},0 Q${x + controlOffset},${height / 2} ${x},${height}`);
  } else {
    const y = Math.random() * height;
    const controlOffset = (Math.random() - 0.5) * 200;
    path.setAttribute("d", `M0,${y} Q${width / 2},${y + controlOffset} ${width},${y}`);
  }

  path.setAttribute("class", "circuit");
  svg.appendChild(path);
  circuitPaths.push(path);

  // Pulse animation
  const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  pulse.setAttribute("class", "pulse");
  svg.appendChild(pulse);

  gsap.to(pulse, {
    motionPath: {
      path: path,
      align: path,
      autoRotate: false,
      alignOrigin: [0.5, 0.5]
    },
    duration: 5 + Math.random() * 3,
    repeat: -1,
    ease: "none",
    delay: Math.random() * 2
  });
}

// Scroll-triggered content animations
gsap.utils.toArray(".panel").forEach(panel => {
  gsap.to(panel, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// Optional: click to add a new pulse
svg.addEventListener("click", () => {
  const randomPath = circuitPaths[Math.floor(Math.random() * circuitPaths.length)];
  const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  pulse.setAttribute("class", "pulse");
  svg.appendChild(pulse);

  gsap.to(pulse, {
    motionPath: {
      path: randomPath,
      align: randomPath,
      autoRotate: false,
      alignOrigin: [0.5, 0.5]
    },
    duration: 2,
    ease: "power1.inOut",
    onComplete: () => svg.removeChild(pulse)
  });
});

// Select the panel element and the background (SVG)
const panel = document.querySelector(".panel");
const circuitBoard = document.querySelector("#circuitBoard");

// Event listener to track mouse movement
document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX; // Get mouse X position
    const mouseY = event.clientY; // Get mouse Y position

    // Calculate offsets (percentage of the mouse position in relation to the window size)
    const offsetX = (mouseX / window.innerWidth) - 0.5; // Normalize X to range from -0.5 to 0.5
    const offsetY = (mouseY / window.innerHeight) - 0.5; // Normalize Y to range from -0.5 to 0.5

    // Apply slight movement to the panel based on mouse position
    // Multiply by a factor to adjust the strength of the movement
    const textStrength = 20; // Movement strength for the text
    const backgroundStrength = 5; // Movement strength for the background (less movement)

    // Move the panel (text)
    panel.style.transform = `translate(${offsetX * textStrength}px, ${offsetY * textStrength}px)`;

    // Move the background (SVG)
    circuitBoard.style.transform = `translate(${offsetX * backgroundStrength}px, ${offsetY * backgroundStrength}px)`;
});
