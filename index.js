/* ============================================
   TPV Technology - Professional JavaScript
   Enhanced with 3D Globe, Lottie, Parallax
   ============================================ */

// ====== THEME SYSTEM ======
(function initTheme() {
  const saved = localStorage.getItem('tpv-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('tpv-theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', toggleTheme);
  const saved = localStorage.getItem('tpv-theme') || 'light';
  updateThemeIcon(saved);
});

// ====== LANGUAGE SYSTEM ======
let currentLang = 'vi';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
  document.querySelectorAll('[data-lang-inline]').forEach(el => {
    el.classList.toggle('active', el.dataset.langInline === lang);
  });
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.langBtn === lang);
  });
  updateTicker();
  document.documentElement.lang = lang;
}

document.querySelectorAll('[data-lang-btn]').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
});

// ====== TICKER ======
const tickerContent = {
  vi: '🌱 Công nghệ nông nghiệp thông minh · 🛰️ Viễn thám vệ tinh · 💻 Chuyển đổi số · 🌍 Nông nghiệp xanh · 📊 Phân tích dữ liệu · 🚀 Xuất khẩu nông sản · 🤖 AI trong nông nghiệp',
  en: '🌱 Smart Agriculture Technology · 🛰️ Satellite Remote Sensing · 💻 Digital Transformation · 🌍 Green Agriculture · 📊 Data Analytics · 🚀 Agricultural Export · 🤖 AI in Agriculture',
  zh: '🌱 智慧农业技术 · 🛰️ 卫星遥感 · 💻 数字化转型 · 🌍 绿色农业 · 📊 数据分析 · 🚀 农产品出口 · 🤖 农业人工智能'
};

function updateTicker() {
  const text = tickerContent[currentLang];
  document.getElementById('tickerText').textContent = text + '  ·  ' + text + '  ·  ';
}
updateTicker();

// ====== LOADING SCREEN ======
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2000);
});

// ====== NAV SCROLL + PROGRESS BAR ======
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');

function onScroll() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollY / docHeight) * 100;

  navbar.classList.toggle('scrolled', scrollY > 50);
  progressBar.style.width = progress + '%';
  backToTop.classList.toggle('visible', scrollY > 400);
  updateActiveNav();
}

window.addEventListener('scroll', onScroll, { passive: true });

// ====== ACTIVE NAV LINK ======
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-nav]');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active-link', link.dataset.nav === current);
  });
}

// ====== BACK TO TOP ======
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== REVEAL ON SCROLL ======
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ====== COUNTER ANIMATION ======
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stat-num').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const text = el.textContent.trim();
  const match = text.match(/^(\d+\.?\d*)/);
  if (!match) return;

  const target = parseFloat(match[1]);
  const suffix = text.replace(match[1], '');
  const isFloat = text.includes('.');
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ====== CUSTOM CURSOR ======
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

const hoverTargets = 'a, button, .service-card, .mission-card, .goal-card, .project-card, .contact-item, .highlight-item, .form-input';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    ring.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    ring.classList.remove('hover');
  });
});

// ====== HAMBURGER MENU ======
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ====== SMOOTH NAV LINKS ======
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ====== PARTICLE CANVAS ======
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const numParticles = 70;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.1
  });
}

let mouseCanvas = { x: -1000, y: -1000 };
document.addEventListener('mousemove', e => {
  mouseCanvas.x = e.clientX;
  mouseCanvas.y = e.clientY;
});

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(232,115,26,0.03)';
  ctx.lineWidth = 1;
  const gridSize = 80;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(232,115,26,${0.05 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    const dmx = p.x - mouseCanvas.x;
    const dmy = p.y - mouseCanvas.y;
    const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
    if (mouseDist < 100) {
      const force = (100 - mouseDist) / 100 * 0.5;
      p.x += (dmx / mouseDist) * force;
      p.y += (dmy / mouseDist) * force;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232,115,26,${p.opacity})`;
    ctx.fill();

    if (mouseDist < 150) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,115,26,${0.1 * (1 - mouseDist / 150)})`;
      ctx.fill();
    }

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ====== ENHANCED PARALLAX ======
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.getElementById('hero');
  
  // Hero video parallax (slow zoom on scroll)
  if (hero) {
    const videoWrap = hero.querySelector('.hero-video-wrap');
    const video = hero.querySelector('.hero-video');
    if (videoWrap && video && scrollY < videoWrap.offsetHeight) {
      video.style.transform = `scale(${1 + scrollY * 0.0003})`;
    }
  }

  // Section header parallax (subtle)
  document.querySelectorAll('.section-header').forEach(header => {
    const rect = header.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const viewCenter = window.innerHeight / 2;
    const offset = (centerY - viewCenter) * 0.03;
    header.style.transform = `translateY(${offset}px)`;
  });
}, { passive: true });

