// Modal functions
function showModal(title, message) {
  document.getElementById('success-title').textContent = title;
  document.getElementById('success-message').textContent = message;
  document.getElementById('success-modal').classList.remove('hidden');
}

function hideModal() {
  document.getElementById('success-modal').classList.add('hidden');
}

function showErrorModal(title, message) {
  document.getElementById('error-title').textContent = title;
  document.getElementById('error-message').textContent = message;
  document.getElementById('error-modal').classList.remove('hidden');
}

function hideErrorModal() {
  document.getElementById('error-modal').classList.add('hidden');
}


// Show toast notification
function showToast(message, type = 'info', duration = 5000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    warning: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };
  
  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info} toast-icon"></i>
    <span>${message}</span>
    <i class="fas fa-times toast-close" onclick="this.parentElement.remove()"></i>
  `;
  
  container.appendChild(toast);
  
  // Trigger the show animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Auto-remove after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
  
  return toast;
}

// Button loading state helper
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.classList.add('btn-loading');
    button.disabled = true;
    // Store original content
    button.dataset.originalContent = button.innerHTML;
    // Set loading content
    button.innerHTML = '<span class="opacity-0">' + button.textContent.trim() + '</span>';
  } else {
    button.classList.remove('btn-loading');
    button.disabled = false;
    // Restore original content
    if (button.dataset.originalContent) {
      button.innerHTML = button.dataset.originalContent;
    }
  }
}