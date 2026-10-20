/**
 * Padma Teja - Portfolio Interactive Scripts
 * Styled in Purple & Modern Clean aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingRole();
  initProjectFilters();
  initMobileNav();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
 * 1. Theme Toggle
 * -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  // Default to light theme to match the user's reference screenshot
  const savedTheme = localStorage.getItem('teja_portfolio_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('teja_portfolio_theme', next);
    });
  }
}

/* --------------------------------------------------------------------------
 * 2. Typing Role Effect
 * -------------------------------------------------------------------------- */
function initTypingRole() {
  const typingEl = document.getElementById('typingRole');
  if (!typingEl) return;

  const roles = [
    'Vibe Coder & Builder',
    'Learning C Programming',
    'Rapid Web Prototyper',
    'CSE @ Vardhaman College'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const delSpeed = 45;
  const pause = 1600;

  function tick() {
    const current = roles[roleIdx];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? delSpeed : typeSpeed;

    if (!isDeleting && charIdx === current.length) {
      delay = pause;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 350;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* --------------------------------------------------------------------------
 * 3. Project Filter Tabs
 * -------------------------------------------------------------------------- */
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 4. Mobile Navigation
 * -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
 * 5. Smooth Scroll & Active Nav Spy
 * -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset;

    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) {
        l.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
 * 6. Copy Utility
 * -------------------------------------------------------------------------- */
window.copyContact = function(text, el) {
  navigator.clipboard.writeText(text).then(() => {
    const prev = el.textContent;
    el.textContent = '✓ Copied!';
    el.style.background = '#10b981';
    el.style.color = '#fff';

    setTimeout(() => {
      el.textContent = prev;
      el.style.background = '';
      el.style.color = '';
    }, 2000);
  });
};

/* --------------------------------------------------------------------------
 * 7. Contact Form Handler
 * -------------------------------------------------------------------------- */
window.handleContactSubmit = function(e) {
  e.preventDefault();

  const name = document.getElementById('cName').value;
  const email = document.getElementById('cEmail').value;
  const subject = document.getElementById('cSubject').value;
  const msg = document.getElementById('cMessage').value;
  const feedback = document.getElementById('contactFeedback');

  const mailto = `mailto:mukkarapadmateja28@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `From: ${name} (${email})\n\n${msg}`
  )}`;

  feedback.textContent = 'Opening your email client to send message...';
  window.location.href = mailto;

  setTimeout(() => {
    document.getElementById('portfolioContactForm').reset();
  }, 1000);
};
