/* ============================================
   AI Mobile & Computers — Product Management
   Fetches from Google Sheets, renders cards,
   handles filtering and search.
   ============================================ */

const ProductManager = (() => {
  // ── Configuration ──
  // Replace this URL with your published Google Sheet CSV URL
  // Steps: Google Sheet → File → Share → Publish to web → CSV
  const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjtGt7IRbtMj48ilAqUMGcvGVSGisI142539yblXa26Fo8psxbfvlBvlZ8SIqoK2yZMtwHfwXg31Xh/pub?output=csv';

  const WHATSAPP_NUMBER = '919822338978';
  const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

  // ── State ──
  let allProducts = [];
  let currentFilter = 'All';
  let searchQuery = '';

  // ── DOM Elements ──
  const productsGrid = document.getElementById('products-grid');
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('product-search');
  const productsCount = document.getElementById('products-count');

  // ── Initialize ──
  async function init() {
    showSkeletons();
    await loadProducts();
    setupEventListeners();
  }

  // ── Load Products ──
  async function loadProducts() {
    try {
      if (SHEET_CSV_URL) {
        const response = await fetch(SHEET_CSV_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const csvText = await response.text();
        allProducts = parseCSV(csvText);
      } else {
        // Use fallback data if no Google Sheet URL is configured
        console.log('ℹ️ No Google Sheet URL configured. Using fallback data.');
        allProducts = FALLBACK_PRODUCTS;
      }
    } catch (error) {
      console.warn('⚠️ Could not fetch from Google Sheets. Using fallback data.', error);
      allProducts = FALLBACK_PRODUCTS;
    }

    // Filter out hidden products
    allProducts = allProducts.filter(p =>
      !p.status || p.status.toLowerCase() !== 'hidden'
    );

    renderProducts();
  }

  // ── Parse CSV using Papa Parse ──
  function parseCSV(csvText) {
    if (typeof Papa === 'undefined') {
      console.warn('Papa Parse not loaded. Using fallback data.');
      return FALLBACK_PRODUCTS;
    }

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, '')
    });

    return result.data.map(row => ({
      name: row['productname'] || row['name'] || '',
      category: row['category'] || '',
      price: row['price'] || '',
      details: row['details'] || row['description'] || '',
      image: row['imageurl'] || row['image'] || '',
      status: row['status'] || 'active'
    })).filter(p => p.name); // Filter out empty rows
  }

  // ── Render Products ──
  function renderProducts() {
    const filtered = getFilteredProducts();

    // Update count
    if (productsCount) {
      productsCount.innerHTML = `Showing <span>${filtered.length}</span> product${filtered.length !== 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try changing your filter or search query</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(product => createProductCard(product)).join('');

    // Lazy load images
    setupLazyLoading();
  }

  // ── Create Product Card HTML ──
  function createProductCard(product) {
    const categoryClass = getCategoryClass(product.category);
    const whatsappLink = generateWhatsAppLink(product);

    // Ensure price has ₹ symbol
    let priceDisplay = product.price;
    if (priceDisplay && !priceDisplay.includes('₹')) {
      priceDisplay = `₹${priceDisplay}`;
    }

    return `
      <div class="product-card fade-in visible" data-category="${product.category}">
        <div class="product-card-image-wrapper">
          <img
            data-src="${product.image}"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23111827'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%2364748B' font-family='sans-serif' font-size='14' text-anchor='middle' dy='.35em'%3ELoading...%3C/text%3E%3C/svg%3E"
            alt="${product.name}"
            loading="lazy"
          />
          <span class="product-card-badge ${categoryClass}">${product.category}</span>
        </div>
        <div class="product-card-body">
          <h3 class="product-card-name">${product.name}</h3>
          <p class="product-card-details">${product.details}</p>
          <div class="product-card-price">
            <span class="price-label">Price</span>
            ${priceDisplay || 'Contact for price'}
          </div>
          <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-inquire" id="inquire-${slugify(product.name)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    `;
  }

  // ── Helper functions ──
  function getCategoryClass(category) {
    const cat = category.toLowerCase();
    if (cat.includes('mobile')) return 'badge-mobile';
    if (cat.includes('computer')) return 'badge-computer';
    if (cat.includes('cctv')) return 'badge-cctv';
    return 'badge-mobile';
  }

  function generateWhatsAppLink(product) {
    const message = encodeURIComponent(
      `Hi, I'm interested in *${product.name}*${product.price ? ` (${product.price})` : ''}. Please share more details.`
    );
    return `${WHATSAPP_BASE_URL}?text=${message}`;
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function getFilteredProducts() {
    return allProducts.filter(product => {
      const matchesCategory = currentFilter === 'All' ||
        product.category.toLowerCase() === currentFilter.toLowerCase();

      const matchesSearch = !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }

  // ── Skeleton Loading ──
  function showSkeletons() {
    const skeletonCount = 6;
    productsGrid.innerHTML = Array(skeletonCount).fill('').map(() => `
      <div class="skeleton-card">
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton-body">
          <div class="skeleton skeleton-line short"></div>
          <div class="skeleton skeleton-line medium"></div>
          <div class="skeleton skeleton-line"></div>
          <div class="skeleton skeleton-btn"></div>
        </div>
      </div>
    `).join('');
  }

  // ── Lazy Loading ──
  function setupLazyLoading() {
    const images = productsGrid.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    images.forEach(img => observer.observe(img));
  }

  // ── Event Listeners ──
  function setupEventListeners() {
    // Category filter pills
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.dataset.category;
        renderProducts();
      });
    });

    // Search input
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          searchQuery = e.target.value.trim();
          renderProducts();
        }, 300);
      });
    }
  }

  // ── Public: Set filter from external (category cards) ──
  function setFilter(category) {
    currentFilter = category;
    filterPills.forEach(p => {
      p.classList.toggle('active', p.dataset.category === category);
    });
    renderProducts();

    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return { init, setFilter };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  ProductManager.init();
});
