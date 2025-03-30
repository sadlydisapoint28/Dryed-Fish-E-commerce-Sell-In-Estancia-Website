// Modern 2025 JavaScript for Estancia Dried Fish E-commerce Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    initializeCart();
    
    // Add to cart button event listeners
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
                showMessage('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to product cards
    observeElements('.product-card', 'fade-in-up');
    observeElements('.benefit-card', 'fade-in-up');
    observeElements('.testimonial', 'fade-in');
});

// Initialize the cart
function initializeCart() {
    const cart = JSON.parse(localStorage.getItem('estanciaCart')) || [];
    updateCartCount(cart.length);
}

// Add product to cart
function addToCart(e) {
    const button = e.target.closest('.add-to-cart');
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    const productImg = productCard.querySelector('img').src;
    
    // Get current cart
    const cart = JSON.parse(localStorage.getItem('estanciaCart')) || [];
    
    // Check if product is already in cart
    const existingProductIndex = cart.findIndex(item => 
        item.name === productName && item.price === productPrice
    );
    
    if (existingProductIndex >= 0) {
        // Update quantity if product already exists
        cart[existingProductIndex].quantity += 1;
        showMessage(`Added another ${productName} to your cart!`, 'success');
    } else {
        // Add new product to cart
        const product = {
            id: Date.now().toString(),
            name: productName,
            price: productPrice,
            image: productImg,
            quantity: 1
        };
        
        cart.push(product);
        showMessage(`${productName} has been added to your cart!`, 'success');
    }
    
    // Save cart to localStorage
    localStorage.setItem('estanciaCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount(cart.length);
    
    // Add animation to button
    button.classList.add('added');
    setTimeout(() => {
        button.classList.remove('added');
    }, 1000);
}

// Update cart count in header
function updateCartCount(count) {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        // Animate the cart count change
        cartCount.classList.add('pulse');
        setTimeout(() => {
            cartCount.textContent = count;
            setTimeout(() => {
                cartCount.classList.remove('pulse');
            }, 300);
        }, 100);
    }
}

// Show message function
function showMessage(message, type = 'info') {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => {
        msg.classList.remove('visible');
        setTimeout(() => {
            msg.remove();
        }, 300);
    });
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Append to body
    document.body.appendChild(messageDiv);
    
    // Add visible class
    setTimeout(() => {
        messageDiv.classList.add('visible');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.classList.remove('visible');
        
        // Remove element after transition
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// Intersection Observer for animations
function observeElements(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
} 