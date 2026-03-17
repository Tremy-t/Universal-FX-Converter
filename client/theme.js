// Theme handling script
const storageKey = 'theme-preference';

const getColorPreference = () => {
    if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setPreference = (theme) => {
    localStorage.setItem(storageKey, theme);
    reflectPreference();
};

const reflectPreference = () => {
    const theme = getColorPreference();
    document.documentElement.setAttribute('data-theme', theme);
    
    // Safety check for body (script usually runs in <head>)
    if (document.body) {
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            if (document.body) document.body.classList.remove('theme-transitioning');
        }, 500);
    }

    const toggle = document.querySelector('#theme-toggle');
    if (toggle) {
        toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.innerHTML = theme === 'dark' 
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.4))"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
};

// Apply theme to documentElement immediately (safe in <head>)
document.documentElement.setAttribute('data-theme', getColorPreference());

window.onload = () => {
    reflectPreference();
    const toggle = document.querySelector('#theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = getColorPreference();
            setPreference(current === 'dark' ? 'light' : 'dark');
        });
    }
};

// Sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
    setPreference(matches ? 'dark' : 'light');
});
