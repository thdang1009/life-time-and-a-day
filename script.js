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
    "date": "April 2022",
    "title": "The First Encounter",
    "description": "Gặp Hồng Huế. Phát triển khía cạnh tình cảm cùng người vô cùng phù hợp. Cuối tháng bắt đầu gọi ai đó là \"Pé\".",
    "icon": "👀",
    "isWedding": false
  },
  {
    "date": "May 2022",
    "title": "Getting Closer",
    "description": "Cùng nhau đi siêu thị và bắt đầu những buổi đi chơi.",
    "icon": "🛒",
    "isWedding": false
  },
  {
    "date": "June 2022",
    "title": "Courtship",
    "description": "Mua hoa và tặng sách cho người ấy.",
    "icon": "🌹",
    "isWedding": false
  },
  {
    "date": "July 10, 2022",
    "title": "The Beginning",
    "description": "Định chạy bộ nhưng quay xe đi Rooftop. Tỏ tình. Có người yêu. Đi xem Conan cùng nhau.",
    "icon": "👩‍❤️‍👨",
    "isWedding": false
  },
  {
    "date": "August 2022",
    "title": "1st Month Anniversary",
    "description": "Đi Baozi ăn mừng kỷ niệm tình yêu 1 tháng.",
    "icon": "🥟",
    "isWedding": false
  },
  {
    "date": "September 2022",
    "title": "Deep Connection",
    "description": "Nhận ra gặp đúng người thì có thể kể rất nhiều chuyện sâu thẳm. Chăm sóc nhau khi bệnh.",
    "icon": "🗣️",
    "isWedding": false
  },
  {
    "date": "November 2022",
    "title": "Simple Joys",
    "description": "Chở người yêu qua Bình Thạnh may áo dài. Đi hội sách ở Công viên Văn Lang.",
    "icon": "👗",
    "isWedding": false
  },
  {
    "date": "December 2022",
    "title": "Homecoming & Gaming",
    "description": "Về quê có bạn đồng hành. Dẫn người yêu đi chơi net.",
    "icon": "🚌",
    "isWedding": false
  },
  {
    "date": "January 2023",
    "title": "Tet Holiday",
    "description": "Đi du lịch chung, đưa người yêu về quê và về quê người yêu. Chụp hình ở bảo tàng áo dài.",
    "icon": "🏮",
    "isWedding": false
  },
  {
    "date": "February 2023",
    "title": "Valentine's Day",
    "description": "Nhận và tặng KIT quà Valentine siêu xinh xịn.",
    "icon": "🍫",
    "isWedding": false
  },
  {
    "date": "March 2023",
    "title": "Care & Gifts",
    "description": "Chở người yêu đi mua len. Tặng quần áo cho người yêu.",
    "icon": "🧶",
    "isWedding": false
  },
  {
    "date": "April 2023",
    "title": "1 Year Milestone",
    "description": "Mừng sinh nhật người yêu hoành tráng. Mua thú bông thỏ cà rốt. Kỷ niệm 1 năm bên nhau.",
    "icon": "🎂",
    "isWedding": false
  },
  {
    "date": "May 2023",
    "title": "Graduation",
    "description": "Đi lễ tốt nghiệp người yêu và ăn Haidilao.",
    "icon": "🎓",
    "isWedding": false
  },
  {
    "date": "July 2023",
    "title": "Central Vietnam Trip",
    "description": "Đi Huế - Đà Nẵng - Hội An cùng nhau tầm 1 tuần.",
    "icon": "✈️",
    "isWedding": false
  },
  {
    "date": "September 2023",
    "title": "Birthday Dinner",
    "description": "Đi ăn Topping Beef The Villa để mừng sinh nhật.",
    "icon": "🥩",
    "isWedding": false
  },
  {
    "date": "November 2023",
    "title": "Understanding",
    "description": "Trục trặc tình cảm nhưng sau đó cả hai càng hiểu và chấp nhận nhau nhiều hơn.",
    "icon": "🤝",
    "isWedding": false
  },
  {
    "date": "December 2023",
    "title": "The Proposal",
    "description": "Cầu hôn.",
    "icon": "💍",
    "isWedding": false
  },
  {
    "date": "January 2024",
    "title": "Wedding Goals",
    "description": "Lập mục tiêu đi du lịch và tổ chức đám cưới cuối năm. Food tour cùng người yêu.",
    "icon": "📝",
    "isWedding": false
  },
  {
    "date": "February 2024",
    "title": "Love & Fish",
    "description": "14/2 đầy ắp quà và tình yêu. Setup hồ cá cùng nhau.",
    "icon": "🐟",
    "isWedding": false
  },
  {
    "date": "April 2024",
    "title": "Birthday Celebration",
    "description": "Mừng sinh nhật cùng em iu.",
    "icon": "🎉",
    "isWedding": false
  },
  {
    "date": "June 2024",
    "title": "Proposal & Planning",
    "description": "Cầu hôn (lần 2/chính thức). Bắt đầu chuẩn bị giấy tờ.",
    "icon": "💍",
    "isWedding": false
  },
  {
    "date": "July 2024",
    "title": "Engagement Steps",
    "description": "Bê tráp. Kỷ niệm 2 năm hẹn hò. Mua nhẫn và tặng quà nhỏ cho người yêu.",
    "icon": "🎁",
    "isWedding": false
  },
  {
    "date": "October 2024",
    "title": "Wedding Photos",
    "description": "Chụp ảnh cưới.",
    "icon": "📸",
    "isWedding": false
  },
  {
    "date": "December 2024",
    "title": "The Wedding",
    "description": "Phát thiệp cưới. Đón vợ về nhà. Honey moon.",
    "icon": "💒",
    "isWedding": true
  },
  {
    "date": "January 2025",
    "title": "Newlyweds",
    "description": "Cùng vợ iu đi ăn Tacos. Nấu ăn tại nhà rất nhiều.",
    "icon": "🌮",
    "isWedding": false
  },
  {
    "date": "February 2025",
    "title": "Valentine's Chef",
    "description": "Nấu Bít tết tại nhà cho vợ iu và tặng quà Valentine.",
    "icon": "🍽️",
    "isWedding": false
  },
  {
    "date": "March 2025",
    "title": "Travel & Gaming",
    "description": "Cùng vợ iu chơi Stardew Valley. Tặng máy đánh bọt sữa. Đi Quy Nhơn cùng nhau.",
    "icon": "🎮",
    "isWedding": false
  },
  {
    "date": "April 2025",
    "title": "Simple Dates",
    "description": "Đi hội chợ, thắng được 2 cái chén và tô tượng rất vui cùng.",
    "icon": "🎨",
    "isWedding": false
  },
  {
    "date": "May 2025",
    "title": "Vung Tau Trip",
    "description": "Đi bắt chò và đi Vũng Tàu cùng vợ iu.",
    "icon": "🌊",
    "isWedding": false
  },
  {
    "date": "June 2025",
    "title": "Wife's Cooking",
    "description": "Vợ mua cá đầy tủ lạnh. Vợ iu làm mì tương đen ngon lắm.",
    "icon": "🍜",
    "isWedding": false
  },
  {
    "date": "July 2025",
    "title": "Master Chef Wife",
    "description": "Vợ iu làm gỏi cá phi lê, chả cá lã vọng và bao tử cá ba sa.",
    "icon": "👩‍🍳",
    "isWedding": false
  },
  {
    "date": "August 2025",
    "title": "Small Gifts",
    "description": "Mua chuột hồng cho vợ iu.",
    "icon": "🖱️",
    "isWedding": false
  },
  {
    "date": "September 2025",
    "title": "Her Birthday",
    "description": "Chơi ARK ASA cùng nhau. Đi xem mưa đỏ. Sinh nhật đáng nhớ cùng vợ iu.",
    "icon": "🎂",
    "isWedding": false
  },
  {
    "date": "December 2025",
    "title": "1st Wedding Anniversary",
    "description": "Cùng tái hiện cơm chiên mắm ruốc Thái Lan. Kỷ niệm 1 năm ngày cưới cùng vợ iu.",
    "icon": "🥂",
    "isWedding": false
  }
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
