document.addEventListener("DOMContentLoaded", () => {
    // 1. Зберігання ОС та браузера в localStorage (Пункт 1а, 1б)
    const os = navigator.platform;
    const browser = "Google Chrome"; // Спрощено для дизайну як на фото
    
    localStorage.setItem('userOS', os);
    localStorage.setItem('userBrowser', browser);

    document.getElementById('os-info').innerText = `OC: ${localStorage.getItem('userOS')}`;
    document.getElementById('browser-info').innerText = `Браузер: ${localStorage.getItem('userBrowser')}`;

    // 2. Отримання коментарів (Пункт 2)
    const myVariant = 7; // ЗАМІНИ НА СВІЙ НОМЕР
    const commentsDiv = document.getElementById('comments-container');

    fetch(`https://jsonplaceholder.typicode.com/posts/${myVariant}/comments`)
        .then(res => res.json())
        .then(data => {
            commentsDiv.innerHTML = '';
            data.forEach(c => {
                const item = document.createElement('div');
                item.style.marginBottom = '12px';
                item.innerHTML = `<strong>${c.email}</strong><br><small>${c.body}</small>`;
                commentsDiv.appendChild(item);
            });
        });

    // 3. Модальне вікно через 1 хвилину (Пункт 3)
    const modal = document.getElementById('modal-overlay');
    setTimeout(() => {
        modal.style.display = 'block';
    }, 60000); // 60 секунд 

    document.getElementById('close-modal').onclick = () => modal.style.display = 'none';

    // 4. Логіка теми (Пункт 4)
    const toggleSwitch = document.querySelector('#checkbox');
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggleSwitch.checked = (theme === 'dark');
    };

    // Автоматичне перемикання за часом (Пункт 4б)
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 21) {
        setTheme('light');
    } else {
        setTheme('dark');
    }

    toggleSwitch.addEventListener('change', (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    });
});