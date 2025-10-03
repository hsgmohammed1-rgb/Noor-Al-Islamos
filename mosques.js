// تهيئة الخريطة والعناصر
let map;
let userMarker;
let mosqueMarkers = [];
let currentLocation = null;
let mosquesData = [];
let radiusCircle;

// عناصر DOM
const elements = {
    mapContainer: document.getElementById('map'),
    locateBtn: document.getElementById('locate-btn'),
    radiusSlider: document.getElementById('radius'),
    radiusValue: document.getElementById('radius-value'),
    loading: document.getElementById('loading'),
    mosquesList: document.getElementById('mosques-list'),
    resultsCount: document.getElementById('results-count'),
    zoomIn: document.getElementById('zoom-in'),
    zoomOut: document.getElementById('zoom-out'),
    currentLoc: document.getElementById('current-loc'),
    prayerTimes: document.getElementById('prayer-times-mosques')
};

// أيقونات الخريطة
const icons = {
    user: L.icon({
        iconUrl: 'https://i.postimg.cc/cHkB94rq/1000091983.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    }),
    mosque: L.icon({
        iconUrl: 'https://i.postimg.cc/T1ZSschF/1000091982.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    })
};

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تأخير تهيئة الخريطة قليلاً لضمان عرضها بشكل صحيح عند التبديل بين الأقسام
    setTimeout(() => {
        if (document.getElementById('mosques-section').classList.contains('active')) {
            initMap();
        }
    }, 100);

    // مراقبة تغيير القسم لتفعيل الخريطة
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && mutation.target.classList.contains('active') && !map) {
                initMap();
            }
        });
    });

    observer.observe(document.getElementById('mosques-section'), { attributes: true });

    setupEventListeners();
});

// تهيئة الخريطة
function initMap() {
    if (map) return; // منع إعادة التهيئة
    // مركز افتراضي (الرياض)
    const defaultCenter = [24.7136, 46.6753];
    
    map = L.map('map').setView(defaultCenter, 13);
    
    // إضافة طبقة الخريطة من OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    if (!elements.locateBtn) return; // التأكد من وجود العناصر
    // زر تحديد الموقع
    elements.locateBtn.addEventListener('click', locateUser);
    
    // شريط نطاق البحث
    elements.radiusSlider.addEventListener('input', function() {
        elements.radiusValue.textContent = `${this.value} كم`;
        if (currentLocation) {
            findNearbyMosques(currentLocation);
        }
    });
    
    // أزرار التحكم بالخريطة
    elements.zoomIn.addEventListener('click', () => map?.zoomIn());
    elements.zoomOut.addEventListener('click', () => map?.zoomOut());
    elements.currentLoc.addEventListener('click', () => {
        if (currentLocation && map) {
            map.setView([currentLocation.lat, currentLocation.lng], 15);
        }
    });
}

// تحديد موقع المستخدم
function locateUser() {
    showLoading();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLoc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                currentLocation = userLoc;
                showUserLocation(userLoc);
                findNearbyMosques(userLoc);
                loadPrayerTimes();
                hideLoading();
            },
            error => {
                hideLoading();
                alert(`تعذر الحصول على الموقع: ${error.message}`);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    } else {
        hideLoading();
        alert("المتصفح لا يدعم خدمة تحديد الموقع");
    }
}

// عرض موقع المستخدم على الخريطة
function showUserLocation(location) {
    if (!map) return;
    // إزالة العلامة القديمة إن وجدت
    if (userMarker) {
        map.removeLayer(userMarker);
    }
    
    // إضافة علامة جديدة
    userMarker = L.marker([location.lat, location.lng], {
        icon: icons.user,
        title: "موقعك الحالي"
    }).addTo(map);
    
    // توجيه الخريطة للموقع الحالي
    map.setView([location.lat, location.lng], 15);
    
    // تحديث دائرة نصف القطر
    updateRadiusCircle(location);
}

function updateRadiusCircle(location) {
    if (!map) return;
    if (radiusCircle) {
        map.removeLayer(radiusCircle);
    }
    const radius = parseFloat(elements.radiusSlider.value) * 1000;
    radiusCircle = L.circle([location.lat, location.lng], {
        color: 'var(--accent-color)',
        fillColor: 'var(--secondary-color)',
        fillOpacity: 0.2,
        radius: radius
    }).addTo(map);
}

// البحث عن المساجد القريبة
async function findNearbyMosques(location) {
    showLoading();
    updateRadiusCircle(location);
    
    const radius = parseFloat(elements.radiusSlider.value) * 1000; // تحويل إلى متر
    
    try {
        // مسح العلامات القديمة
        clearMosqueMarkers();
        
        // جلب بيانات المساجد من Overpass API
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
            (
                node[amenity=place_of_worship][religion=muslim](around:${radius},${location.lat},${location.lng});
                way[amenity=place_of_worship][religion=muslim](around:${radius},${location.lat},${location.lng});
                relation[amenity=place_of_worship][religion=muslim](around:${radius},${location.lat},${location.lng});
            );
            out center;`;
        
        const response = await fetch(overpassUrl);
        const data = await response.json();
        
        mosquesData = data.elements || [];
        
        // عرض النتائج
        displayMosquesOnMap(location);
        displayMosquesList();
        
        hideLoading();
    } catch (error) {
        hideLoading();
        console.error("Error fetching mosques:", error);
        alert("حدث خطأ أثناء جلب بيانات المساجد");
    }
}

// عرض المساجد على الخريطة
function displayMosquesOnMap(userLocation) {
    if (!map) return;
    mosquesData.forEach(mosque => {
        let mosqueLocation;
        let name = "مسجد";
        
        if (mosque.type === "node") {
            mosqueLocation = [mosque.lat, mosque.lon];
        } else if (mosque.center) {
            mosqueLocation = [mosque.center.lat, mosque.center.lon];
        } else {
            return; // تخطي العناصر بدون موقع
        }
        
        if (mosque.tags?.name) {
            name = mosque.tags.name;
        }
        
        // حساب المسافة
        const distance = calculateDistance(
            userLocation.lat, userLocation.lng,
            mosqueLocation[0], mosqueLocation[1]
        ).toFixed(1);
        
        // إنشاء علامة للمسجد
        const marker = L.marker(mosqueLocation, {
            icon: icons.mosque,
            title: name
        }).addTo(map);
        
        // إضافة نافذة معلومات
        const popupContent = `
            <div class="map-popup">
                <h3>${name}</h3>
                <p><strong>المسافة:</strong> ${distance} كم</p>
                ${mosque.tags?.addr_street ? `<p><strong>العنوان:</strong> ${mosque.tags.addr_street}</p>` : ''}
                <button onclick="focusOnMosque(${mosqueLocation[0]}, ${mosqueLocation[1]})" 
                    class="popup-btn">
                    <i class="fas fa-map-marker-alt"></i> عرض على الخريطة
                </button>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        mosqueMarkers.push(marker);
    });
}

// عرض قائمة المساجد
function displayMosquesList() {
    elements.mosquesList.innerHTML = "";
    
    if (mosquesData.length === 0) {
        elements.mosquesList.innerHTML = '<p class="no-results">لم يتم العثور على مساجد في النطاق المحدد</p>';
        elements.resultsCount.textContent = "0 مسجد";
        return;
    }
    
    // ترتيب المساجد حسب المسافة
    mosquesData.sort((a, b) => {
        const locA = a.center ? [a.center.lat, a.center.lon] : [a.lat, a.lon];
        const locB = b.center ? [b.center.lat, b.center.lon] : [b.lat, b.lon];
        
        const distA = calculateDistance(
            currentLocation.lat, currentLocation.lng,
            locA[0], locA[1]
        );
        
        const distB = calculateDistance(
            currentLocation.lat, currentLocation.lng,
            locB[0], locB[1]
        );
        
        return distA - distB;
    });
    
    // عرض المساجد في القائمة
    mosquesData.forEach(mosque => {
        const mosqueLocation = mosque.center ? [mosque.center.lat, mosque.center.lon] : [mosque.lat, mosque.lon];
        const distance = calculateDistance(
            currentLocation.lat, currentLocation.lng,
            mosqueLocation[0], mosqueLocation[1]
        ).toFixed(1);
        
        const mosqueCard = document.createElement('div');
        mosqueCard.className = 'mosque-card';
        mosqueCard.innerHTML = `
            <h3><i class="fas fa-mosque"></i> ${mosque.tags?.name || "مسجد"}</h3>
            <p class="distance"><i class="fas fa-location-arrow"></i> المسافة: ${distance} كم</p>
            ${mosque.tags?.['addr:street'] || mosque.tags?.['addr:city'] ? `<p class="address"><i class="fas fa-map-marker-alt"></i> ${mosque.tags?.['addr:street'] || ''} ${mosque.tags?.['addr:city'] || ''}</p>` : ''}
            <div class="actions">
                <button onclick="focusOnMosque(${mosqueLocation[0]}, ${mosqueLocation[1]})">
                    <i class="fas fa-map"></i> عرض
                </button>
                <button onclick="showDirections(${mosqueLocation[0]}, ${mosqueLocation[1]})">
                    <i class="fas fa-directions"></i> إرشادات
                </button>
            </div>
        `;
        
        elements.mosquesList.appendChild(mosqueCard);
    });
    
    elements.resultsCount.textContent = `${mosquesData.length} مسجد`;
}

// مسح علامات المساجد
function clearMosqueMarkers() {
    mosqueMarkers.forEach(marker => map?.removeLayer(marker));
    mosqueMarkers = [];
}

// التركيز على مسجد معين
function focusOnMosque(lat, lng) {
    if (!map) return;
    map.setView([lat, lng], 17);
    window.scrollTo({ top: document.getElementById('map').offsetTop, behavior: 'smooth' });
}

// عرض إرشادات الوصول
function showDirections(lat, lng) {
    if (currentLocation) {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${lat},${lng}&travelmode=driving`;
        window.open(url, '_blank');
    } else {
        alert("يجب تحديد موقعك أولاً");
    }
}

// حساب المسافة بين نقطتين (بالكيلومترات)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// تحميل أوقات الصلاة
async function loadPrayerTimes() {
    if (!currentLocation) return;
    
    try {
        const date = new Date();
        const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
        const apiUrl = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&method=4`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.data && data.data.timings) {
            displayPrayerTimes(data.data.timings);
        }
    } catch (error) {
        console.error("Error fetching prayer times:", error);
    }
}

// عرض أوقات الصلاة
function displayPrayerTimes(timings) {
    const prayers = {
        "Fajr": "الفجر",
        "Dhuhr": "الظهر",
        "Asr": "العصر",
        "Maghrib": "المغرب",
        "Isha": "العشاء"
    };
    
    const timesGrid = elements.prayerTimes.querySelector('.times-grid');
    timesGrid.innerHTML = '';
    
    for (const [key, name] of Object.entries(prayers)) {
        const timeElement = document.createElement('div');
        timeElement.className = 'prayer-time-card';
        timeElement.innerHTML = `
            <div class="prayer-name">${name}</div>
            <div class="prayer-time-value">${timings[key]}</div>
        `;
        timesGrid.appendChild(timeElement);
    }
}

// عرض شاشة التحميل
function showLoading() {
    elements.loading.style.display = 'flex';
}

// إخفاء شاشة التحميل
function hideLoading() {
    elements.loading.style.display = 'none';
}

// جعل الدوال متاحة عالمياً للاستدعاء من HTML
window.focusOnMosque = focusOnMosque;
window.showDirections = showDirections;
