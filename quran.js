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
        reciters: [],
        currentSurahData: null,
        currentReciterId: '7', // Mishary Rashid Alafasy
        audioTimestamps: null,
        audioSyncInterval: null,
        lastRead: JSON.parse(localStorage.getItem('quranLastRead')) || null,
        bookmarks: JSON.parse(localStorage.getItem('quranBookmarks')) || {},
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
        getRecitations: () => fetch(`${API_BASE}/resources/recitations?language=ar`).then(res => res.json()),
        getTimestamps: (reciterId, chapterId) => fetch(`${API_BASE}/quran/recitations/${reciterId}/by_chapter/${chapterId}?word_timing=true`).then(res => res.json()),
    };

    // --- Core Functions ---
    async function init() {
        if (state.isInitialized) return;
        state.isInitialized = true;
        
        setupEventListeners();
        renderSkeletonLoader('surah');
        renderLastRead();

        try {
            const [surahsRes, juzsRes, recitationsRes] = await Promise.all([
                api.getChapters(),
                api.getJuzs(),
                api.getRecitations()
            ]);

            state.allSurahs = surahsRes.chapters;
            state.allJuzs = juzsRes.juzs;
            state.reciters = recitationsRes.recitations.filter(r => r.style);

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
        elements.audioPlayer.addEventListener('timeupdate', syncAyahWithAudio);
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
            // Note: Juz click functionality can be complex. Starting with Surah 1 of the Juz.
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
        elements.readerContent.innerHTML = '';

        if (data.bismillah_pre) {
            const bismillah = document.createElement('div');
            bismillah.className = 'reader-bismillah';
            bismillah.textContent = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
            elements.readerContent.appendChild(bismillah);
        }

        data.verses.forEach(ayah => {
            const isBookmarked = state.bookmarks[ayah.verse_key];
            const ayahContainer = document.createElement('div');
            ayahContainer.className = 'ayah-container';
            ayahContainer.id = `ayah-${ayah.verse_key}`;
            
            ayahContainer.innerHTML = `
                <div class="ayah-header">
                    <div class="ayah-number-badge">${ayah.verse_number}</div>
                    <div class="ayah-actions">
                        <button class="ayah-action-btn" data-action="play" title="تشغيل الآية"><i class="fas fa-play"></i></button>
                        <button class="ayah-action-btn" data-action="tafsir" title="عرض التفسير"><i class="fas fa-book-open"></i></button>
                        <button class="ayah-action-btn ${isBookmarked ? 'bookmarked' : ''}" data-action="bookmark" title="حفظ الآية"><i class="fas fa-bookmark"></i></button>
                        <button class="ayah-action-btn" data-action="copy" title="نسخ الآية"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
                <p class="ayah-text-arabic">${ayah.text_uthmani}</p>
            `;
            
            ayahContainer.querySelector('.ayah-actions').addEventListener('click', (e) => handleAyahAction(e, ayah, data));
            elements.readerContent.appendChild(ayahContainer);
        });

        // Save last read and scroll
        saveLastRead(data.id, ayahToScrollTo);
        const targetAyah = document.getElementById(`ayah-${data.id}:${ayahToScrollTo}`);
        if(targetAyah) {
            setTimeout(() => targetAyah.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
        }
    }

    function handleAyahAction(e, ayah, surahData) {
        const button = e.target.closest('.ayah-action-btn');
        if (!button) return;
        const tafsir = surahData.tafsirs.find(t => t.verse_key === ayah.verse_key);

        switch(button.dataset.action) {
            case 'play':
                playSingleAyah(ayah.verse_key);
                break;
            case 'tafsir':
                showTafsir(ayah, tafsir, surahData.name_arabic);
                break;
            case 'copy':
                copyAyah(ayah, surahData.name_arabic);
                break;
            case 'bookmark':
                toggleBookmark(ayah.verse_key, button);
                break;
        }
    }

    // --- Ayah Actions ---
    function showTafsir(ayah, tafsir, surahName) {
        elements.tafsirModalTitle.textContent = `تفسير الآية ${ayah.verse_number} - سورة ${surahName}`;
        elements.tafsirModalBody.innerHTML = tafsir ? `<p>${tafsir.text}</p>` : `<p>لا يتوفر تفسير لهذه الآية.</p>`;
        elements.tafsirModal.classList.remove('hidden');
    }

    function hideTafsirModal() {
        elements.tafsirModal.classList.add('hidden');
    }

    function copyAyah(ayah, surahName) {
        const text = `﴿${ayah.text_uthmani}﴾ [سورة ${surahName} : ${ayah.verse_number}]`;
        navigator.clipboard.writeText(text).then(() => showNotification('تم نسخ الآية')).catch(() => showNotification('فشل النسخ', 'error'));
    }

    function toggleBookmark(verseKey, button) {
        if(state.bookmarks[verseKey]) {
            delete state.bookmarks[verseKey];
            button.classList.remove('bookmarked');
            showNotification('تمت إزالة العلامة المرجعية');
        } else {
            state.bookmarks[verseKey] = true;
            button.classList.add('bookmarked');
            showNotification('تم حفظ الآية');
        }
        localStorage.setItem('quranBookmarks', JSON.stringify(state.bookmarks));
    }

    // --- Audio Logic ---
    function populateReciterSelect() {
        const preferred = ["7", "3", "4", "1"]; // Mishary, Sudais, Ghamdi, Basfar
        const sorted = state.reciters.sort((a, b) => {
            const aPref = preferred.indexOf(String(a.id));
            const bPref = preferred.indexOf(String(b.id));
            if (aPref > -1 && bPref > -1) return aPref - bPref;
            if (aPref > -1) return -1;
            if (bPref > -1) return 1;
            return a.reciter_name.localeCompare(b.reciter_name);
        });
        elements.reciterSelect.innerHTML = sorted.map(r => `<option value="${r.id}">${r.reciter_name}</option>`).join('');
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
            const reciterName = state.reciters.find(r => r.id == state.currentReciterId)?.reciter_name || '';
            elements.playerReciterName.textContent = reciterName;
            elements.playerSurahName.textContent = `سورة ${state.currentSurahData.name_arabic}`;
            
            const audioData = await api.getTimestamps(state.currentReciterId, surahId);
            if (audioData.audio_files && audioData.audio_files[0].audio_url) {
                elements.audioPlayer.src = audioData.audio_files[0].audio_url;
                state.audioTimestamps = audioData.audio_files[0].timestamps;
                elements.audioPlayerContainer.style.display = 'grid';
            } else {
                 throw new Error('Audio URL or timestamps not found');
            }
        } catch (error) {
            console.error("Failed to load audio:", error);
            elements.audioPlayerContainer.style.display = 'none';
            showNotification('تعذر تحميل الملف الصوتي لهذا القارئ', 'error');
        }
    }

    function playSingleAyah(verseKey) {
        if (!state.audioTimestamps) {
            showNotification('بيانات الصوت غير متاحة', 'warning');
            return;
        }
        const ayahTimestamp = state.audioTimestamps.find(t => t.verse_key === verseKey);
        if (ayahTimestamp) {
            stopAudio();
            elements.audioPlayer.currentTime = ayahTimestamp.start_time / 1000;
            elements.audioPlayer.play();

            const endListener = () => {
                if (elements.audioPlayer.currentTime >= ayahTimestamp.end_time / 1000) {
                    elements.audioPlayer.pause();
                    elements.audioPlayer.removeEventListener('timeupdate', endListener);
                }
            };
            elements.audioPlayer.addEventListener('timeupdate', endListener);
        }
    }

    function syncAyahWithAudio() {
        if (!state.audioTimestamps || elements.audioPlayer.paused) return;
        const currentTimeMs = elements.audioPlayer.currentTime * 1000;
        
        const currentAyah = state.audioTimestamps.find(t => currentTimeMs >= t.start_time && currentTimeMs <= t.end_time);
        
        document.querySelectorAll('.ayah-container.active').forEach(el => el.classList.remove('active'));
        
        if (currentAyah) {
            const ayahEl = document.getElementById(`ayah-${currentAyah.verse_key}`);
            if (ayahEl) {
                ayahEl.classList.add('active');
                // Scroll into view if not visible
                const rect = ayahEl.getBoundingClientRect();
                const contentRect = elements.readerContent.getBoundingClientRect();
                if (rect.top < contentRect.top || rect.bottom > contentRect.bottom) {
                    ayahEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                saveLastRead(state.currentSurahData.id, currentAyah.verse_key.split(':')[1]);
            }
        }
    }
    
    function stopAudio() {
        elements.audioPlayer.pause();
        document.querySelectorAll('.ayah-container.active').forEach(el => el.classList.remove('active'));
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
