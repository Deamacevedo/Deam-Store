// DEAM Store - Event Listeners
// Handles all event listeners and app initialization

// ============= EVENT LISTENERS =============

document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    fetchProducts();
    loadCartFromStorage();
    
    // Initialize hero background
    initHeroBackground();
    
    // Cart toggle events
    document.getElementById('cartToggle').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Checkout modal events
    const closeCheckoutBtn = document.getElementById('closeCheckoutModal');
    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        });
    }
    
    // Navigation events
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Filter events
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);
    
    // Checkout event
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Payment method toggle
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const creditCardDetails = document.getElementById('creditCardDetails');
            if (this.value === 'credit') {
                creditCardDetails.style.display = 'block';
                // Make card fields required
                ['cardNumber', 'expiryDate', 'cvv', 'cardName'].forEach(id => {
                    const field = document.getElementById(id);
                    if (field) field.required = true;
                });
            } else {
                creditCardDetails.style.display = 'none';
                // Remove required from card fields
                ['cardNumber', 'expiryDate', 'cvv', 'cardName'].forEach(id => {
                    const field = document.getElementById(id);
                    if (field) field.required = false;
                });
            }
        });
    });
    
    // Card number formatting
    const cardNumberField = document.getElementById('cardNumber');
    if (cardNumberField) {
        cardNumberField.addEventListener('input', function() {
            this.value = formatCardNumber(this.value);
        });
    }
    
    // Expiry date formatting
    const expiryDateField = document.getElementById('expiryDate');
    if (expiryDateField) {
        expiryDateField.addEventListener('input', function() {
            this.value = formatExpiryDate(this.value);
        });
    }
    
    // CVV validation (numbers only)
    const cvvField = document.getElementById('cvv');
    if (cvvField) {
        cvvField.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    }
    
    // Form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const errors = validateForm(formData);
            
            if (errors.length > 0) {
                showCartNotification(errors[0], 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = document.getElementById('submitOrder');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="flex items-center justify-center">
                    <div class="loading w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                    Procesando...
                </span>
            `;
            
            try {
                const result = await processOrder(formData);
                if (result.success) {
                    showOrderSuccess(result.orderNumber);
                }
            } catch (error) {
                showCartNotification('Error al procesar el pedido. Intenta nuevamente.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'c' to toggle cart
        if (e.key === 'c' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA' && !isCheckoutModalOpen) {
                toggleCart();
            }
        }
        
        // Press 'Escape' to close modals
        if (e.key === 'Escape') {
            if (isCheckoutModalOpen) {
                closeCheckoutModal();
            } else if (!cartSidebar.classList.contains('open')) {
                return;
            } else {
                closeCart();
            }
        }
    });
    
    // Auto-populate some fields for demo purposes
    setTimeout(() => {
        const cityField = document.getElementById('city');
        const departmentField = document.getElementById('department');
        if (cityField) cityField.value = 'Bucaramanga';
        if (departmentField) departmentField.value = 'santander';
    }, 1000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize active nav link
    const firstNavLink = document.querySelector('.nav-link[data-category=""]');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
});

// ============= PERFORMANCE OPTIMIZATIONS =============

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        console.log('Service Worker support detected');
        // You can register a service worker here for offline functionality
    });
}

// Handle online/offline status
window.addEventListener('online', function() {
    showCartNotification('Conexión restaurada');
});

window.addEventListener('offline', function() {
    showCartNotification('Sin conexión a internet', 'error');
});

// ============= GLOBAL API =============

// Export functions for potential external use
window.DeamStore = {
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    filterByCategory,
    checkout,
    openCheckoutModal,
    closeCheckoutModal,
    clearCart,
    showCartNotification,
    addToWish,
    removeFromWish,
    toggleWish,
    clearWish,
    showWishNotification
};

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showCartNotification('Ha ocurrido un error inesperado', 'error');
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showCartNotification('Error de conexión', 'error');
});

console.log('DEAM Store Events module loaded successfully!');
console.log('DEAM Store application initialized!');