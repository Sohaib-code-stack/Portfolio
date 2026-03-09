console.log('script loaded successfully');

/* ─── PAGE TRANSITION ─── */
const transition = document.getElementById('pageTransition');

function runExit(href) {
  if (!transition) { window.location.href = href; return; }
  transition.style.display = 'flex';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      transition.classList.add('is-entering');
      setTimeout(() => { window.location.href = href; }, 650);
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (!transition) return;
  transition.style.display = 'flex';
  transition.classList.add('is-entering');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      transition.classList.remove('is-entering');
      transition.classList.add('is-leaving');
      setTimeout(() => {
        transition.classList.remove('is-leaving');
        transition.style.display = 'none';
      }, 750);
    });
  });
});

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-transition]');
  if (!link) return;
  e.preventDefault();
  runExit(link.getAttribute('href'));
});

/* ─── PROJECT MODAL ─── */
const overlay = document.getElementById('projectModal');

function openModal(card) {
  if (!overlay) return;

  const title   = card.dataset.title   || '';
  const type    = card.dataset.type    || '';
  const desc    = card.dataset.desc    || '';
  const video   = card.dataset.video   || '';   // path to mp4 or youtube embed URL
  const github  = card.dataset.github  || '#';

  // populate
  overlay.querySelector('.modal-title').textContent = title;
  overlay.querySelector('.modal-type').textContent  = type;
  overlay.querySelector('.modal-desc').textContent  = desc;
  overlay.querySelector('.modal-github-btn').href   = github;

  // video
  const videoWrap = overlay.querySelector('.modal-video-wrap');
  videoWrap.innerHTML = '';

  if (video) {
    if (video.includes('youtube.com') || video.includes('youtu.be')) {
      // YouTube embed
      const iframe = document.createElement('iframe');
      iframe.src = video + '?autoplay=1&rel=0';
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;
      videoWrap.appendChild(iframe);
    } else {
      // Local video file
      const vid = document.createElement('video');
      vid.src = video;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      videoWrap.appendChild(vid);
    }
  } else {
    // Placeholder
    videoWrap.innerHTML = `
      <div class="modal-video-placeholder">
        <span>▶</span>
        Video coming soon
      </div>`;
  }

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';

  // Stop any playing video after transition
  setTimeout(() => {
    const videoWrap = overlay.querySelector('.modal-video-wrap');
    videoWrap.innerHTML = '';
  }, 350);
}

// Open on card click
document.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card.has-modal');
  if (card) { openModal(card); return; }

  // Close on overlay background click
  if (e.target === overlay) closeModal();

  // Close button
  if (e.target.closest('.modal-close')) closeModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.animationPlayState = 'running';
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
}

/* ─── CONTACT FORM ─── */
function handleSubmit(e) {
  const btn = e.target;
  btn.textContent = 'Message Sent \u2713';
  btn.style.background = '#27ae60';
  btn.style.borderColor = '#27ae60';
  btn.style.color = 'var(--paper)';
  setTimeout(() => {
    btn.textContent = 'Send Message \u2192';
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.color = '';
  }, 3000);
}
