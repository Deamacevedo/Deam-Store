// ============= WISHLIST BÁSICO - SOLO FAKESTORE =============

// Variable global simple
let wishlist = [];

// ============= FUNCIONES BÁSICAS =============

function addToWishlist(productId) {
    // Convertir a número
    const id = parseInt(productId);
    
    // Ver si ya existe
    if (wishlist.includes(id)) {
        alert('Ya está en favoritos');
        return;
    }
    
    // Agregar
    wishlist.push(id);
    updateWishlistUI();
    saveWishlist();
    alert('Agregado a favoritos');
}

function removeFromWishlist(productId) {
    const id = parseInt(productId);
    wishlist = wishlist.filter(item => item !== id);
    updateWishlistUI();
    saveWishlist();
    alert('Eliminado de favoritos');
}

function toggleWishlist(productId) {
    const id = parseInt(productId);
    if (wishlist.includes(id)) {
        removeFromWishlist(id);
    } else {
        addToWishlist(id);
    }
}

// ============= UI BÁSICA =============

function updateWishlistUI() {
    // Actualizar contador
    const count = document.getElementById('wishlistCount');
    if (count) count.textContent = wishlist.length;
    
    // Actualizar lista
    showWishlistProducts();
    
    // Actualizar botones de productos
    updateHeartButtons();
}

function updateHeartButtons() {
    // Actualizar todos los corazones
    products.forEach(product => {
        const button = document.querySelector(`[data-wishlist="${product.id}"]`);
        if (button) {
            if (wishlist.includes(product.id)) {
                button.innerHTML = '❤️'; // Corazón rojo
                button.style.color = '#ef4444';
            } else {
                button.innerHTML = '🤍'; // Corazón blanco
                button.style.color = '#666';
            }
        }
    });
}

function showWishlistProducts() {
    const container = document.getElementById('wishlistList');
    if (!container) return;
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p>No hay favoritos</p>';
        return;
    }
    
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));
    
    container.innerHTML = wishlistProducts.map(product => `
        <div style="border: 1px solid #333; padding: 10px; margin: 10px 0; border-radius: 8px;">
            <img src="${product.image}" style="width: 50px; height: 50px; object-fit: contain;">
            <h4>${product.title}</h4>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})" style="background: #007bff; color: white; padding: 5px 10px; border: none; border-radius: 4px; margin-right: 10px;">
                Agregar al Carrito
            </button>
            <button onclick="removeFromWishlist(${product.id})" style="background: #dc3545; color: white; padding: 5px 10px; border: none; border-radius: 4px;">
                Quitar
            </button>
        </div>
    `).join('');
}

// ============= STORAGE BÁSICO =============

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadWishlist() {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
        wishlist = JSON.parse(saved);
        updateWishlistUI();
    }
}

// ============= TOGGLE SIMPLE =============

function toggleWishlistView() {
    const view = document.getElementById('wishlistView');
    if (view.style.display === 'none') {
        view.style.display = 'block';
        showWishlistProducts();
    } else {
        view.style.display = 'none';
    }
}

// ============= INICIALIZAR =============

// Cargar al inicio
document.addEventListener('DOMContentLoaded', function() {
    loadWishlist();
});