// ---- Fictional product data ----
  const products = [
    { id: 1, name: "Monstera Deliciosa", category: "Foliage", price: 1499, rating: 4.8, emoji: "🌿" },
    { id: 2, name: "Golden Pothos", category: "Foliage", price: 599, rating: 4.6, emoji: "🍃" },
    { id: 3, name: "Echeveria Elegans", category: "Succulent", price: 349, rating: 4.5, emoji: "🌵" },
    { id: 4, name: "Zebra Haworthia", category: "Succulent", price: 299, rating: 4.3, emoji: "🪴" },
    { id: 5, name: "Peace Lily", category: "Flowering", price: 899, rating: 4.7, emoji: "🌸" },
    { id: 6, name: "African Violet", category: "Flowering", price: 449, rating: 4.2, emoji: "🌺" },
    { id: 7, name: "Terracotta Planter — 8in", category: "Planter", price: 549, rating: 4.4, emoji: "🏺" },
    { id: 8, name: "Ceramic Planter — Matte White", category: "Planter", price: 799, rating: 4.6, emoji: "🏺" },
    { id: 9, name: "Snake Plant", category: "Foliage", price: 699, rating: 4.9, emoji: "🌱" },
    { id: 10, name: "Jade Plant", category: "Succulent", price: 399, rating: 4.5, emoji: "🌵" },
    { id: 11, name: "Anthurium Red", category: "Flowering", price: 1199, rating: 4.4, emoji: "🌷" },
    { id: 12, name: "Fiber Clay Planter — Charcoal", category: "Planter", price: 999, rating: 4.7, emoji: "🏺" },
  ];

  const grid = document.getElementById('productGrid');
  const resultsCount = document.getElementById('resultsCount');
  const catFilters = document.querySelectorAll('.cat-filter');
  const priceRange = document.getElementById('priceRange');
  const priceOutput = document.getElementById('priceOutput');
  const sortSelect = document.getElementById('sortSelect');
  const resetBtn = document.getElementById('resetBtn');

  function getActiveCategories(){
    return Array.from(catFilters).filter(cb => cb.checked).map(cb => cb.value);
  }

  function applyFiltersAndSort(){
    const activeCats = getActiveCategories();
    const maxPrice = Number(priceRange.value);

    let result = products.filter(p =>
      activeCats.includes(p.category) && p.price <= maxPrice
    );

    switch(sortSelect.value){
      case 'price-asc': result.sort((a,b) => a.price - b.price); break;
      case 'price-desc': result.sort((a,b) => b.price - a.price); break;
      case 'rating-desc': result.sort((a,b) => b.rating - a.rating); break;
      case 'name-asc': result.sort((a,b) => a.name.localeCompare(b.name)); break;
      default: break; // "Featured" keeps original order
    }

    render(result);
  }

  function render(list){
    grid.innerHTML = '';
    resultsCount.textContent = `${list.length} plant${list.length === 1 ? '' : 's'} found`;

    if(list.length === 0){
      grid.innerHTML = `<div class="empty">No products match these filters. Try widening your price range or selecting another category.</div>`;
      return;
    }

    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product';
      card.innerHTML = `
        <div class="product-image">${p.emoji}</div>
        <div class="product-body">
          <div class="product-category">${p.category}</div>
          <h3>${p.name}</h3>
          <div class="product-rating">★ ${p.rating.toFixed(1)}</div>
          <div class="product-footer">
            <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
            <button class="add-btn">Add</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // ---- Event wiring ----
  catFilters.forEach(cb => cb.addEventListener('change', applyFiltersAndSort));
  priceRange.addEventListener('input', () => {
    priceOutput.textContent = `₹${priceRange.value}`;
    applyFiltersAndSort();
  });
  sortSelect.addEventListener('change', applyFiltersAndSort);
  resetBtn.addEventListener('click', () => {
    catFilters.forEach(cb => cb.checked = true);
    priceRange.value = 3000;
    priceOutput.textContent = '₹3000';
    sortSelect.value = 'default';
    applyFiltersAndSort();
  });

  applyFiltersAndSort();
