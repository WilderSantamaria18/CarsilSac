/* ========================================
   LAYOUT.JS - Shared Layout Logic
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    // Toggle sidebar
    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('hide');
            mainContent.classList.toggle('full');
        });
    }

    // Set active sidebar item based on current URL
    const currentPath = window.location.pathname;
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-page]');

    sidebarItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.startsWith(href) && href !== '/') {
            item.classList.add('active');
        } else if (href === '/menu/principal' && (currentPath === '/menu/principal' || currentPath === '/')) {
            item.classList.add('active');
        }
    });

    // Logout confirmation
    const logoutBtn = document.querySelector('.sidebar-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            if (!confirm('¿Desea cerrar sesión?')) {
                e.preventDefault();
            }
        });
    }

    // ========================================
    // CUSTOM MODAL LOGIC 
    // ========================================
    const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
    const modalCloseBtns = document.querySelectorAll('[data-bs-dismiss="modal"]');
    const modals = document.querySelectorAll('.modal');

    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-bs-target');
            if (targetId) {
                const modal = document.querySelector(targetId);
                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            }
        });
    });

    // Close modal via close button
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });
});
