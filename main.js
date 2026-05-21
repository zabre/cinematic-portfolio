/* ─── State ─────────────────────────────────────── */
let mouse = { x: 0, y: 0 };
let current = { x: 0, y: 0 };
let selectedApp = null;

/* ─── Ambient glow follows mouse ─────────────────── */
const ambient = document.getElementById('ambient');
document.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / window.innerWidth) * 100;
  mouse.y = (e.clientY / window.innerHeight) * 100;
});

function animateAmbient() {
  current.x += (mouse.x - current.x) * 0.04;
  current.y += (mouse.y - current.y) * 0.04;
  ambient.style.background = `
    radial-gradient(ellipse 55% 45% at ${current.x}% ${current.y}%,
      rgba(123,47,255,0.22) 0%, rgba(59,130,246,0.12) 45%, transparent 70%),
    radial-gradient(ellipse 40% 55% at ${100 - current.x * 0.6}% ${100 - current.y * 0.6}%,
      rgba(236,72,153,0.10) 0%, transparent 60%)
  `;
  requestAnimationFrame(animateAmbient);
}
animateAmbient();

/* ─── Build gallery ───────────────────────────────── */
const gallery = document.getElementById('gallery');

APPS.forEach((app, i) => {
  const card = document.createElement('div');
  card.className = `card card--${app.size}`;
  card.dataset.id = app.id;
  card.style.setProperty('--accent', app.accent);
  card.style.setProperty('--color', app.color);
  card.style.animationDelay = `${i * 0.08}s`;

  card.innerHTML = `
    <div class="card-glow"></div>
    <div class="card-inner">
      <span class="card-emoji">${app.emoji}</span>
      <div class="card-meta">
        <h2 class="card-title">${app.title}</h2>
        <p class="card-subtitle">${app.subtitle}</p>
      </div>
      <div class="card-tags">
        ${app.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <button class="card-cta" onclick="event.stopPropagation(); window.open('${app.url}', '_blank')">
        Open App ↗
      </button>
    </div>
  `;

  // Parallax tilt on hover
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${cx * 10}deg) rotateX(${-cy * 8}deg) scale(1.03)`;
    card.querySelector('.card-glow').style.background =
      `radial-gradient(circle at ${(cx + 0.5) * 100}% ${(cy + 0.5) * 100}%, ${app.accent}44 0%, transparent 70%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.querySelector('.card-glow').style.background = '';
  });

  // Open cinematic overlay
  card.addEventListener('click', () => openOverlay(app));

  gallery.appendChild(card);
});

/* ─── Parallax on gallery ────────────────────────── */
document.addEventListener('mousemove', e => {
  const dx = (e.clientX / window.innerWidth - 0.5) * 18;
  const dy = (e.clientY / window.innerHeight - 0.5) * 10;
  gallery.style.transform = `translate(${dx}px, ${dy}px)`;
});

/* ─── Cinematic Overlay ──────────────────────────── */
const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlayContent');
const overlayClose = document.getElementById('overlayClose');

function openOverlay(app) {
  selectedApp = app;
  overlayContent.innerHTML = `
    <div class="detail" style="--accent:${app.accent}; --color:${app.color}">
      <div class="detail-bg" style="background: radial-gradient(ellipse 80% 60% at 30% 40%, ${app.color}44, transparent 70%)"></div>
      <span class="detail-emoji">${app.emoji}</span>
      <p class="detail-eyebrow">${app.subtitle}</p>
      <h2 class="detail-title">${app.title}</h2>
      <p class="detail-desc">${app.description}</p>
      <div class="detail-tags">
        ${app.tags.map(t => `<span class="tag tag--lg">${t}</span>`).join('')}
      </div>
      <a href="${app.url}" target="_blank" rel="noopener" class="detail-cta">
        Open Application ↗
      </a>
    </div>
  `;
  overlay.classList.add('overlay--open');
  document.body.style.overflow = 'hidden';

  // Dim other cards
  document.querySelectorAll('.card').forEach(c => {
    if (c.dataset.id !== app.id) c.classList.add('card--dimmed');
  });
}

function closeOverlay() {
  overlay.classList.remove('overlay--open');
  document.body.style.overflow = '';
  document.querySelectorAll('.card').forEach(c => c.classList.remove('card--dimmed'));
  selectedApp = null;
}

overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });
