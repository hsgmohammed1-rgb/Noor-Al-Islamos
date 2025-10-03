document.addEventListener("DOMContentLoaded", function () {
    // عناصر واجهة المستخدم
    const countrySelect = document.getElementById('country-select');
    const citySelect = document.getElementById('city-select');
    const updateButton = document.getElementById('update-prayer-times');
    
    // عناصر عرض أوقات الصلاة
    const prayerTimeElements = {
        Fajr: document.getElementById('fajr-time'),
        Sunrise: document.getElementById('sunrise-time'),
        Dhuhr: document.getElementById('dhuhr-time'),
        Asr: document.getElementById('asr-time'),
        Maghrib: document.getElementById('maghrib-time'),
        Isha: document.getElementById('isha-time')
    };
    
    // عناصر عرض الصلاة القادمة
    const nextPrayerNameElement = document.getElementById('next-prayer-name');
    const remainingTimeElement = document.getElementById('remaining-time');
    
    // قائمة المدن حسب البلد
    const citiesByCountry = {
        'SA': [
            { value: 'Riyadh', text: 'الرياض' },
            { value: 'Jeddah', text: 'جدة' },
            { value: 'Mecca', text: 'مكة المكرمة' },
            { value: 'Medina', text: 'المدينة المنورة' },
            { value: 'Dammam', text: 'الدمام' },
            { value: 'Taif', text: 'الطائف' },
            { value: 'Tabuk', text: 'تبوك' },
            { value: 'Abha', text: 'أبها' }
        ],
        'EG': [
            { value: 'Cairo', text: 'القاهرة' },
            { value: 'Alexandria', text: 'الإسكندرية' },
            { value: 'Giza', text: 'الجيزة' },
            { value: 'Luxor', text: 'الأقصر' },
            { value: 'Aswan', text: 'أسوان' },
            { value: 'Sharm El-Sheikh', text: 'شرم الشيخ' },
            { value: 'Hurghada', text: 'الغردقة' }
        ],
        'AE': [
            { value: 'Dubai', text: 'دبي' },
            { value: 'Abu Dhabi', text: 'أبو ظبي' },
            { value: 'Sharjah', text: 'الشارقة' },
            { value: 'Ajman', text: 'عجمان' },
            { value: 'Fujairah', text: 'الفجيرة' },
            { value: 'Ras Al Khaimah', text: 'رأس الخيمة' }
        ],
        'KW': [
            { value: 'Kuwait City', text: 'مدينة الكويت' },
            { value: 'Al Ahmadi', text: 'الأحمدي' },
            { value: 'Hawalli', text: 'حولي' },
            { value: 'Salmiya', text: 'السالمية' }
        ],
        'QA': [
            { value: 'Doha', text: 'الدوحة' },
            { value: 'Al Rayyan', text: 'الريان' },
            { value: 'Al Wakrah', text: 'الوكرة' },
            { value: 'Al Khor', text: 'الخور' }
        ],
        'BH': [
            { value: 'Manama', text: 'المنامة' },
            { value: 'Riffa', text: 'الرفاع' },
            { value: 'Muharraq', text: 'المحرق' }
        ],
        'OM': [
            { value: 'Muscat', text: 'مسقط' },
            { value: 'Salalah', text: 'صلالة' },
            { value: 'Sohar', text: 'صحار' },
            { value: 'Nizwa', text: 'نزوى' }
        ],
        'JO': [
            { value: 'Amman', text: 'عمان' },
            { value: 'Zarqa', text: 'الزرقاء' },
            { value: 'Irbid', text: 'إربد' },
            { value: 'Aqaba', text: 'العقبة' }
        ],
        'PS': [
            { value: 'Jerusalem', text: 'القدس' },
            { value: 'Gaza', text: 'غزة' },
            { value: 'Ramallah', text: 'رام الله' },
            { value: 'Hebron', text: 'الخليل' },
            { value: 'Nablus', text: 'نابلس' }
        ],
        'LB': [
            { value: 'Beirut', text: 'بيروت' },
            { value: 'Tripoli', text: 'طرابلس' },
            { value: 'Sidon', text: 'صيدا' },
            { value: 'Tyre', text: 'صور' }
        ],
        'SY': [
            { value: 'Damascus', text: 'دمشق' },
            { value: 'Aleppo', text: 'حلب' },
            { value: 'Homs', text: 'حمص' },
            { value: 'Latakia', text: 'اللاذقية' }
        ],
        'IQ': [
            { value: 'Baghdad', text: 'بغداد' },
            { value: 'Basra', text: 'البصرة' },
            { value: 'Mosul', text: 'الموصل' },
            { value: 'Erbil', text: 'أربيل' },
            { value: 'Najaf', text: 'النجف' }
        ]
    };

    // تحديث قائمة المدن عند تغيير البلد
    countrySelect.addEventListener('change', function() {
        const country = this.value;
        const cities = citiesByCountry[country] || [];
        
        // إفراغ قائمة المدن
        citySelect.innerHTML = '';
        
        // إضافة المدن الجديدة
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.value;
            option.textContent = city.text;
            citySelect.appendChild(option);
        });
        
        // تحديث أوقات الصلاة تلقائيًا عند تغيير البلد
        if (cities.length > 0) {
            fetchPrayerTimes(country, cities[0].value);
        }
    });

    // تحديث أوقات الصلاة عند تغيير المدينة
    citySelect.addEventListener('change', function() {
        const country = countrySelect.value;
        const city = this.value;
        fetchPrayerTimes(country, city);
    });

    // تحديث أوقات الصلاة عند النقر على زر التحديث
    updateButton.addEventListener('click', function() {
        fetchPrayerTimes(countrySelect.value, citySelect.value);
    });

    // دالة لإظهار أو إخفاء مؤشر التحميل
    function showLoading(show) {
        updateButton.disabled = show;
        updateButton.innerHTML = show ? '<i class="fas fa-spinner fa-spin"></i>' : 'تحديث';
        
        if (show) {
            Object.values(prayerTimeElements).forEach(element => {
                element.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            });
        }
    }

    // دالة لجلب أوقات الصلاة من API
    async function fetchPrayerTimes(country, city) {
        try {
            showLoading(true);
            const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=4`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('فشل في الاتصال بخدمة أوقات الصلاة');
            }

            const data = await response.json();

            if (data.code === 200 && data.status === 'OK') {
                const times = data.data.timings;
                
                // تحديث أوقات الصلاة في الصفحة
                updatePrayerTimesUI(times);

                // تحديث الصلاة القادمة
                updateNextPrayer(times);

                // حفظ البيانات في التخزين المحلي
                saveToLocalStorage(country, city, times);

            } else {
                throw new Error('البيانات غير صحيحة');
            }
        } catch (error) {
            console.error('خطأ في جلب أوقات الصلاة:', error);
            const savedData = getFromLocalStorage(country, city);
            if (savedData) {
                updatePrayerTimesUI(savedData);
                updateNextPrayer(savedData);
                showNotification('تم استخدام البيانات المخزنة محليًا', 'warning');
            } else {
                useFallbackData(city);
                showNotification('تعذر الاتصال بخدمة أوقات الصلاة', 'error');
            }
        } finally {
            showLoading(false);
        }
    }
    
    // دالة لتنسيق الوقت
    function formatTime(timeStr) {
        if (!timeStr) return '--:--';
        const [hours, minutes] = timeStr.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }
    
    // دالة لإظهار إشعار
    function showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i> <span>${message}</span>`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    // دالة لحفظ البيانات في التخزين المحلي
    function saveToLocalStorage(country, city, data) {
        const key = `prayerTimes_${country}_${city}`;
        const storageData = {
            ...data,
            dateString: new Date().toDateString()
        };
        localStorage.setItem(key, JSON.stringify(storageData));
    }
    
    // دالة لاسترجاع البيانات من التخزين المحلي
    function getFromLocalStorage(country, city) {
        const key = `prayerTimes_${country}_${city}`;
        const data = localStorage.getItem(key);
        
        if (data) {
            const parsedData = JSON.parse(data);
            if (parsedData.dateString === new Date().toDateString()) {
                return parsedData;
            }
        }
        return null;
    }
    
    // دالة لاستخدام البيانات الاحتياطية
    function useFallbackData(city) {
        const fallbackTimes = {
            'Riyadh': { Fajr: '04:35', Sunrise: '06:04', Dhuhr: '12:12', Asr: '15:37', Maghrib: '18:20', Isha: '19:50' },
            'Jeddah': { Fajr: '04:52', Sunrise: '06:18', Dhuhr: '12:25', Asr: '15:45', Maghrib: '18:32', Isha: '20:02' },
            'Cairo': { Fajr: '04:15', Sunrise: '05:45', Dhuhr: '12:05', Asr: '15:25', Maghrib: '18:15', Isha: '19:45' }
        };
        const times = fallbackTimes[city] || fallbackTimes['Riyadh'];
        updatePrayerTimesUI(times);
        updateNextPrayer(times);
    }
    
    // دالة لتحديث واجهة المستخدم بأوقات الصلاة
    function updatePrayerTimesUI(times) {
        for (const prayer in prayerTimeElements) {
            if (prayerTimeElements.hasOwnProperty(prayer) && times.hasOwnProperty(prayer)) {
                prayerTimeElements[prayer].textContent = formatTime(times[prayer]);
                prayerTimeElements[prayer].classList.add('updated');
                setTimeout(() => prayerTimeElements[prayer].classList.remove('updated'), 1000);
            }
        }
    }

    // دالة لتحديث الصلاة القادمة
    function updateNextPrayer(times) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const prayerSchedule = [
            { name: 'الفجر', nameEn: 'Fajr', time: convertToMinutes(times.Fajr) },
            { name: 'الشروق', nameEn: 'Sunrise', time: convertToMinutes(times.Sunrise) },
            { name: 'الظهر', nameEn: 'Dhuhr', time: convertToMinutes(times.Dhuhr) },
            { name: 'العصر', nameEn: 'Asr', time: convertToMinutes(times.Asr) },
            { name: 'المغرب', nameEn: 'Maghrib', time: convertToMinutes(times.Maghrib) },
            { name: 'العشاء', nameEn: 'Isha', time: convertToMinutes(times.Isha) }
        ];

        let nextPrayer = null;
        for (const prayer of prayerSchedule) {
            if (prayer.time > currentTime) {
                nextPrayer = prayer;
                break;
            }
        }
        
        let remainingMinutes;
        if (nextPrayer) {
            remainingMinutes = nextPrayer.time - currentTime;
        } else {
            // الصلاة القادمة هي الفجر في اليوم التالي
            nextPrayer = prayerSchedule[0];
            remainingMinutes = (24 * 60 - currentTime) + nextPrayer.time;
        }
        
        const hours = Math.floor(remainingMinutes / 60);
        const minutes = remainingMinutes % 60;

        nextPrayerNameElement.textContent = nextPrayer.name;
        remainingTimeElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        // تمييز بطاقة الصلاة القادمة
        document.querySelectorAll('.prayer-card').forEach(card => card.classList.remove('active'));
        const nextPrayerCard = prayerTimeElements[nextPrayer.nameEn]?.parentElement;
        if(nextPrayerCard) nextPrayerCard.classList.add('active');
    }

    function convertToMinutes(timeString) {
        if (!timeString) return 0;
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // تهيئة عند تحميل الصفحة
    function initialize() {
        const defaultCountry = 'SA';
        const defaultCity = 'Riyadh';
        countrySelect.value = defaultCountry;
        countrySelect.dispatchEvent(new Event('change')); // لتعبئة المدن
        citySelect.value = defaultCity;
        
        const savedData = getFromLocalStorage(defaultCountry, defaultCity);
        if(savedData) {
            updatePrayerTimesUI(savedData);
            updateNextPrayer(savedData);
        } else {
            fetchPrayerTimes(defaultCountry, defaultCity);
        }
    }

    initialize();

    // تحديث الوقت المتبقي كل دقيقة
    setInterval(() => {
        const savedData = getFromLocalStorage(countrySelect.value, citySelect.value);
        if (savedData) {
            updateNextPrayer(savedData);
        }
    }, 60000);
    
    // إضافة CSS للتأثيرات الحركية
    const style = document.createElement('style');
    style.textContent = `
        .prayer-card.active {
            transform: translateY(-5px);
            box-shadow: 0 0 20px var(--accent-color);
            border-color: var(--accent-color);
        }
        .prayer-time.updated {
            animation: highlight 1s ease-in-out;
        }
        #next-prayer-name {
            display: inline-block;
            animation: pulse 2s infinite;
        }
        @keyframes highlight {
            0% { color: var(--text-color); }
            50% { color: var(--accent-color); transform: scale(1.1); }
            100% { color: var(--text-color); transform: scale(1); }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            border-radius: var(--border-radius-md);
            background: rgba(44, 62, 80, 0.9);
            color: white;
            z-index: 1001;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            backdrop-filter: blur(5px);
            transition: opacity 0.5s, transform 0.5s;
            animation: slideUp 0.5s ease-out forwards;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification.hide {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        .notification.error { background: rgba(231, 76, 60, 0.9); }
        .notification.warning { background: rgba(243, 156, 18, 0.9); }
        @keyframes slideUp {
            from { transform: translate(-50%, 50px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});