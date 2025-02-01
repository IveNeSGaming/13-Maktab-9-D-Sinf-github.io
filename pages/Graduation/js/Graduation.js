// Sana va vaqtni yangilash funksiyasi
async function updateClock() {
    try {
        const response = await fetch('https://timeapi.io/api/TimeZone/zone?timeZone=Asia/Tashkent');
        const data = await response.json();
        const now = new Date(data.currentLocalTime);

        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // 12 soatli formatda soat
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();

        // Vaqtni yangilash
        document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
        // Sanani yangilash
        document.getElementById('date').innerText = `${day}.${month}.${year}`;
    } catch (error) {
        console.error('Vaqtni yangilashda xatolik:', error);
    }
}

// Hisoblash funksiyasi (qancha kun qoldi)
async function updateCountdown() {
    try {
        const response = await fetch('https://timeapi.io/api/TimeZone/zone?timeZone=Asia/Tashkent');
        const data = await response.json();
        const now = new Date(data.currentLocalTime);
        const targetDate = new Date('2025-05-25T00:00:00+05:00');
        const difference = targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const weeks = (days / 7).toFixed(1);
        const hours = (difference / (1000 * 60 * 60)).toFixed(4);

        document.getElementById('days').innerText = `${days} kun ${new Date(difference).getUTCHours()} soat ${new Date(difference).getUTCMinutes()} daqiqa ${new Date(difference).getUTCSeconds()} soniya`;
        document.getElementById('weeks').innerText = `${weeks} hafta`;
        document.getElementById('hours').innerText = `${hours} soat`;
    } catch (error) {
        console.error('Hisoblashda xatolik:', error);
    }
}

// Dastlabki yangilash
updateClock();
updateCountdown();

// Har bir soniyada yangilab turish
setInterval(updateClock, 1000);
setInterval(updateCountdown, 1000);
