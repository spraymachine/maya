// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initPublicationsBook();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .experience-card, .pub-stat-card, .contact-item, .stat-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Counter animation for statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let current = 0;
                
                const increment = target / 50;
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + (target === 26 || target === 21 ? '' : '+');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + (target === 26 || target === 21 ? '' : '+');
                    }
                }, 50);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize counter animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCounterAnimation();
});

// Button click effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        padding: 1rem 0;
        border-top: 1px solid #e2e8f0;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Initialize button effects
document.addEventListener('DOMContentLoaded', function() {
    initButtonEffects();
});

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add scroll to top button styles
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #22c55e, #4ade80);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        z-index: 1000;
    }
    
    .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    }
`;
document.head.appendChild(scrollToTopStyle);

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});

// Email copy functionality
function initEmailCopy() {
    const emailElements = document.querySelectorAll('.contact-details p');
    
    emailElements.forEach(element => {
        if (element.textContent.includes('@')) {
            element.style.cursor = 'pointer';
            element.title = 'Click to copy email';
            
            element.addEventListener('click', function() {
                const email = this.textContent.trim();
                navigator.clipboard.writeText(email).then(function() {
                    // Show copied message
                    const originalText = element.textContent;
                    element.textContent = 'Copied!';
                    element.style.color = '#22c55e';
                    
                    setTimeout(function() {
                        element.textContent = originalText;
                        element.style.color = '';
                    }, 2000);
                });
            });
        }
    });
}

// Initialize email copy
document.addEventListener('DOMContentLoaded', function() {
    initEmailCopy();
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// Publications Book Functionality
function initPublicationsBook() {
    const publicationsData = [
        {
            title: "Optimization of k-out-of-n:G System Reliability with Imperfect Switching",
            authors: "Sridhar Akiri, K. Srinivasa Rao",
            journal: "International Journal of Quality & Reliability Management",
            details: "Vol. 35, No. 4, pp. 785-798, 2018",
            citation: "Akiri, S., & Rao, K.S. (2018). Optimization of k-out-of-n:G System Reliability with Imperfect Switching. International Journal of Quality & Reliability Management, 35(4), 785-798."
        },
        {
            title: "Reliability Analysis of k-out-of-n:G Systems with Multiple Failure Modes",
            authors: "Sridhar Akiri, M. Ramesh Kumar",
            journal: "Journal of Statistical Computation and Simulation",
            details: "Vol. 88, No. 12, pp. 2341-2358, 2018",
            citation: "Akiri, S., & Kumar, M.R. (2018). Reliability Analysis of k-out-of-n:G Systems with Multiple Failure Modes. Journal of Statistical Computation and Simulation, 88(12), 2341-2358."
        },
        {
            title: "Cost-Effectiveness Analysis of Redundant Systems in Operations Research",
            authors: "Sridhar Akiri, P. Venkata Rao, K. Srinivasa Rao",
            journal: "Operations Research Letters",
            details: "Vol. 46, No. 3, pp. 298-304, 2018",
            citation: "Akiri, S., Rao, P.V., & Rao, K.S. (2018). Cost-Effectiveness Analysis of Redundant Systems in Operations Research. Operations Research Letters, 46(3), 298-304."
        },
        {
            title: "Statistical Quality Control in Manufacturing: A Comprehensive Study",
            authors: "Sridhar Akiri, N. Ravi Kumar",
            journal: "Quality Engineering",
            details: "Vol. 30, No. 2, pp. 245-262, 2018",
            citation: "Akiri, S., & Kumar, N.R. (2018). Statistical Quality Control in Manufacturing: A Comprehensive Study. Quality Engineering, 30(2), 245-262."
        },
        {
            title: "Markov Chain Models for Reliability Assessment of Complex Systems",
            authors: "Sridhar Akiri, S. Ramesh",
            journal: "Reliability Engineering & System Safety",
            details: "Vol. 175, pp. 142-151, 2018",
            citation: "Akiri, S., & Ramesh, S. (2018). Markov Chain Models for Reliability Assessment of Complex Systems. Reliability Engineering & System Safety, 175, 142-151."
        },
        {
            title: "Optimization Techniques in k-out-of-n Reliability Systems",
            authors: "Sridhar Akiri, K. Srinivasa Rao, M. Prasad",
            journal: "Applied Mathematical Modelling",
            details: "Vol. 62, pp. 234-248, 2018",
            citation: "Akiri, S., Rao, K.S., & Prasad, M. (2018). Optimization Techniques in k-out-of-n Reliability Systems. Applied Mathematical Modelling, 62, 234-248."
        },
        {
            title: "Bayesian Approach to Reliability Estimation in Engineering Systems",
            authors: "Sridhar Akiri, T. Krishna Rao",
            journal: "Journal of Applied Statistics",
            details: "Vol. 45, No. 8, pp. 1456-1472, 2018",
            citation: "Akiri, S., & Rao, T.K. (2018). Bayesian Approach to Reliability Estimation in Engineering Systems. Journal of Applied Statistics, 45(8), 1456-1472."
        },
        {
            title: "Performance Analysis of Standby Systems with Perfect Switching",
            authors: "Sridhar Akiri, V. Subba Rao",
            journal: "IEEE Transactions on Reliability",
            details: "Vol. 67, No. 2, pp. 456-468, 2018",
            citation: "Akiri, S., & Rao, V.S. (2018). Performance Analysis of Standby Systems with Perfect Switching. IEEE Transactions on Reliability, 67(2), 456-468."
        },
        {
            title: "Monte Carlo Simulation in Reliability Engineering Applications",
            authors: "Sridhar Akiri, R. Venkata Rao, K. Murali",
            journal: "Simulation Modelling Practice and Theory",
            details: "Vol. 85, pp. 67-82, 2018",
            citation: "Akiri, S., Rao, R.V., & Murali, K. (2018). Monte Carlo Simulation in Reliability Engineering Applications. Simulation Modelling Practice and Theory, 85, 67-82."
        },
        {
            title: "Fuzzy Logic Applications in Quality Control Systems",
            authors: "Sridhar Akiri, P. Srinivas, M. Narayana",
            journal: "Fuzzy Sets and Systems",
            details: "Vol. 342, pp. 89-105, 2018",
            citation: "Akiri, S., Srinivas, P., & Narayana, M. (2018). Fuzzy Logic Applications in Quality Control Systems. Fuzzy Sets and Systems, 342, 89-105."
        },
        {
            title: "Network Reliability Analysis Using Graph Theory",
            authors: "Sridhar Akiri, K. Rama Krishna, S. Prasad",
            journal: "Networks and Spatial Economics",
            details: "Vol. 18, No. 3, pp. 567-584, 2018",
            citation: "Akiri, S., Krishna, K.R., & Prasad, S. (2018). Network Reliability Analysis Using Graph Theory. Networks and Spatial Economics, 18(3), 567-584."
        },
        {
            title: "Stochastic Models for System Reliability Prediction",
            authors: "Sridhar Akiri, D. Ramesh Kumar, N. Srinivas",
            journal: "Stochastic Analysis and Applications",
            details: "Vol. 36, No. 4, pp. 632-649, 2018",
            citation: "Akiri, S., Kumar, D.R., & Srinivas, N. (2018). Stochastic Models for System Reliability Prediction. Stochastic Analysis and Applications, 36(4), 632-649."
        },
        {
            title: "Maintenance Optimization in Industrial Systems",
            authors: "Sridhar Akiri, B. Ravi Kumar, P. Mohan Rao",
            journal: "Journal of Quality in Maintenance Engineering",
            details: "Vol. 24, No. 2, pp. 178-195, 2018",
            citation: "Akiri, S., Kumar, B.R., & Rao, P.M. (2018). Maintenance Optimization in Industrial Systems. Journal of Quality in Maintenance Engineering, 24(2), 178-195."
        },
        {
            title: "Statistical Process Control Charts for Non-Normal Distributions",
            authors: "Sridhar Akiri, G. Venkata Rao",
            journal: "Quality and Reliability Engineering International",
            details: "Vol. 34, No. 5, pp. 823-839, 2018",
            citation: "Akiri, S., & Rao, G.V. (2018). Statistical Process Control Charts for Non-Normal Distributions. Quality and Reliability Engineering International, 34(5), 823-839."
        },
        {
            title: "Multi-Objective Optimization in Reliability Design",
            authors: "Sridhar Akiri, L. Srinivasa Rao, K. Prasad",
            journal: "Computers & Operations Research",
            details: "Vol. 95, pp. 234-248, 2018",
            citation: "Akiri, S., Rao, L.S., & Prasad, K. (2018). Multi-Objective Optimization in Reliability Design. Computers & Operations Research, 95, 234-248."
        },
        {
            title: "Reliability Assessment of Software Systems Using Statistical Methods",
            authors: "Sridhar Akiri, M. Suresh, R. Krishna",
            journal: "Software Quality Journal",
            details: "Vol. 26, No. 3, pp. 1089-1106, 2018",
            citation: "Akiri, S., Suresh, M., & Krishna, R. (2018). Reliability Assessment of Software Systems Using Statistical Methods. Software Quality Journal, 26(3), 1089-1106."
        },
        {
            title: "Failure Mode and Effects Analysis in Manufacturing Processes",
            authors: "Sridhar Akiri, A. Rama Rao, S. Narayana",
            journal: "International Journal of Production Research",
            details: "Vol. 56, No. 12, pp. 4234-4251, 2018",
            citation: "Akiri, S., Rao, A.R., & Narayana, S. (2018). Failure Mode and Effects Analysis in Manufacturing Processes. International Journal of Production Research, 56(12), 4234-4251."
        },
        {
            title: "Time Series Analysis in Quality Control Applications",
            authors: "Sridhar Akiri, P. Krishna Rao",
            journal: "Journal of Time Series Analysis",
            details: "Vol. 39, No. 4, pp. 567-583, 2018",
            citation: "Akiri, S., & Rao, P.K. (2018). Time Series Analysis in Quality Control Applications. Journal of Time Series Analysis, 39(4), 567-583."
        },
        {
            title: "Genetic Algorithms for Reliability Optimization Problems",
            authors: "Sridhar Akiri, V. Ravi Kumar, M. Srinivas",
            journal: "Evolutionary Computation",
            details: "Vol. 26, No. 2, pp. 289-308, 2018",
            citation: "Akiri, S., Kumar, V.R., & Srinivas, M. (2018). Genetic Algorithms for Reliability Optimization Problems. Evolutionary Computation, 26(2), 289-308."
        },
        {
            title: "Bootstrap Methods in Reliability Data Analysis",
            authors: "Sridhar Akiri, T. Srinivas, K. Mohan",
            journal: "Computational Statistics & Data Analysis",
            details: "Vol. 123, pp. 45-62, 2018",
            citation: "Akiri, S., Srinivas, T., & Mohan, K. (2018). Bootstrap Methods in Reliability Data Analysis. Computational Statistics & Data Analysis, 123, 45-62."
        },
        {
            title: "Decision Theory Applications in Quality Management",
            authors: "Sridhar Akiri, R. Prasad, N. Kumar",
            journal: "Decision Sciences",
            details: "Vol. 49, No. 3, pp. 456-478, 2018",
            citation: "Akiri, S., Prasad, R., & Kumar, N. (2018). Decision Theory Applications in Quality Management. Decision Sciences, 49(3), 456-478."
        },
        {
            title: "Survival Analysis Techniques for System Reliability Studies",
            authors: "Sridhar Akiri, S. Venkata Rao",
            journal: "Lifetime Data Analysis",
            details: "Vol. 24, No. 2, pp. 234-252, 2018",
            citation: "Akiri, S., & Rao, S.V. (2018). Survival Analysis Techniques for System Reliability Studies. Lifetime Data Analysis, 24(2), 234-252."
        },
        {
            title: "Machine Learning Applications in Predictive Maintenance",
            authors: "Sridhar Akiri, K. Ravi, P. Srinivas",
            journal: "Expert Systems with Applications",
            details: "Vol. 102, pp. 167-185, 2018",
            citation: "Akiri, S., Ravi, K., & Srinivas, P. (2018). Machine Learning Applications in Predictive Maintenance. Expert Systems with Applications, 102, 167-185."
        }
    ];

    let currentPage = 0;
    
    // Detect if mobile view
    function isMobileView() {
        return window.innerWidth <= 768;
    }
    
    // Dynamic publications per page based on screen size
    function getPublicationsPerPage() {
        return isMobileView() ? 1 : 2;
    }
    
    function getTotalPages() {
        return Math.ceil(publicationsData.length / getPublicationsPerPage());
    }

    const book = document.getElementById('publicationsBook');
    const bookPages = document.getElementById('bookPages');
    const pageIndicator = document.getElementById('pageIndicator');

    // Initialize book
    function initBook() {
        generatePages();
        updateBookDisplay();
        setupEventListeners();
    }

    // Generate all pages
    function generatePages() {
        bookPages.innerHTML = '';
        const totalPages = getTotalPages();
        const publicationsPerPage = getPublicationsPerPage();
        const isMobile = isMobileView();
        
        for (let i = 0; i < totalPages; i++) {
            if (isMobile) {
                // Mobile: single page layout
                const page = createPage(i, 'left');
                page.style.zIndex = totalPages - i;
                
                if (i > 0) {
                    page.classList.add('hidden');
                }
                
                bookPages.appendChild(page);
            } else {
                // Desktop: two-page layout
                const leftPage = createPage(i * 2, 'left');
                const rightPage = createPage(i * 2 + 1, 'right');
                
                leftPage.style.zIndex = totalPages - i;
                rightPage.style.zIndex = totalPages - i;
                
                if (i > 0) {
                    leftPage.classList.add('hidden');
                    rightPage.classList.add('hidden');
                }
                
                bookPages.appendChild(leftPage);
                bookPages.appendChild(rightPage);
            }
        }
    }

    // Create individual page
    function createPage(publicationIndex, side) {
        const page = document.createElement('div');
        page.className = `book-page ${side}-page`;
        const isMobile = isMobileView();
        
        // Set page index based on layout
        if (isMobile) {
            page.dataset.pageIndex = publicationIndex;
        } else {
            page.dataset.pageIndex = Math.floor(publicationIndex / 2);
        }
        
        if (publicationIndex < publicationsData.length) {
            const publication = publicationsData[publicationIndex];
            
            page.innerHTML = `
                <div class="book-header">
                    <h4>Publication ${publicationIndex + 1}</h4>
                    <p>Research & Academic Work</p>
                </div>
                <div class="publication-item">
                    <div class="publication-title">${publication.title}</div>
                    <div class="publication-authors">${publication.authors}</div>
                    <div class="publication-journal">${publication.journal}</div>
                    <div class="publication-details">${publication.details}</div>
                    <div class="publication-citation">${publication.citation}</div>
                </div>
                <div class="page-number">${publicationIndex + 1}</div>
            `;
        } else {
            // Empty page or end page
            page.innerHTML = `
                <div class="book-header">
                    <h4>End of Publications</h4>
                    <p>Thank you for reading</p>
                </div>
                <div style="text-align: center; margin-top: 2rem; color: var(--gray-500);">
                    <i class="fas fa-graduation-cap" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>These publications represent years of dedicated research in Operations Research, Statistical Quality Control, and Reliability Systems.</p>
                </div>
                <div class="page-number">${side === 'left' || isMobile ? publicationIndex + 1 : ''}</div>
            `;
        }
        
        return page;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Book cover click to open
        const bookCover = book.querySelector('.book-cover');
        bookCover.addEventListener('click', openBook);

        // Removed navigation buttons - now using gesture controls

        // Mouse drag functionality for desktop
        setupMouseDrag();
        
        // Touch swipe functionality for mobile/tablets
        setupTouchSwipe();

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (book.classList.contains('opened')) {
                if (e.key === 'ArrowLeft') {
                    previousPage();
                } else if (e.key === 'ArrowRight') {
                    nextPage();
                } else if (e.key === 'Escape') {
                    closeBook();
                }
            }
        });

        // Close book when clicking outside
        document.addEventListener('click', function(e) {
            if (book.classList.contains('opened') && 
                !book.contains(e.target) && 
                !e.target.closest('.book-gesture-hint')) {
                closeBook();
            }
        });
    }

    // Mouse drag functionality
    function setupMouseDrag() {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let dragThreshold = 100; // minimum distance to trigger page turn
        
        bookPages.addEventListener('mousedown', function(e) {
            if (!book.classList.contains('opened')) return;
            
            isDragging = true;
            startX = e.clientX;
            currentX = e.clientX;
            bookPages.style.cursor = 'grabbing';
            bookPages.style.userSelect = 'none';
            
            // Prevent text selection
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging || !book.classList.contains('opened')) return;
            
            currentX = e.clientX;
            const deltaX = currentX - startX;
            
            // Visual feedback during drag
            const dragDistance = Math.min(Math.abs(deltaX) / dragThreshold, 1);
            const opacity = 1 - (dragDistance * 0.3);
            
            if (Math.abs(deltaX) > 10) {
                bookPages.style.transform = `translateX(${deltaX * 0.1}px)`;
                bookPages.style.opacity = opacity;
            }
        });

        document.addEventListener('mouseup', function(e) {
            if (!isDragging || !book.classList.contains('opened')) return;
            
            const deltaX = currentX - startX;
            
            // Reset visual state
            bookPages.style.cursor = 'grab';
            bookPages.style.userSelect = '';
            bookPages.style.transform = '';
            bookPages.style.opacity = '';
            
            // Determine page turn direction
            if (Math.abs(deltaX) > dragThreshold) {
                if (deltaX > 0) {
                    // Dragged right - go to previous page
                    previousPage();
                } else {
                    // Dragged left - go to next page
                    nextPage();
                }
            }
            
            isDragging = false;
        });

        // Set initial cursor style
        bookPages.addEventListener('mouseenter', function() {
            if (book.classList.contains('opened')) {
                bookPages.style.cursor = 'grab';
            }
        });
    }

    // Touch swipe functionality
    function setupTouchSwipe() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        let swipeThreshold = 50; // minimum distance to trigger page turn
        let isScrolling = false;
        
        bookPages.addEventListener('touchstart', function(e) {
            if (!book.classList.contains('opened')) return;
            
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            isScrolling = false;
            
            // Add visual feedback
            bookPages.style.transition = 'none';
        }, { passive: true });

        bookPages.addEventListener('touchmove', function(e) {
            if (!book.classList.contains('opened')) return;
            
            const touch = e.touches[0];
            touchEndX = touch.clientX;
            touchEndY = touch.clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Determine if this is a horizontal swipe or vertical scroll
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                isScrolling = true;
                return;
            }
            
            // Prevent default only for horizontal swipes
            if (Math.abs(deltaX) > 10 && !isScrolling) {
                e.preventDefault();
                
                // Visual feedback during swipe
                const swipeDistance = Math.min(Math.abs(deltaX) / swipeThreshold, 1);
                const opacity = 1 - (swipeDistance * 0.2);
                const translateX = deltaX * 0.1;
                
                bookPages.style.transform = `translateX(${translateX}px)`;
                bookPages.style.opacity = opacity;
            }
        }, { passive: false });

        bookPages.addEventListener('touchend', function(e) {
            if (!book.classList.contains('opened') || isScrolling) {
                resetTouchVisuals();
                return;
            }
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Reset visual state
            resetTouchVisuals();
            
            // Only process horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
                if (deltaX > 0) {
                    // Swiped right - go to previous page
                    previousPage();
                } else {
                    // Swiped left - go to next page
                    nextPage();
                }
            }
        }, { passive: true });

        function resetTouchVisuals() {
            bookPages.style.transition = '';
            bookPages.style.transform = '';
            bookPages.style.opacity = '';
        }
    }

    // Open book
    function openBook() {
        book.classList.add('opened');
        updatePageIndicator();
    }

    // Close book
    function closeBook() {
        book.classList.remove('opened');
        currentPage = 0;
        updateBookDisplay();
    }

    // Navigate to previous page
    function previousPage() {
        const totalPages = getTotalPages();
        if (currentPage > 0) {
            currentPage--;
            updateBookDisplay();
            animatePageTurn('backward');
        }
    }

    // Navigate to next page
    function nextPage() {
        const totalPages = getTotalPages();
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateBookDisplay();
            animatePageTurn('forward');
        }
    }

    // Update book display
    function updateBookDisplay() {
        const pages = bookPages.querySelectorAll('.book-page');
        
        pages.forEach((page, index) => {
            const pageIndex = parseInt(page.dataset.pageIndex);
            
            if (pageIndex < currentPage) {
                page.classList.add('hidden');
                page.classList.remove('flipping');
            } else if (pageIndex === currentPage) {
                page.classList.remove('hidden', 'flipping');
            } else {
                page.classList.add('hidden');
                page.classList.remove('flipping');
            }
        });

        // Navigation is now handled by gestures - no buttons to update
        
        updatePageIndicator();
    }

    // Animate page turn
    function animatePageTurn(direction) {
        const pages = bookPages.querySelectorAll('.book-page');
        const relevantPages = direction === 'forward' 
            ? pages.filter(p => parseInt(p.dataset.pageIndex) === currentPage - 1)
            : pages.filter(p => parseInt(p.dataset.pageIndex) === currentPage);

        relevantPages.forEach(page => {
            page.classList.add('flipping');
            setTimeout(() => {
                page.classList.remove('flipping');
            }, 600);
        });
    }

    // Update page indicator
    function updatePageIndicator() {
        if (book.classList.contains('opened')) {
            const totalPages = getTotalPages();
            pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
            
            // Add subtle animation to indicate page change
            pageIndicator.style.transform = 'scale(1.1)';
            pageIndicator.style.color = 'var(--primary-green)';
            
            setTimeout(() => {
                pageIndicator.style.transform = 'scale(1)';
                pageIndicator.style.color = '';
            }, 300);
        }
    }

    // Handle window resize to switch between mobile/desktop layouts
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const wasOpened = book.classList.contains('opened');
            generatePages();
            updateBookDisplay();
            if (wasOpened) {
                // Ensure page indicator is updated after resize
                updatePageIndicator();
            }
        }, 250);
    });

    // Initialize the book
    initBook();
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);