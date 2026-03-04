/* ============================================
   TPV Technology - Professional JavaScript
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
  // Duplicate for seamless loop
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

  // Nav shrink
  navbar.classList.toggle('scrolled', scrollY > 50);

  // Progress bar
  progressBar.style.width = progress + '%';

  // Back to top
  backToTop.classList.toggle('visible', scrollY > 400);

  // Active nav link
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
      // Optionally unobserve for performance
      // revealObserver.unobserve(entry.target);
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
    // Ease out cubic
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

// Hover effects for interactive elements
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

// Mouse interaction with particles
let mouseCanvas = { x: -1000, y: -1000 };
document.addEventListener('mousemove', e => {
  mouseCanvas.x = e.clientX;
  mouseCanvas.y = e.clientY;
});

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Grid
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

  // Connections
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

  // Particles
  particles.forEach(p => {
    // Mouse repulsion
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

    // Mouse proximity glow
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

// ====== PARALLAX EFFECT (subtle) ======
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.getElementById('hero');
  if (hero && scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.15}px)`;
    hero.style.opacity = 1 - (scrollY / window.innerHeight) * 0.4;
  }
}, { passive: true });

// ====== FORM INTERACTION ======
const formSubmit = document.querySelector('.form-submit');
if (formSubmit) {
  formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.target;
    const originalText = btn.textContent;
    btn.textContent = '✓';
    btn.style.background = '#14703D';
    setTimeout(() => {
      btn.innerHTML = '';
      // Restore lang spans
      const viSpan = document.createElement('span');
      viSpan.dataset.lang = 'vi';
      viSpan.className = currentLang === 'vi' ? 'active' : '';
      viSpan.textContent = 'Gửi yêu cầu';
      const enSpan = document.createElement('span');
      enSpan.dataset.lang = 'en';
      enSpan.className = currentLang === 'en' ? 'active' : '';
      enSpan.textContent = 'Send Request';
      const zhSpan = document.createElement('span');
      zhSpan.dataset.lang = 'zh';
      zhSpan.className = currentLang === 'zh' ? 'active' : '';
      zhSpan.textContent = '发送请求';
      btn.appendChild(viSpan);
      btn.appendChild(enSpan);
      btn.appendChild(zhSpan);
      btn.style.background = '';
    }, 2000);
  });
}
