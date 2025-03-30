// Products page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get filter elements
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');
    const searchInput = document.querySelector('.filter-group.search input');
    const searchButton = document.querySelector('.filter-group.search button');
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Add event listeners
    if (categorySelect) {
        categorySelect.addEventListener('change', filterProducts);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProducts);
    }
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            searchProducts(searchInput.value.trim());
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts(searchInput.value.trim());
                e.preventDefault();
            }
        });
    }
    
    // Filter products by category
    function filterProducts() {
        const selectedCategory = categorySelect.value;
        
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (selectedCategory === 'all' || selectedCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Sort products
    function sortProducts() {
        const sortBy = sortSelect.value;
        const container = document.querySelector('.products-grid');
        const products = Array.from(productCards);
        
        switch (sortBy) {
            case 'price-low':
                products.sort((a, b) => {
                    const priceA = extractPrice(a.querySelector('.price').textContent);
                    const priceB = extractPrice(b.querySelector('.price').textContent);
                    return priceA - priceB;
                });
                break;
                
            case 'price-high':
                products.sort((a, b) => {
                    const priceA = extractPrice(a.querySelector('.price').textContent);
                    const priceB = extractPrice(b.querySelector('.price').textContent);
                    return priceB - priceA;
                });
                break;
                
            case 'name-asc':
                products.sort((a, b) => {
                    const nameA = a.querySelector('h3').textContent;
                    const nameB = b.querySelector('h3').textContent;
                    return nameA.localeCompare(nameB);
                });
                break;
                
            case 'name-desc':
                products.sort((a, b) => {
                    const nameA = a.querySelector('h3').textContent;
                    const nameB = b.querySelector('h3').textContent;
                    return nameB.localeCompare(nameA);
                });
                break;
                
            default:
                // Do nothing for featured (keep original order)
                break;
        }
        
        // Remove all products
        products.forEach(product => {
            container.removeChild(product);
        });
        
        // Append sorted products
        products.forEach(product => {
            container.appendChild(product);
        });
    }
    
    // Search products
    function searchProducts(query) {
        if (!query) {
            // If query is empty, show all products (respecting category filter)
            filterProducts();
            return;
        }
        
        query = query.toLowerCase();
        
        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            const price = card.querySelector('.price').textContent.toLowerCase();
            
            // Show card if query matches title, category, or price
            if (title.includes(query) || 
                category.includes(query) || 
                price.includes(query)) {
                
                // Only show if it also passes category filter
                const selectedCategory = categorySelect.value;
                if (selectedCategory === 'all' || selectedCategory === card.getAttribute('data-category')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Helper function to extract numeric price from price text
    function extractPrice(priceText) {
        // Extract just the number from strings like "₱350.00 / pack"
        const match = priceText.match(/₱(\d+(\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
    }
}); 