// ====== CARD TILT GLOW (mouse follow) ======
document.querySelectorAll('.project-card, .service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

// ====== 3D GLOBE (Three.js) - NGS-Style Realistic ======
function initGlobe() {
  const container = document.getElementById('heroGlobe');
  if (!container || typeof THREE === 'undefined') return;

  const width = 520;
  const height = 520;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 2.6;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();

  // === EARTH (night lights texture for realistic city glow) ===
  const earthGeo = new THREE.SphereGeometry(1, 128, 128);
  const earthMat = new THREE.MeshPhongMaterial({
    map: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-night.jpg'),
    bumpMap: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
    bumpScale: 0.03,
    specular: new THREE.Color(0x222222),
    shininess: 8,
    transparent: false
  });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  scene.add(earth);

  // === ATMOSPHERE GLOW (blue-orange edge glow like NGS) ===
  const atmosphereGeo = new THREE.SphereGeometry(1.015, 128, 128);
  const atmosphereMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
        vec3 blueGlow = vec3(0.15, 0.4, 0.9) * intensity * 1.5;
        vec3 orangeGlow = vec3(0.91, 0.45, 0.1) * pow(intensity, 2.0) * 0.6;
        gl_FragColor = vec4(blueGlow + orangeGlow, intensity * 0.9);
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });
  const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
  scene.add(atmosphere);

  // === WIREFRAME GRID SPHERE (blue network mesh like NGS) ===
  const wireGeo = new THREE.SphereGeometry(1.005, 40, 40);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x1a5faa,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending
  });
  const wireframe = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wireframe);

  // === SECOND WIREFRAME (finer grid, subtle) ===
  const wireGeo2 = new THREE.SphereGeometry(1.008, 80, 80);
  const wireMat2 = new THREE.MeshBasicMaterial({
    color: 0x2080cc,
    wireframe: true,
    transparent: true,
    opacity: 0.03,
    blending: THREE.AdditiveBlending
  });
  const wireframe2 = new THREE.Mesh(wireGeo2, wireMat2);
  scene.add(wireframe2);

  // === ORBIT RINGS (orange curved lines like NGS) ===
  function createOrbitRing(radiusX, radiusY, tiltX, tiltY, tiltZ, color, opacity, lineWidth) {
    const points = [];
    const segments = 200;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radiusX,
        Math.sin(angle) * radiusY * 0.3,
        Math.sin(angle) * radiusX * 0.8
      ));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Line(geometry, material);
    ring.rotation.set(tiltX, tiltY, tiltZ);
    return ring;
  }

  // Multiple orbit rings at different angles (like NGS orange arcs)
  const orbits = [];
  const orbitConfigs = [
    { rx: 1.5, ry: 1.5, tx: 0.3, ty: 0.5, tz: 0.2, color: 0xE8731A, op: 0.35 },
    { rx: 1.7, ry: 1.7, tx: -0.4, ty: 1.2, tz: -0.3, color: 0xF5923E, op: 0.25 },
    { rx: 1.4, ry: 1.4, tx: 0.8, ty: -0.3, tz: 0.5, color: 0xE8731A, op: 0.3 },
    { rx: 1.9, ry: 1.9, tx: -0.2, ty: 0.8, tz: -0.6, color: 0xD06010, op: 0.15 },
    { rx: 1.3, ry: 1.3, tx: 1.0, ty: 0.2, tz: 0.1, color: 0xF5923E, op: 0.2 },
  ];

  orbitConfigs.forEach(cfg => {
    const ring = createOrbitRing(cfg.rx, cfg.ry, cfg.tx, cfg.ty, cfg.tz, cfg.color, cfg.op);
    scene.add(ring);
    orbits.push(ring);
  });

  // === GLOWING DOTS ON ORBITS (traveling light particles) ===
  const orbitDots = [];
  for (let i = 0; i < 15; i++) {
    const dotGeo = new THREE.SphereGeometry(0.012, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0xF5923E,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    scene.add(dot);
    orbitDots.push({
      mesh: dot,
      orbitIndex: Math.floor(Math.random() * orbitConfigs.length),
      angle: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.008
    });
  }

  // === CITY GLOW POINTS (bright dots on earth surface) ===
  const cities = [
    { lat: 21.0, lon: 105.8, size: 0.025, color: 0xE8731A },  // Hanoi (HQ)
    { lat: 35.7, lon: 139.7, size: 0.015, color: 0xFFCC66 },  // Tokyo
    { lat: 39.9, lon: 116.4, size: 0.015, color: 0xFFCC66 },  // Beijing
    { lat: 48.9, lon: 2.35, size: 0.015, color: 0xFFCC66 },   // Paris
    { lat: 40.7, lon: -74.0, size: 0.015, color: 0xFFCC66 },  // New York
    { lat: 1.35, lon: 103.8, size: 0.015, color: 0xFFCC66 },  // Singapore
    { lat: 51.5, lon: -0.1, size: 0.015, color: 0xFFCC66 },   // London
    { lat: -33.9, lon: 151.2, size: 0.012, color: 0xFFCC66 }, // Sydney
    { lat: 13.75, lon: 100.5, size: 0.012, color: 0xFFCC66 }, // Bangkok
    { lat: 37.6, lon: 127.0, size: 0.012, color: 0xFFCC66 },  // Seoul
    { lat: 22.3, lon: 114.2, size: 0.012, color: 0xFFCC66 },  // Hong Kong
    { lat: 10.8, lon: 106.6, size: 0.015, color: 0xF5923E },  // Ho Chi Minh
  ];

  function latLonToVec3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -Math.sin(phi) * Math.cos(theta) * radius,
      Math.cos(phi) * radius,
      Math.sin(phi) * Math.sin(theta) * radius
    );
  }

  const cityMeshes = [];
  cities.forEach(city => {
    const pos = latLonToVec3(city.lat, city.lon, 1.005);

    // Glowing dot
    const dotGeo = new THREE.SphereGeometry(city.size, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({
      color: city.color,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.copy(pos);
    earth.add(dot);

    // Glow halo
    const haloGeo = new THREE.SphereGeometry(city.size * 3, 12, 12);
    const haloMat = new THREE.MeshBasicMaterial({
      color: city.color,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(pos);
    earth.add(halo);
    cityMeshes.push({ dot, halo, baseOpacity: 0.15 });
  });

  // === CONNECTION ARCS between cities (orange curved lines on globe) ===
  function createArc(start, end, color, opacity) {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1.3); // Arc height above surface

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending
    });
    return new THREE.Line(geometry, material);
  }

  // Arcs from Hanoi to other cities
  const hanoiPos = latLonToVec3(21.0, 105.8, 1.005);
  const arcTargets = [
    { lat: 35.7, lon: 139.7 }, { lat: 39.9, lon: 116.4 },
    { lat: 1.35, lon: 103.8 }, { lat: 10.8, lon: 106.6 },
    { lat: 37.6, lon: 127.0 }, { lat: 22.3, lon: 114.2 },
  ];
  arcTargets.forEach(target => {
    const targetPos = latLonToVec3(target.lat, target.lon, 1.005);
    const arc = createArc(hanoiPos, targetPos, 0xE8731A, 0.25);
    earth.add(arc);
  });

  // === STARFIELD ===
  const starGeo = new THREE.BufferGeometry();
  const starCount = 3000;
  const starPos = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 40;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 40;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    starSizes[i] = Math.random() * 0.03 + 0.005;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff, size: 0.02, transparent: true, opacity: 0.8,
    blending: THREE.AdditiveBlending, sizeAttenuation: true
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // === LIGHTING (dramatic, like NGS) ===
  const ambientLight = new THREE.AmbientLight(0x111122, 0.8);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffeedd, 0.6);
  sunLight.position.set(5, 2, 5);
  scene.add(sunLight);

  // Rim light (blue, from behind)
  const rimLight = new THREE.DirectionalLight(0x3366ff, 0.4);
  rimLight.position.set(-3, 1, -5);
  scene.add(rimLight);

  // Orange accent light
  const accentLight = new THREE.PointLight(0xE8731A, 0.5, 10);
  accentLight.position.set(3, 2, 2);
  scene.add(accentLight);

  // === MOUSE INTERACTION ===
  let globeMouseX = 0, globeMouseY = 0;
  document.addEventListener('mousemove', e => {
    globeMouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
    globeMouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  });

  // === ANIMATION LOOP ===
  let time = 0;
  function animateGlobe() {
    requestAnimationFrame(animateGlobe);
    time += 0.016;

    // Earth rotation
    earth.rotation.y += 0.0015;
    earth.rotation.x += (globeMouseY * 0.2 - earth.rotation.x) * 0.015;

    // Wireframe counter-rotation (subtle)
    wireframe.rotation.y = earth.rotation.y * 0.98;
    wireframe.rotation.x = earth.rotation.x;
    wireframe2.rotation.y = earth.rotation.y * 1.01;
    wireframe2.rotation.x = earth.rotation.x;

    // Orbit rings slow rotation
    orbits.forEach((ring, i) => {
      ring.rotation.y += 0.0003 * (i % 2 === 0 ? 1 : -1);
    });

    // Traveling dots on orbits
    orbitDots.forEach(od => {
      od.angle += od.speed;
      const cfg = orbitConfigs[od.orbitIndex];
      const x = Math.cos(od.angle) * cfg.rx;
      const y = Math.sin(od.angle) * cfg.ry * 0.3;
      const z = Math.sin(od.angle) * cfg.rx * 0.8;

      // Apply same rotation as orbit ring
      const euler = new THREE.Euler(cfg.tx, cfg.ty + 0.0003 * time * (od.orbitIndex % 2 === 0 ? 1 : -1), cfg.tz);
      const vec = new THREE.Vector3(x, y, z).applyEuler(euler);
      od.mesh.position.copy(vec);
      od.mesh.material.opacity = 0.5 + Math.sin(time * 3 + od.angle) * 0.3;
    });

    // City glow pulse
    cityMeshes.forEach((cm, i) => {
      cm.halo.material.opacity = cm.baseOpacity + Math.sin(time * 2 + i) * 0.05;
    });

    stars.rotation.y -= 0.0001;

    renderer.render(scene, camera);
  }
  animateGlobe();
}

