// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // Mobile Menu Toggle
    // ====================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        }
    });
    
    // ====================
    // Header Scroll Effect
    // ====================
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Initial check
    
    // ====================
    // Back to Top Button
    // ====================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ====================
    // Set Active Navigation Link
    // ====================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            if (currentPage === linkHref || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // ====================
    // Form Submission Handling
    // ====================
    const forms = document.querySelectorAll('form:not(#contactForm)');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Prevent actual submission for demo
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            if (data.email) {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            }
        });
    });
    
    // ====================
    // Newsletter Form Submission
    // ====================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && validateEmail(email)) {
                alert(`Thank you for subscribing with ${email}! You'll receive updates soon.`);
                this.reset();
            } else {
                alert('Please enter a valid email address.');
                emailInput.focus();
            }
        });
    }
    
    // ====================
    // Email Validation Function
    // ====================
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // ====================
    // Scroll Animations
    // ====================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .blog-post, .process-step, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .blog-post, .process-step, .pricing-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // ====================
    // Gallery Filter (for gallery.html)
    // ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide gallery items based on filter
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ====================
    // FAQ Functionality (for contact.html)
    // ====================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isOpen = answer.classList.contains('open');
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-answer').forEach(item => {
                    item.classList.remove('open');
                });
                
                document.querySelectorAll('.faq-question').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current item
                if (!isOpen) {
                    answer.classList.add('open');
                    this.classList.add('active');
                }
            });
        });
    }
    
    // ====================
    // Contact Form Validation (for contact.html)
    // ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                document.getElementById('email').focus();
                return;
            }
            
            // Show success message
            const successMessage = `Thank you ${name}! Your message about "${subject}" has been sent successfully. I'll get back to you at ${email} as soon as possible.`;
            showNotification(successMessage, 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // ====================
    // Notification System
    // ====================
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }
    
    // ====================
    // Smooth Scroll for Anchor Links
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links within the same page
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        if (mobileMenuBtn) {
                            const icon = mobileMenuBtn.querySelector('i');
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                        document.body.style.overflow = '';
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ====================
    // Lazy Loading Images
    // ====================
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
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
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ====================
    // Current Year in Footer
    // ====================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // ====================
    // Add CSS for Notifications
    // ====================
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-hover);
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            max-width: 400px;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 9999;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left: 4px solid var(--secondary-color);
        }
        
        .notification.error {
            border-left: 4px solid #dc2626;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 20px;
        }
        
        .notification.success .notification-content i {
            color: var(--secondary-color);
        }
        
        .notification.error .notification-content i {
            color: #dc2626;
        }
        
        .notification-content span {
            font-size: 14px;
            color: var(--dark-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--gray-color);
            cursor: pointer;
            padding: 5px;
            font-size: 14px;
            transition: color 0.3s ease;
        }
        
        .notification-close:hover {
            color: var(--dark-color);
        }
        
        @media (max-width: 768px) {
            .notification {
                left: 20px;
                right: 20px;
                max-width: none;
                transform: translateY(-150%);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(notificationStyles);
});

// ====================
// Window Load Event
// ====================
window.addEventListener('load', function() {
    // Add loading class removal
    document.body.classList.add('loaded');
    
    // Preloader functionality (if needed)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});
// Logo error handling
document.addEventListener('DOMContentLoaded', function() {
    const logoImages = document.querySelectorAll('.logo-image');
    
    logoImages.forEach(logo => {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
            const logoText = this.nextElementSibling;
            if (logoText && logoText.classList.contains('logo-text')) {
                logoText.style.marginLeft = '0';
            }
            
            // Create CSS logo as fallback
            const parent = this.parentElement;
            if (parent.classList.contains('navbar-brand')) {
                const cssLogo = document.createElement('div');
                cssLogo.className = 'css-logo';
                cssLogo.innerHTML = 'N';
                parent.insertBefore(cssLogo, this);
            }
        });
    });
    
    // Add CSS for fallback logo
    const cssStyle = document.createElement('style');
    cssStyle.textContent = `
        .css-logo {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 24px;
            margin-right: 10px;
        }
        
        @media (max-width: 768px) {
            .css-logo {
                width: 35px;
                height: 35px;
                font-size: 20px;
            }
        }
        
        @media (max-width: 576px) {
            .css-logo {
                width: 30px;
                height: 30px;
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(cssStyle);
});