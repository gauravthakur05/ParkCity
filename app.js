// ============================================
// ParkCity — app.js
// Tab switching, search, booking actions
// ============================================

let currentTab = 'overview';

// ── Tab switching ─────────────────────────────
function switchTab(tab) {
  currentTab = tab;

  // Update nav links active state
  document.querySelectorAll('.nav-links span').forEach(el => el.classList.remove('active'));
  const navMap = { overview: 0, book: 1, passes: 2, mybookings: 3 };
  const navLinks = document.querySelectorAll('.nav-links span');
  if (navLinks[navMap[tab]]) navLinks[navMap[tab]].classList.add('active');

  // Update tab bar
  ['overview', 'book', 'passes', 'mybookings'].forEach(t => {
    document.getElementById('tab-' + t)?.classList.remove('active');
  });
  document.getElementById('tab-' + tab)?.classList.add('active');

  // Show/hide hero
  const hero = document.getElementById('hero-section');
  if (hero) hero.style.display = tab === 'overview' ? '' : 'none';

  // Render content
  const c = document.getElementById('main-content');
  if (!c) return;
  if (tab === 'overview')   c.innerHTML = renderOverview();
  if (tab === 'book')       c.innerHTML = renderBook();
  if (tab === 'passes')     c.innerHTML = renderPasses();
  if (tab === 'mybookings') c.innerHTML = renderMyBookings();
}

// ── Search ────────────────────────────────────
function doSearch() {
  const q = (document.getElementById('search-input')?.value || '').trim();
  if (currentTab !== 'overview') switchTab('overview');
  document.getElementById('main-content').innerHTML = renderOverview(q);
}

// ── Pre-fill zone in booking form ─────────────
function prefillBook(zoneName) {
  switchTab('book');
  setTimeout(() => {
    const sel = document.getElementById('book-zone');
    if (!sel) return;
    for (const opt of sel.options) {
      if (opt.value === zoneName) { sel.value = zoneName; break; }
    }
  }, 50);
}

// ── Confirm booking ───────────────────────────
function confirmBooking() {
  showToast('Spot reserved! Check your bookings.');
  setTimeout(() => switchTab('mybookings'), 1200);
}

// ── Toast notification ────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  switchTab('overview');

  document.getElementById('search-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });
});
