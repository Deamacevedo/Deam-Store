// DEAM Store - Hero Background Functions
// Handles hero section background grid

// ============= HERO BACKGROUND FUNCTIONS =============

function populateHeroBackground() {
    if (products.length === 0) return;
    
    const heroGrid = document.getElementById('heroImageGrid');
    if (!heroGrid) return; // Check if element exists
    
    // Calculate how many items we need to fill the screen
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const itemSize = screenWidth > 768 ? 120 : screenWidth > 480 ? 80 : 60;
    const gap = screenWidth > 768 ? 8 : screenWidth > 480 ? 6 : 4;
    
    const itemsPerRow = Math.ceil(screenWidth / (itemSize + gap));
    const rowsNeeded = Math.ceil(screenHeight / (itemSize + gap));
    const totalItemsNeeded = itemsPerRow * rowsNeeded;
    
    // Create enough product repetitions to fill the screen
    const extendedProducts = [];
    while (extendedProducts.length < totalItemsNeeded) {
        extendedProducts.push(...products);
    }
    
    // Shuffle for variety
    const shuffledProducts = extendedProducts
        .slice(0, totalItemsNeeded)
        .sort(() => Math.random() - 0.5);
    
    // Create grid items
    heroGrid.innerHTML = shuffledProducts.map((product, index) => `
        <div class="hero-grid-item" style="animation-delay: ${(index * 50) % 2000}ms">
            <img src="${product.image}" alt="" loading="lazy">
        </div>
    `).join('');
    
    // Add fade-in animation
    animateHeroGrid();
}

function animateHeroGrid() {
    const gridItems = document.querySelectorAll('.hero-grid-item');
    
    // Add initial styles
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'all 0.5s ease';
        
        // Staggered animation
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, (index * 30) % 1000); // Stagger over 1 second max
    });
}

function initHeroBackground() {
    console.log('Hero background initialized');
    
    // Handle window resize to recalculate grid if needed
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (products.length > 0) {
                populateHeroBackground();
            }
        }, CONFIG.ANIMATION_DELAY);
    });
}

console.log('DEAM Store Hero module loaded successfully!');