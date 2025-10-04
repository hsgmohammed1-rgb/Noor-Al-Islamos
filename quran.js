document.addEventListener("DOMContentLoaded", function () {
    const quranSection = document.getElementById('quran-section');
    if (!quranSection) return;

    // --- Static Data ---
    const ALL_SURAHS_DATA = [
        { id: 1, name_arabic: "سُورَةُ ٱلْفَاتِحَةِ", name_simple: "Al-Faatiha", revelation_place: "makkah", verses_count: 7, translated_name: { name: "The Opening" } },
        { id: 2, name_arabic: "سُورَةُ البَقَرَةِ", name_simple: "Al-Baqara", revelation_place: "madinah", verses_count: 286, translated_name: { name: "The Cow" } },
        { id: 3, name_arabic: "سُورَةُ آلِ عِمۡرَانَ", name_simple: "Aal-i-Imraan", revelation_place: "madinah", verses_count: 200, translated_name: { name: "The Family of Imraan" } },
        { id: 4, name_arabic: "سُورَةُ النِّسَاءِ", name_simple: "An-Nisaa", revelation_place: "madinah", verses_count: 176, translated_name: { name: "The Women" } },
        { id: 5, name_arabic: "سُورَةُ المَائـِدَةِ", name_simple: "Al-Maaida", revelation_place: "madinah", verses_count: 120, translated_name: { name: "The Table" } },
        { id: 6, name_arabic: "سُورَةُ الأَنۡعَامِ", name_simple: "Al-An'aam", revelation_place: "makkah", verses_count: 165, translated_name: { name: "The Cattle" } },
        { id: 7, name_arabic: "سُورَةُ الأَعۡرَافِ", name_simple: "Al-A'raaf", revelation_place: "makkah", verses_count: 206, translated_name: { name: "The Heights" } },
        { id: 8, name_arabic: "سُورَةُ الأَنفَالِ", name_simple: "Al-Anfaal", revelation_place: "madinah", verses_count: 75, translated_name: { name: "The Spoils of War" } },
        { id: 9, name_arabic: "سُورَةُ التَّوۡبَةِ", name_simple: "At-Tawba", revelation_place: "madinah", verses_count: 129, translated_name: { name: "The Repentance" } },
        { id: 10, name_arabic: "سُورَةُ يُونُسَ", name_simple: "Yunus", revelation_place: "makkah", verses_count: 109, translated_name: { name: "Jonah" } },
        { id: 11, name_arabic: "سُورَةُ هُودٍ", name_simple: "Hud", revelation_place: "makkah", verses_count: 123, translated_name: { name: "Hud" } },
        { id: 12, name_arabic: "سُورَةُ يُوسُفَ", name_simple: "Yusuf", revelation_place: "makkah", verses_count: 111, translated_name: { name: "Joseph" } },
        { id: 13, name_arabic: "سُورَةُ الرَّعۡدِ", name_simple: "Ar-Ra'd", revelation_place: "madinah", verses_count: 43, translated_name: { name: "The Thunder" } },
        { id: 14, name_arabic: "سُورَةُ إِبۡرَاهِيمَ", name_simple: "Ibrahim", revelation_place: "makkah", verses_count: 52, translated_name: { name: "Abraham" } },
        { id: 15, name_arabic: "سُورَةُ الحِجۡرِ", name_simple: "Al-Hijr", revelation_place: "makkah", verses_count: 99, translated_name: { name: "The Rock" } },
        { id: 16, name_arabic: "سُورَةُ النَّحۡلِ", name_simple: "An-Nahl", revelation_place: "makkah", verses_count: 128, translated_name: { name: "The Bee" } },
        { id: 17, name_arabic: "سُورَةُ الإِسۡرَاءِ", name_simple: "Al-Israa", revelation_place: "makkah", verses_count: 111, translated_name: { name: "The Night Journey" } },
        { id: 18, name_arabic: "سُورَةُ الكَهۡفِ", name_simple: "Al-Kahf", revelation_place: "makkah", verses_count: 110, translated_name: { name: "The Cave" } },
        { id: 19, name_arabic: "سُورَةُ مَرۡيَمَ", name_simple: "Maryam", revelation_place: "makkah", verses_count: 98, translated_name: { name: "Mary" } },
        { id: 20, name_arabic: "سُورَةُ طه", name_simple: "Taa-Haa", revelation_place: "makkah", verses_count: 135, translated_name: { name: "Taa-Haa" } },
        { id: 21, name_arabic: "سُورَةُ الأَنبِيَاءِ", name_simple: "Al-Anbiyaa", revelation_place: "makkah", verses_count: 112, translated_name: { name: "The Prophets" } },
        { id: 22, name_arabic: "سُورَةُ الحَجِّ", name_simple: "Al-Hajj", revelation_place: "madinah", verses_count: 78, translated_name: { name: "The Pilgrimage" } },
        { id: 23, name_arabic: "سُورَةُ المُؤۡمِنُونَ", name_simple: "Al-Muminoon", revelation_place: "makkah", verses_count: 118, translated_name: { name: "The Believers" } },
        { id: 24, name_arabic: "سُورَةُ النُّورِ", name_simple: "An-Noor", revelation_place: "madinah", verses_count: 64, translated_name: { name: "The Light" } },
        { id: 25, name_arabic: "سُورَةُ الفُرۡقَانِ", name_simple: "Al-Furqaan", revelation_place: "makkah", verses_count: 77, translated_name: { name: "The Criterion" } },
        { id: 26, name_arabic: "سُورَةُ الشُّعَرَاءِ", name_simple: "Ash-Shu'araa", revelation_place: "makkah", verses_count: 227, translated_name: { name: "The Poets" } },
        { id: 27, name_arabic: "سُورَةُ النَّمۡلِ", name_simple: "An-Naml", revelation_place: "makkah", verses_count: 93, translated_name: { name: "The Ant" } },
        { id: 28, name_arabic: "سُورَةُ القَصَصِ", name_simple: "Al-Qasas", revelation_place: "makkah", verses_count: 88, translated_name: { name: "The Stories" } },
        { id: 29, name_arabic: "سُورَةُ العَنكَبُوتِ", name_simple: "Al-Ankaboot", revelation_place: "makkah", verses_count: 69, translated_name: { name: "The Spider" } },
        { id: 30, name_arabic: "سُورَةُ الرُّومِ", name_simple: "Ar-Room", revelation_place: "makkah", verses_count: 60, translated_name: { name: "The Romans" } },
        { id: 31, name_arabic: "سُورَةُ لُقۡمَانَ", name_simple: "Luqman", revelation_place: "makkah", verses_count: 34, translated_name: { name: "Luqman" } },
        { id: 32, name_arabic: "سُورَةُ السَّجۡدَةِ", name_simple: "As-Sajda", revelation_place: "makkah", verses_count: 30, translated_name: { name: "The Prostration" } },
        { id: 33, name_arabic: "سُورَةُ الأَحۡزَابِ", name_simple: "Al-Ahzaab", revelation_place: "madinah", verses_count: 73, translated_name: { name: "The Clans" } },
        { id: 34, name_arabic: "سُورَةُ سَبَإٍ", name_simple: "Saba", revelation_place: "makkah", verses_count: 54, translated_name: { name: "Sheba" } },
        { id: 35, name_arabic: "سُورَةُ فَاطِرٍ", name_simple: "Faatir", revelation_place: "makkah", verses_count: 45, translated_name: { name: "The Originator" } },
        { id: 36, name_arabic: "سُورَةُ يسٓ", name_simple: "Yaseen", revelation_place: "makkah", verses_count: 83, translated_name: { name: "Yaseen" } },
        { id: 37, name_arabic: "سُورَةُ الصَّافَّاتِ", name_simple: "As-Saaffaat", revelation_place: "makkah", verses_count: 182, translated_name: { name: "Those drawn up in Ranks" } },
        { id: 38, name_arabic: "سُورَةُ صٓ", name_simple: "Saad", revelation_place: "makkah", verses_count: 88, translated_name: { name: "The letter Saad" } },
        { id: 39, name_arabic: "سُورَةُ الزُّمَرِ", name_simple: "Az-Zumar", revelation_place: "makkah", verses_count: 75, translated_name: { name: "The Groups" } },
        { id: 40, name_arabic: "سُورَةُ غَافِرٍ", name_simple: "Ghafir", revelation_place: "makkah", verses_count: 85, translated_name: { name: "The Forgiver" } },
        { id: 41, name_arabic: "سُورَةُ فُصِّلَتۡ", name_simple: "Fussilat", revelation_place: "makkah", verses_count: 54, translated_name: { name: "Explained in detail" } },
        { id: 42, name_arabic: "سُورَةُ الشُّورَىٰ", name_simple: "Ash-Shura", revelation_place: "makkah", verses_count: 53, translated_name: { name: "The Consultation" } },
        { id: 43, name_arabic: "سُورَةُ الزُّخۡرُفِ", name_simple: "Az-Zukhruf", revelation_place: "makkah", verses_count: 89, translated_name: { name: "The Ornaments of Gold" } },
        { id: 44, name_arabic: "سُورَةُ الدُّخَانِ", name_simple: "Ad-Dukhaan", revelation_place: "makkah", verses_count: 59, translated_name: { name: "The Smoke" } },
        { id: 45, name_arabic: "سُورَةُ الجَاثِيَةِ", name_simple: "Al-Jaathiya", revelation_place: "makkah", verses_count: 37, translated_name: { name: "The Kneeling" } },
        { id: 46, name_arabic: "سُورَةُ الأَحۡقَافِ", name_simple: "Al-Ahqaaf", revelation_place: "makkah", verses_count: 35, translated_name: { name: "The Sand-Dunes" } },
        { id: 47, name_arabic: "سُورَةُ مُحَمَّدٍ", name_simple: "Muhammad", revelation_place: "madinah", verses_count: 38, translated_name: { name: "Muhammad" } },
        { id: 48, name_arabic: "سُورَةُ الفَتۡحِ", name_simple: "Al-Fath", revelation_place: "madinah", verses_count: 29, translated_name: { name: "The Victory" } },
        { id: 49, name_arabic: "سُورَةُ الحُجُرَاتِ", name_simple: "Al-Hujuraat", revelation_place: "madinah", verses_count: 18, translated_name: { name: "The Dwellings" } },
        { id: 50, name_arabic: "سُورَةُ قٓ", name_simple: "Qaaf", revelation_place: "makkah", verses_count: 45, translated_name: { name: "The letter Qaaf" } },
        { id: 51, name_arabic: "سُورَةُ الذَّارِيَاتِ", name_simple: "Adh-Dhaariyat", revelation_place: "makkah", verses_count: 60, translated_name: { name: "The Wind that Scatter" } },
        { id: 52, name_arabic: "سُورَةُ الطُّورِ", name_simple: "At-Tur", revelation_place: "makkah", verses_count: 49, translated_name: { name: "The Mount" } },
        { id: 53, name_arabic: "سُورَةُ النَّجۡمِ", name_simple: "An-Najm", revelation_place: "makkah", verses_count: 62, translated_name: { name: "The Star" } },
        { id: 54, name_arabic: "سُورَةُ القَمَرِ", name_simple: "Al-Qamar", revelation_place: "makkah", verses_count: 55, translated_name: { name: "The Moon" } },
        { id: 55, name_arabic: "سُورَةُ الرَّحۡمَٰن", name_simple: "Ar-Rahmaan", revelation_place: "madinah", verses_count: 78, translated_name: { name: "The Most Gracious" } },
        { id: 56, name_arabic: "سُورَةُ الوَاقِعَةِ", name_simple: "Al-Waaqia", revelation_place: "makkah", verses_count: 96, translated_name: { name: "The Event" } },
        { id: 57, name_arabic: "سُورَةُ الحَدِيدِ", name_simple: "Al-Hadid", revelation_place: "madinah", verses_count: 29, translated_name: { name: "The Iron" } },
        { id: 58, name_arabic: "سُورَةُ المُجَادلَةِ", name_simple: "Al-Mujaadila", revelation_place: "madinah", verses_count: 22, translated_name: { name: "The Pleading Woman" } },
        { id: 59, name_arabic: "سُورَةُ الحَشۡرِ", name_simple: "Al-Hashr", revelation_place: "madinah", verses_count: 24, translated_name: { name: "The Exile" } },
        { id: 60, name_arabic: "سُورَةُ المُمۡتَحنَةِ", name_simple: "Al-Mumtahana", revelation_place: "madinah", verses_count: 13, translated_name: { name: "The Woman to be examined" } },
        { id: 61, name_arabic: "سُورَةُ الصَّفِّ", name_simple: "As-Saff", revelation_place: "madinah", verses_count: 14, translated_name: { name: "The Row" } },
        { id: 62, name_arabic: "سُورَةُ الجُمُعَةِ", name_simple: "Al-Jumu'a", revelation_place: "madinah", verses_count: 11, translated_name: { name: "Friday" } },
        { id: 63, name_arabic: "سُورَةُ المُنَافِقُونَ", name_simple: "Al-Munaafiqoon", revelation_place: "madinah", verses_count: 11, translated_name: { name: "The Hypocrites" } },
        { id: 64, name_arabic: "سُورَةُ التَّغَابُنِ", name_simple: "At-Taghaabun", revelation_place: "madinah", verses_count: 18, translated_name: { name: "The Mutual Loss and Gain" } },
        { id: 65, name_arabic: "سُورَةُ الطَّلَاقِ", name_simple: "At-Talaaq", revelation_place: "madinah", verses_count: 12, translated_name: { name: "The Divorce" } },
        { id: 66, name_arabic: "سُورَةُ التَّحۡرِيمِ", name_simple: "At-Tahrim", revelation_place: "madinah", verses_count: 12, translated_name: { name: "The Prohibition" } },
        { id: 67, name_arabic: "سُورَةُ المُلۡكِ", name_simple: "Al-Mulk", revelation_place: "makkah", verses_count: 30, translated_name: { name: "The Sovereignty" } },
        { id: 68, name_arabic: "سُورَةُ القَلَمِ", name_simple: "Al-Qalam", revelation_place: "makkah", verses_count: 52, translated_name: { name: "The Pen" } },
        { id: 69, name_arabic: "سُورَةُ الحَاقَّةِ", name_simple: "Al-Haaqqa", revelation_place: "makkah", verses_count: 52, translated_name: { name: "The Inevitable" } },
        { id: 70, name_arabic: "سُورَةُ المَعَارِجِ", name_simple: "Al-Ma'aarij", revelation_place: "makkah", verses_count: 44, translated_name: { name: "The Ascending Stairways" } },
        { id: 71, name_arabic: "سُورَةُ نُوحٍ", name_simple: "Nooh", revelation_place: "makkah", verses_count: 28, translated_name: { name: "Noah" } },
        { id: 72, name_arabic: "سُورَةُ الجِنِّ", name_simple: "Al-Jinn", revelation_place: "makkah", verses_count: 28, translated_name: { name: "The Jinn" } },
        { id: 73, name_arabic: "سُورَةُ المُزَّمِّلِ", name_simple: "Al-Muzzammil", revelation_place: "makkah", verses_count: 20, translated_name: { name: "The Enshrouded One" } },
        { id: 74, name_arabic: "سُورَةُ المُدَّثِّرِ", name_simple: "Al-Muddaththir", revelation_place: "makkah", verses_count: 56, translated_name: { name: "The Cloaked One" } },
        { id: 75, name_arabic: "سُورَةُ القِيَامَةِ", name_simple: "Al-Qiyaama", revelation_place: "makkah", verses_count: 40, translated_name: { name: "The Resurrection" } },
        { id: 76, name_arabic: "سُورَةُ الإِنسَانِ", name_simple: "Al-Insaan", revelation_place: "madinah", verses_count: 31, translated_name: { name: "The Man" } },
        { id: 77, name_arabic: "سُورَةُ المُرۡسَلَاتِ", name_simple: "Al-Mursalaat", revelation_place: "makkah", verses_count: 50, translated_name: { name: "Those sent forth" } },
        { id: 78, name_arabic: "سُورَةُ النَّبَإِ", name_simple: "An-Naba", revelation_place: "makkah", verses_count: 40, translated_name: { name: "The Tidings" } },
        { id: 79, name_arabic: "سُورَةُ النَّازِعَاتِ", name_simple: "An-Naazi'aat", revelation_place: "makkah", verses_count: 46, translated_name: { name: "Those who drag forth" } },
        { id: 80, name_arabic: "سُورَةُ عَبَسَ", name_simple: "Abasa", revelation_place: "makkah", verses_count: 42, translated_name: { name: "He frowned" } },
        { id: 81, name_arabic: "سُورَةُ التَّكۡوِيرِ", name_simple: "At-Takwir", revelation_place: "makkah", verses_count: 29, translated_name: { name: "The Overthrowing" } },
        { id: 82, name_arabic: "سُورَةُ الانفِطَارِ", name_simple: "Al-Infitaar", revelation_place: "makkah", verses_count: 19, translated_name: { name: "The Cleaving" } },
        { id: 83, name_arabic: "سُورَةُ المُطَفِّفِينَ", name_simple: "Al-Mutaffifin", revelation_place: "makkah", verses_count: 36, translated_name: { name: "The Defrauding" } },
        { id: 84, name_arabic: "سُورَةُ الانشِقَاقِ", name_simple: "Al-Inshiqaaq", revelation_place: "makkah", verses_count: 25, translated_name: { name: "The Splitting Asunder" } },
        { id: 85, name_arabic: "سُورَةُ البُرُوجِ", name_simple: "Al-Burooj", revelation_place: "makkah", verses_count: 22, translated_name: { name: "The Mansions of the Stars" } },
        { id: 86, name_arabic: "سُورَةُ الطَّارِقِ", name_simple: "At-Taariq", revelation_place: "makkah", verses_count: 17, translated_name: { name: "The Night-Comer" } },
        { id: 87, name_arabic: "سُورَةُ الأَعۡلَىٰ", name_simple: "Al-A'laa", revelation_place: "makkah", verses_count: 19, translated_name: { name: "The Most High" } },
        { id: 88, name_arabic: "سُورَةُ الغَاشِيَةِ", name_simple: "Al-Ghaashiya", revelation_place: "makkah", verses_count: 26, translated_name: { name: "The Overwhelming" } },
        { id: 89, name_arabic: "سُورَةُ الفَجۡرِ", name_simple: "Al-Fajr", revelation_place: "makkah", verses_count: 30, translated_name: { name: "The Dawn" } },
        { id: 90, name_arabic: "سُورَةُ البَلَدِ", name_simple: "Al-Balad", revelation_place: "makkah", verses_count: 20, translated_name: { name: "The City" } },
        { id: 91, name_arabic: "سُورَةُ الشَّمۡسِ", name_simple: "Ash-Shams", revelation_place: "makkah", verses_count: 15, translated_name: { name: "The Sun" } },
        { id: 92, name_arabic: "سُورَةُ اللَّيۡلِ", name_simple: "Al-Lail", revelation_place: "makkah", verses_count: 21, translated_name: { name: "The Night" } },
        { id: 93, name_arabic: "سُورَةُ الضُّحَىٰ", name_simple: "Ad-Dhuhaa", revelation_place: "makkah", verses_count: 11, translated_name: { name: "The Forenoon" } },
        { id: 94, name_arabic: "سُورَةُ الشَّرۡحِ", name_simple: "Ash-Sharh", revelation_place: "makkah", verses_count: 8, translated_name: { name: "The Opening Forth" } },
        { id: 95, name_arabic: "سُورَةُ التِّينِ", name_simple: "At-Tin", revelation_place: "makkah", verses_count: 8, translated_name: { name: "The Fig" } },
        { id: 96, name_arabic: "سُورَةُ العَلَقِ", name_simple: "Al-Alaq", revelation_place: "makkah", verses_count: 19, translated_name: { name: "The Clot" } },
        { id: 97, name_arabic: "سُورَةُ القَدۡرِ", name_simple: "Al-Qadr", revelation_place: "makkah", verses_count: 5, translated_name: { name: "The Night of Decree" } },
        { id: 98, name_arabic: "سُورَةُ البَيِّنَةِ", name_simple: "Al-Bayyina", revelation_place: "madinah", verses_count: 8, translated_name: { name: "The Clear Evidence" } },
        { id: 99, name_arabic: "سُورَةُ الزَّلۡزَلَةِ", name_simple: "Az-Zalzala", revelation_place: "madinah", verses_count: 8, translated_name: { name: "The Earthquake" } },
        { id: 100, name_arabic: "سُورَةُ العَادِيَاتِ", name_simple: "Al-Aadiyaat", revelation_place: "makkah", verses_count: 11, translated_name: { name: "The Courser" } },
        { id: 101, name_arabic: "سُورَةُ القَارِعَةِ", name_simple: "Al-Qaari'a", revelation_place: "makkah", verses_count: 11, translated_name: { name: "The Striking Hour" } },
        { id: 102, name_arabic: "سُورَةُ التَّكَاثُرِ", name_simple: "At-Takaathur", revelation_place: "makkah", verses_count: 8, translated_name: { name: "The Piling Up" } },
        { id: 103, name_arabic: "سُورَةُ العَصۡرِ", name_simple: "Al-Asr", revelation_place: "makkah", verses_count: 3, translated_name: { name: "The Declining Day" } },
        { id: 104, name_arabic: "سُورَةُ الهُمَزَةِ", name_simple: "Al-Humaza", revelation_place: "makkah", verses_count: 9, translated_name: { name: "The Slanderer" } },
        { id: 105, name_arabic: "سُورَةُ الفِيلِ", name_simple: "Al-Fil", revelation_place: "makkah", verses_count: 5, translated_name: { name: "The Elephant" } },
        { id: 106, name_arabic: "سُورَةُ قُرَيۡشٍ", name_simple: "Quraish", revelation_place: "makkah", verses_count: 4, translated_name: { name: "Quraysh" } },
        { id: 107, name_arabic: "سُورَةُ المَاعُونِ", name_simple: "Al-Maa'un", revelation_place: "makkah", verses_count: 7, translated_name: { name: "The Small Kindnesses" } },
        { id: 108, name_arabic: "سُورَةُ الكَوۡثَرِ", name_simple: "Al-Kawthar", revelation_place: "makkah", verses_count: 3, translated_name: { name: "The Abundance" } },
        { id: 109, name_arabic: "سُورَةُ الكَافِرُونَ", name_simple: "Al-Kaafiroon", revelation_place: "makkah", verses_count: 6, translated_name: { name: "The Disbelievers" } },
        { id: 110, name_arabic: "سُورَةُ النَّصۡرِ", name_simple: "An-Nasr", revelation_place: "madinah", verses_count: 3, translated_name: { name: "The Divine Support" } },
        { id: 111, name_arabic: "سُورَةُ المَسَدِ", name_simple: "Al-Masad", revelation_place: "makkah", verses_count: 5, translated_name: { name: "The Palm Fiber" } },
        { id: 112, name_arabic: "سُورَةُ الإِخۡلَاصِ", name_simple: "Al-Ikhlaas", revelation_place: "makkah", verses_count: 4, translated_name: { name: "The Sincerity" } },
        { id: 113, name_arabic: "سُورَةُ الفَلَقِ", name_simple: "Al-Falaq", revelation_place: "makkah", verses_count: 5, translated_name: { name: "The Daybreak" } },
        { id: 114, name_arabic: "سُورَةُ النَّاسِ", name_simple: "An-Naas", revelation_place: "makkah", verses_count: 6, translated_name: { name: "Mankind" } }
    ];

    // --- DOM Elements ---
    const elements = {
        surahListView: document.getElementById('quran-surah-list-view'),
        readerView: document.getElementById('quran-reader-view'),
        searchInput: document.getElementById('quran-search-input-new'),
        tabs: document.querySelectorAll('.tab-btn'),
        surahGrid: document.getElementById('quran-surah-grid'),
        juzList: document.getElementById('quran-juz-list'),
        lastRead: document.getElementById('quran-last-read'),
        backBtn: document.getElementById('reader-back-btn'),
        readerSurahName: document.getElementById('reader-surah-name'),
        readerSurahInfo: document.getElementById('reader-surah-info'),
        readerContent: document.getElementById('reader-content'),
        reciterSelect: document.getElementById('reader-reciter-select'),
        audioPlayer: document.getElementById('continuous-audio-player'),
        audioPlayerContainer: document.getElementById('reader-audio-player'),
        playerReciterName: document.getElementById('player-reciter-name'),
        playerSurahName: document.getElementById('player-surah-name'),
        tafsirModal: document.getElementById('tafsir-modal'),
        tafsirModalTitle: document.getElementById('tafsir-modal-title'),
        tafsirModalBody: document.getElementById('tafsir-modal-body'),
        tafsirModalClose: document.getElementById('tafsir-modal-close'),
    };

    // --- State ---
    const state = {
        allSurahs: [],
        allJuzs: [],
        currentSurahData: null,
        currentReciterId: '7', // Default: Mishary Rashid Alafasy
        lastRead: JSON.parse(localStorage.getItem('quranLastRead')) || null,
        isInitialized: false,
    };

    // --- API Configuration ---
    const API_BASE_QURAN_CLOUD = 'https://api.alquran.cloud/v1';
    const API_BASE_QURAN_COM = 'https://api.quran.com/api/v4';

    // --- API Functions ---
    const api = {
        getJuzs: () => fetch(`${API_BASE_QURAN_COM}/juzs`).then(res => res.json()),
        getSurahFromXML: async (id) => {
            const paddedId = String(id).padStart(3, '0');
            const response = await fetch(`https://everyayah.com/data/XML/Arabic/Quran_Arabic_${paddedId}.xml`);
            if (!response.ok) throw new Error(`Failed to fetch Quran XML for Surah ${id}`);
            
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            const errorNode = xmlDoc.querySelector("parsererror");
            if (errorNode) {
                console.error("XML parsing error:", errorNode.textContent);
                throw new Error(`Failed to parse Quran XML for Surah ${id}`);
            }

            const suraNode = xmlDoc.querySelector('sura');
            if (!suraNode) throw new Error(`Invalid XML format for Surah ${id}`);

            const ayahs = Array.from(suraNode.querySelectorAll('aya')).map(ayaNode => ({
                verse_key: `${suraNode.getAttribute('index')}:${ayaNode.getAttribute('index')}`,
                text_uthmani: ayaNode.getAttribute('text'),
                verse_number: parseInt(ayaNode.getAttribute('index'), 10),
            }));

            return {
                number: parseInt(suraNode.getAttribute('index'), 10),
                name: suraNode.getAttribute('name'),
                ayahs: ayahs,
                numberOfAyahs: ayahs.length,
            };
        },
        getTafsir: (id) => fetch(`${API_BASE_QURAN_CLOUD}/surah/${id}/ar.muyassar`).then(res => res.json()),
        getChapterRecitation: (reciterId, chapterId) => fetch(`${API_BASE_QURAN_COM}/chapter_recitations/${reciterId}/${chapterId}`).then(res => res.json()),
    };

    // --- Core Functions ---
    async function init() {
        if (state.isInitialized) return;
        state.isInitialized = true;
        
        setupEventListeners();
        renderLastRead();

        // Load Surahs from static data
        state.allSurahs = ALL_SURAHS_DATA;
        renderSurahList(state.allSurahs);
        populateReciterSelect();

        // Load Juzs from network, but don't block UI
        try {
            const juzsRes = await api.getJuzs();
            state.allJuzs = juzsRes.juzs;
            renderJuzList(state.allJuzs);
        } catch (juzError) {
            console.error("Failed to load Juz data:", juzError);
            elements.juzList.innerHTML = `<p class="no-results">فشل تحميل قائمة الأجزاء.</p>`;
            const juzTab = document.querySelector('.tab-btn[data-view="juz"]');
            if (juzTab) {
                juzTab.disabled = true;
                juzTab.style.opacity = '0.5';
                juzTab.style.cursor = 'not-allowed';
            }
        }
    }

    function setupEventListeners() {
        elements.searchInput.addEventListener('input', (e) => renderSurahList(state.allSurahs, e.target.value));
        elements.backBtn.addEventListener('click', showListView);
        elements.tafsirModalClose.addEventListener('click', hideTafsirModal);
        elements.tafsirModal.addEventListener('click', (e) => e.target === elements.tafsirModal && hideTafsirModal());
        elements.reciterSelect.addEventListener('change', handleReciterChange);
        elements.audioPlayer.addEventListener('ended', stopAudio);
        elements.tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
        if (elements.lastRead) elements.lastRead.addEventListener('click', () => {
            if (state.lastRead) loadSurah(state.lastRead.surah, state.lastRead.ayah);
        });
    }

    // --- View Management ---
    function showReaderView() {
        elements.surahListView.classList.add('hidden');
        elements.readerView.classList.remove('hidden');
    }

    function showListView() {
        elements.readerView.classList.add('hidden');
        elements.surahListView.classList.remove('hidden');
        stopAudio();
    }
    
    function handleTabClick(e) {
        const view = e.target.dataset.view;
        elements.tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        document.querySelectorAll('.quran-grid-view').forEach(v => v.classList.remove('active'));
        document.getElementById(`quran-${view === 'surah' ? 'surah-grid' : 'juz-list'}`).classList.add('active');
    }

    // --- List Rendering ---
    function renderSurahList(surahs, filter = '') {
        const query = filter.trim().toLowerCase();
        const filtered = surahs.filter(s => s.name_arabic.includes(query) || s.name_simple.toLowerCase().includes(query) || String(s.id).includes(query));
        
        elements.surahGrid.innerHTML = '';
        if (filtered.length === 0) {
            elements.surahGrid.innerHTML = `<p class="no-results">لا توجد نتائج مطابقة.</p>`;
            return;
        }

        filtered.forEach(surah => {
            const card = document.createElement('div');
            card.className = 'surah-card-new';
            card.dataset.surahId = surah.id;
            card.innerHTML = `
                <div class="surah-card-number">${surah.id}</div>
                <div class="surah-card-info">
                    <h3>${surah.name_arabic}</h3>
                    <p>${surah.translated_name.name}</p>
                </div>
                <div class="surah-card-details">
                    <p>${surah.verses_count} آيات</p>
                    <div class="revelation-place">
                        <span>${surah.revelation_place === 'makkah' ? 'مكية' : 'مدنية'}</span>
                        <i class="fas ${surah.revelation_place === 'makkah' ? 'fa-kaaba' : 'fa-mosque'}"></i>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => loadSurah(surah.id));
            elements.surahGrid.appendChild(card);
        });
    }

    function renderJuzList(juzs) {
        elements.juzList.innerHTML = '';
        juzs.forEach(juz => {
            const firstSurah = state.allSurahs.find(s => s.id == Object.keys(juz.verse_mapping)[0]);
            const card = document.createElement('div');
            card.className = 'juz-card';
            card.dataset.juzId = juz.juz_number;
            card.innerHTML = `
                <div>
                    <h3>الجزء ${juz.juz_number}</h3>
                    <p>يبدأ من سورة ${firstSurah?.name_arabic || ''}</p>
                </div>
                <i class="fas fa-chevron-left"></i>
            `;
            card.addEventListener('click', () => loadSurah(Object.keys(juz.verse_mapping)[0], juz.verse_mapping[Object.keys(juz.verse_mapping)[0]].split('-')[0]));
            elements.juzList.appendChild(card);
        });
    }

    // --- Reader Rendering & Logic ---
    async function loadSurah(surahId, ayahToScrollTo = 1) {
        elements.readerContent.innerHTML = `<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> <span>جاري تحميل السورة...</span></div>`;
        showReaderView();
        
        try {
            const [quranData, tafsirResponse] = await Promise.all([
                api.getSurahFromXML(surahId),
                api.getTafsir(surahId)
            ]);
    
            if (!quranData || !tafsirResponse || tafsirResponse.code !== 200) {
                throw new Error('Invalid API response');
            }
    
            const tafsirData = tafsirResponse.data;
            const surahInfo = state.allSurahs.find(s => s.id == surahId);
            
            const mappedTafsirs = tafsirData.ayahs.map(ayah => ({
                verse_key: `${tafsirData.number}:${ayah.numberInSurah}`,
                text: ayah.text,
            }));
    
            state.currentSurahData = { 
                id: quranData.number,
                name_arabic: surahInfo.name_arabic,
                revelation_place: surahInfo.revelation_place,
                verses_count: surahInfo.verses_count,
                hasBismillahHeader: quranData.number !== 9, // Bismillah for all except Surah 9
                verses: quranData.ayahs, 
                tafsirs: mappedTafsirs,
            };
            
            renderReader(state.currentSurahData, ayahToScrollTo);
            loadSurahAudio(surahId);
    
        } catch (error) {
            console.error(`Failed to load surah ${surahId}:`, error);
            handleError(elements.readerContent, "فشل تحميل السورة. قد يكون هناك مشكلة في الاتصال.", () => loadSurah(surahId, ayahToScrollTo));
        }
    }

    function renderReader(data, ayahToScrollTo) {
        elements.readerSurahName.textContent = `${data.name_arabic}`;
        elements.readerSurahInfo.textContent = `${data.revelation_place === 'makkah' ? 'مكية' : 'مدنية'} - ${data.verses_count} آيات`;

        const readerTextContainer = document.createElement('div');
        readerTextContainer.className = 'reader-text-container';
        readerTextContainer.lang = 'ar';

        let fullTextHTML = '';

        if (data.hasBismillahHeader) {
            // Special handling for Al-Fatiha: the Bismillah is the first ayah
            if (data.id === 1) {
                const bismillahAyah = data.verses.find(v => v.verse_number === 1);
                if (bismillahAyah) {
                    fullTextHTML += `<div class="reader-bismillah ayah-text-segment" data-verse-key="${bismillahAyah.verse_key}">${bismillahAyah.text_uthmani}</div>`;
                }
            } else {
                // For all other surahs (except 9), it's a non-interactive header
                fullTextHTML += `<div class="reader-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
            }
        }
        
        fullTextHTML += '<p class="ayah-paragraph">';
        data.verses.forEach(ayah => {
            // Since we rendered Al-Fatiha's first verse (Bismillah) as a header, skip it here.
            if (data.id === 1 && ayah.verse_number === 1) {
                return;
            }

            // Only render if there is text.
            if (ayah.text_uthmani && ayah.text_uthmani.trim().length > 0) {
                fullTextHTML += `<span class="ayah-text-segment" data-verse-key="${ayah.verse_key}">${ayah.text_uthmani}</span>`;
                fullTextHTML += `<span class="ayah-end-symbol">${ayah.verse_number.toLocaleString('ar-EG')}</span>`;
            }
        });
        fullTextHTML += '</p>';

        readerTextContainer.innerHTML = fullTextHTML;
        elements.readerContent.innerHTML = '';
        elements.readerContent.appendChild(readerTextContainer);

        readerTextContainer.addEventListener('click', (e) => {
            const ayahSegment = e.target.closest('.ayah-text-segment');
            if (ayahSegment) {
                // Remove highlight from any other ayah
                const currentlyActive = readerTextContainer.querySelector('.active-ayah');
                if (currentlyActive) currentlyActive.classList.remove('active-ayah');
                
                // Add highlight to the clicked one
                ayahSegment.classList.add('active-ayah');

                const verseKey = ayahSegment.dataset.verseKey;
                const ayahData = data.verses.find(v => v.verse_key === verseKey);
                const tafsirData = data.tafsirs.find(t => t.verse_key === verseKey);
                showTafsir(ayahData, tafsirData, data.name_arabic);
            }
        });

        // Save last read and scroll
        saveLastRead(data.id, ayahToScrollTo);
        const targetAyah = readerTextContainer.querySelector(`[data-verse-key="${data.id}:${ayahToScrollTo}"]`);
        if(targetAyah) {
            setTimeout(() => targetAyah.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
        }
    }

    // --- Ayah Actions ---
    function showTafsir(ayah, tafsir, surahName) {
        if (!ayah) return;
        elements.tafsirModalTitle.textContent = `تفسير الآية ${ayah.verse_number} - ${surahName}`;
        if (tafsir && tafsir.text) {
             elements.tafsirModalBody.innerHTML = `<p>${tafsir.text}</p>`;
        } else {
            elements.tafsirModalBody.innerHTML = `<p>لا يتوفر تفسير لهذه الآية.</p>`;
        }
        elements.tafsirModal.classList.remove('hidden');
    }

    function hideTafsirModal() {
        elements.tafsirModal.classList.add('hidden');
        const activeAyah = elements.readerContent.querySelector('.active-ayah');
        if (activeAyah) {
            activeAyah.classList.remove('active-ayah');
        }
    }

    // --- Audio Logic ---
    function populateReciterSelect() {
        const reciters = [
            { id: '7', name: 'مشاري راشد العفاسي' },
            { id: '3', name: 'عبدالرحمن السديس' },
            { id: '4', name: 'سعد الغامدي' },
            { id: '5', name: 'محمود خليل الحصري' },
            { id: '8', name: 'سعود الشريم' },
            { id: '9', name: 'محمد صديق المنشاوي' }
        ];
        elements.reciterSelect.innerHTML = reciters.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
        state.currentReciterId = '7';
        elements.reciterSelect.value = state.currentReciterId;
    }

    async function handleReciterChange(e) {
        state.currentReciterId = e.target.value;
        if(state.currentSurahData) {
            loadSurahAudio(state.currentSurahData.id);
        }
    }

    async function loadSurahAudio(surahId) {
        try {
            stopAudio();
            const reciterId = state.currentReciterId;
            const reciterName = elements.reciterSelect.options[elements.reciterSelect.selectedIndex].text;
            
            elements.playerReciterName.textContent = reciterName;
            elements.playerSurahName.textContent = `${state.currentSurahData.name_arabic}`;

            const data = await api.getChapterRecitation(reciterId, surahId);
            if (data && data.audio_file && data.audio_file.audio_url) {
                elements.audioPlayer.src = data.audio_file.audio_url;
                elements.audioPlayer.load();
                elements.audioPlayerContainer.style.display = 'grid';
            } else {
                throw new Error('Invalid data format from API');
            }
        } catch (error) {
            console.error("Failed to load audio from main API:", error);
            showNotification('فشل تحميل الصوت من المصدر الرئيسي، سيتم استخدام مصدر بديل.', 'warning');
            useFallbackAudioSource(surahId);
        }
    }
    
    function useFallbackAudioSource(surahNumber) {
        const reciterId = state.currentReciterId;
        const reciterMap = {
            '7': 'Alafasy',
            '3': 'Abdurrahmaan_As-Sudais',
            '4': 'Ghamadi',
            '5': 'Husary',
            '8': 'Shuraym',
            '9': 'Minshawy_Murattal'
        };
        const reciterFolder = reciterMap[reciterId] || 'Alafasy';
        const formattedSurahNumber = String(surahNumber).padStart(3, '0');
        
        elements.audioPlayer.src = `https://download.quranicaudio.com/quran/${reciterFolder}/${formattedSurahNumber}.mp3`;
        elements.audioPlayerContainer.style.display = 'grid';
        elements.audioPlayer.load();
    }
    
    function stopAudio() {
        elements.audioPlayer.pause();
        elements.audioPlayer.currentTime = 0;
    }

    // --- Persistence & Utilities ---
    function saveLastRead(surah, ayah) {
        state.lastRead = { surah, ayah, name: state.allSurahs.find(s=>s.id == surah)?.name_arabic };
        localStorage.setItem('quranLastRead', JSON.stringify(state.lastRead));
        renderLastRead();
    }
    
    function renderLastRead() {
        if (state.lastRead && state.lastRead.name) {
            elements.lastRead.innerHTML = `
                <div class="quran-last-read-info">
                    <p>آخر قراءة</p>
                    <h4>متابعة: ${state.lastRead.name}، الآية ${state.lastRead.ayah}</h4>
                </div>
                <div class="quran-last-read-action"><i class="fas fa-arrow-circle-left"></i></div>
            `;
            elements.lastRead.classList.remove('hidden');
        }
    }

    function renderSkeletonLoader(type) {
        const container = type === 'surah' ? elements.surahGrid : elements.juzList;
        container.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            container.innerHTML += `
                <div class="skeleton-card">
                    <div class="skeleton-line skeleton-icon"></div>
                    <div class="skeleton-text-group">
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line"></div>
                    </div>
                </div>`;
        }
    }

    function handleError(container, message, retryCallback) {
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button class="retry-btn"><i class="fas fa-redo"></i> محاولة مرة أخرى</button>
            </div>
        `;
        container.querySelector('.retry-btn').addEventListener('click', retryCallback);
    }

    function showNotification(message, type = 'success') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        const n = document.createElement('div');
        n.className = `notification ${type}`;
        n.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
        document.body.appendChild(n);
        setTimeout(() => {
            n.classList.add('hide');
            setTimeout(() => n.remove(), 500);
        }, 3000);
    }

    // --- Start the App on Section View ---
    const observer = new MutationObserver((mutations) => {
        if (quranSection.classList.contains('active')) {
            init();
        }
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

    if (quranSection.classList.contains('active')) init();
});
