/* ============================================
   Lifetime & A Day — Main Script
   ============================================ */

// Key dates
const FIRST_DATE = new Date('2022-07-10T00:00:00');
const WEDDING_DATE = new Date('2024-12-24T00:00:00');

// ─── FR-01: Live Counter ───────────────────────
function updateCounter() {
  const now = new Date();
  const diff = now - FIRST_DATE;

  const totalMinutes = Math.floor(diff / 60000);
  const totalHours = Math.floor(diff / 3600000);
  const totalDays = Math.floor(diff / 86400000);

  const el = (id) => document.getElementById(id);
  el('counter-days').textContent = totalDays.toLocaleString();
  el('counter-hours').textContent = totalHours.toLocaleString();
  el('counter-minutes').textContent = totalMinutes.toLocaleString();
}

// ─── FR-02: Chapter Badge & Background ─────────
function setChapterPhase() {
  const now = new Date();
  const isMarried = now >= WEDDING_DATE;
  const heroBg = document.getElementById('hero-bg');
  const badge = document.querySelector('#chapter-badge span');

  if (isMarried) {
    heroBg.className = 'absolute inset-0 transition-all duration-1000 phase-married';
    badge.className = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-gold-200 bg-gold-50 text-gold-600';
    badge.innerHTML = '&#128141; Chapter Two — Married';
  } else {
    heroBg.className = 'absolute inset-0 transition-all duration-1000 phase-dating';
    badge.className = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-blush-200 bg-blush-50 text-blush-500';
    badge.innerHTML = '&#10084; Chapter One — Dating';
  }
}

// ─── FR-03: Timeline Data & Rendering ──────────
const TIMELINE_EVENTS = [
  {
    date: 'July 10, 2022',
    title: 'The Beginning',
    description: 'The day our story started. A simple "Hello" that changed everything.',
    icon: '💫',
    isWedding: false,
  },
  {
    date: 'August 2022',
    title: 'First Date',
    description: 'Nervous hearts, shy smiles, and the start of something beautiful.',
    icon: '☕',
    isWedding: false,
  },
  {
    date: '2023',
    title: 'First Trip Together',
    description: 'Exploring new places hand in hand, creating memories along the way.',
    icon: '✈️',
    isWedding: false,
  },
  {
    date: 'Mid 2024',
    title: 'The Proposal',
    description: '"Will you marry me?" — The best question ever asked.',
    icon: '💍',
    isWedding: false,
  },
  {
    date: 'Dec 24–25, 2024',
    title: '"I Do"',
    description: 'Two hearts, one promise. The beginning of forever.',
    icon: '💒',
    isWedding: true,
  },
  {
    date: 'Today & Beyond',
    title: 'Our Lifetime',
    description: 'Every new day is a new page in our love story.',
    icon: '♾️',
    isWedding: false,
  },
];

function renderTimeline() {
  const container = document.getElementById('timeline-events');
  container.innerHTML = TIMELINE_EVENTS.map((event, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const dotClass = event.isWedding ? 'timeline-dot wedding' : 'timeline-dot';
    const cardClass = event.isWedding ? 'timeline-card wedding-card' : 'timeline-card';

    return `
      <div class="timeline-event ${side} fade-in-up">
        <div class="${dotClass}"></div>
        <div class="${cardClass}">
          <div class="text-2xl mb-2">${event.icon}</div>
          <time class="text-xs uppercase tracking-wider text-stone-400 font-medium">${event.date}</time>
          <h3 class="font-serif text-lg font-bold text-stone-800 mt-1">${event.title}</h3>
          <p class="text-sm text-stone-500 mt-1 leading-relaxed">${event.description}</p>
        </div>
      </div>
    `;
  }).join('');
}

// ─── FR-04: Secret Love Note ───────────────────
function initLoveNote() {
  const envelope = document.getElementById('envelope');
  const noteContent = document.getElementById('note-content');

  function reveal() {
    envelope.classList.add('opened');
    setTimeout(() => {
      noteContent.style.opacity = '1';
      noteContent.style.transform = 'translateY(0)';
      noteContent.style.pointerEvents = 'auto';
    }, 500);
  }

  envelope.addEventListener('click', reveal);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      reveal();
    }
  });
}

// ─── FR-05: Music Player ───────────────────────
function initMusic() {
  const btn = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  const iconPlay = document.getElementById('music-icon-play');
  const iconPause = document.getElementById('music-icon-pause');
  const pulse = document.getElementById('music-pulse');

  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
      btn.classList.remove('playing');
      pulse.style.opacity = '0';
    } else {
      audio.play().catch(() => {
        // Browser blocked autoplay — user needs to interact first
      });
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
      btn.classList.add('playing');
      pulse.style.opacity = '1';
    }
    isPlaying = !isPlaying;
  });
}

// ─── Floating Hearts ───────────────────────────
function spawnHeart() {
  const container = document.getElementById('hearts-container');
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.innerHTML = ['♥', '♡', '❤', '💕', '💗'][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (6 + Math.random() * 6) + 's';
  heart.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
  container.appendChild(heart);

  heart.addEventListener('animationend', () => heart.remove());
}

function startHearts() {
  // Spawn one immediately, then every 3-5 seconds
  spawnHeart();
  setInterval(() => spawnHeart(), 3000 + Math.random() * 2000);
}

// ─── Scroll Animations (IntersectionObserver) ──
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
}

// ─── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setChapterPhase();
  updateCounter();
  setInterval(updateCounter, 60000); // Update every minute

  renderTimeline();
  initLoveNote();
  initMusic();
  startHearts();

  // Small delay so elements are in DOM before observing
  requestAnimationFrame(() => {
    initScrollAnimations();
  });
});
