document.addEventListener("DOMContentLoaded", function () {
    // --- DOM Elements ---
    const elements = {
        countrySelect: document.getElementById('country-select'),
        citySelect: document.getElementById('city-select'),
        locationDisplay: document.getElementById('prayer-location-display'),
        hijriDateDisplay: document.getElementById('hijri-date-display'),
        nextPrayerName: document.getElementById('next-prayer-name'),
        countdownH: document.getElementById('countdown-h'),
        countdownM: document.getElementById('countdown-m'),
        countdownS: document.getElementById('countdown-s'),
        prayerTimesList: document.getElementById('prayer-times-list'),
        prayerSection: document.getElementById('prayer-times'),
        prayerTimeline: document.querySelector('.prayer-timeline'),
    };

    // --- State ---
    let prayerTimesData = null;
    let countdownInterval = null;
    let currentCity = 'Riyadh';
    let currentCountry = 'SA';

    // List of cities by country
    const citiesByCountry = {
        'SA': [{ value: 'Riyadh', text: 'الرياض' }, { value: 'Jeddah', text: 'جدة' }, { value: 'Mecca', text: 'مكة المكرمة' }, { value: 'Medina', text: 'المدينة المنورة' }, { value: 'Dammam', text: 'الدمام' }],
        'EG': [{ value: 'Cairo', text: 'القاهرة' }, { value: 'Alexandria', text: 'الإسكندرية' }, { value: 'Giza', text: 'الجيزة' }],
        'AE': [{ value: 'Dubai', text: 'دبي' }, { value: 'Abu Dhabi', text: 'أبو ظبي' }, { value: 'Sharjah', text: 'الشارقة' }],
        'KW': [{ value: 'Kuwait City', text: 'مدينة الكويت' }],
        'QA': [{ value: 'Doha', text: 'الدوحة' }],
        'BH': [{ value: 'Manama', text: 'المنامة' }],
        'OM': [{ value: 'Muscat', text: 'مسقط' }],
        'JO': [{ value: 'Amman', text: 'عمان' }],
        'PS': [{ value: 'Jerusalem', text: 'القدس' }, { value: 'Gaza', text: 'غزة' }, { value: 'Ramallah', text: 'رام الله' }],
        'LB': [{ value: 'Beirut', text: 'بيروت' }],
        'SY': [{ value: 'Damascus', text: 'دمشق' }],
        'IQ': [{ value: 'Baghdad', text: 'بغداد' }]
    };
    
    // --- Initialization ---
    function init() {
        setupEventListeners();
        loadInitialData();
    }

    function setupEventListeners() {
        elements.countrySelect.addEventListener('change', handleCountryChange);
        elements.citySelect.addEventListener('change', handleCityChange);
    }

    // --- Data Fetching and Management ---
    async function loadInitialData() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    await fetchPrayerTimes(latitude, longitude);
                },
                (error) => {
                    console.warn("Geolocation failed, falling back to default.", error);
                    populateCountryCities(currentCountry); // Populate cities for default country
                    elements.citySelect.value = currentCity;
                    fetchPrayerTimes(null, null, currentCountry, currentCity);
                }
            );
        } else {
            populateCountryCities(currentCountry); // Populate cities for default country
            elements.citySelect.value = currentCity;
            fetchPrayerTimes(null, null, currentCountry, currentCity);
        }
    }

    async function fetchPrayerTimes(lat, lon, country = null, city = null) {
        showLoading(true);
        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        let apiUrl;

        if (lat && lon) {
            apiUrl = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lon}&method=4`;
        } else if (city && country) {
            apiUrl = `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${city}&country=${country}&method=4`;
        } else {
            showError("بيانات الموقع غير كافية");
            return;
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('فشل الاتصال بالشبكة');
            
            const data = await response.json();
            if (data.code === 200 && data.data) {
                prayerTimesData = data.data;
                // Determine location name from API response if available
                const locationName = await getLocationName(lat, lon, city, country);
                updateUI(prayerTimesData, locationName);
                saveToLocalStorage(locationName, prayerTimesData);
            } else {
                throw new Error('تنسيق البيانات غير صالح');
            }
        } catch (error) {
            console.error('خطأ في جلب أوقات الصلاة:', error);
            const locationName = city && country ? `${city}, ${country}` : 'الموقع الافتراضي';
            const savedData = getFromLocalStorage(locationName);
            if (savedData) {
                prayerTimesData = savedData;
                updateUI(savedData, locationName);
                showNotification('تم عرض البيانات المحفوظة محلياً', 'warning');
            } else {
                showError('تعذر تحميل أوقات الصلاة');
            }
        } finally {
            showLoading(false);
        }
    }
    
    async function getLocationName(lat, lon, city, country) {
        if (city && country) {
            const countryName = elements.countrySelect.options[elements.countrySelect.selectedIndex].text;
            const cityName = Array.from(elements.citySelect.options).find(o => o.value === city)?.text || city;
            return `${cityName}, ${countryName}`;
        }
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ar`);
            const data = await response.json();
            const address = data.address;
            const locationCity = address.city || address.town || address.village || 'مكان غير معروف';
            const locationCountry = address.country || '';
            return `${locationCity}, ${locationCountry}`;
        } catch (e) {
            return 'موقعك الحالي';
        }
    }


    // --- UI Update Functions ---
    function updateUI(data, locationName) {
        updateLocationAndDate(locationName, data.date.hijri);
        updatePrayerList(data.timings);
        updateTimeline(data.timings);
        startCountdown(data.timings);
        updateDynamicBackground(data.timings);
    }
    
    function updateLocationAndDate(locationName, hijriDate) {
        elements.locationDisplay.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${locationName}`;
        elements.hijriDateDisplay.textContent = `${hijriDate.weekday.ar}، ${hijriDate.day} ${hijriDate.month.ar} ${hijriDate.year}`;
    }

    function updatePrayerList(timings) {
        const prayerOrder = [
            { key: 'Fajr', name: 'الفجر', icon: 'fa-moon' },
            { key: 'Sunrise', name: 'الشروق', icon: 'fa-sun' },
            { key: 'Dhuhr', name: 'الظهر', icon: 'fa-sun' },
            { key: 'Asr', name: 'العصر', icon: 'fa-cloud-sun' },
            { key: 'Maghrib', name: 'المغرب', icon: 'fa-cloud-moon' },
            { key: 'Isha', name: 'العشاء', icon: 'fa-moon' },
        ];

        elements.prayerTimesList.innerHTML = '';
        prayerOrder.forEach(prayer => {
            const li = document.createElement('li');
            li.id = `prayer-${prayer.key}`;
            li.innerHTML = `
                <i class="fas ${prayer.icon}"></i>
                <span>${prayer.name}</span>
                <span class="time">${formatTime(timings[prayer.key])}</span>
            `;
            elements.prayerTimesList.appendChild(li);
        });
    }

    function updateTimeline(timings) {
        const prayerSchedule = getPrayerSchedule(timings);
        const dayInMinutes = 24 * 60;
        elements.prayerTimeline.innerHTML = ''; // Clear previous timeline

        prayerSchedule.forEach(prayer => {
            if (prayer.nameEn === 'Sunrise') return; // Don't show sunrise on timeline
            const position = (prayer.time / dayInMinutes) * 100;
            const prayerNode = document.createElement('div');
            prayerNode.className = 'prayer-time-node';
            prayerNode.style.right = `${position}%`; // Use right for RTL
            prayerNode.dataset.prayer = prayer.name;
            elements.prayerTimeline.appendChild(prayerNode);
        });
        
        // Add current time indicator
        const now = new Date();
        const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
        const indicatorPosition = (currentTimeInMinutes / dayInMinutes) * 100;
        let indicator = elements.prayerTimeline.querySelector('.current-time-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'current-time-indicator';
            elements.prayerTimeline.appendChild(indicator);
        }
        indicator.style.right = `${indicatorPosition}%`;
    }

    function updateDynamicBackground(timings) {
        const now = new Date();
        const currentTime = now.getTime();
        const fajrTime = parseTime(timings.Fajr).getTime();
        const sunriseTime = parseTime(timings.Sunrise).getTime();
        const dhuhrTime = parseTime(timings.Dhuhr).getTime();
        const asrTime = parseTime(timings.Asr).getTime();
        const maghribTime = parseTime(timings.Maghrib).getTime();
        const ishaTime = parseTime(timings.Isha).getTime();

        let newClass = '';
        if (currentTime >= fajrTime && currentTime < sunriseTime) {
            newClass = 'theme-fajr';
        } else if (currentTime >= sunriseTime && currentTime < dhuhrTime) {
            newClass = 'theme-sunrise';
        } else if (currentTime >= dhuhrTime && currentTime < asrTime) {
            newClass = 'theme-dhuhr';
        } else if (currentTime >= asrTime && currentTime < maghribTime) {
            newClass = 'theme-asr';
        } else if (currentTime >= maghribTime && currentTime < ishaTime) {
            newClass = 'theme-maghrib';
        } else {
            newClass = 'theme-isha';
        }
        
        elements.prayerSection.className = `content-section active ${newClass}`;
    }

    // --- Countdown Logic ---
    function startCountdown(timings) {
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            const prayerSchedule = getPrayerSchedule(timings, true); // Get schedule for today and tomorrow
            const now = new Date();
            
            let nextPrayer = prayerSchedule.find(p => p.dateObj > now);

            if (!nextPrayer) { // Should not happen with tomorrow's schedule
                elements.nextPrayerName.textContent = "انتهى اليوم";
                return;
            }

            const remainingMillis = nextPrayer.dateObj - now;
            const totalSeconds = Math.floor(remainingMillis / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            elements.nextPrayerName.textContent = nextPrayer.name;
            elements.countdownH.textContent = String(hours).padStart(2, '0');
            elements.countdownM.textContent = String(minutes).padStart(2, '0');
            elements.countdownS.textContent = String(seconds).padStart(2, '0');

            // Update active prayer in the list
            document.querySelectorAll('#prayer-times-list li').forEach(li => li.classList.remove('active'));
            const activePrayerEl = document.getElementById(`prayer-${nextPrayer.nameEn}`);
            if (activePrayerEl) activePrayerEl.classList.add('active');

            // Update timeline indicator
            updateTimeline(timings);

        }, 1000);
    }

    // --- Event Handlers ---
    function handleCountryChange() {
        currentCountry = elements.countrySelect.value;
        populateCountryCities(currentCountry);
        currentCity = elements.citySelect.value;
        fetchPrayerTimes(null, null, currentCountry, currentCity);
    }
    
    function handleCityChange() {
        currentCity = elements.citySelect.value;
        currentCountry = elements.countrySelect.value;
        fetchPrayerTimes(null, null, currentCountry, currentCity);
    }

    // --- Helper Functions ---
    function populateCountryCities(country) {
        const cities = citiesByCountry[country] || [];
        elements.citySelect.innerHTML = '';
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.value;
            option.textContent = city.text;
            elements.citySelect.appendChild(option);
        });
    }
    
    function parseTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    function getPrayerSchedule(timings, includeTomorrow = false) {
        const schedule = [
            { name: 'الفجر', nameEn: 'Fajr', time: convertToMinutes(timings.Fajr), dateObj: parseTime(timings.Fajr) },
            { name: 'الظهر', nameEn: 'Dhuhr', time: convertToMinutes(timings.Dhuhr), dateObj: parseTime(timings.Dhuhr) },
            { name: 'العصر', nameEn: 'Asr', time: convertToMinutes(timings.Asr), dateObj: parseTime(timings.Asr) },
            { name: 'المغرب', nameEn: 'Maghrib', time: convertToMinutes(timings.Maghrib), dateObj: parseTime(timings.Maghrib) },
            { name: 'العشاء', nameEn: 'Isha', time: convertToMinutes(timings.Isha), dateObj: parseTime(timings.Isha) }
        ];

        if (includeTomorrow) {
            const tomorrowFajr = parseTime(timings.Fajr);
            tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
            schedule.push({ name: 'الفجر', nameEn: 'Fajr', time: convertToMinutes(timings.Fajr), dateObj: tomorrowFajr });
        }
        
        return schedule.sort((a, b) => a.dateObj - b.dateObj);
    }

    function convertToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function formatTime(timeStr) {
        if (!timeStr) return '--:--';
        const [hours, minutes] = timeStr.split(':');
        let h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'م' : 'ص';
        h = h % 12;
        h = h ? h : 12; // the hour '0' should be '12'
        return `${String(h).padStart(2, '0')}:${minutes} ${ampm}`;
    }

    function showLoading(isLoading) {
        // You can implement skeleton loaders here if you want
    }
    
    function showError(message) {
        elements.locationDisplay.textContent = message;
        elements.prayerTimesList.innerHTML = `<li class="error-message">${message}</li>`;
    }

    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
    
    function saveToLocalStorage(locationName, data) {
        const key = `prayerTimes_${locationName}`;
        const storageData = { ...data, timestamp: new Date().getTime() };
        localStorage.setItem(key, JSON.stringify(storageData));
    }

    function getFromLocalStorage(locationName) {
        const key = `prayerTimes_${locationName}`;
        const data = localStorage.getItem(key);
        if (data) {
            const parsedData = JSON.parse(data);
            const today = new Date().toDateString();
            const savedDate = new Date(parsedData.timestamp).toDateString();
            if (today === savedDate) return parsedData;
        }
        return null;
    }

    // --- Start the App ---
    init();
});