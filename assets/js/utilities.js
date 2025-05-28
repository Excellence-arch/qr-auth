// utilities.js

// Helper functions that can be used across multiple pages
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
    button.disabled = true;
  } else {
    // You'll need to set this based on the original button text
    button.innerHTML = 'Original Text';
  }
}

function showToast(message, type = 'info', duration = 3000) {
  const toastContainer =
    document.getElementById('toast-container') || document.body;

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duration);
}

// Date formatting functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(timeString) {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

// Add other shared utility functions here
