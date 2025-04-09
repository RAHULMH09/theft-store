const products = [
  { id: 1, title: 'Wireless Earbuds', category: 'Tech Gadgets', price: 1299, size: 'One Size' },
  { id: 2, title: 'Unisex T-Shirt', category: 'Unisex Shirts', price: 799, size: 'M' },
  { id: 3, title: 'Smart Fitness Band', category: 'Fitness Products', price: 1499, size: 'Adjustable' },
  { id: 4, title: 'LED Ring Light', category: 'Tech Gadgets', price: 499, size: 'Standard' },
];

function createProductCard(product) {
  return \`
    <div class="rounded-2xl shadow-md p-4 bg-white">
      <img src="https://via.placeholder.com/200x200?text=\${product.title}" class="w-full h-48 object-cover rounded-lg mb-3" />
      <h3 class="text-xl font-semibold">\${product.title}</h3>
      <p class="text-sm text-gray-500">\${product.category}</p>
      <p class="text-blue-600 font-bold mb-2">₹\${product.price}</p>
      <button class="w-full bg-blue-500 text-white py-2 rounded-xl">Buy Now</button>
    </div>
  \`;
}

function filterProducts(filters) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  const filtered = products.filter(p =>
    (!filters.category || p.category === filters.category) &&
    (!filters.price || p.price <= filters.price) &&
    (!filters.size || p.size === filters.size)
  );
  filtered.forEach(p => {
    grid.innerHTML += createProductCard(p);
  });
}

function initFilters() {
  const filtersDiv = document.getElementById('filters');
  filtersDiv.innerHTML = \`
    <select id="category" class="p-2 border rounded"><option value="">Category</option><option>Tech Gadgets</option><option>Unisex Shirts</option><option>Fitness Products</option></select>
    <select id="price" class="p-2 border rounded"><option value="">Max Price</option><option value="500">₹500</option><option value="1000">₹1000</option><option value="1500">₹1500</option></select>
    <select id="size" class="p-2 border rounded"><option value="">Size</option><option>One Size</option><option>M</option><option>Adjustable</option><option>Standard</option></select>
    <button onclick="applyFilters()" class="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
  \`;
}

function applyFilters() {
  const category = document.getElementById('category').value;
  const price = parseInt(document.getElementById('price').value) || null;
  const size = document.getElementById('size').value;
  filterProducts({ category, price, size });
}

let popupShown = false;
window.addEventListener('mouseleave', (e) => {
  if (!popupShown) {
    document.getElementById('exit-popup').classList.remove('hidden');
    popupShown = true;
  }
});

function closePopup() {
  document.getElementById('exit-popup').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  filterProducts({});
});