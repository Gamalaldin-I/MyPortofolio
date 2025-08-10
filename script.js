// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.8)';
            }
        }
    });

    // Animate elements on scroll
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

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Reset animations for hero section (should be visible immediately)
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Mobile menu toggle (if you want to add a hamburger menu later)
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');

        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.color = '#e0e0e0';
        hamburger.style.fontSize = '1.5rem';
        hamburger.style.cursor = 'pointer';

        nav.appendChild(hamburger);

        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Show hamburger on mobile
        function handleResize() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                navLinks.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
            } else {
                hamburger.style.display = 'none';
                navLinks.style.display = 'flex';
                navLinks.classList.remove('active');
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize();
    }

    // Initialize mobile menu
    createMobileMenu();

    // Typing effect for hero section (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Add typing effect to hero subtitle (optional)
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }

    // ✅ CV Download Button Function
    const cvDownloadLink = document.querySelector('.cv-download');
    if (cvDownloadLink) {
        cvDownloadLink.addEventListener('click', function(e) {
            e.preventDefault();

            const link = document.createElement('a');
            link.href = 'files/GamalHatabaCV.pdf'; // ⚠️ Make sure this path is correct
            link.download = 'GamalHatabaCV.pdf'; // Optional: sets the file name
            link.click();
        });
    }

});
