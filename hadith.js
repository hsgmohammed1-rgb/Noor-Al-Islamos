document.addEventListener("DOMContentLoaded", function () {
    const section = document.getElementById('hadith-section');
    if (!section) return;

    // --- DOM Elements ---
    const elements = {
        searchInput: document.getElementById('hisn-search-input'),
        categoriesList: document.getElementById('hisn-categories-list'),
        categoryHeader: document.getElementById('hisn-category-header'),
        azkarList: document.getElementById('hisn-azkar-list'),
        audioPlayer: {
            container: document.getElementById('hisn-audio-player'),
            audio: document.getElementById('hisn-audio-element'),
            title: document.getElementById('hisn-player-title'),
            playBtn: document.getElementById('hisn-player-play'),
            prevBtn: document.getElementById('hisn-player-prev'),
            nextBtn: document.getElementById('hisn-player-next'),
            progressBar: document.getElementById('hisn-progress-bar'),
            currentTime: document.getElementById('hisn-current-time'),
            duration: document.getElementById('hisn-duration'),
        }
    };

    // --- State ---
    let state = {
        allData: [],
        categories: [],
        currentCategory: null,
        currentPlaylist: [],
        currentTrackIndex: -1,
        isPlaying: false,
    };

    // --- Initialization ---
    function init() {
        setupEventListeners();
        fetchHisnMuslimData();
    }

    // --- Event Listeners ---
    function setupEventListeners() {
        elements.searchInput.addEventListener('input', handleSearch);
        elements.audioPlayer.playBtn.addEventListener('click', togglePlayPause);
        elements.audioPlayer.nextBtn.addEventListener('click', playNext);
        elements.audioPlayer.prevBtn.addEventListener('click', playPrev);
        elements.audioPlayer.audio.addEventListener('timeupdate', updateProgressBar);
        elements.audioPlayer.audio.addEventListener('loadedmetadata', updateDuration);
        elements.audioPlayer.audio.addEventListener('ended', playNext);
        elements.audioPlayer.progressBar.addEventListener('input', seek);
    }

    // --- Data Fetching ---
    async function fetchHisnMuslimData() {
        showCategoryLoading(true);
        try {
            const response = await fetch('https://www.hisnmuslim.com/api/ar/husn_ar.json');
            if (!response.ok) throw new Error('فشل الاتصال بالشبكة');
            const data = await response.json();
            
            if (data && data['العربية']) {
                state.allData = data['العربية'];
                state.categories = state.allData.map(({ ID, TITLE }) => ({ ID, TITLE }));
                displayCategories();
            } else {
                throw new Error('تنسيق البيانات غير صحيح');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            showError(elements.categoriesList, 'تعذر تحميل البيانات. يرجى المحاولة مرة أخرى.');
        } finally {
            showCategoryLoading(false);
        }
    }

    // --- UI Rendering ---
    function displayCategories(filter = '') {
        const filteredCategories = state.categories.filter(cat =>
            cat.TITLE.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredCategories.length === 0) {
            elements.categoriesList.innerHTML = '<p class="no-results">لا توجد نتائج</p>';
            return;
        }

        elements.categoriesList.innerHTML = filteredCategories.map(cat => `
            <div class="hisn-category-item" data-id="${cat.ID}">
                <span>${cat.TITLE}</span>
                <i class="fas fa-chevron-left"></i>
            </div>
        `).join('');

        document.querySelectorAll('.hisn-category-item').forEach(item => {
            item.addEventListener('click', () => {
                const categoryId = parseInt(item.dataset.id);
                loadCategory(categoryId);
                document.querySelectorAll('.hisn-category-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    function loadCategory(categoryId) {
        state.currentCategory = state.allData.find(cat => cat.ID === categoryId);
        if (!state.currentCategory) return;
        
        displayCategoryHeader();
        displayAzkar();
        
        state.currentPlaylist = state.currentCategory.TEXT.map(zikr => ({
            title: zikr.ARABIC_TEXT.substring(0, 30) + '...',
            src: zikr.AUDIO
        }));
        state.currentTrackIndex = -1;
    }

    function displayCategoryHeader() {
        elements.categoryHeader.innerHTML = `
            <h3>${state.currentCategory.TITLE}</h3>
            <button class="play-all-btn" title="تشغيل صوت الفئة كاملة">
                <i class="fas fa-play-circle"></i> استماع
            </button>
        `;
        elements.categoryHeader.querySelector('.play-all-btn').addEventListener('click', () => {
            playCategoryAudio(state.currentCategory.AUDIO_URL, state.currentCategory.TITLE);
        });
    }

    function displayAzkar() {
        showAzkarLoading(true);
        elements.azkarList.innerHTML = state.currentCategory.TEXT.map((zikr, index) => `
            <div class="hisn-zikr-card" data-index="${index}">
                <p class="zikr-text">${zikr.ARABIC_TEXT}</p>
                <div class="zikr-meta">
                    <span class="zikr-source">${zikr.LANGUAGE_ARABIC_TRANSLATED_TEXT}</span>
                </div>
                <div class="zikr-footer">
                    <div class="zikr-actions">
                        <button class="action-btn zikr-play-btn" title="تشغيل الصوت"><i class="fas fa-play"></i></button>
                        <button class="action-btn zikr-copy-btn" title="نسخ"><i class="fas fa-copy"></i></button>
                    </div>
                    ${zikr.REPEAT > 1 ? `
                    <div class="zikr-repeat">
                        <span class="repeat-text">التكرار:</span>
                        <button class="repeat-btn" data-goal="${zikr.REPEAT}" data-remaining="${zikr.REPEAT}">
                            <span class="count">${zikr.REPEAT}</span>
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
        showAzkarLoading(false);
        addAzkarEventListeners();
    }

    function addAzkarEventListeners() {
        elements.azkarList.querySelectorAll('.hisn-zikr-card').forEach(card => {
            const index = parseInt(card.dataset.index);
            const zikr = state.currentCategory.TEXT[index];

            // Play button
            card.querySelector('.zikr-play-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                playTrack(index);
            });

            // Copy button
            card.querySelector('.zikr-copy-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(zikr.ARABIC_TEXT).then(() => {
                    const btn = e.currentTarget;
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i>'; }, 1500);
                });
            });

            // Repeat button
            card.querySelector('.repeat-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                const btn = e.currentTarget;
                let remaining = parseInt(btn.dataset.remaining);
                if (remaining > 0) {
                    remaining--;
                    btn.dataset.remaining = remaining;
                    btn.querySelector('.count').textContent = remaining;
                    btn.classList.add('animate');
                    setTimeout(() => btn.classList.remove('animate'), 200);

                    if (remaining === 0) {
                        btn.classList.add('completed');
                        btn.innerHTML = '<i class="fas fa-check"></i>';
                    }
                } else {
                    btn.classList.remove('completed');
                    btn.dataset.remaining = btn.dataset.goal;
                    btn.innerHTML = `<span class="count">${btn.dataset.goal}</span>`;
                }
            });
        });
    }


    // --- Audio Player Logic ---
    function playTrack(index) {
        state.currentTrackIndex = index;
        const track = state.currentPlaylist[index];
        if (!track) return;

        elements.audioPlayer.audio.src = track.src;
        elements.audioPlayer.title.textContent = track.title;
        elements.audioPlayer.audio.play();
        state.isPlaying = true;
        updatePlayerUI();
        elements.audioPlayer.container.classList.remove('hidden');
    }
    
    function playCategoryAudio(url, title) {
        state.currentPlaylist = []; // Clear individual zikr playlist
        state.currentTrackIndex = -1;
        
        elements.audioPlayer.audio.src = url;
        elements.audioPlayer.title.textContent = title;
        elements.audioPlayer.audio.play();
        state.isPlaying = true;
        updatePlayerUI();
        elements.audioPlayer.container.classList.remove('hidden');
    }

    function togglePlayPause() {
        if (state.isPlaying) {
            elements.audioPlayer.audio.pause();
        } else {
            elements.audioPlayer.audio.play();
        }
        state.isPlaying = !state.isPlaying;
        updatePlayerUI();
    }
    
    function playNext() {
        if (state.currentTrackIndex >= 0 && state.currentPlaylist.length > 0) {
            let nextIndex = state.currentTrackIndex + 1;
            if (nextIndex >= state.currentPlaylist.length) {
                // Stop at the end of playlist
                state.isPlaying = false;
                updatePlayerUI();
                return;
            }
            playTrack(nextIndex);
        }
    }

    function playPrev() {
         if (state.currentTrackIndex > 0 && state.currentPlaylist.length > 0) {
            playTrack(state.currentTrackIndex - 1);
        }
    }
    
    function updatePlayerUI() {
        elements.audioPlayer.playBtn.innerHTML = state.isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        elements.audioPlayer.container.classList.toggle('playing', state.isPlaying);
        
        // Highlight active track
        document.querySelectorAll('.hisn-zikr-card.playing').forEach(c => c.classList.remove('playing'));
        if(state.isPlaying && state.currentTrackIndex !== -1) {
            const card = document.querySelector(`.hisn-zikr-card[data-index="${state.currentTrackIndex}"]`);
            if(card) card.classList.add('playing');
        }
    }
    
    function updateProgressBar() {
        const { currentTime, duration } = elements.audioPlayer.audio;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            elements.audioPlayer.progressBar.value = progressPercent;
            elements.audioPlayer.currentTime.textContent = formatTime(currentTime);
        }
    }

    function updateDuration() {
        elements.audioPlayer.duration.textContent = formatTime(elements.audioPlayer.audio.duration);
    }

    function seek() {
        const { duration } = elements.audioPlayer.audio;
        elements.audioPlayer.audio.currentTime = (elements.audioPlayer.progressBar.value / 100) * duration;
    }


    // --- Handlers & Helpers ---
    function handleSearch(e) {
        displayCategories(e.target.value);
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function showCategoryLoading(isLoading) {
        if (isLoading) {
            let skeletons = '';
            for (let i = 0; i < 10; i++) {
                skeletons += '<div class="skeleton-item"></div>';
            }
            elements.categoriesList.innerHTML = skeletons;
        }
    }
    
    function showAzkarLoading(isLoading) {
        if(isLoading) {
            elements.azkarList.innerHTML = `
                <div class="loading-spinner animate-fade-in">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>جاري تحميل الأذكار...</span>
                </div>
            `;
        }
    }

    function showError(element, message) {
        element.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button onclick="location.reload()" class="retry-btn">إعادة المحاولة</button>
            </div>
        `;
    }

    // --- Start ---
    init();
});