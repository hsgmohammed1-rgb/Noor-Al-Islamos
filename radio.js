document.addEventListener("DOMContentLoaded", function () {
    // عناصر واجهة المستخدم
    const radioSearchInput = document.getElementById('radio-search-input');
    const radioStationsContainer = document.getElementById('radio-stations-container');
    const featuredStationsContainer = document.getElementById('featured-stations-container');
    const categoriesContainer = document.getElementById('radio-categories-container');
    
    // عناصر المشغل
    const radioPlayer = document.querySelector('.radio-player');
    const currentStationName = document.getElementById('current-station-name');
    const currentStationDesc = document.getElementById('current-station-desc');
    const radioPlayBtn = document.getElementById('radio-play-btn');
    const radioStopBtn = document.getElementById('radio-stop-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');
    const radioAudio = document.getElementById('radio-audio');
    const visualizerCanvas = document.getElementById('visualizer');
    const stationArtwork = document.getElementById('station-artwork-new');

    // متغيرات عامة
    let allStations = [];
    let currentStation = null;
    let isPlaying = false;
    let searchQuery = '';
    let currentCategory = 'all';

    // متغيرات المؤثرات البصرية
    let canvasCtx, analyser, audioCtx, source, dataArray, bufferLength;
    let animationFrameId;

    // تهيئة القسم
    function init() {
        fetchRadioStations();
        setupEventListeners();
        initVisualizer();
    }

    // إعداد مستمعي الأحداث
    function setupEventListeners() {
        radioSearchInput.addEventListener('input', function() {
            searchQuery = this.value.trim().toLowerCase();
            filterAndDisplayStations();
        });

        radioPlayBtn.addEventListener('click', function() {
            if (!currentStation) return;
            if (isPlaying) {
                radioAudio.pause();
            } else {
                playStation(currentStation);
            }
        });

        radioStopBtn.addEventListener('click', stopStation);

        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            radioAudio.volume = volume;
            updateVolumeIcon(volume);
        });

        radioAudio.addEventListener('play', () => {
            isPlaying = true;
            updatePlayerUI();
            if (analyser) {
                cancelAnimationFrame(animationFrameId);
                drawVisualizer();
            }
        });

        radioAudio.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayerUI();
            cancelAnimationFrame(animationFrameId);
        });

        radioAudio.addEventListener('error', function(e) {
            const src = radioAudio.getAttribute('src');
            if (!src || src === '') return;
            showError('تعذر تشغيل الإذاعة. قد يكون المصدر معطلاً.');
            isPlaying = false;
            updatePlayerUI();
            cancelAnimationFrame(animationFrameId);
        });
    }

    // جلب الإذاعات وتصنيفها
    async function fetchRadioStations() {
        showLoading(true);
        try {
            const urls = [
                'https://api.mp3quran.net/radios/radio_arabic.json',
                'https://data-rosy.vercel.app/radio.json'
            ];
            
            const requests = urls.map(url => 
                fetch(url).then(res => res.ok ? res.json() : { radios: [] })
            );

            const results = await Promise.all(requests);
            
            let combinedStations = results.flatMap(result => result.radios || []);

            if (combinedStations.length > 0) {
                const uniqueStations = Array.from(new Map(combinedStations.map(s => [s.radio_url, s])).values());
                allStations = uniqueStations.map((radio, index) => ({
                    id: index + 1,
                    name: radio.name.trim(),
                    description: radio.description || 'إذاعة إسلامية',
                    radio_url: radio.radio_url,
                    category: categorizeStation(radio.name)
                }));
                
                populateCategories();
                displayFeaturedStations();
                filterAndDisplayStations();

            } else {
                useFallbackRadioStations();
            }
        } catch (error) {
            console.error('خطأ في جلب الإذاعات:', error);
            useFallbackRadioStations();
        } finally {
            showLoading(false);
        }
    }

    function useFallbackRadioStations() {
        allStations = [{ id: 1, name: 'إذاعة القرآن الكريم من مكة', description: 'بث مباشر من المسجد الحرام', radio_url: 'https://stream.radiojar.com/0tpy1h0kxtzuv', category: 'قرآن كريم' }];
        populateCategories();
        displayFeaturedStations();
        filterAndDisplayStations();
        showError('تم استخدام قائمة احتياطية بسبب تعذر الاتصال بالخادم');
    }

    // تصنيف الإذاعة بناءً على الاسم
    function categorizeStation(name) {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('قرآن')) return 'قرآن كريم';
        if (lowerName.includes('سنة') || lowerName.includes('حديث')) return 'سنة نبوية';
        if (lowerName.includes('فتاوى') || lowerName.includes('فتوى')) return 'فتاوى';
        if (lowerName.includes('تفسير')) return 'تفسير';
        return 'منوعات';
    }

    // عرض فئات الإذاعات
    function populateCategories() {
        const categories = ['all', ...new Set(allStations.map(s => s.category))];
        categoriesContainer.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.dataset.category = category;
            btn.textContent = category === 'all' ? 'الكل' : category;
            if (category === currentCategory) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => {
                currentCategory = category;
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterAndDisplayStations();
            });
            categoriesContainer.appendChild(btn);
        });
    }

    // عرض الإذاعات المميزة
    function displayFeaturedStations() {
        const featuredKeywords = [
            'الدوسري', 
            'الشريم', 
            'السديس', 
            'اذكار الصباح', 
            'اذكار المساء', 
            'البقرة', 
            'حياة الصحابة'
        ];
        let featured = allStations.filter(s => featuredKeywords.some(kw => s.name.includes(kw)));
        
        // Ensure we have a good mix, even if not all keywords are found
        if (featured.length < 7) {
            const randomStations = allStations
                .filter(s => !featured.includes(s)) // Exclude already featured
                .sort(() => 0.5 - Math.random()); // Shuffle
            featured.push(...randomStations.slice(0, 7 - featured.length));
        }
        
        featuredStationsContainer.innerHTML = '';
        featured.slice(0, 7).forEach(station => { // Increased to 7
            const card = document.createElement('div');
            card.className = 'featured-station-card';
            card.innerHTML = `
                <div class="icon"><i class="fas fa-satellite-dish"></i></div>
                <div class="name">${station.name}</div>
            `;
            card.addEventListener('click', () => {
                playStation(station);
            });
            featuredStationsContainer.appendChild(card);
        });
    }
    
    // تصفية وعرض الإذاعات
    function filterAndDisplayStations() {
        let filtered = allStations;

        if (currentCategory !== 'all') {
            filtered = filtered.filter(s => s.category === currentCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(s => 
                s.name.toLowerCase().includes(searchQuery) || 
                s.description.toLowerCase().includes(searchQuery)
            );
        }
        
        displayStations(filtered);
    }

    // عرض قائمة الإذاعات
    function displayStations(stations) {
        radioStationsContainer.innerHTML = '';
        if (stations.length === 0) {
            radioStationsContainer.innerHTML = '<div class="no-results">لم يتم العثور على إذاعات مطابقة</div>';
            return;
        }

        stations.forEach(station => {
            const stationEl = document.createElement('div');
            stationEl.className = 'radio-station';
            stationEl.dataset.id = station.id;

            let stationName = station.name;
            if (searchQuery) {
                const regex = new RegExp(searchQuery, 'gi');
                stationName = stationName.replace(regex, `<span class="highlight">$&</span>`);
            }

            stationEl.innerHTML = `
                <div class="station-icon"><i class="fas fa-satellite-dish"></i></div>
                <div class="station-details">
                    <div class="station-name">${stationName}</div>
                    <div class="station-desc">${station.description}</div>
                </div>
                <div class="playing-indicator">
                    <span></span><span></span><span></span>
                </div>
            `;
            stationEl.addEventListener('click', () => playStation(station));
            radioStationsContainer.appendChild(stationEl);
        });
        updatePlayerUI();
    }

    // تشغيل إذاعة
    function playStation(station) {
        if (!station) return;
        currentStation = station;

        if (!audioCtx) setupAudioNodes();
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        
        radioAudio.crossOrigin = "anonymous";
        radioAudio.src = currentStation.radio_url;
        radioAudio.volume = volumeSlider.value / 100;
        
        const playPromise = radioAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('خطأ في تشغيل الإذاعة:', error);
                showError('تعذر تشغيل الإذاعة تلقائيًا.');
            });
        }
        updateStationInfo();
    }

    // إيقاف الإذاعة
    function stopStation() {
        radioAudio.pause();
        radioAudio.removeAttribute('src');
        radioAudio.load();
        isPlaying = false;
        currentStation = null;
        updateStationInfo();
        updatePlayerUI();
    }

    // تحديث معلومات المشغل
    function updateStationInfo() {
        if (currentStation) {
            currentStationName.textContent = currentStation.name;
            currentStationDesc.textContent = currentStation.description;
            radioPlayBtn.disabled = false;
            radioStopBtn.disabled = false;
        } else {
            currentStationName.textContent = 'اختر إذاعة للبدء';
            currentStationDesc.textContent = 'استمع للقرآن الكريم مباشرة';
            radioPlayBtn.disabled = true;
            radioStopBtn.disabled = true;
        }
    }

    // تحديث واجهة المشغل
    function updatePlayerUI() {
        radioPlayBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        radioPlayer.classList.toggle('playing', isPlaying);

        document.querySelectorAll('.radio-station').forEach(el => el.classList.remove('playing'));
        if (isPlaying && currentStation) {
            const currentStationEl = document.querySelector(`.radio-station[data-id="${currentStation.id}"]`);
            if (currentStationEl) currentStationEl.classList.add('playing');
        }
    }

    // تحديث أيقونة الصوت
    function updateVolumeIcon(volume) {
        if (volume > 0.5) volumeIcon.className = 'fas fa-volume-up';
        else if (volume > 0) volumeIcon.className = 'fas fa-volume-down';
        else volumeIcon.className = 'fas fa-volume-mute';
    }

    // إظهار رسالة خطأ
    function showError(message) {
        const notification = document.createElement('div');
        notification.className = 'radio-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    // إظهار مؤشر التحميل
    function showLoading(show) {
        if(show) {
            radioStationsContainer.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> جاري تحميل الإذاعات...</div>';
        }
    }

    // --- Audio Visualizer Logic ---
    function initVisualizer() {
        if (!visualizerCanvas) return;
        canvasCtx = visualizerCanvas.getContext('2d');
        const resizeCanvas = () => {
            const parent = visualizerCanvas.parentElement;
            if (parent) {
                visualizerCanvas.width = parent.clientWidth;
                visualizerCanvas.height = 60;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
    
    function setupAudioNodes() {
        if (audioCtx) return;
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            source = audioCtx.createMediaElementSource(radioAudio);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            analyser.fftSize = 256;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        } catch(e) { console.error("AudioContext setup failed:", e); }
    }

    function drawVisualizer() {
        if (!analyser) {
            cancelAnimationFrame(animationFrameId);
            return;
        }
        animationFrameId = requestAnimationFrame(drawVisualizer);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
        
        const barWidth = (visualizerCanvas.width / bufferLength) * 1.5;
        let barHeight;
        let x = 0;
        
        const gradient = canvasCtx.createLinearGradient(0, 0, 0, visualizerCanvas.height);
        gradient.addColorStop(0, 'rgba(230, 126, 34, 0.8)');
        gradient.addColorStop(0.5, 'rgba(52, 152, 219, 0.8)');
        gradient.addColorStop(1, 'rgba(230, 126, 34, 0.8)');
        canvasCtx.fillStyle = gradient;

        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 3;
            canvasCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 2;
        }
    }
    
    init();
});