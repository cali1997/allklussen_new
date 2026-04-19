/* AllKlussen040 - Main JavaScript */

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // SIDEBAR
    // =============================================

    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // Keyboard: close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSidebar();
    });

    // =============================================
    // STICKY HEADER SHADOW
    // =============================================

    const header = document.getElementById('siteHeader');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
            }
        });
    }

    // =============================================
    // ANIMATED COUNTERS
    // =============================================

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 1800;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // Intersection Observer for counters
    const counterEls = document.querySelectorAll('.stat-number, .oo-stat-num');
    if (counterEls.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counterEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: set immediately
        counterEls.forEach(function (el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) el.textContent = target;
        });
    }

    // =============================================
    // AUTO-DISMISS FLASH MESSAGES
    // =============================================

    const flashMsgs = document.querySelectorAll('.flash-msg');
    flashMsgs.forEach(function (msg) {
        setTimeout(function () {
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 0.4s';
            setTimeout(function () { msg.remove(); }, 400);
        }, 4000);
    });

    // =============================================
    // SMOOTH SCROLL for anchor links
    // =============================================

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
