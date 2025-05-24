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
