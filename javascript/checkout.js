// DEAM Store - Checkout Functions
// Handles checkout process and payment

// ============= CHECKOUT FUNCTIONS =============

function checkout() {
    if (cart.length === 0) {
        showCartNotification('Tu carrito está vacío', 'error');
        return;
    }
    
    // Close cart and open checkout modal
    closeCart();
    openCheckoutModal();
}

function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    isCheckoutModalOpen = true;
    
    // Populate checkout items
    updateCheckoutSummary();
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = document.getElementById('firstName');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    isCheckoutModalOpen = false;
}

function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const subtotalElement = document.getElementById('checkoutSubtotal');
    const taxElement = document.getElementById('checkoutTax');
    const totalElement = document.getElementById('checkoutTotal');
    const shippingElement = document.getElementById('checkoutShipping');
    
    // Calculate totals using cart calculations
    const totals = calculateCartTotals();
    
    // Update shipping display
    shippingElement.textContent = totals.shippingText;
    
    // Render checkout items
    checkoutItems.innerHTML = cart.map(item => `
        <div class="flex items-center space-x-3 py-2">
            <img src="${item.image}" alt="${item.title}" class="w-12 h-12 object-contain bg-white rounded p-1">
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">${item.title}</p>
                <p class="text-xs text-dark-text-secondary">Cantidad: ${item.quantity}</p>
            </div>
            <p class="text-sm font-medium">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    `).join('');
    
    // Update totals
    subtotalElement.textContent = `$${totals.subtotal}`;
    taxElement.textContent = `$${totals.tax}`;
    totalElement.textContent = `$${totals.total}`;
}

// ============= FORM PROCESSING =============

function processOrder(formData) {
    return new Promise((resolve) => {
        // Simulate payment processing
        setTimeout(() => {
            const orderNumber = 'DEAM-' + Date.now().toString().slice(-6);
            resolve({
                success: true,
                orderNumber: orderNumber,
                message: 'Pedido procesado exitosamente'
            });
        }, 2000);
    });
}

function showOrderSuccess(orderNumber) {
    const modal = document.getElementById('checkoutModal');
    modal.innerHTML = `
        <div class="p-8 text-center bg-gray-800 rounded-4xl">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 class="text-2xl font-bold text-green-400 mb-2">¡Pedido Confirmado!</h2>
            <p class="text-dark-text-secondary mb-4">Tu pedido ha sido procesado exitosamente</p>
            <div class="glass-card border border-dark-border rounded-lg p-4 mb-6">
                <p class="text-sm text-dark-text-secondary">Número de pedido:</p>
                <p class="text-xl font-bold">${orderNumber}</p>
            </div>
            <p class="text-sm text-dark-text-secondary mb-6">
                Recibirás un email de confirmación con los detalles de tu pedido y el seguimiento de envío.
            </p>
            <button onclick="closeCheckoutModal(); clearCart();" class="bg-gradient-to-r from-accent to-accent-hover text-white px-8 py-3 rounded-lg font-medium hover:from-accent-hover hover:to-gray-600 transition-all duration-300">
                Continuar Comprando
            </button>
        </div>
    `;
}

// ============= FORM VALIDATION AND FORMATTING =============

function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {y
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        return parts.join(' ');
    } else {
        return v;
    }
}

function formatExpiryDate(value) {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
        return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
}

function validateForm(formData) {
    const errors = [];
    
    // Required fields validation
    const requiredFields = {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Email',
        phone: 'Teléfono',
        address: 'Dirección',
        city: 'Ciudad',
        department: 'Departamento'
    };
    
    for (const [field, label] of Object.entries(requiredFields)) {
        if (!formData.get(field)?.trim()) {
            errors.push(`${label} es requerido`);
        }
    }
    
    // Email validation
    const email = formData.get('email');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email no válido');
    }
    
    // Payment method validation
    const paymentMethod = formData.get('paymentMethod');
    if (paymentMethod === 'credit') {
        const cardFields = {
            cardNumber: 'Número de tarjeta',
            expiryDate: 'Fecha de vencimiento',
            cvv: 'CVV',
            cardName: 'Nombre en la tarjeta'
        };
        
        for (const [field, label] of Object.entries(cardFields)) {
            if (!formData.get(field)?.trim()) {
                errors.push(`${label} es requerido`);
            }
        }
        
        // Card number validation (basic)
        const cardNumber = formData.get('cardNumber')?.replace(/\s/g, '');
        if (cardNumber && cardNumber.length < 13) {
            errors.push('Número de tarjeta no válido');
        }
    }
    
    return errors;
}

console.log('DEAM Store Checkout module loaded successfully!');