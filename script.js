// Simple countdown script
(function () {
  const el = document.getElementById('countdown');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const doneEl = document.getElementById('done');
  const subtitle = document.getElementById('subtitle');

  // Read date from URL ?date=YYYY-MM-DDTHH:MM or from data-target attribute
  const params = new URLSearchParams(location.search);
  const urlDate = params.get('date');
  const dataDate = el.dataset.target;
  const target = parseDate(urlDate || dataDate);

  if (!target || isNaN(target.getTime())) {
    subtitle.textContent = 'Invalid or missing date — edit index.html data-target or add ?date=YYYY-MM-DDTHH:MM';
    return;
  }

  // show friendly target
  subtitle.textContent = `Target: ${target.toLocaleString()}`;

  function update() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      finish();
      return clearInterval(timer);
    }

    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / (3600 * 24));
    const hours = Math.floor((s % (3600 * 24)) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  const timer = setInterval(update, 1000);
  update();

  // Buttons
  document.getElementById('editBtn').addEventListener('click', () => {
    const input = prompt('Enter a date/time (YYYY-MM-DDTHH:MM) or just YYYY-MM-DD');
    if (!input) return;
    const d = parseDate(input);
    if (!d || isNaN(d.getTime())) return alert('Invalid date format.');
    // Update URL so it can be shared and update live display
    const u = new URL(location);
    u.searchParams.set('date', input);
    history.replaceState(null, '', u);
    location.reload();
  });

  document.getElementById('shareBtn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      alert('Link copied! Share it with your loved one ❤️');
    } catch {
      prompt('Copy this link', location.href);
    }
  });

  function finish() {
    doneEl.classList.remove('hidden');
    confettiBurst();
  }

  // Helpers
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function parseDate(s) {
    if (!s) return null;
    // Accept YYYY-MM-DD or YYYY-MM-DDTHH:MM[:SS]
    // If time omitted, set to 20:00 local time by default (evening)
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      return new Date(s + 'T20:00:00');
    }
    try {
      return new Date(s);
    } catch {
      return null;
    }
  }

  // Minimal confetti: create lots of small colored divs and animate with requestAnimationFrame
  function confettiBurst() {
    const colors = ['#ff6b6b', '#ffd93d', '#6ee7b7', '#66b3ff', '#c18cff', '#ff9fb1'];
    const root = document.getElementById('confetti-root');
    const count = 80;
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const node = document.createElement('div');
      node.className = 'confetti';
      node.style.background = colors[Math.floor(Math.random() * colors.length)];
      node.style.left = Math.random() * w + 'px';
      node.style.top = '-10px';
      node.style.width = 6 + Math.random() * 12 + 'px';
      node.style.height = 6 + Math.random() * 12 + 'px';
      const rot = Math.random() * 360;
      node.style.transform = `translateY(0) rotate(${rot}deg)`;
      root.appendChild(node);

      // animation parameters
      const duration = 2500 + Math.random() * 2000;
      const sway = 80 + Math.random() * 120;
      const rotateSpeed = (Math.random() * 6 - 3);
      const startLeft = parseFloat(node.style.left);
      const horizontalDir = Math.random() < 0.5 ? -1 : 1;
      const startTime = performance.now() + Math.random() * 300;

      (function animateConfetti(elm, startTime) {
        function step(now) {
          const t = Math.min(1, (now - startTime) / duration);
          if (t < 0) {
            requestAnimationFrame(step);
            return;
          }
          // vertical fall (ease)
          const y = easeOutQuad(t) * (h + 200);
          const x = startLeft + Math.sin(t * Math.PI * 2 * (1 + Math.random())) * sway * horizontalDir;
          const r = rot + rotateSpeed * t * 200;
          elm.style.transform = `translate(${x - startLeft}px, ${y}px) rotate(${r}deg)`;
          elm.style.opacity = String(1 - t);
          if (t < 1) requestAnimationFrame(step);
          else elm.remove();
        }
        requestAnimationFrame(step);
      })(node, startTime);
    }

    function easeOutQuad(t) { return t * (2 - t); }
  }
})();
