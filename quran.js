document.addEventListener("DOMContentLoaded", function () {
    const quranSection = document.getElementById('quran-section');
    if (!quranSection) return;

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
    const API_BASE = 'https://api.quran.com/api/v4';
    const TAFSIR_ID = 169; // Tafsir Al-Muyassar (Arabic)

    // --- API Functions ---
    const api = {
        getChapters: () => fetch(`${API_BASE}/chapters?language=ar`).then(res => res.json()),
        getJuzs: () => fetch(`${API_BASE}/juzs`).then(res => res.json()),
        getChapter: (id) => fetch(`${API_BASE}/chapters/${id}?language=ar`).then(res => res.json()),
        getVerses: (id) => fetch(`${API_BASE}/quran/verses/uthmani?chapter_number=${id}`).then(res => res.json()),
        getTafsir: (id) => fetch(`${API_BASE}/quran/tafsirs/${TAFSIR_ID}?chapter_number=${id}`).then(res => res.json()),
        getChapterRecitation: (reciterId, chapterId) => fetch(`${API_BASE}/chapter_recitations/${reciterId}/${chapterId}`).then(res => res.json()),
    };

    // --- Core Functions ---
    async function init() {
        if (state.isInitialized) return;
        state.isInitialized = true;
        
        setupEventListeners();
        renderSkeletonLoader('surah');
        renderLastRead();

        try {
            const [surahsRes, juzsRes] = await Promise.all([
                api.getChapters(),
                api.getJuzs(),
            ]);

            state.allSurahs = surahsRes.chapters;
            state.allJuzs = juzsRes.juzs;

            populateReciterSelect();
            renderSurahList(state.allSurahs);
            renderJuzList(state.allJuzs);

        } catch (error) {
            console.error("Initialization failed:", error);
            handleError(elements.surahGrid, "فشل تحميل البيانات. يرجى المحاولة مرة أخرى.", init);
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
            const [chapterRes, versesRes, tafsirsRes] = await Promise.all([
                api.getChapter(surahId),
                api.getVerses(surahId),
                api.getTafsir(surahId)
            ]);
            
            state.currentSurahData = { 
                ...chapterRes.chapter, 
                verses: versesRes.verses, 
                tafsirs: tafsirsRes.tafsirs 
            };
            
            renderReader(state.currentSurahData, ayahToScrollTo);
            loadSurahAudio(surahId);

        } catch (error) {
            console.error(`Failed to load surah ${surahId}:`, error);
            handleError(elements.readerContent, "فشل تحميل السورة.", () => loadSurah(surahId, ayahToScrollTo));
        }
    }

    function renderReader(data, ayahToScrollTo) {
        elements.readerSurahName.textContent = `سورة ${data.name_arabic}`;
        elements.readerSurahInfo.textContent = `${data.revelation_place === 'makkah' ? 'مكية' : 'مدنية'} - ${data.verses_count} آيات`;

        const readerTextContainer = document.createElement('div');
        readerTextContainer.className = 'reader-text-container';
        readerTextContainer.lang = 'ar';

        let fullTextHTML = '';
        if (data.bismillah_pre) {
            fullTextHTML += `<div class="reader-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
        }
        
        fullTextHTML += '<p class="ayah-paragraph">';
        data.verses.forEach(ayah => {
            fullTextHTML += `<span class="ayah-text-segment" data-verse-key="${ayah.verse_key}">${ayah.text_uthmani}</span>`;
            fullTextHTML += `<span class="ayah-end-symbol">${ayah.verse_number.toLocaleString('ar-EG')}</span>`;
        });
        fullTextHTML += '</p>';

        readerTextContainer.innerHTML = fullTextHTML;
        elements.readerContent.innerHTML = '';
        elements.readerContent.appendChild(readerTextContainer);

        readerTextContainer.addEventListener('click', (e) => {
            const ayahSegment = e.target.closest('.ayah-text-segment');
            if (ayahSegment) {
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
        elements.tafsirModalTitle.textContent = `تفسير الآية ${ayah.verse_number} - سورة ${surahName}`;
        if (tafsir && tafsir.text) {
             elements.tafsirModalBody.innerHTML = `<p>${tafsir.text}</p>`;
        } else {
            elements.tafsirModalBody.innerHTML = `<p>لا يتوفر تفسير لهذه الآية.</p>`;
        }
        elements.tafsirModal.classList.remove('hidden');
    }

    function hideTafsirModal() {
        elements.tafsirModal.classList.add('hidden');
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
            elements.playerSurahName.textContent = `سورة ${state.currentSurahData.name_arabic}`;

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
                    <h4>متابعة: سورة ${state.lastRead.name}، الآية ${state.lastRead.ayah}</h4>
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