// ============================================
// ParkCity — data.js
// All static data for the app
// ============================================

const zones = [
  { id: 1, name: "Civil Lines",    type: "Street parking",   total: 80,  avail: 52,  rate: "₹20/hr" },
  { id: 2, name: "Sadar Bazaar",   type: "Market zone",      total: 120, avail: 14,  rate: "₹15/hr" },
  { id: 3, name: "Rose Garden",    type: "Public lot",       total: 200, avail: 136, rate: "₹10/hr" },
  { id: 4, name: "Bus Stand Area", type: "Multi-level",      total: 300, avail: 8,   rate: "₹25/hr" },
  { id: 5, name: "Model Town",     type: "Residential zone", total: 60,  avail: 41,  rate: "₹10/hr" },
  { id: 6, name: "Clock Tower",    type: "Street parking",   total: 40,  avail: 0,   rate: "₹20/hr" },
  { id: 7, name: "PAU Campus",     type: "Campus lot",       total: 250, avail: 180, rate: "₹5/hr"  },
  { id: 8, name: "Ferozepur Rd",   type: "Highway belt",     total: 90,  avail: 55,  rate: "₹15/hr" },
];

const passes = [
  { name: "Day pass",                   desc: "Valid for one full calendar day, any zone",         price: "₹120",    per: "/day"   },
  { name: "Weekly pass",                desc: "7 consecutive days, all public zones",              price: "₹650",    per: "/week"  },
  { name: "Monthly pass — standard",    desc: "30 days, standard zones only",                     price: "₹1,800",  per: "/month" },
  { name: "Monthly pass — premium",     desc: "30 days, all zones including multi-level",         price: "₹2,800",  per: "/month" },
  { name: "Annual pass",                desc: "365 days, all zones, priority booking",            price: "₹24,000", per: "/year"  },
];

const myBookings = [
  { zone: "Rose Garden", spot: "B-14", date: "Today, 3:00 PM – 5:00 PM",        status: "active"    },
  { zone: "Civil Lines", spot: "A-07", date: "Apr 12, 10:00 AM – 12:00 PM",     status: "upcoming"  },
  { zone: "Model Town",  spot: "C-22", date: "Apr 8,  9:00 AM – 11:00 AM",      status: "completed" },
];
