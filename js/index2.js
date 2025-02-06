// IP manzillarini saqlash uchun to'plam
let userIPs = new Set();

// Oldindan localStorage-dan olingan foydalanuvchi sonini olish
let userCount = localStorage.getItem('userCount') ? parseInt(localStorage.getItem('userCount')) : 0;

// Telegram API ma'lumotlari
const token = '6518654563:AAHqGrQnu0Ajl3oKqjAui9MMnygieMWP21I'; // Telegram bot tokeni
const chatId = '6852507131'; // Telegram chat ID

// Qurilma haqida aniqroq ma'lumot olish funksiyasi
async function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    
    if (/Android/i.test(userAgent)) {
        const match = userAgent.match(/Android\s([0-9.]*);?\s?([A-Za-z0-9\s\-\_\/]*)?/);
        const version = match && match[1] ? match[1] : 'Noma’lum versiya';
        const model = match && match[2] ? match[2].trim() : 'Noma’lum model';

        if (/Samsung/i.test(userAgent)) return `Samsung, Android ${version}, Qurilma: ${model}`;
        if (/Huawei/i.test(userAgent)) return `Huawei, Android ${version}, Qurilma: ${model}`;
        if (/Xiaomi|Mi\s/i.test(userAgent)) return `Xiaomi, Android ${version}, Qurilma: ${model}`;
        if (/Redmi/i.test(userAgent)) return `Redmi, Android ${version}, Qurilma: ${model}`;
        if (/Oppo/i.test(userAgent)) return `Oppo, Android ${version}, Qurilma: ${model}`;
        if (/Vivo/i.test(userAgent)) return `Vivo, Android ${version}, Qurilma: ${model}`;
        if (/Realme/i.test(userAgent)) return `Realme, Android ${version}, Qurilma: ${model}`;
        if (/OnePlus/i.test(userAgent)) return `OnePlus, Android ${version}, Qurilma: ${model}`;
        if (/Google\sPixel/i.test(userAgent)) return `Google Pixel, Android ${version}, Qurilma: ${model}`;
        if (/Motorola/i.test(userAgent)) return `Motorola, Android ${version}, Qurilma: ${model}`;
        if (/Sony/i.test(userAgent)) return `Sony Xperia, Android ${version}, Qurilma: ${model}`;
        if (/LG/i.test(userAgent)) return `LG, Android ${version}, Qurilma: ${model}`;
        if (/Nokia/i.test(userAgent)) return `Nokia, Android ${version}, Qurilma: ${model}`;

        return `Android ${version}, Qurilma: ${model}`;
    } 
    else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        const match = userAgent.match(/OS\s([0-9_]+)/);
        const version = match && match[1] ? match[1].replace(/_/g, '.') : 'Noma’lum versiya';

        if (/iPhone/i.test(userAgent)) return `Apple Qurilma: iPhone, iOS ${version}`;
        if (/iPad/i.test(userAgent)) return `Apple Qurilma: iPad, iOS ${version}`;
        if (/iPod/i.test(userAgent)) return `Apple Qurilma: iPod, iOS ${version}`;

        return `Apple Qurilma: iOS ${version}`;
    }
    else if (/Windows/i.test(userAgent)) {
        if (/Windows\sPhone/i.test(userAgent)) return `Windows Phone: ${navigator.platform}`;
        return `Windows tizimi: ${navigator.platform}`;
    } 
    else if (/Mac/i.test(userAgent)) {
        return `macOS: ${navigator.platform}`;
    } 
    else if (/Linux/i.test(userAgent)) {
        return `Linux tizimi: ${navigator.platform}`;
    } 
    else {
        // Agar yuqoridagi usullar ishlamasa, API dan ma'lumot olishga harakat qiladi
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) throw new Error('API dan noto‘g‘ri javob keldi');
            const data = await response.json();
            return `${data.city}, ${data.region}, ${data.country_name}`;
        } catch (error) {
            console.error('Qurilma ma‘lumotlarini olishda xatolik:', error);
            return 'Noma’lum qurilma';
        }
    }
}

// Foydalanish:
getDeviceInfo().then(info => console.log(info));


// Google Maps havolasi va yashash manzilini olish funksiyasi
async function getLocationDetails(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();

        if (data.error) {
            return { location: 'Manzil topilmadi', mapLink: '' };
        } else {
            const { city, region, country_name, latitude, longitude } = data;
            const location = `${city}, ${region}, ${country_name}`;
            const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
            return { location, mapLink };
        }
    } catch (error) {
        console.error('Manzilni olishda xatolik:', error);
        return { location: 'Manzil topilmadi', mapLink: '' };
    }
}

