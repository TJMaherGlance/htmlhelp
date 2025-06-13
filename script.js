// Theme toggling script
(function() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  function updateToggleText() {
    if (body.classList.contains('dark-mode')) {
      themeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
      themeToggleBtn.textContent = 'Switch to Dark Mode';
    }
  }

  function loadTheme() {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    updateToggleText();
  }

  function toggleTheme() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    updateToggleText();
  }

  themeToggleBtn.addEventListener('click', toggleTheme);

  loadTheme();
})();
