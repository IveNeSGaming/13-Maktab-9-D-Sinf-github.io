// O'quvchilar jadvali va darslar jadvali
const jadval1Oquvchilar = [
    { raqam: 1, ism: 'Laziz', familya: 'Abdullayev', tugulgan_kun: '13.06.2009' },
    { raqam: 2, ism: 'G\'olib', familya: 'Abduraimov', tugulgan_kun: '12.02.2009' },
    { raqam: 3, ism: 'Ruslan', familya: 'Abrorov', tugulgan_kun: '02.02.2009' },
    { raqam: 4, ism: 'Ozodbek', familya: 'Amirkulov', tugulgan_kun: '03.05.2009' },
    { raqam: 5, ism: 'Fotima', familya: 'Axatova', tugulgan_kun: '24.04.2009' },
    { raqam: 6, ism: 'Zuxra', familya: 'Axatova', tugulgan_kun: '24.04.2009' },
    { raqam: 7, ism: 'Zulfiya', familya: 'Baxriddinova', tugulgan_kun: '01.07.2009' },
    { raqam: 8, ism: 'Joxongir', familya: 'Boybo\'riyev', tugulgan_kun: '14.04.2009' },
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
    { raqam: 20, ism: 'Islombek', familya: 'Suyarqulov', tugulgan_kun: '08.10.2009' },
    { raqam: 21, ism: 'Munisa', familya: 'Suyunboyeva', tugulgan_kun: '19.01.2009' },
    { raqam: 22, ism: 'Shoxruz', familya: 'Tursunpulotov', tugulgan_kun: '26.01.2010' },
    { raqam: 23, ism: 'Diana', familya: 'Urdusheva', tugulgan_kun: '26.07.2009' },
    { raqam: 24, ism: 'Asilbek', familya: 'Xolmo\'minov', tugulgan_kun: '02.11.2009' },
    { raqam: 25, ism: 'Alijon', familya: 'Xudoyberdiyev', tugulgan_kun: '22.04.2009' },
    { raqam: 26, ism: 'Go\'zal', familya: 'Yo\'ldosheva', tugulgan_kun: '18.04.2010' },
    { raqam: 27, ism: 'Izzat', familya: 'Zokirov', tugulgan_kun: '27.03.2009' },
    { raqam: 28, ism: 'Adizjon', familya: 'Sharipov ', tugulgan_kun: '02.07.2009' },
];

const jadval2Oquvchilar = [
    { raqam: 1, Dushanba: `Algebra`, Seshanba: 'Texnologiya', Chorshanba: 'Huquq', Payshanba: 'O\'zbekiston tarixi', Juma: 'Sinf soati', Shanba: 'Ingiliz tili' },
    { raqam: 2, Dushanba: 'Fizika', Seshanba: 'Algebra', Chorshanba: 'Ingliz tili', Payshanba: 'Biologiya', Juma: 'Kimyo', Shanba: 'Adabiyot' },
    { raqam: 3, Dushanba: 'Rus tili', Seshanba: 'Geometriya', Chorshanba: 'Adabiyot', Payshanba: 'Jahon tarixi', Juma: 'Jismoniy madaniyat', Shanba: 'Algebra' },
    { raqam: 4, Dushanba: 'Ona tili', Seshanba: 'Informatika', Chorshanba: 'Jismoniy madaniyat', Payshanba: 'Fizika', Juma: 'Informatika', Shanba: 'Kimyo' },
    { raqam: 5, Dushanba: 'Biologiya', Seshanba: 'Chizmachilik', Chorshanba: 'Tarbiya', Payshanba: 'Ona tili', Juma: 'Geografiya', Shanba: 'Adabiyot' },
    { raqam: 6, Dushanba: 'Ingliz tili', Seshanba: '', Chorshanba: 'O\'zbekiston tarixi', Payshanba: 'Rus tili', Juma: 'Iqtisodiyot', Shanba: 'Geometriya' },
];

