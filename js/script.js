document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const stackGrid = document.querySelector('.stack-grid');

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to various elements
    document.querySelectorAll('.services h2, .stack h2, .why h2, .contact h2').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero');
        const servicesSection = document.querySelector('.services');
        const stackSection = document.querySelector('.stack');
        const contactSection = document.querySelector('.contact');

        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
        if (servicesSection) {
            servicesSection.style.backgroundPosition = `center ${scrollPosition * 0.3}px`;
        }
        if (stackSection) {
            stackSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
        if (contactSection) {
            contactSection.style.backgroundPosition = `center ${scrollPosition * 0.3}px`;
        }
    });

    // Auto-scroll tech stack
    if (stackGrid) {
        let scrollPos = 0;
        const scrollSpeed = 1;
        let autoScrollInterval;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                scrollPos += scrollSpeed;
                stackGrid.scrollLeft = scrollPos;

                // Reset scroll when reaching end
                if (stackGrid.scrollLeft >= stackGrid.scrollWidth - stackGrid.clientWidth) {
                    scrollPos = 0;
                    stackGrid.scrollLeft = 0;
                }
            }, 30);
        };

        startAutoScroll();

        // Pause on hover
        stackGrid.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        stackGrid.addEventListener('mouseleave', () => startAutoScroll());
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            let name = document.getElementById("name").value;
            let service = document.getElementById("service").value;
            let message = document.getElementById("message").value;

            let whatsappNumber = "27774986080"; // replace with your WhatsApp number

            let url = `https://wa.me/${whatsappNumber}?text=Hello, my name is ${name}%0AService needed: ${service}%0AMessage: ${message}`;
            window.open(url, "_blank");
        });
    }

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('mobile-open');
            const expanded = navbar.classList.contains('mobile-open');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            if (navbar) {
                navbar.classList.remove('mobile-open');
            }
        });
    });
});
