/* ============================================
   TPV Technology - Professional JavaScript
   Enhanced with 3D Globe, Lottie, Parallax
   ============================================ */

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

  ctx.strokeStyle = 'rgba(26,140,78,0.04)';
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
        ctx.strokeStyle = `rgba(26,140,78,${0.06 * (1 - dist / 130)})`;
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
    ctx.fillStyle = `rgba(26,140,78,${p.opacity})`;
    ctx.fill();

    if (mouseDist < 150) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26,140,78,${0.1 * (1 - mouseDist / 150)})`;
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
  
  // Hero parallax
  if (hero && scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.15}px)`;
    hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.4;
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

// ====== 3D GLOBE (Three.js) ======
function initGlobe() {
  const container = document.getElementById('heroGlobe');
  if (!container || typeof THREE === 'undefined') return;

  const width = 420;
  const height = 420;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 2.8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Earth texture URLs (using reliable CDN sources)
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
  const bumpMap = 'https://unpkg.com/three-globe/example/img/earth-topology.png';

  // Earth sphere with texture
  const earthGeo = new THREE.SphereGeometry(1, 64, 64);
  const earthMat = new THREE.MeshPhongMaterial({
    map: textureLoader.load(earthTexture),
    bumpMap: textureLoader.load(bumpMap),
    bumpScale: 0.05,
    specular: new THREE.Color(0x333333),
    shininess: 15,
    transparent: true,
    opacity: 0.98
  });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  scene.add(earth);

  // Atmosphere glow
  const atmosphereGeo = new THREE.SphereGeometry(1.02, 64, 64);
  const atmosphereMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
        gl_FragColor = vec4(0.3, 0.8, 1.0, 1.0) * intensity;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });
  const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
  scene.add(atmosphere);

  // Cloud layer
  const cloudGeo = new THREE.SphereGeometry(1.01, 64, 64);
  const cloudMat = new THREE.MeshPhongMaterial({
    map: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-clouds.png'),
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  const clouds = new THREE.Mesh(cloudGeo, cloudMat);
  scene.add(clouds);

  // Location dots (HQ and target markets)
  const locations = [
    { lat: 21.0, lon: 105.8, color: 0xCC1B1B, size: 0.04, name: 'Hanoi' },  // HQ
    { lat: 35.7, lon: 139.7, color: 0x1A8C4E, size: 0.025, name: 'Tokyo' },  // Japan
    { lat: 39.9, lon: 116.4, color: 0x1A8C4E, size: 0.025, name: 'Beijing' },  // China
    { lat: 48.9, lon: 2.35, color: 0x1A8C4E, size: 0.025, name: 'Paris' },   // EU
  ];

  locations.forEach(loc => {
    const phi = (90 - loc.lat) * (Math.PI / 180);
    const theta = (loc.lon + 180) * (Math.PI / 180);
    const x = -Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);

    const dotGeo = new THREE.SphereGeometry(loc.size, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: loc.color });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(x, y, z);
    earth.add(dot);

    // Pulse ring for HQ
    if (loc.color === 0xCC1B1B) {
      const pulseGeo = new THREE.RingGeometry(0.05, 0.08, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xCC1B1B, transparent: true, opacity: 0.5, side: THREE.DoubleSide
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.set(x * 1.01, y * 1.01, z * 1.01);
      pulse.lookAt(0, 0, 0);
      earth.add(pulse);
    }
  });

  // Starfield background
  const starGeo = new THREE.BufferGeometry();
  const starCount = 500;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 10;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.6 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1);
  sunLight.position.set(5, 3, 5);
  scene.add(sunLight);

  // Mouse interaction
  let globeMouseX = 0, globeMouseY = 0;
  document.addEventListener('mousemove', e => {
    globeMouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
    globeMouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  });

  function animateGlobe() {
    requestAnimationFrame(animateGlobe);
    earth.rotation.y += 0.002;
    earth.rotation.x += (globeMouseY * 0.3 - earth.rotation.x) * 0.02;
    earth.rotation.y += (globeMouseX * 0.3) * 0.01;
    
    clouds.rotation.y += 0.0005;
    clouds.rotation.x += 0.0001;
    
    stars.rotation.y -= 0.0002;
    
    renderer.render(scene, camera);
  }
  animateGlobe();
}

// Init globe after page load
window.addEventListener('load', () => {
  setTimeout(initGlobe, 500);
});

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
  if (!globeContainer || typeof THREE === 'undefined') return;

  const globe = globeContainer.querySelector('canvas');
  if (!globe) return;

  // Get the globe's scene from Three.js
  // We'll add particles to the same scene as the globe
  // But since we can't access the scene directly, we'll create a separate overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.pointerEvents = 'none';
  globeContainer.appendChild(overlay);

  const particleCount = 12;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = Math.random() * 4 + 2 + 'px';
    p.style.height = p.style.width;
    p.style.borderRadius = '50%';
    p.style.background = i === 0 ? '#CC1B1B' : '#2ECC71';
    p.style.boxShadow = `0 0 ${Math.random() * 8 + 4}px ${i === 0 ? '#CC1B1B' : '#2ECC71'}`;
    p.style.opacity = Math.random() * 0.6 + 0.3;
    p.style.zIndex = '10';
    overlay.appendChild(p);

    // Random position around the globe (in pixels from center)
    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
    const radius = 210 + Math.random() * 40; // Globe radius is 210px
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.6; // Slight tilt

    p.style.left = (210 + x) + 'px';
    p.style.top = (210 + y) + 'px';

    particles.push({
      element: p,
      angle: angle,
      radius: radius,
      speed: Math.random() * 0.02 + 0.005,
      tilt: Math.random() * 0.2
    });
  }

  let time = 0;
  function animateParticles() {
    time += 0.016;
    particles.forEach(p => {
      p.angle += p.speed;
      const x = Math.cos(p.angle) * p.radius;
      const y = Math.sin(p.angle) * p.radius * p.tilt;
      p.element.style.left = (210 + x) + 'px';
      p.element.style.top = (210 + y) + 'px';
      p.element.style.transform = `scale(${1 + Math.sin(time * 3 + p.angle) * 0.3})`;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// Init floating particles after globe
window.addEventListener('load', () => {
  setTimeout(initFloatingParticles, 800);
});

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
    orb.style.background = `radial-gradient(circle, rgba(26,140,78,${0.08 + Math.random() * 0.05}) 0%, transparent 70%)`;
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
