// DEAM Store - Cart Functions
// Handles all shopping cart functionality

// ============= CART FUNCTIONS =============

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showCartNotification('Producto agregado al carrito');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

function clearCart() {
    cart = [];
    updateCartUI();
    saveCartToStorage();
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartItems.classList.add('hidden');
        document.getElementById('cartTotal').classList.add('hidden');
    } else {
        emptyCartMessage.classList.add('hidden');
        cartItems.classList.remove('hidden');
        document.getElementById('cartTotal').classList.remove('hidden');
        
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain bg-white rounded p-2">
                <div class="flex-1 min-w-0">
                    <h4 class="font-medium truncate">${item.title}</h4>
                    <p class="text-dark-text-secondary text-sm">$${item.price}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                        </svg>
                    </button>
                    <span class="w-8 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </button>
                    <button onclick="removeFromCart(${item.id})" class="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center ml-2 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>y
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// ============= CART UI FUNCTIONS =============

function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

// ============= CART CALCULATIONS =============

function calculateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : CONFIG.SHIPPING_COST;
    const tax = subtotal * CONFIG.TAX_RATE;
    const total = subtotal + shipping + tax;
    
    return {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        shippingText: shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`
    };
}

console.log('DEAM Store Cart module loaded successfully!');