// Init after page load (globe removed - using video background)
window.addEventListener('load', () => {
  // Globe and hero stars no longer needed
});

// ====== HERO STARFIELD BACKGROUND ======
function initHeroStars() {
  const canvas = document.getElementById('heroStars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = document.getElementById('hero');

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.003 + 0.001,
      dx: (Math.random() - 0.5) * 0.00015,
      dy: (Math.random() - 0.5) * 0.00015
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.001;
    stars.forEach(s => {
      // Move stars slowly
      s.x += s.dx;
      s.y += s.dy;

      // Wrap around edges
      if (s.x < 0) s.x = 1;
      if (s.x > 1) s.x = 0;
      if (s.y < 0) s.y = 1;
      if (s.y > 1) s.y = 0;

      const flicker = 0.5 + 0.5 * Math.sin(t * s.speed * 200 + s.x * 100);
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.o * flicker})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ====== LOTTIE ANIMATED ICONS ======
function initLottieIcons() {
  if (typeof lottie === 'undefined') return;

  const lottieConfigs = {
    plant: {
      path: 'https://assets2.lottiefiles.com/packages/lf20_4kx2q32n.json',
      fallback: '🌱'
    },
    idea: {
      path: 'https://assets2.lottiefiles.com/packages/lf20_ydo1amjm.json',
      fallback: '💡'
    },
    globe: {
      path: 'https://assets10.lottiefiles.com/packages/lf20_bq485nmk.json',
      fallback: '🌍'
    },
    chart: {
      path: 'https://assets2.lottiefiles.com/packages/lf20_dews3j6m.json',
      fallback: '📊'
    }
  };

  document.querySelectorAll('.lottie-icon').forEach(el => {
    const type = el.dataset.lottie;
    const config = lottieConfigs[type];
    if (!config) return;

    try {
      const anim = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: config.path
      });

      // Play on hover of parent highlight-item
      const parent = el.closest('.highlight-item');
      if (parent) {
        // Auto-play with intersection observer
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              anim.play();
            } else {
              anim.pause();
            }
          });
        }, { threshold: 0.5 });
        observer.observe(parent);
      }

      // Fallback if animation fails to load
      anim.addEventListener('data_failed', () => {
        el.textContent = config.fallback;
        el.style.fontSize = '1.4rem';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
      });

      // Also set a timeout fallback
      setTimeout(() => {
        if (!anim.isLoaded) {
          el.textContent = config.fallback;
          el.style.fontSize = '1.4rem';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
        }
      }, 5000);

    } catch (e) {
      el.textContent = config.fallback;
      el.style.fontSize = '1.4rem';
    }
  });
}

