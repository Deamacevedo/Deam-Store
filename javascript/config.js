// DEAM Store - Configuration
// Global variables and configuration

// ============= GLOBAL VARIABLES =============
let products = [];
let cart = [];
let filteredProducts = [];
let isCheckoutModalOpen = false;
let wish = [];

// ============= DOM ELEMENTS =============
const productsGrid = document.getElementById('productsGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const noProductsMessage = document.getElementById('noProductsMessage');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItemsList');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const totalAmount = document.getElementById('totalAmount');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const wishSidebar = document.getElementById('wishSidebar');
const wishOverlay = document.getElementById('wishOverlay');
const wishCount = document.getElementById('wishCount');
const wishItems = document.getElementById('wishItemsList');
const emptyWishMessage = document.getElementById('emptyWishMessage');

// ============= CONFIGURATION =============
const CONFIG = {
    API_URL: 'https://fakestoreapi.com/products',
    STORAGE_KEY: 'deamStoreCart',
    FREE_SHIPPING_THRESHOLD: 100,
    SHIPPING_COST: 9.99,
    TAX_RATE: 0.19, // 19% IVA Colombia
    ANIMATION_DELAY: 250,
    NOTIFICATION_DURATION: 3000
};

console.log('DEAM Store Config loaded successfully!');