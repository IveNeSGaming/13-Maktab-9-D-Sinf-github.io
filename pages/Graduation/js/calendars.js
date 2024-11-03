// O'quvchilar ma'lumotlari
const students = [
    { raqam: 1, ism: 'Laziz', familya: 'Abdullayev', tugulgan_kun: '13.06.2009' },
    { raqam: 2, ism: 'G\'olib', familya: 'Abduraimov', tugulgan_kun: '12.02.2009' },
    { raqam: 3, ism: 'Ruslan', familya: 'Abrorov', tugulgan_kun: '02.02.2009' },
    { raqam: 4, ism: 'Ozodbek', familya: 'Amirkulov', tugulgan_kun: '03.05.2009' },
    { raqam: 5, ism: 'Fotima', familya: 'Axatova', tugulgan_kun: '24.04.2009' },
    { raqam: 6, ism: 'Zuxra', familya: 'Axatova', tugulgan_kun: '24.04.2009' },
    { raqam: 7, ism: 'Zulfiya', familya: 'Baxriddinova', tugulgan_kun: '01.07.2009' },
    { raqam: 8, ism: 'Joxongi', familya: 'Boybo\'riyev', tugulgan_kun: '14.04.2009' },
    { raqam: 9, ism: 'Sardor', familya: 'Bozorboyev', tugulgan_kun: '31.12.2009' },
    { raqam: 10, ism: 'Kumush', familya: 'Ernazarova', tugulgan_kun: '18.09.2009' },
    { raqam: 11, ism: 'Sevinch', familya: 'Fayzullayeva', tugulgan_kun: '11.06.2009' },
    { raqam: 12, ism: 'Durdona', familya: 'Meliyeva', tugulgan_kun: '31.08.2009' },
    { raqam: 13, ism: 'Shohjahon', familya: 'Musurmonov ', tugulgan_kun: '29.01.2009' },
    { raqam: 14, ism: 'Bibigul', familya: 'Muxtorova', tugulgan_kun: '09.05.2009' },
    { raqam: 15, ism: 'Suhrob', familya: 'O\'ktamov', tugulgan_kun: '09.11.2009' },
    { raqam: 16, ism: 'Sarvara', familya: 'O\'ktamova ', tugulgan_kun: '30.01.2009' },
    { raqam: 17, ism: 'Odina', familya: 'Odilova', tugulgan_kun: '22.01.2010' },
    { raqam: 18, ism: 'Gulbahor', familya: 'O\'ktamova ', tugulgan_kun: '21.03.2010' },
    { raqam: 19, ism: 'Ulug\'bek', familya: 'Po\'latov', tugulgan_kun: '10.09.2009' },
    { raqam: 20, ism: 'Adizjon', familya: 'Sharipov ', tugulgan_kun: '02.07.2009' },
    { raqam: 21, ism: 'Islombek', familya: 'Suyarqulov', tugulgan_kun: '08.10.2009' },
    { raqam: 22, ism: 'Munisa', familya: 'Suyunboyeva', tugulgan_kun: '19.01.2009' },
    { raqam: 23, ism: 'Shoxruz', familya: 'Tursunpulotov', tugulgan_kun: '26.01.2010' },
    { raqam: 24, ism: 'Diana', familya: 'Urdusheva', tugulgan_kun: '26.07.2009' },
    { raqam: 25, ism: 'Asilbek', familya: 'Xolmo\'minov', tugulgan_kun: '02.11.2009' },
    { raqam: 26, ism: 'Alijon', familya: 'Xudoyberdiyev', tugulgan_kun: '22.04.2009' },
    { raqam: 27, ism: 'Izzat', familya: 'Zokirov', tugulgan_kun: '27.03.2009' },
];

// O'zbekiston vaqti bilan bugungi sana
const uzbDate = new Date(new Intl.DateTimeFormat('uz-UZ', { timeZone: 'Asia/Tashkent' }).format(new Date()));

// Tug'ilgan kunni keyingi yilga moslash, agar joriy yilda o'tgan bo'lsa
function calculateUpcomingBirthday(student) {
    const [day, month, year] = student.tugulgan_kun.split('.').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const thisYear = uzbDate.getFullYear();

    // Joriy yilga tug'ilgan kunni moslash
    let nextBirthday = new Date(thisYear, month - 1, day);

    // Agar tug'ilgan kun bugungi sanaga to'g'ri kelsa
    if (
        nextBirthday.getDate() === uzbDate.getDate() &&
        nextBirthday.getMonth() === uzbDate.getMonth()
    ) {
        return {
            ism: student.ism,
            familya: student.familya,
            tugulgan_kun: student.tugulgan_kun,
            message: `Bugun tug'ilgan kuni, tabriklaymiz!`,
            daysLeft: 0,
            age: thisYear - year
        };
    }

    // Agar tug'ilgan kun bugungi sanadan o'tgan bo'lsa, keyingi yilga o'tkazish
    if (nextBirthday < uzbDate) {
        nextBirthday.setFullYear(thisYear + 1);
    }

    // Tug'ilgan kunga qolgan kunlar va yoshini hisoblash
    const daysLeft = Math.ceil((nextBirthday - uzbDate) / (1000 * 60 * 60 * 24));
    const age = nextBirthday.getFullYear() - year;

    return {
        ism: student.ism,
        familya: student.familya,
        tugulgan_kun: student.tugulgan_kun,
        message: '',
        daysLeft: daysLeft,
        age: age
    };
}

// Har bir o'quvchi uchun yaqin tug'ilgan kunlarni hisoblash
const upcomingBirthdays = students.map(calculateUpcomingBirthday);
upcomingBirthdays.sort((a, b) => a.daysLeft - b.daysLeft);

// Animatsiyali slayder uchun index o'rnatish
let currentIndex = 0;
const studentInfoDiv = document.getElementById('student-info');

// Ma'lumotlarni ekranga chiqarish funksiyasi
function displayStudent() {
    const student = upcomingBirthdays[currentIndex];

    // Agar student ma'lumotlari bo'lmasa
    if (!student) {
        console.error("Student not found for current index:", currentIndex);
        return; // Agar student bo'lmasa, funksiyadan chiqamiz
    }

    const message = student.message || `Qolgan kunlar: ${student.daysLeft} kun, Yoshiga kiradi: ${student.age} yosh`;

    studentInfoDiv.innerHTML = `
        <span class="highlight">${student.ism} ${student.familya}</span> <br>
        Tug'ilgan kuni: ${student.tugulgan_kun} <br>
        ${message}
    `;
    studentInfoDiv.classList.add('show');

    // Slayder animatsiyasini o'chirish va keyingi o'quvchini ko'rsatish
    setTimeout(() => {
        studentInfoDiv.classList.remove('show');
        currentIndex = (currentIndex + 1) % upcomingBirthdays.length;
        setTimeout(displayStudent, 1000); // Navbatdagi o'quvchi chiqishidan oldin kutish
    }, 3000);
}

// Boshlanishi
displayStudent();