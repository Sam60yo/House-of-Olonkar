// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}
function toggleMenu() {
    navLinks.classList.contains('active') ? closeMenu() : openMenu();
}

hamburger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', closeMenu);
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// ===== HERO CAROUSEL =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.dot');

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}
setInterval(() => goToSlide((currentSlide + 1) % slides.length), 4000);

// ===== SPARKLES =====
const sparkleContainer = document.getElementById('sparkles');
for (let i = 0; i < 20; i++) {
    const s = document.createElement('div');
    s.classList.add('sparkle');
    s.style.left   = Math.random() * 100 + '%';
    s.style.top    = Math.random() * 100 + '%';
    s.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
    s.style.animationDelay = (Math.random() * 5) + 's';
    const size = (3 + Math.random() * 5) + 'px';
    s.style.width  = size;
    s.style.height = size;
    sparkleContainer.appendChild(s);
}

// ===== COLLECTION CAROUSEL =====
let carouselIndex = 0;
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.card');

function getVisible() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}

function moveCarousel(dir) {
    const visibleCards = getVisible();
    const maxIndex = cards.length - visibleCards;
    carouselIndex = Math.max(0, Math.min(carouselIndex + dir, maxIndex));
    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
}

window.addEventListener('resize', () => {
    carouselIndex = 0;
    track.style.transform = 'translateX(0)';
});

// Touch swipe for collection carousel
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) moveCarousel(diff > 0 ? 1 : -1);
});

// ===== TESTIMONIALS CAROUSEL =====
let testiIndex = 0;
const testiTrack = document.getElementById('testiTrack');
const testiCards = document.querySelectorAll('.testi-card');
const testiDotsContainer = document.getElementById('testiDots');

testiCards.forEach((_, i) => {
    const d = document.createElement('div');
    d.classList.add('testi-dot');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goToTesti(i));
    testiDotsContainer.appendChild(d);
});

function goToTesti(index) {
    testiIndex = index;
    testiTrack.style.transform = `translateX(-${testiIndex * 100}%)`;
    document.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === testiIndex));
}

setInterval(() => goToTesti((testiIndex + 1) % testiCards.length), 5000);

// Touch swipe for testimonials
let testiTouchX = 0;
testiTrack.addEventListener('touchstart', e => { testiTouchX = e.touches[0].clientX; }, { passive: true });
testiTrack.addEventListener('touchend', e => {
    const diff = testiTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goToTesti((testiIndex + (diff > 0 ? 1 : -1) + testiCards.length) % testiCards.length);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const suffix = el.getAttribute('data-target') === '100' ? '%' : '+';
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + suffix;
    }, 16);
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('counter')) animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .counter').forEach(el => observer.observe(el));

// ===== FORM SUBMIT =====
function submitForm(e) {
    e.preventDefault();
    const success = document.getElementById('form-success');
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});