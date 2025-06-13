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

// Navigation data
const navStructure = [
    {
        title: "Home",
        url: "index.html"
    },
    {
        title: "About",
        url: "pages/about.html",
        subpages: [
            // Add subpage objects here if available
            // { title: "Team", url: "pages/about-team.html" }
        ]
    },
    {
        title: "Services",
        url: "pages/services.html",
        subpages: [
            // Add subpage objects here if available
            // { title: "Consulting", url: "pages/services-consulting.html" }
        ]
    },

];

function buildNav(navData, navElement) {
    navData.forEach(item => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.textContent = item.title;
        a.href = item.url;

        // Mark current page link with class "current-page"
        if (isCurrentPage(item.url)) {
            a.classList.add('current-page');
            a.setAttribute('aria-current', 'page');
        }

        li.appendChild(a);

        if (item.subpages && item.subpages.length > 0) {
            li.classList.add('has-sub');

            const ulSub = document.createElement('ul');
            item.subpages.forEach(sub => {
                const subLi = document.createElement('li');
                const subA = document.createElement('a');
                subA.textContent = sub.title;
                subA.href = sub.url;
                if (isCurrentPage(sub.url)) {
                    subA.classList.add('current-page');
                    subA.setAttribute('aria-current', 'page');
                    // expand parent as well
                    li.classList.add('expanded');
                }
                subLi.appendChild(subA);
                ulSub.appendChild(subLi);
            });
            li.appendChild(ulSub);

            // Add click handler to toggle dropdown
            a.addEventListener('click', e => {
                e.preventDefault();
                li.classList.toggle('expanded');
            });

            // Expand parent if current page is inside subpages
            if (li.classList.contains('expanded')) {
                // nothing extra to do here (already expanded)
            }
        }

        navElement.appendChild(li);
    });
}

function isCurrentPage(url) {
    // Normalize URLs relative to current page for comparison
    const page = window.location.pathname.split('/').pop();
    if (!url) return false;

    // Special case: anchor links (#contact)
    if (url.startsWith('#')) return false;

    // Get the last part of url path (filename)
    const urlPage = url.split('/').pop();

    return page === urlPage;
}

function setupSearchFilter() {
    const searchInput = document.getElementById('nav-search-input');
    const navList = document.getElementById('nav-list');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();

        const links = navList.querySelectorAll('a');

        links.forEach(a => {
            const text = a.textContent.toLowerCase();
            a.style.display = text.includes(query) ? '' : 'none';
        });

        // Also hide or show parent <li> based on visible child links for nested menus
        const listItems = navList.querySelectorAll('li');
        listItems.forEach(li => {
            // li should show if any child link is visible
            const visibleDescendants = li.querySelectorAll('a:not([style*="display: none"])');
            if (visibleDescendants.length > 0) {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const navList = document.getElementById('nav-list');
    if (navList) {
        buildNav(navStructure, navList);
        setupSearchFilter();
    }
});