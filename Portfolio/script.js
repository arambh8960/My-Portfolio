// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');
const openIcon = document.querySelector('.open-icon');
const closeIcon = document.querySelector('.close-icon');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    if (navList.classList.contains('active')) {
        openIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if(navList.classList.contains('active')){
            navList.classList.remove('active');
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
});

// Scroll Reveal & Active Links
const reveals = document.querySelectorAll('.reveal');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    
    // Transparent / Solid Navbar depending on scroll
    if(window.scrollY > 50) {
        header.style.background = 'rgba(2, 6, 23, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        header.style.background = 'rgba(2, 6, 23, 0.8)';
        header.style.boxShadow = 'none';
    }
    
    // Reveal matching elements
    reveals.forEach(revealEl => {
        const elementTop = revealEl.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            revealEl.classList.add('active');
        }
    });

    // Update active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - windowHeight / 3) {
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

// Initial Reveal Check
setTimeout(() => {
    reveals.forEach(revealEl => {
        if (revealEl.getBoundingClientRect().top < window.innerHeight - 100) {
            revealEl.classList.add('active');
        }
    });
}, 100);

/* ----------------------
   Typewriter (hero roles)
   ---------------------- */
(() => {
    const roleEl = document.querySelector('.role');
    if (!roleEl) return;
    const out = roleEl.querySelector('.typewriter');
    let roles = [];
    try {
        roles = JSON.parse(roleEl.getAttribute('data-roles'));
    } catch (e) {
        roles = [roleEl.textContent.trim()];
    }

    let ix = 0, pos = 0, deleting = false;
    const typeSpeed = 80;

    function tick() {
        const cur = roles[ix % roles.length];
        if (!deleting) {
            out.textContent = cur.slice(0, pos + 1);
            pos++;
            if (pos === cur.length) {
                deleting = true;
                setTimeout(tick, 900);
                return;
            }
        } else {
            out.textContent = cur.slice(0, pos - 1);
            pos--;
            if (pos === 0) {
                deleting = false;
                ix++;
            }
        }
        setTimeout(tick, deleting ? typeSpeed / 2 : typeSpeed);
    }

    tick();
})();

/* ----------------------
   Theme toggle (light/dark)
   ---------------------- */
(function() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const root = document.body;
    const storageKey = 'portfolio-theme';

    function applyTheme(theme) {
        if (theme === 'light') {
            root.classList.add('light-theme');
            btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            root.classList.remove('light-theme');
            btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    const saved = localStorage.getItem(storageKey) || 'dark';
    applyTheme(saved);

    btn.addEventListener('click', () => {
        const cur = root.classList.contains('light-theme') ? 'light' : 'dark';
        const next = cur === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(storageKey, next);
    });
})();

/* ----------------------
   Back to top button
   ---------------------- */
(function() {
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backBtn.classList.add('show');
        else backBtn.classList.remove('show');
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ----------------------
   Card tilt on pointer devices
   ---------------------- */
(function() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    cards.forEach(card => {
        card.classList.add('tilt');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            const cx = rect.width/2;
            const cy = rect.height/2;
            const dx = (x - cx) / cx; // -1 .. 1
            const dy = (y - cy) / cy;
            const rotateX = (-dy * 6).toFixed(2);
            const rotateY = (dx * 6).toFixed(2);
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
})();