const jadval3Oquvchilar = [
    { raqam: 1, Dushanba: 'Fotima', Seshanba: 'Sevinch', Chorshanba: 'Diana', Payshanba: 'Zulfiya', Juma: 'Odina', Shanba: 'Munisa' },
    { raqam: 2, Dushanba: 'Go\'zal', Seshanba: 'Durdona', Chorshanba: 'Zuhra', Payshanba: 'Gulbahor', Juma: 'Kumush', Shanba: 'Sarvara' },
    { raqam: 3, Dushanba: 'Alijon', Seshanba: 'Shoxruz', Chorshanba: 'Laziz', Payshanba: 'Shohjahon', Juma: 'Sardor', Shanba: 'Bibigul' },
    { raqam: 4, Dushanba: 'Joxongir', Seshanba: 'Izzat', Chorshanba: 'Adiz', Payshanba: 'Suhrob', Juma: 'G\'olib', Shanba: 'Ozod' },
    { raqam: 5, Dushanba: 'Islom',         Seshanba: '', Chorshanba: 'Ruslan', Payshanba: ' ', Juma: 'Asilbek', Shanba: 'Ulug\'bek' },
];
const jadval4Oquvchilar = [];

function openModal(jadvalNumber) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const oquvchiListTable = document.getElementById('oquvchiList');

    // Jadval uchun matnni aniqlash
    let titleText = '';
    switch (jadvalNumber) {
        case 1:
            titleText = "O'quvchilar ro'yxati";
            break;
        case 2:
            titleText = "Dars jadvali";
            break;
        case 3:
            titleText = "Sinf novbatchilar ro'yxati";
            break;
        case 4:
            titleText = "Qo'shimcha ma'lumotlar";
            break;
        default:
            titleText = "Jadval haqida ma'lumot";
    }

    modalText.classList.add('modal-title'); // Klass qo'shish
    modalText.innerHTML = titleText;

    // Jadvalni tozalash
    oquvchiListTable.innerHTML = '';

    let oquvchilar = [];
    if (jadvalNumber === 1) {
        oquvchilar = jadval1Oquvchilar;
        oquvchiListTable.innerHTML = `
            <tr>
                <th>№</th>
                <th>Ism</th>
                <th>Familiya</th>
                <th>Tug'ilgan kun</th>
            </tr>
        `;
        oquvchilar.forEach(oquvchi => {
            const row = `
                <tr>
                    <td>${oquvchi.raqam}</td>
                    <td>${oquvchi.ism}</td>
                    <td>${oquvchi.familya}</td>
                    <td>${oquvchi.tugulgan_kun}</td>
                </tr>
            `;
            oquvchiListTable.innerHTML += row;
        });
    } else if (jadvalNumber === 2) {
        oquvchilar = jadval2Oquvchilar;
        oquvchiListTable.innerHTML = `
            <tr>
                <th>№</th>
                <th>Dushanba</th>
                <th>Seshanba</th>
                <th>Chorshanba</th>
                <th>Payshanba</th>
                <th>Juma</th>
                <th>Shanba</th>
            </tr>
        `;
        oquvchilar.forEach(oquvchi => {
            const row = `
                <tr>
                    <td>${oquvchi.raqam}</td>
                    <td>${oquvchi.Dushanba}</td>
                    <td>${oquvchi.Seshanba}</td>
                    <td>${oquvchi.Chorshanba}</td>
                    <td>${oquvchi.Payshanba}</td>
                    <td>${oquvchi.Juma}</td>
                    <td>${oquvchi.Shanba}</td>
                </tr>
            `;
            oquvchiListTable.innerHTML += row;
        });
    } else if (jadvalNumber === 3) {
        oquvchilar = jadval3Oquvchilar;
        oquvchiListTable.innerHTML = `
            <tr>
                <th>№</th>
                <th>Dushanba</th>
                <th>Seshanba</th>
                <th>Chorshanba</th>
                <th>Payshanba</th>
                <th>Juma</th>
                <th>Shanba</th>
            </tr>
        `;
        oquvchilar.forEach(oquvchi => {
            const row = `
                <tr>
                    <td>${oquvchi.raqam}</td>
                    <td>${oquvchi.Dushanba}</td>
                    <td>${oquvchi.Seshanba}</td>
                    <td>${oquvchi.Chorshanba}</td>
                    <td>${oquvchi.Payshanba}</td>
                    <td>${oquvchi.Juma}</td>
                    <td>${oquvchi.Shanba}</td>
                </tr>
            `;
            oquvchiListTable.innerHTML += row;
        });
    } else if (jadvalNumber === 4) {
        oquvchilar = jadval4Oquvchilar;
    }

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
