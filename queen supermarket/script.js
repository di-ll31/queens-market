const isResultsPage = window.location.pathname.includes('results.html');

if (!isResultsPage) {
  // Homepage
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `results.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
} else {
  // Results page
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('search')?.toLowerCase() || '';
  document.getElementById('searchTerm').textContent = searchTerm;

  const products = [
    // Juices
    { id: 1, name: "Orange Juice (1L)", description: "100% pure squeezed orange juice, no added sugar.", image: "assets/shampoo1.jpg", rating: 4.5, priceHistory: [3.99, 3.79, 3.49], aisle: "Beverages" },
    { id: 2, name: "Mango Juice (1L)", description: "Sweet and refreshing mango juice, 1L carton.", image: "assets/shampoo2.jpg", rating: 4.6, priceHistory: [3.99, 3.79, 3.49], aisle: "Beverages" },
    { id: 3, name: "Pineapple Juice (1L)", description: "Tropical pineapple juice, 1L carton.", image: "assets/queens2.png", rating: 4.5, priceHistory: [3.99, 3.79, 3.49], aisle: "Beverages" },
    { id: 4, name: "Apple Juice (1L)", description: "Fresh apple juice, no preservatives.", image: "assets/shampoo1.jpg", rating: 4.4, priceHistory: [3.49, 3.29, 2.99], aisle: "Beverages" },
    { id: 5, name: "Guava Juice (1L)", description: "Exotic guava juice, rich in vitamin C.", image: "assets/shampoo2.jpg", rating: 4.3, priceHistory: [3.99, 3.79, 3.49], aisle: "Beverages" },
    // Rice
    { id: 6, name: "Long Grain Rice", description: "Premium quality long grain white rice, 2kg bag.", image: "assets/queens2.png", rating: 4.8, priceHistory: [7.99, 7.49, 6.99], aisle: "Pantry" },
    { id: 7, name: "Basmati Rice", description: "Aromatic basmati rice, perfect for pilaf.", image: "assets/shampoo1.jpg", rating: 4.7, priceHistory: [8.99, 8.49, 7.99], aisle: "Pantry" },
    { id: 8, name: "Jasmine Rice", description: "Fragrant jasmine rice, 1kg bag.", image: "assets/shampoo2.jpg", rating: 4.6, priceHistory: [6.99, 6.49, 5.99], aisle: "Pantry" },
    { id: 9, name: "Brown Rice", description: "Whole grain brown rice, high in fiber.", image: "assets/queens2.png", rating: 4.5, priceHistory: [7.49, 7.29, 6.99], aisle: "Pantry" },
    { id: 10, name: "Ethiopian Red Rice", description: "Traditional Ethiopian red rice, 1kg.", image: "assets/shampoo1.jpg", rating: 4.7, priceHistory: [8.49, 7.99, 7.49], aisle: "Pantry" },
    // Breads
    { id: 11, name: "Whole Wheat Bread", description: "Freshly baked whole wheat sandwich bread.", image: "assets/queens2.png", rating: 4.8, priceHistory: [2.99, 2.79, 2.49], aisle: "Bakery" },
    { id: 12, name: "Injera (Pack of 10)", description: "Traditional Ethiopian flatbread, fresh and soft.", image: "assets/shampoo1.jpg", rating: 4.9, priceHistory: [5.99, 5.49, 4.99], aisle: "Bakery" },
    { id: 13, name: "Sourdough Bread", description: "Artisan sourdough bread, tangy and chewy.", image: "assets/shampoo2.jpg", rating: 4.7, priceHistory: [4.99, 4.79, 4.49], aisle: "Bakery" },
    { id: 14, name: "Baguette", description: "Classic French baguette, crispy crust.", image: "assets/queens2.png", rating: 4.6, priceHistory: [2.49, 2.29, 1.99], aisle: "Bakery" },
    { id: 15, name: "Milk Bread", description: "Soft and fluffy milk bread loaf.", image: "assets/shampoo1.jpg", rating: 4.5, priceHistory: [3.49, 3.29, 2.99], aisle: "Bakery" },
    // Snacks
    { id: 16, name: "Potato Chips (Salted)", description: "Crispy, lightly salted potato chips, 150g bag.", image: "assets/shampoo2.jpg", rating: 4.2, priceHistory: [2.99, 2.79, 2.49], aisle: "Snacks" },
    { id: 17, name: "Kolo (Roasted Barley Snack)", description: "Crunchy Ethiopian roasted barley snack, 250g.", image: "assets/queens2.png", rating: 4.4, priceHistory: [2.99, 2.79, 2.49], aisle: "Snacks" },
    { id: 18, name: "Banana Chips", description: "Sweet and crispy banana chips.", image: "assets/shampoo1.jpg", rating: 4.3, priceHistory: [3.49, 3.29, 2.99], aisle: "Snacks" },
    { id: 19, name: "Popcorn", description: "Ready-to-eat, lightly salted popcorn.", image: "assets/shampoo2.jpg", rating: 4.5, priceHistory: [2.49, 2.29, 1.99], aisle: "Snacks" },
    { id: 20, name: "Peanut Snack", description: "Roasted peanuts, lightly salted.", image: "assets/queens2.png", rating: 4.6, priceHistory: [2.99, 2.79, 2.49], aisle: "Snacks" },
    // Dairy
    { id: 21, name: "Large Brown Eggs (12ct)", description: "Farm fresh, cage-free brown eggs.", image: "assets/shampoo1.jpg", rating: 4.9, priceHistory: [3.99, 3.79, 3.49], aisle: "Dairy" },
    { id: 22, name: "Cheddar Cheese Block", description: "Rich and creamy cheddar cheese, 200g.", image: "assets/shampoo2.jpg", rating: 4.7, priceHistory: [5.49, 5.29, 4.99], aisle: "Dairy" },
    { id: 23, name: "Whole Milk (1L)", description: "Rich and creamy whole milk.", image: "assets/queens2.png", rating: 4.8, priceHistory: [3.49, 3.29, 2.99], aisle: "Dairy" },
    { id: 24, name: "Greek Yogurt", description: "Thick and creamy Greek yogurt, plain.", image: "assets/shampoo1.jpg", rating: 4.6, priceHistory: [2.99, 2.79, 2.49], aisle: "Dairy" },
    { id: 25, name: "Ethiopian Cottage Cheese (Ayib)", description: "Traditional Ethiopian cottage cheese.", image: "assets/shampoo2.jpg", rating: 4.7, priceHistory: [4.99, 4.79, 4.49], aisle: "Dairy" },
    // Spices
    { id: 26, name: "Berbere Spice Mix", description: "Authentic Ethiopian berbere spice blend, 100g.", image: "assets/queens2.png", rating: 4.8, priceHistory: [3.99, 3.79, 3.49], aisle: "Spices" },
    { id: 27, name: "Mitmita Spice Mix", description: "Hot Ethiopian mitmita spice blend, 100g.", image: "assets/shampoo1.jpg", rating: 4.7, priceHistory: [3.99, 3.79, 3.49], aisle: "Spices" },
    { id: 28, name: "Awaze Paste", description: "Spicy Ethiopian awaze sauce, 200g jar.", image: "assets/shampoo2.jpg", rating: 4.7, priceHistory: [2.99, 2.79, 2.49], aisle: "Spices" },
    { id: 29, name: "Shiro Powder", description: "Ethiopian chickpea stew powder, 500g.", image: "assets/queens2.png", rating: 4.7, priceHistory: [4.99, 4.79, 4.49], aisle: "Spices" },
    { id: 30, name: "Turmeric Powder", description: "Bright yellow turmeric powder, 100g.", image: "assets/shampoo1.jpg", rating: 4.6, priceHistory: [2.99, 2.79, 2.49], aisle: "Spices" },
    // Personal Care
    { id: 31, name: "Silky Smooth Shampoo", description: "Leaves your hair silky and smooth.", image: "assets/shampoo1.jpg", rating: 4.5, priceHistory: [5.99, 5.79, 5.49], aisle: "Personal Care" },
    { id: 32, name: "Herbal Fresh Conditioner", description: "Nourishing conditioner for soft, healthy hair.", image: "assets/shampoo2.jpg", rating: 4.7, priceHistory: [6.99, 6.89, 6.79], aisle: "Personal Care" },
    { id: 33, name: "Daily Moisture Lotion", description: "Hydrating body lotion for all skin types.", image: "assets/bodywash1.jpg", rating: 4.6, priceHistory: [4.99, 4.79, 4.59], aisle: "Personal Care" },
    { id: 34, name: "Aloe Vera Gel", description: "Soothing aloe vera gel for skin care.", image: "assets/queens2.png", rating: 4.8, priceHistory: [3.99, 3.79, 3.49], aisle: "Personal Care" },
    { id: 35, name: "Shea Butter Cream", description: "Rich shea butter cream for dry skin.", image: "assets/shampoo1.jpg", rating: 4.7, priceHistory: [5.99, 5.79, 5.49], aisle: "Personal Care" }
  ];

  const productList = document.getElementById('productList');
  const results = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm)
  );

  // Helper for random stock status
  function getRandomStock() {
    const rand = Math.random();
    if (rand < 0.6) return { status: 'In stock', class: 'in-stock' };
    if (rand < 0.85) return { status: 'Likely out of stock', class: 'low-stock' };
    return { status: 'Out of stock', class: 'out-stock' };
  }

  if (results.length === 0) {
    productList.innerHTML = `<p>No products found for "${searchTerm}"</p>`;
  } else {
    productList.innerHTML = results.map(p => {
      const stock = getRandomStock();
      // Price: use the latest price in priceHistory
      const price = p.priceHistory[p.priceHistory.length - 1].toFixed(2);
      // Unit: try to extract from name or description, fallback to '1 ct'
      let unit = '1 ct';
      const match = p.name.match(/\(([^)]+)\)/);
      if (match) unit = match[1];
      else if (/kg|g|L|ml|bag|pack|jar|block|loaf|carton|dozen|ct/i.test(p.description)) {
        const found = p.description.match(/\d+\s?(kg|g|L|ml|bag|pack|jar|block|loaf|carton|dozen|ct)/i);
        if (found) unit = found[0];
      }
      return `
        <div class="product-carousel-card" onclick="openModal(${p.id})">
          <img src="${p.image}" alt="${p.name}">
          <h4>${p.name}</h4>
          <div class="price">$${price}</div>
          <div class="unit">${unit}</div>
          <div class="stock ${stock.class}">${stock.status}</div>
        </div>
      `;
    }).join('');
  }

  const modal = document.getElementById('productModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const modalStars = document.getElementById('modalStars');
  const modalPrice = document.getElementById('modalPrice');
  const modalAisle = document.getElementById('modalAisle');

  window.openModal = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    modalTitle.textContent = '';
    modalImage.src = '';
    modalImage.alt = '';
    // Two-column layout: image left (smaller), info right, map below info, with details and description
    modalDesc.innerHTML = `
      <div class="modal-popup-grid">
        <div class="modal-popup-image">
          <img src="${product.image}" alt="${product.name}" style="width: 140px; height: 140px; object-fit: cover; border-radius: 12px;" />
        </div>
        <div class="modal-popup-info">
          <h2>${product.name}</h2>
          <div class="modal-popup-price">$${product.priceHistory[product.priceHistory.length - 1]}</div>
          <div class="modal-popup-unit">1ct</div>
          <div class="modal-popup-stock ${getRandomStockClass()}">${getRandomStockText()}</div>
          <div class="modal-popup-details">
            <p class="modal-popup-desc">${product.description}</p>
            <p class="modal-popup-aisle"><strong>Aisle:</strong> ${product.aisle}</p>
            <p class="modal-popup-rating"><strong>Rating:</strong> ⭐ ${product.rating} / 5</p>
          </div>
          <div class="modal-popup-map">
            <img class="store-map" src="supermap.jpg" alt="Store Map" />
          </div>
        </div>
      </div>
    `;
    modal.style.display = 'flex';
  };

  window.closeModal = function () {
    modal.style.display = 'none';
  };

  // Helper functions for random stock status
  function getRandomStockClass() {
    const statuses = ['in-stock', 'low-stock', 'out-stock'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
  function getRandomStockText() {
    const texts = ['Many in stock', 'Likely out of stock', 'Out of stock', 'Low stock', 'In stock'];
    return texts[Math.floor(Math.random() * texts.length)];
  }
}
