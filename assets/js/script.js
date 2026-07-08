// ===== Preloader =====
window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide');
    }
});

// ===== Typing Effect =====
var typedText = document.getElementById('typed-text');
if (typedText) {
    var phrases = ['Graphic Designer', 'UI/UX Designer', 'Web Designer', 'Freelancer'];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function typeEffect() {
        var current = phrases[phraseIndex];
        if (isDeleting) {
            typedText.textContent = current.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 400);
                return;
            }
            setTimeout(typeEffect, 50);
        } else {
            typedText.textContent = current.substring(0, charIndex++);
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
            setTimeout(typeEffect, 80);
        }
    }
    typeEffect();
}

// ===== Counter Animation =====
var counters = document.querySelectorAll('.counter');

function animateCounters() {
    counters.forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        var current = 0;
        var increment = Math.ceil(target / 150);
        function updateCounter() {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = current;
            requestAnimationFrame(updateCounter);
        }
        updateCounter();
    });
}

// ===== Scroll Reveal =====
var revealElements = document.querySelectorAll('.glass-card, .stat-card, .gallery-card, .blog-card, .service-card');

function revealOnScroll() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 80) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

revealElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// ===== Sticky Navbar =====
window.addEventListener('scroll', function() {
    var nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
            nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.85)';
            nav.style.boxShadow = 'none';
        }
    }

    var backBtn = document.getElementById('backToTop');
    if (backBtn) {
        if (window.scrollY > 400) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    }

    revealOnScroll();
});

// ===== Back to Top =====
var backBtn = document.getElementById('backToTop');
if (backBtn) {
    backBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// ===== GALLERY FILTER - 100% WORKING =====
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    var filterBtns = document.querySelectorAll('.btn-filter');
    var galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            var filter = this.getAttribute('data-filter');

            galleryItems.forEach(function(item) {
                var category = item.getAttribute('data-category');
                
                if (filter === 'all') {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    if (category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                    }
                }
            });
        });
    });
});

// ===== Lightbox =====
document.addEventListener('DOMContentLoaded', function() {
    var lightboxModalElement = document.getElementById('lightboxModal');
    if (lightboxModalElement) {
        var lightboxModal = new bootstrap.Modal(lightboxModalElement);
        var lightboxImage = document.getElementById('lightboxImage');

        document.querySelectorAll('.gallery-card .overlay').forEach(function(overlay) {
            overlay.addEventListener('click', function(e) {
                e.stopPropagation();
                var img = this.closest('.gallery-card').querySelector('img');
                if (img) {
                    lightboxImage.src = img.src;
                    lightboxModal.show();
                }
            });
        });
    }
});

// ===== Active Nav Link =====
var currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(function(link) {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ===== Form Validation =====
var contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var inputs = contactForm.querySelectorAll('input, textarea');
        var valid = true;
        inputs.forEach(function(input) {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        if (valid) {
            alert('✅ Thank you! Your message has been sent.');
            contactForm.reset();
        } else {
            alert('⚠️ Please fill in all required fields.');
        }
    });
}

// ===== Init Counters =====
setTimeout(animateCounters, 800);

console.log('🚀 Narayan Prasad Mishra Portfolio loaded successfully!');