// API base URL
const API_BASE_URL = 'http://localhost:5000/api/v1';

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

{
  /* <script> */
}
// Load sidebar
fetch('sidebar.html')
  .then((response) => response.text())
  .then(async (data) => {
    document.getElementById('sidebar-container').innerHTML = data;
    await loadUserData(); // Load user data after sidebar is loaded
    initDropdowns(); // Initialize dropdowns after loading
  })
  .catch((error) => console.error('Error loading sidebar:', error));
{
  /* </script> */
}

// Logout function
function logout() {
  const logoutButton = document.querySelector('a[onclick="logout()"]');
  // setButtonLoading(logoutButton, true);

  showToast('Logging out...', 'info', 2000);
  setTimeout(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
  }, 2000);
}

const loadUserData = async () => {
  // Load user data
  const userResponse = await fetch(`${API_BASE_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  if (!userResponse.ok) {
    window.location.href = 'login.html';
  }
  const userData = await userResponse.json();
  document.getElementById('username-display').textContent =
    userData.data.user.username;
    appState.user = userData.data.user;
  // return userData.data.user;
};

// Initialize dropdown menus
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('.group');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', function (e) {
      const menu = this.querySelector('.dropdown-menu');
      menu.classList.toggle('show');

      // Close other dropdowns
      document.querySelectorAll('.dropdown-menu').forEach((otherMenu) => {
        if (otherMenu !== menu) {
          otherMenu.classList.remove('show');
        }
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.group')) {
      document.querySelectorAll('.dropdown-menu').forEach((menu) => {
        menu.classList.remove('show');
      });
    }
  });
}


// window.onload = async () => {
//   // Load user data
//   await loadUserData();

//   // Initialize dropdowns
//   initDropdowns();

//   // Add event listener for logout button
//   const logoutButton = document.querySelector('a[onclick="logout()"]');
//   if (logoutButton) {
//     logoutButton.addEventListener('click', logout);
//   }
// }