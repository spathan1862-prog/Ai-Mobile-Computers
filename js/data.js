/* ============================================
   AI Mobile & Computers — Static Fallback Data
   Used when Google Sheets fetch fails
   ============================================ */

const FALLBACK_PRODUCTS = [
  // === Mobile Accessories ===
  {
    name: "Fast Charging Type-C Cable",
    category: "Mobile",
    price: "₹199",
    details: "20W Fast charging, 1m braided nylon cable. Compatible with all Type-C devices.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    status: "active"
  },
  {
    name: "iPhone 15 Silicone Case",
    category: "Mobile",
    price: "₹499",
    details: "Shockproof silicone case with microfiber lining. Available in multiple colors.",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop",
    status: "active"
  },
  {
    name: "Tempered Glass Screen Protector",
    category: "Mobile",
    price: "₹149",
    details: "9H Hardness, edge-to-edge coverage. Anti-fingerprint oleophobic coating.",
    image: "https://images.unsplash.com/photo-1600087626014-e652e18bbff2?w=600&h=600&fit=crop",
    status: "active"
  },

  // === Computer Accessories ===
  {
    name: "Wireless Optical Mouse",
    category: "Computer",
    price: "₹399",
    details: "2.4GHz wireless, ergonomic design. Up to 12 months battery life.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
    status: "active"
  },
  {
    name: "64GB USB 3.0 Pen Drive",
    category: "Computer",
    price: "₹349",
    details: "High-speed data transfer up to 150MB/s. Metal body, capless design.",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&h=600&fit=crop",
    status: "active"
  },
  {
    name: "Mechanical Gaming Keyboard",
    category: "Computer",
    price: "₹1,999",
    details: "RGB Backlit, Blue switches. Anti-ghosting, N-key rollover.",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop",
    status: "active"
  },

  // === CCTV Accessories ===
  {
    name: "CCTV Power Supply (SMPS)",
    category: "CCTV",
    price: "₹599",
    details: "4 Channel, 12V 5A output. Short-circuit and overload protection.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop",
    status: "active"
  },
  {
    name: "BNC Connectors Pack",
    category: "CCTV",
    price: "₹149",
    details: "Copper core BNC connectors, pack of 10. Gold-plated for signal integrity.",
    image: "https://images.unsplash.com/photo-1530124566582-a45a7e3e29f0?w=600&h=600&fit=crop",
    status: "active"
  },
  {
    name: "3+1 Coaxial Wire Bundle",
    category: "CCTV",
    price: "₹1,499",
    details: "90 meters, weatherproof with copper conductor. Suitable for indoor/outdoor.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=600&fit=crop",
    status: "active"
  }
];

// Export for use in products.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FALLBACK_PRODUCTS;
}
