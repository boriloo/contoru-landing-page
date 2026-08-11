
(function () {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
})();

function setTheme(theme) {
    if (theme === 'system') {
        localStorage.removeItem('theme');
        document.documentElement.classList.toggle(
            'dark',
            window.matchMedia('(prefers-color-scheme: dark)').matches
        );
    } else {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
}

const modeToggleDiv = document.querySelector('.mode-toggle')

modeToggleDiv?.addEventListener('click', toggleTheme)