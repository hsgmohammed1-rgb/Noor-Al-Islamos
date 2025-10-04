document.addEventListener("DOMContentLoaded", function () {
    const quranSection = document.getElementById('quran-section');
    if (!quranSection) return;

    // --- DOM Elements ---
    const elements = {
        container: document.getElementById('quran-container-reimagined'),
        // List View
        surahListView: document.getElementById('quran-surah-list-view'),
        surahGrid: document.getElementById('quran-surah-grid'),
        searchInput: document.getElementById('quran-search-input-new'),
        // Reader View
        readerView: document.getElementById('quran-reader-view'),
        backBtn: document.getElementById('reader-back-btn'),
        readerSurahName: document.getElementById('reader-surah-name'),
        readerSurahInfo: document.getElementById('reader-surah-info'),
        readerContent: document.getElementById('reader-content'),
        reciterSelect: document.getElementById('reader-reciter-select'),
        // Audio Player
        audioPlayerContainer: document.getElementById('reader-audio-player'),
        continuousAudioPlayer: document.getElementById('continuous-audio-player'),
        playerReciterName: document.getElementById('player-reciter-name'),
        playerSurahName: document.getElementById('player-surah-name'),
        // Tafsir Modal
        tafsirModal: document.getElementById('tafsir-modal'),
        tafsirModalTitle: document.getElementById('tafsir-modal-title'),
        tafsirModalBody: document.getElementById('tafsir-modal-body'),
        tafsirModalClose: document.getElementById('tafsir-modal-close'),
    };

    // --- State ---
    const state = {
        allSurahs: [],
        reciters: [],
        currentSurahData: null,
        currentReciterId: '7', // Default to Mishary Rashid Alafasy
        audioTimestamps: null,
        audioSyncInterval: null,
    };

    // --- API Configuration ---
    const API_BASE = 'https://api.quran.com/api/v4';
    const TAFSIR_ID = 169; // Tafsir Al-Muyassar (Arabic)

    // --- API Functions ---
    const api = {
        getChapters: async () => {
            const response = await fetch(`${API_BASE}/chapters?language=ar`);
            if (!response.ok) throw new Error('Failed to fetch chapters');
            const data = await response.json();
            return data.chapters;
        },
        getChapter: async (chapterNumber) => {
            const response = await fetch(`${API_BASE}/chapters/${chapterNumber}?language=ar`);
            if (!response.ok) throw new Error('Failed to fetch chapter details');
            const data = await response.json();
            return data.chapter;
        },
        getVerses: async (chapterNumber) => {
            const response = await fetch(`${API_BASE}/quran/verses/uthmani?chapter_number=${chapterNumber}`);
            if (!response.ok) throw new Error('Failed to fetch verses');
            const data = await response.json();
            return data.verses;
        },
        getTafsir: async (chapterNumber) => {
             const response = await fetch(`${API_BASE}/quran/tafsirs/${TAFSIR_ID}?chapter_number=${chapterNumber}`);
             if (!response.ok) throw new Error('Failed to fetch Tafsir');
             const data = await response.json();
             return data.tafsirs;
        },
        getRecitations: async () => {
             const response = await fetch(`${API_BASE}/resources/recitations?language=ar`);
             if (!response.ok) throw new Error('Failed to fetch reciters');
             const data = await response.json();
             return data.recitations.filter(r => r.style); // Filter for styled recitations
        },
        getSurahAudio: async (reciterId, chapterNumber) => {
            const response = await fetch(`${API_BASE}/chapter_recitations/${reciterId}/${chapterNumber}`);
            if (!response.ok) throw new Error('Failed to fetch surah audio');
            const data = await response.json();
            return data.audio_file;
        },
    };

    // --- Core Functions ---
    async function init() {
        try {
            setupEventListeners();
            const [surahs, reciters] = await Promise.all([api.getChapters(), api.getRecitations()]);
            state.allSurahs = surahs;
            state.reciters = reciters;
            populateReciterSelect();
            renderSurahList(surahs);
        } catch (error) {
            console.error("Initialization failed:", error);
            elements.surahGrid.innerHTML = `<div class="error-message"><h3>خطأ في التحميل</h3><p>تعذر تحميل قائمة السور. يرجى المحاولة مرة أخرى.</p></div>`;
        }
    }

    function setupEventListeners() {
        elements.searchInput.addEventListener('input', (e) => renderSurahList(state.allSurahs, e.target.value));
        elements.backBtn.addEventListener('click', showListView);
        elements.tafsirModalClose.addEventListener('click', hideTafsirModal);
        elements.tafsirModal.addEventListener('click', (e) => {
            if (e.target === elements.tafsirModal) hideTafsirModal();
        });
        elements.reciterSelect.addEventListener('change', (e) => {
            state.currentReciterId = e.target.value;
            if(state.currentSurahData) {
                loadSurahAudio(state.currentSurahData.id);
            }
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
    
    // --- Surah List Rendering ---
    function renderSurahList(surahs, filter = '') {
        const filteredSurahs = surahs.filter(surah => {
            const query = filter.trim().toLowerCase();
            return surah.name_arabic.includes(query) || 
                   surah.name_simple.toLowerCase().includes(query) ||
                   String(surah.id).includes(query);
        });

        elements.surahGrid.innerHTML = '';
        if (filteredSurahs.length === 0) {
            elements.surahGrid.innerHTML = `<p class="no-results">لا توجد نتائج مطابقة.</p>`;
            return;
        }

        filteredSurahs.forEach(surah => {
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

    // --- Reader Rendering & Logic ---
    async function loadSurah(surahId) {
        elements.readerContent.innerHTML = `<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> <span>جاري تحميل سورة...</span></div>`;
        showReaderView();
        
        try {
            const [chapter, verses, tafsirs] = await Promise.all([
                api.getChapter(surahId),
                api.getVerses(surahId),
                api.getTafsir(surahId)
            ]);
            
            state.currentSurahData = { ...chapter, verses, tafsirs };
            renderReader(state.currentSurahData);
            loadSurahAudio(surahId);

        } catch (error) {
            console.error(`Failed to load surah ${surahId}:`, error);
            elements.readerContent.innerHTML = `<div class="error-message"><h3>خطأ</h3><p>تعذر تحميل بيانات السورة.</p></div>`;
        }
    }

    function renderReader(data) {
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
            const tafsir = data.tafsirs.find(t => t.verse_key === ayah.verse_key);
            const ayahContainer = document.createElement('div');
            ayahContainer.className = 'ayah-container';
            ayahContainer.id = `ayah-${ayah.verse_key}`;
            
            ayahContainer.innerHTML = `
                <div class="ayah-header">
                    <div class="ayah-number-badge">${ayah.verse_number}</div>
                    <div class="ayah-actions">
                        <button class="ayah-action-btn" data-action="tafsir" title="عرض التفسير"><i class="fas fa-book-open"></i></button>
                        <button class="ayah-action-btn" data-action="copy" title="نسخ الآية"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
                <p class="ayah-text-arabic">${ayah.text_uthmani}</p>
            `;
            
            // Event Listeners for actions
            const actions = ayahContainer.querySelector('.ayah-actions');
            actions.addEventListener('click', (e) => {
                const button = e.target.closest('.ayah-action-btn');
                if (!button) return;

                switch(button.dataset.action) {
                    case 'tafsir':
                        showTafsir(ayah, tafsir);
                        break;
                    case 'copy':
                        copyAyah(ayah, data.name_arabic);
                        break;
                }
            });

            elements.readerContent.appendChild(ayahContainer);
        });
    }

    function showTafsir(ayah, tafsir) {
        elements.tafsirModalTitle.textContent = `تفسير الآية ${ayah.verse_number} - سورة ${state.currentSurahData.name_arabic}`;
        elements.tafsirModalBody.innerHTML = tafsir ? `<p>${tafsir.text}</p>` : `<p>لا يتوفر تفسير لهذه الآية.</p>`;
        elements.tafsirModal.classList.remove('hidden');
    }

    function hideTafsirModal() {
        elements.tafsirModal.classList.add('hidden');
    }

    function copyAyah(ayah, surahName) {
        const textToCopy = `﴿${ayah.text_uthmani}﴾ [سورة ${surahName} : ${ayah.verse_number}]`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('تم نسخ الآية بنجاح');
        }).catch(() => {
            showNotification('فشل النسخ', 'error');
        });
    }
    
    // --- Audio Logic ---
    function populateReciterSelect() {
        const preferredReciters = ["7", "3", "11", "8", "13", "9", "5", "1"]; // IDs for preferred reciters
        
        const sortedReciters = state.reciters
            .filter(r => preferredReciters.includes(String(r.id)))
            .sort((a, b) => preferredReciters.indexOf(String(a.id)) - preferredReciters.indexOf(String(b.id)));

        elements.reciterSelect.innerHTML = sortedReciters.map(reciter => 
            `<option value="${reciter.id}">${reciter.reciter_name}</option>`
        ).join('');
        elements.reciterSelect.value = state.currentReciterId;
    }

    async function loadSurahAudio(surahId) {
        try {
            stopAudio();
            const reciterName = state.reciters.find(r => r.id == state.currentReciterId)?.reciter_name || '';
            elements.playerReciterName.textContent = reciterName;
            elements.playerSurahName.textContent = `سورة ${state.currentSurahData.name_arabic}`;

            const audioFile = await api.getSurahAudio(state.currentReciterId, surahId);
            if (audioFile && audioFile.audio_url) {
                elements.continuousAudioPlayer.src = audioFile.audio_url;
                elements.audioPlayerContainer.style.display = 'flex';
            } else {
                 throw new Error('No audio URL found');
            }
        } catch (error) {
            console.error("Failed to load audio:", error);
            elements.continuousAudioPlayer.src = '';
            elements.audioPlayerContainer.style.display = 'none';
            showNotification('تعذر تحميل الملف الصوتي', 'error');
        }
    }
    
    function stopAudio() {
        elements.continuousAudioPlayer.pause();
        elements.continuousAudioPlayer.currentTime = 0;
        if(state.audioSyncInterval) clearInterval(state.audioSyncInterval);
    }
    
    // --- Utilities ---
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // --- Start the App ---
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && quranSection.classList.contains('active')) {
                // Check if already initialized to avoid re-running
                if (!state.allSurahs || state.allSurahs.length === 0) {
                    init();
                }
                // We don't disconnect, in case the section is hidden and shown again.
                // The check above prevents re-initialization of data.
            }
        });
    });

    observer.observe(document.querySelector('body'), { subtree: true, attributes: true });

    // Initial check in case the section is active on page load
    if (quranSection.classList.contains('active')) {
        init();
    }
});
