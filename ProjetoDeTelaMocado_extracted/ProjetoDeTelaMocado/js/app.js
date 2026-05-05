// ============================================
// RegulaSUS — App.js
// Navigation, sidebar, notifications, responsive
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initRoleSelector();
  initScrollNav();
  initAnimations();
  initNotificationBell();
});

// ---------- SIDEBAR ----------
function initSidebar() {
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
  if (overlay && sidebar) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }
}

// ---------- NOTIFICATION BELL ----------
function initNotificationBell() {
  const bell = document.querySelector('.notif-bell-btn');
  if (!bell) return;
  // Bell is already an <a> tag with href, no extra JS needed
}

// ---------- ROLE SELECTOR (login page) ----------
function initRoleSelector() {
  const options = document.querySelectorAll('.role-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input');
      if (radio) radio.checked = true;
    });
  });

  const loginBtn = document.querySelector('#loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = document.querySelector('.role-option.selected input');
      if (selected) {
        const pages = {
          'medico': 'medico/dashboard.html',
          'paciente': 'paciente/dashboard.html',
          'gestor': 'gestor/dashboard.html',
          'admin': 'admin/usuarios.html'
        };
        window.location.href = pages[selected.value] || 'paciente/dashboard.html';
      } else {
        window.location.href = 'paciente/dashboard.html';
      }
    });
  }
}

// ---------- SCROLL NAV (landing page) ----------
function initScrollNav() {
  const nav = document.querySelector('.landing-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ---------- INTERSECTION OBSERVER ANIMATIONS ----------
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .actor-card, .stat-card').forEach(el => {
    observer.observe(el);
  });
}

// ---------- TABLE SEARCH ----------
document.addEventListener('input', (e) => {
  if (e.target.matches('.table-search input')) {
    const query = e.target.value.toLowerCase();
    const table = e.target.closest('.table-container').querySelector('.data-table tbody');
    if (!table) return;
    table.querySelectorAll('tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  }
});

// ---------- FILTER SELECTS ----------
document.addEventListener('change', (e) => {
  if (e.target.matches('.filter-select')) {
    const value = e.target.value.toLowerCase();
    const table = e.target.closest('.table-container') || document.querySelector('.table-container');
    if (!table) return;
    const colIndex = e.target.dataset.col;
    if (!colIndex) return;
    table.querySelectorAll('.data-table tbody tr').forEach(row => {
      if (!value) { row.style.display = ''; return; }
      const cell = row.children[parseInt(colIndex)];
      if (cell) {
        row.style.display = cell.textContent.toLowerCase().includes(value) ? '' : 'none';
      }
    });
  }
});

// ---------- MODAL ----------
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// ---------- TABS ----------
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-tab]')) {
    const tabGroup = e.target.closest('.tab-group');
    if (tabGroup) {
      tabGroup.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
    }
    const target = e.target.dataset.tab;
    const container = e.target.closest('.card, .tab-container');
    if (container) {
      container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      const pane = container.querySelector(`#${target}`);
      if (pane) pane.classList.add('active');
    }
  }
});
