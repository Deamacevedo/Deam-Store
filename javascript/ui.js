// DEAM Store - UI Functions
// Handles all UI rendering and visual feedback

// ============= UI STATE FUNCTIONS =============

function showLoading() {
    loadingIndicator.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    noProductsMessage.classList.add('hidden');
    productsGrid.innerHTML = '';
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

function showError() {
    hideLoading();
    errorMessage.classList.remove('hidden');
    noProductsMessage.classList.add('hidden');
}

function showNoProducts() {
    hideLoading();
    noProductsMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    productsGrid.innerHTML = '';
}

// ============= PRODUCT RENDERING =============

function renderProducts() {
    if (filteredProducts.length === 0) {
        showNoProducts();
        return;
    }
    
    hideLoading();
    errorMessage.classList.add('hidden');
    noProductsMessage.classList.add('hidden');
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="glass-card border border-dark-border rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:bg-white/10 fade-in product-card">
            <div class="aspect-square bg-white rounded-lg mb-4 overflow-hidden">
                <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain p-4" loading="lazy">
            </div>
            <div class="space-y-2">
                <h3 class="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">${product.title}</h3>
                <p class="text-dark-text-secondary text-sm capitalize">${product.category}</p>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold">$${product.price}</span>
                    <div class="flex items-center text-yellow-400">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="text-sm">${product.rating.rate}</span>
                    </div>
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-gradient-to-r from-accent to-accent-hover text-white py-2 rounded-lg font-medium hover:from-accent-hover hover:to-gray-600 transition-all duration-300 mt-4 btn-hover">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// ============= NOTIFICATION FUNCTIONS =============

function showCartNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, CONFIG.NOTIFICATION_DURATION);
}

// ============= PERFORMANCE OPTIMIZATIONS =============

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize enhancements after products are rendered
function initializeEnhancements() {
    initLazyLoading();
}

console.log('DEAM Store UI module loaded successfully!');