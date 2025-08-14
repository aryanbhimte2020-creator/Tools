// Main JavaScript for Multi-Tools Website

// Global variables
let toolsData = [];
let searchTimeout;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadHeader();
    loadFooter();
    initializeSearch();
    initializeToolCards();
    initializeBackToTop();
    loadToolsData();
}

// Load header dynamically
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <i class="fas fa-tools me-2"></i>
                        Multi-Tools Hub
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="index.html">Home</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                    Categories
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#image-tools">Image Tools</a></li>
                                    <li><a class="dropdown-item" href="#seo-tools">SEO Tools</a></li>
                                    <li><a class="dropdown-item" href="#text-tools">Text Tools</a></li>
                                    <li><a class="dropdown-item" href="#developer-tools">Developer Tools</a></li>
                                    <li><a class="dropdown-item" href="#calculators">Calculators</a></li>
                                    <li><a class="dropdown-item" href="#converters">Unit Converters</a></li>
                                    <li><a class="dropdown-item" href="#security-tools">Security Tools</a></li>
                                    <li><a class="dropdown-item" href="#social-tools">Social Media Tools</a></li>
                                    <li><a class="dropdown-item" href="#misc-tools">Miscellaneous</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#about">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
}

// Load footer dynamically
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <h5><i class="fas fa-tools me-2"></i>Multi-Tools Hub</h5>
                            <p>Your one-stop destination for 100+ free online tools. From image converters to calculators, we've got everything you need.</p>
                            <div class="social-links">
                                <a href="#" class="me-3"><i class="fab fa-facebook"></i></a>
                                <a href="#" class="me-3"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="me-3"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="me-3"><i class="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h5>Quick Links</h5>
                            <ul class="list-unstyled">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="#image-tools">Image Tools</a></li>
                                <li><a href="#seo-tools">SEO Tools</a></li>
                                <li><a href="#text-tools">Text Tools</a></li>
                                <li><a href="#developer-tools">Developer Tools</a></li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <h5>Contact Info</h5>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-envelope me-2"></i>contact@multitoolshub.com</li>
                                <li><i class="fas fa-phone me-2"></i>+1 (555) 123-4567</li>
                                <li><i class="fas fa-map-marker-alt me-2"></i>123 Tool Street, Web City</li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 Multi-Tools Hub. All rights reserved. | <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });

        // Add search button functionality
        const searchButton = searchInput.nextElementSibling;
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
        }
    }
}

// Perform search
function performSearch(query) {
    if (!query.trim()) {
        showAllTools();
        return;
    }

    const toolCards = document.querySelectorAll('.tool-card');
    const searchTerm = query.toLowerCase();

    toolCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        const toolName = card.getAttribute('data-tool').toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm) || toolName.includes(searchTerm)) {
            card.style.display = 'block';
            highlightSearchTerm(card, searchTerm);
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide category sections based on visible tools
    updateCategoryVisibility();
}

// Highlight search terms
function highlightSearchTerm(card, searchTerm) {
    const title = card.querySelector('.card-title');
    const description = card.querySelector('.card-text');
    
    // Remove existing highlights
    title.innerHTML = title.textContent;
    description.innerHTML = description.textContent;
    
    // Add highlights
    const titleText = title.textContent;
    const descText = description.textContent;
    
    const highlightedTitle = titleText.replace(new RegExp(searchTerm, 'gi'), match => 
        `<span class="search-highlight">${match}</span>`
    );
    const highlightedDesc = descText.replace(new RegExp(searchTerm, 'gi'), match => 
        `<span class="search-highlight">${match}</span>`
    );
    
    title.innerHTML = highlightedTitle;
    description.innerHTML = highlightedDesc;
}

// Show all tools
function showAllTools() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.style.display = 'block';
        // Remove highlights
        const title = card.querySelector('.card-title');
        const description = card.querySelector('.card-text');
        title.innerHTML = title.textContent;
        description.innerHTML = description.textContent;
    });
    updateCategoryVisibility();
}

// Update category visibility
function updateCategoryVisibility() {
    const categories = document.querySelectorAll('.category-section');
    categories.forEach(category => {
        const visibleTools = category.querySelectorAll('.tool-card[style*="display: block"], .tool-card:not([style*="display: none"])');
        if (visibleTools.length > 0) {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });
}

// Initialize tool cards
function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const toolName = this.getAttribute('data-tool');
            navigateToTool(toolName);
        });
    });
}

// Navigate to tool page
function navigateToTool(toolName) {
    const toolPage = `${toolName}.html`;
    window.location.href = toolPage;
}

// Initialize back to top button
function initializeBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Load tools data
function loadToolsData() {
    // This would typically load from a JSON file or API
    toolsData = [
        {
            name: 'Image to PNG',
            tool: 'image-to-png',
            category: 'image',
            description: 'Convert images to PNG format',
            icon: 'fas fa-file-image'
        },
        {
            name: 'Word Counter',
            tool: 'word-counter',
            category: 'text',
            description: 'Count words and characters',
            icon: 'fas fa-calculator'
        },
        // Add more tools data here
    ];
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'danger');
    });
}

function downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add loading animation
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, originalContent) {
    element.innerHTML = originalContent;
}

// Export functions for use in tool pages
window.MultiTools = {
    showNotification,
    copyToClipboard,
    downloadFile,
    showLoading,
    hideLoading
};
