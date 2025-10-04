document.addEventListener("DOMContentLoaded", function () {
    // --- DOM Elements ---
    const surahSearch = document.getElementById('surah-search');
    const surahSelect = document.getElementById('surah-select');
    const quranPage = document.getElementById('quran-page');
    const quranText = document.getElementById('quran-text');
    const reciterSelect = document.getElementById('reciter-select');
    const quranAudio = document.getElementById('quran-audio');
    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontDecreaseBtn = document.getElementById('font-decrease');

    // --- State ---
    let currentSurahNumber = 1;
    let currentFontSize = 1.8; // in rem

    // --- Data ---
    const surahNames = [
        {number: 1, name: "الفاتحة", ayahs: 7, revelation_place: 'makkah'},
        {number: 2, name: "البقرة", ayahs: 286, revelation_place: 'madinah'},
        {number: 3, name: "آل عمران", ayahs: 200, revelation_place: 'madinah'},
        {number: 4, name: "النساء", ayahs: 176, revelation_place: 'madinah'},
        {number: 5, name: "المائدة", ayahs: 120, revelation_place: 'madinah'},
        {number: 6, name: "الأنعام", ayahs: 165, revelation_place: 'makkah'},
        {number: 7, name: "الأعراف", ayahs: 206, revelation_place: 'makkah'},
        {number: 8, name: "الأنفال", ayahs: 75, revelation_place: 'madinah'},
        {number: 9, name: "التوبة", ayahs: 129, revelation_place: 'madinah'},
        {number: 10, name: "يونس", ayahs: 109, revelation_place: 'makkah'},
        {number: 11, name: "هود", ayahs: 123, revelation_place: 'makkah'},
        {number: 12, name: "يوسف", ayahs: 111, revelation_place: 'makkah'},
        {number: 13, name: "الرعد", ayahs: 43, revelation_place: 'madinah'},
        {number: 14, name: "إبراهيم", ayahs: 52, revelation_place: 'makkah'},
        {number: 15, name: "الحجر", ayahs: 99, revelation_place: 'makkah'},
        {number: 16, name: "النحل", ayahs: 128, revelation_place: 'makkah'},
        {number: 17, name: "الإسراء", ayahs: 111, revelation_place: 'makkah'},
        {number: 18, name: "الكهف", ayahs: 110, revelation_place: 'makkah'},
        {number: 19, name: "مريم", ayahs: 98, revelation_place: 'makkah'},
        {number: 20, name: "طه", ayahs: 135, revelation_place: 'makkah'},
        {number: 21, name: "الأنبياء", ayahs: 112, revelation_place: 'makkah'},
        {number: 22, name: "الحج", ayahs: 78, revelation_place: 'madinah'},
        {number: 23, name: "المؤمنون", ayahs: 118, revelation_place: 'makkah'},
        {number: 24, name: "النور", ayahs: 64, revelation_place: 'madinah'},
        {number: 25, name: "الفرقان", ayahs: 77, revelation_place: 'makkah'},
        {number: 26, name: "الشعراء", ayahs: 227, revelation_place: 'makkah'},
        {number: 27, name: "النمل", ayahs: 93, revelation_place: 'makkah'},
        {number: 28, name: "القصص", ayahs: 88, revelation_place: 'makkah'},
        {number: 29, name: "العنكبوت", ayahs: 69, revelation_place: 'makkah'},
        {number: 30, name: "الروم", ayahs: 60, revelation_place: 'makkah'},
        {number: 31, name: "لقمان", ayahs: 34, revelation_place: 'makkah'},
        {number: 32, name: "السجدة", ayahs: 30, revelation_place: 'makkah'},
        {number: 33, name: "الأحزاب", ayahs: 73, revelation_place: 'madinah'},
        {number: 34, name: "سبأ", ayahs: 54, revelation_place: 'makkah'},
        {number: 35, name: "فاطر", ayahs: 45, revelation_place: 'makkah'},
        {number: 36, name: "يس", ayahs: 83, revelation_place: 'makkah'},
        {number: 37, name: "الصافات", ayahs: 182, revelation_place: 'makkah'},
        {number: 38, name: "ص", ayahs: 88, revelation_place: 'makkah'},
        {number: 39, name: "الزمر", ayahs: 75, revelation_place: 'makkah'},
        {number: 40, name: "غافر", ayahs: 85, revelation_place: 'makkah'},
        {number: 41, name: "فصلت", ayahs: 54, revelation_place: 'makkah'},
        {number: 42, name: "الشورى", ayahs: 53, revelation_place: 'makkah'},
        {number: 43, name: "الزخرف", ayahs: 89, revelation_place: 'makkah'},
        {number: 44, name: "الدخان", ayahs: 59, revelation_place: 'makkah'},
        {number: 45, name: "الجاثية", ayahs: 37, revelation_place: 'makkah'},
        {number: 46, name: "الأحقاف", ayahs: 35, revelation_place: 'makkah'},
        {number: 47, name: "محمد", ayahs: 38, revelation_place: 'madinah'},
        {number: 48, name: "الفتح", ayahs: 29, revelation_place: 'madinah'},
        {number: 49, name: "الحجرات", ayahs: 18, revelation_place: 'madinah'},
        {number: 50, name: "ق", ayahs: 45, revelation_place: 'makkah'},
        {number: 51, name: "الذاريات", ayahs: 60, revelation_place: 'makkah'},
        {number: 52, name: "الطور", ayahs: 49, revelation_place: 'makkah'},
        {number: 53, name: "النجم", ayahs: 62, revelation_place: 'makkah'},
        {number: 54, name: "القمر", ayahs: 55, revelation_place: 'makkah'},
        {number: 55, name: "الرحمن", ayahs: 78, revelation_place: 'madinah'},
        {number: 56, name: "الواقعة", ayahs: 96, revelation_place: 'makkah'},
        {number: 57, name: "الحديد", ayahs: 29, revelation_place: 'madinah'},
        {number: 58, name: "المجادلة", ayahs: 22, revelation_place: 'madinah'},
        {number: 59, name: "الحشر", ayahs: 24, revelation_place: 'madinah'},
        {number: 60, name: "الممتحنة", ayahs: 13, revelation_place: 'madinah'},
        {number: 61, name: "الصف", ayahs: 14, revelation_place: 'madinah'},
        {number: 62, name: "الجمعة", ayahs: 11, revelation_place: 'madinah'},
        {number: 63, name: "المنافقون", ayahs: 11, revelation_place: 'madinah'},
        {number: 64, name: "التغابن", ayahs: 18, revelation_place: 'madinah'},
        {number: 65, name: "الطلاق", ayahs: 12, revelation_place: 'madinah'},
        {number: 66, name: "التحريم", ayahs: 12, revelation_place: 'madinah'},
        {number: 67, name: "الملك", ayahs: 30, revelation_place: 'makkah'},
        {number: 68, name: "القلم", ayahs: 52, revelation_place: 'makkah'},
        {number: 69, name: "الحاقة", ayahs: 52, revelation_place: 'makkah'},
        {number: 70, name: "المعارج", ayahs: 44, revelation_place: 'makkah'},
        {number: 71, name: "نوح", ayahs: 28, revelation_place: 'makkah'},
        {number: 72, name: "الجن", ayahs: 28, revelation_place: 'makkah'},
        {number: 73, name: "المزمل", ayahs: 20, revelation_place: 'makkah'},
        {number: 74, name: "المدثر", ayahs: 56, revelation_place: 'makkah'},
        {number: 75, name: "القيامة", ayahs: 40, revelation_place: 'makkah'},
        {number: 76, name: "الإنسان", ayahs: 31, revelation_place: 'madinah'},
        {number: 77, name: "المرسلات", ayahs: 50, revelation_place: 'makkah'},
        {number: 78, name: "النبأ", ayahs: 40, revelation_place: 'makkah'},
        {number: 79, name: "النازعات", ayahs: 46, revelation_place: 'makkah'},
        {number: 80, name: "عبس", ayahs: 42, revelation_place: 'makkah'},
        {number: 81, name: "التكوير", ayahs: 29, revelation_place: 'makkah'},
        {number: 82, name: "الانفطار", ayahs: 19, revelation_place: 'makkah'},
        {number: 83, name: "المطففين", ayahs: 36, revelation_place: 'makkah'},
        {number: 84, name: "الانشقاق", ayahs: 25, revelation_place: 'makkah'},
        {number: 85, name: "البروج", ayahs: 22, revelation_place: 'makkah'},
        {number: 86, name: "الطارق", ayahs: 17, revelation_place: 'makkah'},
        {number: 87, name: "الأعلى", ayahs: 19, revelation_place: 'makkah'},
        {number: 88, name: "الغاشية", ayahs: 26, revelation_place: 'makkah'},
        {number: 89, name: "الفجر", ayahs: 30, revelation_place: 'makkah'},
        {number: 90, name: "البلد", ayahs: 20, revelation_place: 'makkah'},
        {number: 91, name: "الشمس", ayahs: 15, revelation_place: 'makkah'},
        {number: 92, name: "الليل", ayahs: 21, revelation_place: 'makkah'},
        {number: 93, name: "الضحى", ayahs: 11, revelation_place: 'makkah'},
        {number: 94, name: "الشرح", ayahs: 8, revelation_place: 'makkah'},
        {number: 95, name: "التين", ayahs: 8, revelation_place: 'makkah'},
        {number: 96, name: "العلق", ayahs: 19, revelation_place: 'makkah'},
        {number: 97, name: "القدر", ayahs: 5, revelation_place: 'makkah'},
        {number: 98, name: "البينة", ayahs: 8, revelation_place: 'madinah'},
        {number: 99, name: "الزلزلة", ayahs: 8, revelation_place: 'madinah'},
        {number: 100, name: "العاديات", ayahs: 11, revelation_place: 'makkah'},
        {number: 101, name: "القارعة", ayahs: 11, revelation_place: 'makkah'},
        {number: 102, name: "التكاثر", ayahs: 8, revelation_place: 'makkah'},
        {number: 103, name: "العصر", ayahs: 3, revelation_place: 'makkah'},
        {number: 104, name: "الهمزة", ayahs: 9, revelation_place: 'makkah'},
        {number: 105, name: "الفيل", ayahs: 5, revelation_place: 'makkah'},
        {number: 106, name: "قريش", ayahs: 4, revelation_place: 'makkah'},
        {number: 107, name: "الماعون", ayahs: 7, revelation_place: 'makkah'},
        {number: 108, name: "الكوثر", ayahs: 3, revelation_place: 'makkah'},
        {number: 109, name: "الكافرون", ayahs: 6, revelation_place: 'makkah'},
        {number: 110, name: "النصر", ayahs: 3, revelation_place: 'madinah'},
        {number: 111, name: "المسد", ayahs: 5, revelation_place: 'makkah'},
        {number: 112, name: "الإخلاص", ayahs: 4, revelation_place: 'makkah'},
        {number: 113, name: "الفلق", ayahs: 5, revelation_place: 'makkah'},
        {number: 114, name: "الناس", ayahs: 6, revelation_place: 'makkah'}
    ];

    // --- Functions ---
    
    function populateSurahSelect() {
        surahSelect.innerHTML = '';
        surahNames.forEach(surah => {
            const option = document.createElement('option');
            option.value = surah.number;
            option.textContent = `${surah.number}. ${surah.name} (${surah.ayahs} آيات)`;
            surahSelect.appendChild(option);
        });
    }

    function showLoading(isLoading) {
        if (isLoading) {
            quranPage.classList.add('loading');
            quranText.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> جاري تحميل السورة...</div>';
        } else {
            quranPage.classList.remove('loading');
            quranText.innerHTML = '';
        }
    }

    function showError(message) {
        quranText.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
    }

    async function fetchSurah(surahNumber) {
        currentSurahNumber = surahNumber;
        showLoading(true);
        try {
            const [versesResponse, chapterResponse] = await Promise.all([
                fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahNumber}`),
                fetch(`https://api.quran.com/api/v4/chapters/${surahNumber}`)
            ]);

            if (!versesResponse.ok || !chapterResponse.ok) {
                throw new Error('فشل الاتصال بالشبكة');
            }
            const versesData = await versesResponse.json();
            const chapterData = await chapterResponse.json();

            if (versesData.verses && chapterData.chapter) {
                displaySurah(versesData.verses, chapterData.chapter);
                updateAudioSource(surahNumber);
            } else {
                throw new Error('تنسيق البيانات غير صالح');
            }
        } catch (error) {
            console.error("Error fetching Surah:", error);
            showError("تعذر تحميل السورة. يرجى المحاولة مرة أخرى.");
        } finally {
            showLoading(false);
        }
    }

    function displaySurah(verses, chapterInfo) {
        quranText.innerHTML = '';
        quranPage.scrollTop = 0;

        const surahHeader = document.createElement('div');
        surahHeader.className = 'surah-header-new';
        surahHeader.innerHTML = `
            <div class="surah-title">سورة ${chapterInfo.name_arabic}</div>
            <div class="surah-info">${chapterInfo.revelation_place === 'makkah' ? 'مكية' : 'مدنية'} - ${chapterInfo.verses_count} آيات</div>
        `;
        quranText.appendChild(surahHeader);

        if (chapterInfo.bismillah_pre) {
            const bismillah = document.createElement('div');
            bismillah.className = 'bismillah';
            bismillah.textContent = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
            quranText.appendChild(bismillah);
        }

        const ayahsContainer = document.createElement('p');
        ayahsContainer.className = 'ayahs-container';
        
        verses.forEach(ayah => {
            const ayahNumInSurah = ayah.verse_key.split(':')[1];
            const ayahText = document.createElement('span');
            ayahText.className = 'ayah';
            ayahText.textContent = ayah.text_uthmani + " ";
            
            const ayahMarker = document.createElement('span');
            ayahMarker.className = 'ayah-marker';
            ayahMarker.textContent = `\u06dd${toArabicNumber(ayahNumInSurah)}`;

            ayahsContainer.appendChild(ayahText);
            ayahsContainer.appendChild(ayahMarker);
        });

        quranText.appendChild(ayahsContainer);
    }

    function toArabicNumber(num) {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return String(num).split('').map(digit => arabicNumbers[parseInt(digit, 10)]).join('');
    }

    async function updateAudioSource(surahNumber) {
        try {
            const reciterId = reciterSelect.value;
            quranAudio.src = '';
            
            const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahNumber}`);
            if (!response.ok) throw new Error('Failed to fetch from primary API.');
            
            const data = await response.json();
            if (data.audio_file && data.audio_file.audio_url) {
                quranAudio.src = data.audio_file.audio_url;
            } else {
                throw new Error('Invalid audio data from primary API.');
            }
        } catch (error) {
            console.warn('Primary audio source failed:', error.message, 'Using fallback.');
            useFallbackAudioSource(surahNumber);
        }
    }
    
    function useFallbackAudioSource(surahNumber) {
        const reciterMap = {
            '7': 'mishari_al_afasy',
            '3': 'abdurrahmaan_as-sudais',
            '11': 'maher_al_muaiqly',
            '8': 'saad_al_ghaamidi',
            '13': 'yasser_ad-dussary',
            '9': 'muhammad_siddeeq_al-minshaawee_murattal',
            '5': 'mahmood_khaleel_al-husaree',
            '1': 'abu_bakr_ash-shaatree',
        };
        const reciterId = reciterMap[reciterSelect.value] || 'mishari_al_afasy';
        const formattedSurah = String(surahNumber).padStart(3, '0');
        quranAudio.src = `https://download.quranicaudio.com/quran/${reciterId}/${formattedSurah}.mp3`;
    }

    function changeFontSize(amount) {
        const newSize = currentFontSize + amount;
        if (newSize >= 1.2 && newSize <= 3.0) {
            currentFontSize = newSize;
            quranText.style.fontSize = `${currentFontSize}rem`;
        }
    }

    function searchSurah(query) {
        if (!query) return;
        query = query.trim().toLowerCase();
        
        const found = surahNames.find(s => s.name.toLowerCase().includes(query) || String(s.number) === query);
        
        if (found) {
            surahSelect.value = found.number;
            fetchSurah(found.number);
        } else {
            showError("لم يتم العثور على السورة المطلوبة.");
        }
    }

    function setupEventListeners() {
        surahSelect.addEventListener('change', () => fetchSurah(surahSelect.value));
        reciterSelect.addEventListener('change', () => updateAudioSource(currentSurahNumber));
        
        surahSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchSurah(surahSearch.value);
            }
        });
        
        fontIncreaseBtn.addEventListener('click', () => changeFontSize(0.1));
        fontDecreaseBtn.addEventListener('click', () => changeFontSize(-0.1));
    }

    function init() {
        populateSurahSelect();
        setupEventListeners();
        fetchSurah(1); // Load Al-Fatiha by default
    }

    init();
});