window.addEventListener('load', () => {
  setTimeout(initLottieIcons, 1000);
});

// ====== FLOATING PARTICLES AROUND GLOBE ======
function initFloatingParticles() {
  const globeContainer = document.getElementById('heroGlobe');
  if (!globeContainer) return;

  // Wait for canvas to be created
  const globe = globeContainer.querySelector('canvas');
  if (!globe) return;

  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.pointerEvents = 'none';
  globeContainer.appendChild(overlay);

  const particleCount = 20;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.position = 'absolute';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.borderRadius = '50%';
    const isOrange = Math.random() > 0.4;
    p.style.background = isOrange ? '#E8731A' : '#4488cc';
    p.style.boxShadow = `0 0 ${size * 3}px ${isOrange ? '#E8731A' : '#4488cc'}`;
    p.style.opacity = Math.random() * 0.6 + 0.2;
    p.style.zIndex = '10';
    overlay.appendChild(p);

    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
    const radius = 240 + Math.random() * 60;

    particles.push({
      element: p,
      angle: angle,
      radius: radius,
      speed: Math.random() * 0.015 + 0.003,
      tilt: 0.3 + Math.random() * 0.5,
      yOffset: (Math.random() - 0.5) * 40
    });
  }

  let time = 0;
  function animateParticles() {
    time += 0.016;
    particles.forEach(p => {
      p.angle += p.speed;
      const x = Math.cos(p.angle) * p.radius;
      const y = Math.sin(p.angle) * p.radius * p.tilt + p.yOffset;
      p.element.style.left = (260 + x) + 'px';
      p.element.style.top = (260 + y) + 'px';
      p.element.style.transform = `scale(${1 + Math.sin(time * 2 + p.angle) * 0.4})`;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// Floating particles removed (using video background instead)

// ====== FLOATING ELEMENTS (ORBS) ======
function initFloatingOrbs() {
  const orbCount = 4;
  const positions = [
    { top: '10%', left: '5%', delay: 0 },
    { top: '15%', right: '5%', delay: 1 },
    { bottom: '10%', left: '5%', delay: 2 },
    { bottom: '15%', right: '5%', delay: 3 }
  ];

  positions.forEach((pos, i) => {
    const orb = document.createElement('div');
    orb.style.position = 'fixed';
    orb.style.width = Math.random() * 100 + 80 + 'px';
    orb.style.height = orb.style.width;
    orb.style.borderRadius = '50%';
    const colors = [
      `rgba(232,115,26,${0.04 + Math.random() * 0.03})`,
      `rgba(30,100,200,${0.03 + Math.random() * 0.02})`,
      `rgba(232,115,26,${0.03 + Math.random() * 0.02})`,
      `rgba(30,100,200,${0.04 + Math.random() * 0.03})`
    ];
    orb.style.background = `radial-gradient(circle, ${colors[i]} 0%, transparent 70%)`;
    orb.style.zIndex = '1';
    orb.style.pointerEvents = 'none';
    orb.style.animation = `float ${Math.random() * 10 + 15}s ease-in-out infinite alternate`;
    orb.style.animationDelay = pos.delay + 's';
    
    Object.assign(orb.style, pos);
    document.body.appendChild(orb);
  });

  // Add CSS for float animation if not exists
  if (!document.getElementById('float-anim-style')) {
    const style = document.createElement('style');
    style.id = 'float-anim-style';
    style.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(20px, -30px) scale(1.1); }
        100% { transform: translate(-20px, 30px) scale(0.9); }
      }
    `;
    document.head.appendChild(style);
  }
}

window.addEventListener('load', initFloatingOrbs);