// Telegramga xabar yuborish funksiyasi
function sendTelegramMessage(ip, deviceInfo, location, mapLink, buttonId = null) {
    const buttonMessage = buttonId ? `Bosilgan tugma: ${buttonId}` : '';
    const message = `🖥 *IP:* ${ip}\n👤 *Raqami:* ${userCount}\n📱 *Telefon:* ${deviceInfo}\n📍 *Manzil:* ${location}\n🔗 ${mapLink}\n${buttonMessage}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
    })
        .then(response => {
            if (!response.ok) throw new Error('Telegram xabar yuborilmadi');
            console.log(`✅ Xabar yuborildi:\n${message}`);
        })
        .catch(error => console.error('❌ Telegram xabar yuborishda xatolik:', error));
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
            const deviceInfo = await getDeviceInfo();

            // Google Maps manzili va havolasini olish
            const { location, mapLink } = await getLocationDetails(userIP);

            // Telegramga yuborish
            sendTelegramMessage(userIP, deviceInfo, location, mapLink, buttonId);
        } else if (buttonId) {
            // IP manzil to‘plamda bor, lekin tugma bosilgan
            const deviceInfo = await getDeviceInfo();
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
document.getElementById('file-upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const maxSize = 30 * 1024 * 1024; // 10 MB

    if (file.size > maxSize) {
      const errorMessage = document.getElementById('file-error-message');
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 3000);
      event.target.value = ''; // Clear the file input
    }
  });
document.getElementById('telegram-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Formani qayta yuklashning oldini oladi

    // Form ma'lumotlarini olish
    var name = document.getElementById('name-contact-form-2-uo4jGuldhP').value;
    var telegramUsername = document.getElementById('telegram-username-contact-form-2-uo4jGuldhP').value;
    var message = document.getElementById('textarea-contact-form-2-uo4jGuldhP').value;
    var file = document.getElementById('file-upload').files[0];

    // Yuboriladigan xabar formatini yaratish (bold format bilan)
    var caption = `*👤Ismi:* ${name}\n*📱Telegram Username:* ${telegramUsername}\n*📩Xabar:* ${message}`;

    // Telegram bot tokeni va chat ID
    var token = "6518654563:AAHqGrQnu0Ajl3oKqjAui9MMnygieMWP21I";
    var chat_id = "6852507131";

    if (file) {
        var formData = new FormData();
        formData.append('chat_id', chat_id);
        formData.append('caption', caption);
        formData.append('parse_mode', 'Markdown');

        if (file.type.startsWith('image/')) {
            formData.append('photo', file);
            sendFile(formData, `https://api.telegram.org/bot${token}/sendPhoto`);
        } else if (file.type.startsWith('video/')) {
            formData.append('video', file);
            sendFile(formData, `https://api.telegram.org/bot${token}/sendVideo`);
        } else {
            formData.append('document', file);
            sendFile(formData, `https://api.telegram.org/bot${token}/sendDocument`);
        }
    } else {
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chat_id,
                text: caption,
                parse_mode: 'Markdown'
            })
        })
            .then(response => handleResponse(response))
            .catch(error => handleError(error));
    }
});

function sendFile(formData, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.upload.onprogress = function (event) {
        const progressBar = document.getElementById('progress-bar');
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progressBar.style.width = percentComplete + '%';
            progressBar.style.display = 'block';
        }
    };

    xhr.onload = function () {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.display = 'none';
        if (xhr.status === 200) {
            handleResponse({ ok: true });
        } else {
            handleError(new Error('Fayl yuborishda xatolik yuz berdi!'));
        }
    };

    xhr.onerror = function () {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.display = 'none';
        handleError(new Error('Fayl yuborishda xatolik yuz berdi!'));
    };

    xhr.send(formData);
}

function handleResponse(response) {
    if (response.ok) {
        document.getElementById('success-message').removeAttribute('hidden');
        // Form maydonlarini tozalash
        document.getElementById('telegram-form').reset();

        // Xabarni 0.5 soniyadan keyin yashirish
        setTimeout(function () {
            document.getElementById('success-message').setAttribute('hidden', 'hidden');
        }, 2000);
    } else {
        throw new Error('Fayl yuborishda xatolik yuz berdi!');
    }
}

function handleError(error) {
    document.getElementById('error-message').removeAttribute('hidden');
    console.error('Xatolik:', error);
    // Xabarni 0.5 soniyadan keyin yashirish
    setTimeout(function () {
        document.getElementById('error-message').setAttribute('hidden', 'hidden');
    }, 2000);
}

//havola hatoligi
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


