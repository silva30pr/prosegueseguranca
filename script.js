// Load Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Slideshow Banner
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);
showSlide(currentSlide);

// Particle Effect
const particlesContainer = document.querySelector('.particles');
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 12000);
}

setInterval(createParticle, 300);

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

setInterval(nextTestimonial, 5000);
showTestimonial(currentTestimonial);

// Scroll Animations
const animateElements = document.querySelectorAll('.animate-on-scroll');
const sections = document.querySelectorAll('section');
if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => observer.observe(el));
    sections.forEach(section => observer.observe(section));
}

// Form Submission and Popup
const form = document.getElementById('budget-form');
const popup = document.getElementById('success-popup');

function closePopup() {
    popup.classList.remove('active');
}

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Save form data to localStorage
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        localStorage.setItem(input.id, input.value);
    });

    // Prepare form data for Formspree
    const formData = new FormData(form);

    try {
        // Send form data to Formspree
        const response = await fetch('https://formspree.io/f/xeoabjqo', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success popup
            popup.classList.add('active');
            form.reset(); // Reset form fields
            // Optionally clear localStorage if desired
            // localStorage.clear();
        } else {
            console.error('Form submission failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
});