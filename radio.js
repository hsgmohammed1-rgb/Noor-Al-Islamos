document.addEventListener("DOMContentLoaded", function () {
    // عناصر واجهة المستخدم
    const radioSearchInput = document.getElementById('radio-search-input');
    const radioStationsContainer = document.getElementById('radio-stations-container');
    const currentStationName = document.getElementById('current-station-name');
    const currentStationDesc = document.getElementById('current-station-desc');
    const radioPlayBtn = document.getElementById('radio-play-btn');
    const radioStopBtn = document.getElementById('radio-stop-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');
    const radioAudio = document.getElementById('radio-audio');
    const visualizerCanvas = document.getElementById('visualizer');
    
    // متغيرات عامة
    let allStations = [];
    let currentStation = null;
    let isPlaying = false;
    let searchQuery = '';
    
    // متغيرات المؤثرات البصرية
    let canvasCtx, analyser, audioCtx, source, dataArray, bufferLength;
    let animationFrameId;

    // تهيئة القسم
    function init() {
        fetchRadioStations();
        setupEventListeners();
        initVisualizer();
    }
    
    // إعداد أحداث النقر
    function setupEventListeners() {
        radioSearchInput.addEventListener('input', function() {
            searchQuery = this.value.trim().toLowerCase();
            filterStations();
        });
        
        radioPlayBtn.addEventListener('click', function() {
            if (!currentStation) return;
            if (isPlaying) {
                radioAudio.pause();
            } else {
                playStation();
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
    
    // جلب الإذاعات من مصادر متعددة
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
                    radio_url: radio.radio_url
                }));
                displayStations(allStations);
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
        const fallbackStations = [{ id: 1, name: 'إذاعة القرآن الكريم من مكة', description: 'بث مباشر من المسجد الحرام', radio_url: 'https://stream.radiojar.com/0tpy1h0kxtzuv' }];
        allStations = fallbackStations;
        displayStations(allStations);
        showError('تم استخدام قائمة احتياطية بسبب تعذر الاتصال بالخادم');
    }
    
    // عرض الإذاعات
    function displayStations(stations) {
        if (stations.length === 0) {
            radioStationsContainer.innerHTML = '<div class="no-results">لم يتم العثور على إذاعات مطابقة للبحث</div>';
            return;
        }
        
        let html = '';
        stations.forEach(station => {
            let stationName = station.name;
            let stationDesc = station.description;

            if (searchQuery) {
                const regex = new RegExp(searchQuery, 'gi');
                stationName = stationName.replace(regex, `<span class="highlight">$&</span>`);
                stationDesc = stationDesc.replace(regex, `<span class="highlight">$&</span>`);
            }
            html += `
                <div class="radio-station" data-id="${station.id}">
                    <div class="station-icon"><i class="fas fa-satellite-dish"></i></div>
                    <div class="station-details">
                        <div class="station-name">${stationName}</div>
                        <div class="station-desc">${stationDesc}</div>
                    </div>
                    <div class="playing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
        });
        
        radioStationsContainer.innerHTML = html;
        
        const stationElements = document.querySelectorAll('.radio-station');
        stationElements.forEach(element => {
            element.addEventListener('click', function() {
                const stationId = this.dataset.id;
                currentStation = allStations.find(s => s.id.toString() === stationId);
                updateStationInfo();
                radioPlayBtn.disabled = false;
                radioStopBtn.disabled = false;
                playStation();
            });
        });
    }
    
    function filterStations() {
        const filtered = allStations.filter(s => 
            s.name.toLowerCase().includes(searchQuery) || 
            s.description.toLowerCase().includes(searchQuery)
        );
        displayStations(filtered);
    }
    
    function playStation() {
        if (!currentStation) return;
        
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
    }
    
    function stopStation() {
        radioAudio.pause();
        radioAudio.removeAttribute('src');
        radioAudio.load();
        isPlaying = false;
        updatePlayerUI();
    }
    
    function updateStationInfo() {
        if (currentStation) {
            currentStationName.textContent = currentStation.name;
            currentStationDesc.textContent = currentStation.description;
        } else {
            currentStationName.textContent = 'اختر إذاعة للبدء';
            currentStationDesc.textContent = 'استمع للقرآن الكريم مباشرة';
        }
    }
    
    function updatePlayerUI() {
        radioPlayBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        document.querySelectorAll('.radio-station').forEach(el => el.classList.remove('playing'));
        if (isPlaying && currentStation) {
            const currentStationEl = document.querySelector(`.radio-station[data-id="${currentStation.id}"]`);
            if (currentStationEl) currentStationEl.classList.add('playing');
        }
    }
    
    function updateVolumeIcon(volume) {
        if (volume > 0.5) volumeIcon.className = 'fas fa-volume-up';
        else if (volume > 0) volumeIcon.className = 'fas fa-volume-down';
        else volumeIcon.className = 'fas fa-volume-mute';
    }

    function showError(message) {
        // Simple notification logic
        const notification = document.createElement('div');
        notification.className = 'radio-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    function showLoading(show) {
        radioStationsContainer.innerHTML = show ? '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> جاري تحميل الإذاعات...</div>' : '';
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