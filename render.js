// ============================================
// ParkCity — render.js
// HTML rendering functions for each tab
// ============================================

function getAvailClass(avail, total) {
  const pct = avail / total;
  if (avail === 0 || pct < 0.2) return "red";
  if (pct < 0.5) return "amber";
  return "green";
}

function getBadge(avail, total) {
  const pct = avail / total;
  if (avail === 0)  return '<span class="badge badge-red">Full</span>';
  if (pct < 0.2)    return '<span class="badge badge-amber">Limited</span>';
  return '<span class="badge badge-green">Available</span>';
}

function getStatusBadge(status) {
  if (status === "active")    return '<span class="badge badge-green">Active</span>';
  if (status === "upcoming")  return '<span class="badge badge-amber">Upcoming</span>';
  return '<span class="badge" style="background:var(--color-bg-secondary);color:var(--color-text-secondary);">Completed</span>';
}

// ── Overview tab ──────────────────────────────
function renderOverview(filter) {
  const list = filter
    ? zones.filter(z =>
        z.name.toLowerCase().includes(filter.toLowerCase()) ||
        z.type.toLowerCase().includes(filter.toLowerCase())
      )
    : zones;

  const totalSpots = zones.reduce((a, z) => a + z.total, 0);
  const freeSpots  = zones.reduce((a, z) => a + z.avail, 0);
  const fullZones  = zones.filter(z => z.avail === 0).length;
  const pct        = Math.round((freeSpots / totalSpots) * 100);

  const statsHtml = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total spots</div>
        <div class="stat-value">${totalSpots.toLocaleString()}</div>
        <div class="stat-sub">Across ${zones.length} zones</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Available now</div>
        <div class="stat-value green">${freeSpots}</div>
        <div class="stat-sub">${pct}% free</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Fully occupied</div>
        <div class="stat-value ${fullZones > 0 ? 'red' : 'green'}">${fullZones}</div>
        <div class="stat-sub">zone${fullZones !== 1 ? 's' : ''}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Live update</div>
        <div class="stat-value" style="font-size:13px;padding-top:4px;">
          <span class="live-dot"></span>Active
        </div>
        <div class="stat-sub">Refreshes every 30s</div>
      </div>
    </div>`;

  const zonesHtml = list.length === 0
    ? '<p style="color:var(--color-text-secondary);font-size:14px;">No zones match your search.</p>'
    : list.map(z => {
        const cls  = getAvailClass(z.avail, z.total);
        const pct  = Math.round((z.avail / z.total) * 100);
        return `
          <div class="zone-card">
            <div class="zone-header">
              <div>
                <div class="zone-name">${z.name}</div>
                <div class="zone-type">${z.type}</div>
              </div>
              ${getBadge(z.avail, z.total)}
            </div>
            <div class="avail-bar">
              <div class="avail-fill ${cls}" style="width:${pct}%"></div>
            </div>
            <div class="zone-meta">${z.avail} of ${z.total} spots free &middot; ${z.rate}</div>
            <button class="book-btn" onclick="prefillBook('${z.name}')">Reserve a spot →</button>
          </div>`;
      }).join('');

  return `
    ${statsHtml}
    <div class="section-title">${filter ? `Results for "${filter}"` : 'All parking zones'}</div>
    <div class="zones-grid">${zonesHtml}</div>`;
}

// ── Book tab ──────────────────────────────────
function renderBook() {
  const zoneOptions = zones
    .filter(z => z.avail > 0)
    .map(z => `<option value="${z.name}">${z.name} (${z.avail} free)</option>`)
    .join('');

  return `
    <div class="panel-grid">
      <div class="panel">
        <h3>Reserve a parking spot</h3>
        <div class="booking-form">
          <label>Zone</label>
          <select id="book-zone">${zoneOptions}</select>

          <label>Vehicle number</label>
          <input type="text" placeholder="e.g. PB10-AB-1234" />

          <div class="form-row">
            <div>
              <label>Date</label>
              <input type="date" />
            </div>
            <div>
              <label>Start time</label>
              <input type="time" value="10:00" />
            </div>
          </div>

          <div class="form-row">
            <div>
              <label>Duration</label>
              <select>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
                <option>All day</option>
              </select>
            </div>
            <div>
              <label>Vehicle type</label>
              <select>
                <option>Car</option>
                <option>Motorcycle</option>
                <option>SUV / Van</option>
              </select>
            </div>
          </div>

          <button class="submit-btn" onclick="confirmBooking()">Confirm reservation</button>
        </div>
      </div>

      <div class="panel">
        <h3>Booking summary</h3>
        <div style="font-size:13px;color:var(--color-text-secondary);line-height:2;">
          <div style="display:flex;justify-content:space-between;">
            <span>Zone</span>
            <span id="sum-zone" style="color:var(--color-text-primary);font-weight:500;">—</span>
          </div>
          <div style="border-bottom:0.5px solid var(--color-border);margin:8px 0;"></div>
          <div style="display:flex;justify-content:space-between;">
            <span>Date</span><span style="color:var(--color-text-primary);">—</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span>Duration</span><span style="color:var(--color-text-primary);">1 hour</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span>Rate</span><span style="color:var(--color-text-primary);">₹20/hr</span>
          </div>
          <div style="border-bottom:0.5px solid var(--color-border);margin:8px 0;"></div>
          <div style="display:flex;justify-content:space-between;font-weight:500;color:var(--color-text-primary);">
            <span>Estimated total</span><span>₹20</span>
          </div>
        </div>
        <div style="margin-top:24px;padding:12px;background:var(--color-bg-secondary);border-radius:var(--radius-md);">
          <div style="font-size:12px;font-weight:500;margin-bottom:4px;">Cancellation policy</div>
          <div style="font-size:12px;color:var(--color-text-secondary);line-height:1.6;">
            Free cancellation up to 30 minutes before your booking start time.
          </div>
        </div>
      </div>
    </div>`;
}

// ── Passes tab ────────────────────────────────
function renderPasses() {
  const passesHtml = passes.map(p => `
    <div class="pass-item">
      <div>
        <div class="pass-name">${p.name}</div>
        <div class="pass-desc">${p.desc}</div>
        <button class="pass-buy" onclick="showToast('Redirecting to checkout...')">Get pass</button>
      </div>
      <div class="pass-price">${p.price}<span>${p.per}</span></div>
    </div>`).join('');

  return `
    <div class="section-title">Monthly &amp; recurring passes</div>
    <div class="pass-list">${passesHtml}</div>
    <div style="margin-top:20px;padding:14px;background:var(--color-bg-secondary);border-radius:var(--radius-md);">
      <div style="font-size:13px;font-weight:500;margin-bottom:4px;">Corporate &amp; fleet plans</div>
      <div style="font-size:13px;color:var(--color-text-secondary);">
        Need passes for your team or fleet? Contact us for custom pricing.
      </div>
    </div>`;
}

// ── My Bookings tab ───────────────────────────
function renderMyBookings() {
  const icon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="5" width="14" height="8" rx="2" stroke="#0F6E56" stroke-width="1.2"/>
      <path d="M4 5V4a4 4 0 0 1 8 0v1" stroke="#0F6E56" stroke-width="1.2"/>
      <circle cx="8" cy="9.5" r="1.5" fill="#0F6E56"/>
    </svg>`;

  const rows = myBookings.map(b => `
    <div class="booking-row">
      <div class="booking-icon">${icon}</div>
      <div class="booking-info">
        <div class="booking-title">${b.zone} &mdash; Spot ${b.spot}</div>
        <div class="booking-detail">${b.date}</div>
      </div>
      <div>${getStatusBadge(b.status)}</div>
    </div>`).join('');

  return `
    <div class="section-title">Your bookings</div>
    <div class="my-bookings">${rows}</div>
    <div style="margin-top:16px;">
      <button
        style="background:transparent;border:0.5px solid var(--color-border-md);border-radius:var(--radius-md);padding:9px 18px;font-size:13px;color:var(--color-text-primary);cursor:pointer;"
        onclick="switchTab('book')">
        + New booking
      </button>
    </div>`;
}
