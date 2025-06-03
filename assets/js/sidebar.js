// API base URL
const API_BASE_URL = 'https://qr-auth-be.onrender.com/api/v1';

// Global state
let appState = {
  user: null,
  events: [],
  attendees: [],
  analytics: null,
  filteredAttendees: [],
  currentPage: 1,
  itemsPerPage: 10,
  currentFilters: {
    event: '',
    status: '',
    search: '',
  },
};

// Main initialization function
document.addEventListener('DOMContentLoaded', function () {
  // Load sidebar content
  fetch('sidebar.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('sidebar-container').innerHTML = data;
      initializeSidebar();
      loadUserData();
    })
    .catch((error) => console.error('Error loading sidebar:', error));
});

// Initialize sidebar functionality
function initializeSidebar() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('sidebar-container');
  const overlay = document.getElementById('sidebar-overlay');

  // Toggle sidebar function
  window.toggleSidebar = function () {
    sidebar.classList.toggle('sidebar-open');
    if (overlay) {
      overlay.classList.toggle('hidden');
    }
    document.body.classList.toggle('overflow-hidden');
  };

  // Set up event listeners
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      window.toggleSidebar();
    });
  }

  // Close sidebar when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', function () {
      window.toggleSidebar();
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      const isClickInsideSidebar = sidebar.contains(e.target);
      const isClickOnToggle =
        e.target === mobileMenuToggle || mobileMenuToggle.contains(e.target);

      if (
        !isClickInsideSidebar &&
        !isClickOnToggle &&
        sidebar.classList.contains('sidebar-open')
      ) {
        window.toggleSidebar();
      }
    }
  });

  // Update sidebar on resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('sidebar-open');
      if (overlay) {
        overlay.classList.add('hidden');
      }
      document.body.classList.remove('overflow-hidden');
    }
  });

  // Initialize dropdown menus
  initDropdowns();
}

// Initialize dropdown menus
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('.group');

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const menu = this.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.toggle('show');
      }

      // Close other dropdowns
      document.querySelectorAll('.dropdown-menu').forEach((otherMenu) => {
        if (otherMenu !== menu) {
          otherMenu.classList.remove('show');
        }
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-menu').forEach((menu) => {
      menu.classList.remove('show');
    });
  });
}

// Load user data
async function loadUserData() {
  try {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      window.location.href = 'index.html';
      return;
    }

    const userResponse = await fetch(`${API_BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await userResponse.json();
    const usernameDisplay = document.getElementById('username-display');

    if (usernameDisplay) {
      usernameDisplay.textContent = userData.data.user.username || 'User';
    }

    appState.user = userData.data.user;
  } catch (error) {
    console.error('Error loading user data:', error);
    // showToast('Failed to load user data', 'error');
  }
}

// Logout function
window.logout = function () {
  // showToast('Logging out...', 'info', 2000);
  setTimeout(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  }, 2000);
};
