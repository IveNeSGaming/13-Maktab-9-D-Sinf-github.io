// IP manzillarini saqlash uchun to'plam
let userIPs = new Set();

// Oldindan localStorage-dan olingan foydalanuvchi sonini olish
let userCount = localStorage.getItem('userCount') ? parseInt(localStorage.getItem('userCount')) : 0;

// IP yuborish funksiyasi
function sendIP(ip) {
    // Agar IP manzil to'plamda bo'lmasa
    if (!userIPs.has(ip)) {
        userIPs.add(ip); // IPni to'plamga qo'shish
        userCount++; // Foydalanuvchilar raqamini oshirish

        // Foydalanuvchi sonini localStorage-ga saqlash
        localStorage.setItem('userCount', userCount);

        // Telegram API orqali xabar yuborish
        const token = '6518654563:AAHm3M2ekcpsHhB57fgb1tWvqWZN5VOPCgo'; // Telegram bot tokeni
        const chatId = '6852507131'; // Telegram chat ID
        const message = `IP: ${ip}\nRaqami: ${userCount}`;

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(`Xabar yuborildi: ${message}`);
            })
            .catch(error => {
                console.error('Xatolik:', error);
            });
    }
}

// Foydalanuvchi IP manzilini aniqlash
function getUserIP() {
    // ipify xizmatidan foydalanish
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIP = data.ip; // IP manzilini olish
            sendIP(userIP); // IPni yuborish
        })
        .catch(error => {
            console.error('IP manzilini olishda xatolik:', error);
        });
}

// Sahifa yuklanganda IPni aniqlash
window.onload = getUserIP;


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


