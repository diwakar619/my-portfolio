/* --- Toggle Icon Navbar --- */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

/* --- Scroll Sections Active Link --- */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let targetLink = document.querySelector('header nav a[href*=' + id + ']');
                if (targetLink) targetLink.classList.add('active');
            });
        };
    });

    /* --- Sticky Navbar --- */
    let header = document.querySelector('.header');
    if (header) header.classList.toggle('sticky', window.scrollY > 100);

    /* --- Remove Toggle Icon and Navbar When Click Navbar Link (Scroll) --- */
    menuIcon?.classList.remove('bx-x');
    navbar?.classList.remove('active');
};

/* --- Typed JS --- */
if (document.querySelector('.typing')) {
    new Typed('.typing', {
        strings: ['Full Stack Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

/* --- Intersection Observer for Scroll Animations --- */
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('section, .glass:not(.cert-card), .project-box, .education-card, .contact-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});

/* --- Education Slider Logic --- */
function initEducationSlider() {
    const slider = document.querySelector('.education-slider');
    const cards = document.querySelectorAll('.education-card');
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');
    if (!slider || cards.length === 0) return;

    let counter = 0;
    const updateSlider = () => {
        const cardGap = 30;
        const cardWidth = cards[0].offsetWidth;
        const shift = (cardWidth + cardGap) * counter;
        slider.style.transform = `translateX(${-shift}px)`;
    };

    nextBtn?.addEventListener('click', () => {
        const visibleCards = window.innerWidth <= 991 ? 1 : 2;
        const maxShift = cards.length - visibleCards;
        counter = counter >= maxShift ? 0 : counter + 1;
        updateSlider();
    });

    prevBtn?.addEventListener('click', () => {
        const visibleCards = window.innerWidth <= 991 ? 1 : 2;
        const maxShift = cards.length - visibleCards;
        counter = counter <= 0 ? maxShift : counter - 1;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
}



/* --- Certification Carousel 3D Slider --- */
function initExperienceSlider() {
    const carousel = document.getElementById('cert-carousel');
    const cards = document.querySelectorAll('.cert-card');
    const nextBtn = document.querySelector('.cert-nav-btn.next');
    const prevBtn = document.querySelector('.cert-nav-btn.prev');
    if (!carousel || cards.length === 0) return;

    let activeIndex = Math.floor(cards.length / 2);
    const updateCoverflow = () => {
        const isMobile = window.innerWidth <= 768;
        const txMultiplier = isMobile ? 180 : 240;
        const N = cards.length;
        
        cards.forEach((card, i) => {
            let diff = ((i - activeIndex + N + Math.floor(N / 2)) % N) - Math.floor(N / 2);
            const absDiff = Math.abs(diff);
            card.style.setProperty('--tx', `${diff * txMultiplier}px`);
            card.style.setProperty('--tz', `${absDiff === 0 ? 0 : (absDiff === 1 ? -100 : -200)}px`);
            card.style.setProperty('--ry', `${diff * -15}deg`);
            card.style.setProperty('--sc', `${absDiff === 0 ? 1 : 0.9}`);
            card.style.zIndex = 10 - absDiff;
            card.style.opacity = absDiff > 2 ? 0 : 1;
            card.classList.toggle('active-card', absDiff === 0);
        });
    };

    nextBtn?.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % cards.length;
        updateCoverflow();
    });

    prevBtn?.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + cards.length) % cards.length;
        updateCoverflow();
    });

    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            if (activeIndex === i) {
                const modal = document.getElementById("image-modal");
                const modalImg = document.getElementById("modal-img");
                const img = card.querySelector('img');
                if (modal && modalImg && img) {
                    modal.style.display = "flex";
                    setTimeout(() => modal.classList.add('show'), 10);
                    modalImg.src = img.src;
                }
            } else {
                activeIndex = i;
                updateCoverflow();
            }
        });
    });

    window.addEventListener('resize', updateCoverflow);
    updateCoverflow();
}

/* --- Main Initialization --- */
window.addEventListener('load', () => {
    initEducationSlider();
    initExperienceSlider();
});

/* --- Image Modal Logic --- */
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const spanClose = document.querySelector(".modal-close");

if (modal && modalImg && spanClose) {
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => { modal.style.display = "none"; modalImg.src = ""; }, 300);
    };
    spanClose.onclick = closeModal;
    modal.onclick = (e) => { if (e.target !== modalImg) closeModal(); };
    document.addEventListener('keydown', (e) => { if (e.key === "Escape" && modal.classList.contains('show')) closeModal(); });
}