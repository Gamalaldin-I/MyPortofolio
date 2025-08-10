document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form submission handler for Formspree
    const form = document.getElementById("contactForm");
    const successAlert = document.getElementById("successAlert");
    const errorAlert = document.getElementById("errorAlert");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop normal form behavior

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    successAlert.style.display = "block";
                    errorAlert.style.display = "none";
                    form.reset();
                } else {
                    successAlert.style.display = "none";
                    errorAlert.style.display = "block";
                }
            }).catch(() => {
                successAlert.style.display = "none";
                errorAlert.style.display = "block";
            });
        });
    }

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.style.background = window.scrollY > 100 
                ? 'rgba(0, 0, 0, 0.95)' 
                : 'rgba(0, 0, 0, 0.8)';
        }
    });

    // Animate elements on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Mobile menu toggle
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
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

        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

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
    createMobileMenu();

    // Typing effect
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
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => typeWriter(heroSubtitle, originalText, 50), 1000);
    }

    // CV Download Button
    const cvDownloadLink = document.querySelector('.cv-download');
    if (cvDownloadLink) {
        cvDownloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = 'files/GamalHatabaCV.pdf'; 
            link.download = 'GamalHatabaCV.pdf';
            link.click();
        });
    }

});
