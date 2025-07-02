// DEAM Store - API Functions
// Handles all API calls and data fetching

// ============= API FUNCTIONS =============

async function fetchProducts() {
    try {
        showLoading();
        const response = await fetch(CONFIG.API_URL);
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        products = await response.json();
        filteredProducts = [...products];
        renderProducts();
        populateHeroBackground();
        hideLoading();
    } catch (error) {
        console.error('Error fetching products:', error);
        showError();
    }
}

// ============= STORAGE FUNCTIONS =============

function saveCartToStorage() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            cart = [];
        }
    }
}

function saveWishToStorage() {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(wish));
}

function loadWishFromStorage() {
    const savedWish = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (savedWish) {
        try {
            wish = JSON.parse(savedWish);
            updateWishyUI();
        } catch (error) {
            console.error('Error loading favs from storage:', error);
            wish = [];
        }
    }
}

// ============= FILTER FUNCTIONS =============

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortBy = sortFilter.value;
    
    // Filter by search and category
    filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    // Sort products
    if (sortBy) {
        filteredProducts.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }
    
    renderProducts();
}

function filterByCategory(category) {
    categoryFilter.value = category;
    filterProducts();
    
    // Update active navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.category === category) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    document.getElementById('mobileMenu').classList.add('hidden');
}

console.log('DEAM Store API module loaded successfully!');