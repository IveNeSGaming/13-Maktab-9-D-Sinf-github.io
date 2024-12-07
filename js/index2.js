// IP manzillarini saqlash uchun to'plam
let userIPs = new Set();

// Oldindan localStorage-dan olingan foydalanuvchi sonini olish
let userCount = localStorage.getItem('userCount') ? parseInt(localStorage.getItem('userCount')) : 0;

// Telegram API ma'lumotlari
const token = '6518654563:AAHm3M2ekcpsHhB57fgb1tWvqWZN5VOPCgo'; // Telegram bot tokeni
const chatId = '6852507131'; // Telegram chat ID



// Qurilma haqida aniqroq ma'lumot olish funksiyasi
function getDeviceInfo() {
    const userAgent = navigator.userAgent;

    if (/Android/i.test(userAgent)) {
        const match = userAgent.match(/Android\s([0-9.]*);?\s?([A-Za-z0-9\s\-]*)?/);
        const version = match && match[1] ? match[1] : 'Noma’lum versiya';
        const model = match && match[2] ? match[2].trim() : 'Noma’lum model';
        return `Android ${version}, Qurilma: ${model}`;
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        const match = userAgent.match(/iPhone\sOS\s([0-9_]+)/);
        const version = match && match[1] ? match[1].replace('_', '.') : 'Noma’lum versiya';
        return `Apple Qurilma: iPhone, iOS ${version}`;
    } else if (/Windows/i.test(userAgent)) {
        return `Windows tizimi: ${navigator.platform}`;
    } else if (/Mac/i.test(userAgent)) {
        return `macOS: ${navigator.platform}`;
    } else {
        return 'Noma’lum qurilma';
    }
}

// Google Maps havolasi va yashash manzilini olish funksiyasi
async function getLocationDetails(ip) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();

        if (data.status === 'success') {
            const { city, regionName, country, lat, lon } = data;
            const location = `${city}, ${regionName}, ${country}`;
            const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
            return { location, mapLink };
        } else {
            return { location: 'Manzil topilmadi', mapLink: '' };
        }
    } catch (error) {
        console.error('Manzilni olishda xatolik:', error);
        return { location: 'Manzil topilmadi', mapLink: '' };
    }
}

// Telegramga xabar yuborish funksiyasi
function sendTelegramMessage(ip, deviceInfo, location, mapLink, buttonId = null) {
    const buttonMessage = buttonId ? `Bosilgan tugma: ${buttonId}` : '';
    const message = `IP: ${ip}\nRaqami: ${userCount}\nTelifoni: ${deviceInfo}\nYashash manzili: ${location}\n${mapLink}\n${buttonMessage}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
        .then(response => {
            if (!response.ok) throw new Error('Telegram xabar yuborilmadi');
            console.log(`Xabar yuborildi:\n${message}`);
        })
        .catch(error => console.error('Telegram xabar yuborishda xatolik:', error));
}

// Foydalanuvchi IP manzilini aniqlash
async function getUserIP(buttonId = null) {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;

        // IP manzil to‘plamda bo‘lmasa
        if (!userIPs.has(userIP)) {
            userIPs.add(userIP); // To‘plamga qo‘shish
            userCount++; // Foydalanuvchi raqamini oshirish

            // LocalStorage-ga saqlash
            localStorage.setItem('userCount', userCount);

            // Qurilma ma’lumotlarini olish
            const deviceInfo = getDeviceInfo();

            // Google Maps manzili va havolasini olish
            const { location, mapLink } = await getLocationDetails(userIP);

            // Telegramga yuborish
            sendTelegramMessage(userIP, deviceInfo, location, mapLink, buttonId);
        } else if (buttonId) {
            // IP manzil to‘plamda bor, lekin tugma bosilgan
            const deviceInfo = getDeviceInfo();
            const { location, mapLink } = await getLocationDetails(userIP);
            sendTelegramMessage(userIP, deviceInfo, location, mapLink, buttonId);
        }
    } catch (error) {
        console.error('IP manzilni aniqlashda xatolik:', error);
    }
}

// Tugmalarni bosilganda ishlovchi hodisa
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', event => {
        const buttonId = event.target.id; // Tugmaning ID sini olish
        getUserIP(buttonId); // Tugma ID sini Telegramga yuborish uchun qo'shamiz
    });
});

// Sahifa yuklanganda foydalanuvchi IP manzilini olish
window.onload = () => getUserIP();


//telegramga habar yuborish
document.getElementById('telegram-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Formani qayta yuklashning oldini oladi

    // Form ma'lumotlarini olish
    var name = document.getElementById('name-contact-form-2-uo4jGuldhP').value;
    var telegramUsername = document.getElementById('telegram-username-contact-form-2-uo4jGuldhP').value;
    var message = document.getElementById('textarea-contact-form-2-uo4jGuldhP').value;

    // Yuboriladigan xabar formatini yaratish (bold va italic format bilan)
    var text = "Ismi: " + name + "\nTelegram Username: " + telegramUsername + "\nXabar: " + message;

    // Telegram bot tokeni va chat ID
    var token = "6518654563:AAHm3M2ekcpsHhB57fgb1tWvqWZN5VOPCgo";
    var chat_id = "6852507131";
    var url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Xabarni yuborish
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chat_id,
            text: text,
        })
    })
        .then(response => {
            if (response.ok) {
                document.getElementById('success-message').removeAttribute('hidden');
                // Form maydonlarini tozalash
                document.getElementById('telegram-form').reset();

                // Xabarni 0.5 soniyadan keyin yashirish
                setTimeout(function () {
                    document.getElementById('success-message').setAttribute('hidden', 'hidden');
                }, 2000);
            } else {
                throw new Error('Xatolik yuz berdi!');
            }
        })
        .catch(error => {
            document.getElementById('error-message').removeAttribute('hidden');
            console.error('Xatolik:', error);
            // Xabarni 0.5 soniyadan keyin yashirish
            setTimeout(function () {
                document.getElementById('error-message').setAttribute('hidden', 'hidden');
            }, 2000);
        });
});


///havola hatoligi
document.getElementById('myLink1').addEventListener('click', function (event) {
    event.preventDefault(); // Havolani ochishni to'xtatish
    document.getElementById('errorMessage1').style.display = 'block'; // Xabarni ko'rsatish

    // 1 soniyadan so'ng xabarni yo'qotish
    setTimeout(function () {
        document.getElementById('errorMessage1').style.display = 'none'; // Xabarni yashirish
    }, 1090); // 1000 millisekund = 1 soniya
});

document.getElementById('myLink2').addEventListener('click', function (event) {
    event.preventDefault(); // Havolani ochishni to'xtatish
    document.getElementById('errorMessage2').style.display = 'block'; // Xabarni ko'rsatish

    // 1 soniyadan so'ng xabarni yo'qotish
    setTimeout(function () {
        document.getElementById('errorMessage2').style.display = 'none'; // Xabarni yashirish
    }, 1090); // 1000 millisekund = 1 soniya
});


