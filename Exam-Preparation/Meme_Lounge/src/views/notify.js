const notifySection = document.getElementById('errorBox');
let msg = notifySection.querySelector('span');

export function notify(message) {
     msg.textContent = message;
     notifySection.style.display = 'block';
     setTimeout(() => notifySection.style.display = 'none', 4000);
}