// Preloader
window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 3000);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
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

// Collection section functionality
const collectionData = {
    chain: {
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop',
        title: 'Elegant Chain Collection',
        description: 'Discover our exquisite range of gold and silver chains, each piece meticulously crafted to complement your style.',
        features: ['18k Gold Plated', 'Tarnish Resistant', 'Lifetime Warranty', 'Free Sizing']
    },
    bracelet: {
        image: 'https://images.pexels.com/photos/1445554/pexels-photo-1445554.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop',
        title: 'Stunning Bracelet Range',
        description: 'From delicate tennis bracelets to bold statement pieces, find the perfect bracelet for every occasion.',
        features: ['Premium Materials', 'Adjustable Size', 'Gift Wrapping', 'Certificate of Authenticity']
    },
    ring: {
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop',
        title: 'Magnificent Ring Selection',
        description: 'Celebrate life\'s special moments with our collection of engagement rings, wedding bands, and fashion rings.',
        features: ['Diamond Certified', 'Custom Engraving', 'Ring Resizing', 'Insurance Coverage']
    },
    earring: {
        image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop',
        title: 'Beautiful Earring Collection',
        description: 'From classic studs to dramatic danglers, our earring collection offers something for every taste and style.',
        features: ['Hypoallergenic', 'Secure Backing', 'Matching Sets', 'Easy Returns']
    }
};

// Collection buttons functionality
document.querySelectorAll('.collection-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.collection-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category
        const category = this.getAttribute('data-category');
        const data = collectionData[category];
        
        // Update image with fade effect
        const img = document.getElementById('collection-img');
        img.style.opacity = '0';
        
        setTimeout(function() {
            img.src = data.image;
            img.style.opacity = '1';
        }, 300);
        
        // Update content with fade effect
        const details = document.getElementById('collection-details');
        details.style.opacity = '0';
        
        setTimeout(function() {
            details.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <ul class="collection-features">
                    ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <button class="btn-primary">Explore ${category.charAt(0).toUpperCase() + category.slice(1)} Collection</button>
            `;
            details.style.opacity = '1';
        }, 300);
    });
});

// Countdown timer
function updateCountdown() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(12, 30, 45, 0);
    
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<div class="timer-expired">Offer Expired!</div>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll animations
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .category-card, .product-card, .review-card');
    
    elements.forEach(function(element) {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.feature-card, .category-card, .product-card, .review-card');
    
    elements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    handleScrollAnimations();
});

window.addEventListener('scroll', handleScrollAnimations);

// Mobile menu functionality
document.getElementById('mobile-menu').addEventListener('click', function() {
    const navLeft = document.querySelector('.nav-left');
    if (navLeft.style.display === 'flex') {
        navLeft.style.display = 'none';
    } else {
        navLeft.style.display = 'flex';
        navLeft.style.flexDirection = 'column';
        navLeft.style.position = 'absolute';
        navLeft.style.top = '100%';
        navLeft.style.left = '0';
        navLeft.style.right = '0';
        navLeft.style.background = 'rgba(255, 255, 255, 0.95)';
        navLeft.style.backdropFilter = 'blur(10px)';
        navLeft.style.padding = '20px';
        navLeft.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Newsletter subscription
document.querySelector('.newsletter button').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.querySelector('.newsletter input').value;
    
    if (email) {
        alert('Thank you for subscribing to our newsletter!');
        document.querySelector('.newsletter input').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Add to cart functionality
document.querySelectorAll('.product-btn').forEach(function(button) {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (this.querySelector('.fa-shopping-cart')) {
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
            
            // Show feedback
            this.style.background = '#28a745';
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                this.style.background = 'white';
                this.innerHTML = '<i class="fas fa-shopping-cart"></i>';
            }, 1000);
            
            // Show notification
            showNotification('Item added to cart!');
        }
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(function(img) {
        imageObserver.observe(img);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Search functionality
document.querySelector('.nav-right .fa-search').addEventListener('click', function() {
    const searchOverlay = document.createElement('div');
    searchOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(26, 26, 46, 0.9);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const searchBox = document.createElement('div');
    searchBox.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        width: 90%;
        max-width: 500px;
        text-align: center;
    `;
    
    searchBox.innerHTML = `
        <h3 style="margin-bottom: 20px; color: #1a1a2e;">Search Products</h3>
        <input type="text" placeholder="Search for jewelry..." style="width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 20px; font-size: 16px;">
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button class="btn-primary" onclick="alert('Search functionality would be implemented here')">Search</button>
            <button class="btn-secondary" onclick="this.closest('.search-overlay').remove()">Cancel</button>
        </div>
    `;
    
    searchOverlay.appendChild(searchBox);
    searchOverlay.classList.add('search-overlay');
    document.body.appendChild(searchOverlay);
    
    setTimeout(() => {
        searchOverlay.style.opacity = '1';
    }, 100);
    
    // Close on outside click
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.remove();
        }
    });
});

// User account functionality
document.querySelector('.nav-right .fa-user').addEventListener('click', function() {
    alert('User account functionality would be implemented here');
});

// Shopping cart functionality
document.querySelector('.cart-icon').addEventListener('click', function() {
    alert('Shopping cart functionality would be implemented here');
});

console.log('Jay Lalaji Krupa website loaded successfully!');