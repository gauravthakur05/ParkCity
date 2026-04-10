# ParkCity — Smart City Parking

A clean, responsive smart parking website for city / public parking.

## Features
- **Live availability** — real-time spot counts across 8 city zones
- **Online booking** — reserve a spot with zone, date, time, and duration
- **Monthly passes** — day / weekly / monthly / annual pass tiers
- **My bookings** — view active, upcoming, and past reservations

## Project structure

```
parkcity/
├── index.html          # Main entry point
├── css/
│   └── style.css       # All styles (light + dark mode)
├── js/
│   ├── data.js         # Static data: zones, passes, bookings
│   ├── render.js       # HTML rendering functions per tab
│   └── app.js          # Tab switching, search, booking logic
└── README.md
```

## Getting started

Just open `index.html` in any modern browser — no build step or server required.

```bash
open index.html
# or
python3 -m http.server 8080   # then visit http://localhost:8080
```

## Customisation

- **Add / edit zones** → `js/data.js` → `zones` array
- **Change pass prices** → `js/data.js` → `passes` array
- **Brand colours** → `css/style.css` → `:root` CSS variables
- **Add real API calls** → replace the static arrays in `data.js` with `fetch()` calls to your backend

## Tech stack
Plain HTML + CSS + vanilla JS. No frameworks, no dependencies, no build tools.
