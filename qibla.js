document.addEventListener("DOMContentLoaded", function () {
    const getLocationButton = document.getElementById('get-location');
    const qiblaResultsContainer = document.getElementById('qibla-results');
    const qiblaMapContainer = document.getElementById('qibla-map');

    // إحداثيات الكعبة المشرفة
    const KAABA_LAT = 21.422487;
    const KAABA_LNG = 39.826206;

    let map = null;
    let userMarker = null;
    let kaabaMarker = null;
    let qiblaLine = null;

    // أيقونات مخصصة للخريطة
    const icons = {
        user: L.icon({
            iconUrl: 'https://i.postimg.cc/G2fSBjPj/1000091987.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        }),
        kaaba: L.icon({
            iconUrl: 'https://i.postimg.cc/j2YsDjwP/1000092012.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        })
    };

    // تهيئة الخريطة
    function initMap() {
        if (map) return;
        qiblaMapContainer.innerHTML = ''; // إزالة الرسالة المؤقتة
        map = L.map(qiblaMapContainer).setView([KAABA_LAT, KAABA_LNG], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);
    }

    // عند النقر على زر تحديد الموقع
    getLocationButton.addEventListener('click', function() {
        showLoadingState();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                handleLocationSuccess,
                handleLocationError,
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            showError('عذراً، متصفحك لا يدعم خدمة تحديد الموقع.');
        }
    });

    // في حالة نجاح تحديد الموقع
    async function handleLocationSuccess(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        try {
            // جلب البيانات بشكل متزامن
            const [qiblaData, locationData] = await Promise.all([
                fetchQiblaDirection(userLat, userLng),
                fetchLocationName(userLat, userLng)
            ]);

            if (!qiblaData) {
                throw new Error('فشل في الحصول على بيانات القبلة');
            }

            const distance = calculateDistance(userLat, userLng, KAABA_LAT, KAABA_LNG);
            
            // تحديث واجهة المستخدم بالبيانات
            updateInfoPanel({
                latitude: userLat,
                longitude: userLng,
                direction: qiblaData.direction,
                distance: distance,
                locationName: locationData
            });

            // تحديث الخريطة
            updateMapView(userLat, userLng);

        } catch (error) {
            console.error('خطأ في معالجة الموقع:', error);
            showError('حدث خطأ أثناء معالجة البيانات. يرجى المحاولة مرة أخرى.');
        }
    }

    // في حالة فشل تحديد الموقع
    function handleLocationError(error) {
        let errorMessage = 'حدث خطأ غير معروف.';
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'تم رفض الوصول للموقع. يرجى السماح للموقع بالوصول لموقعك.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'معلومات الموقع غير متاحة.';
                break;
            case error.TIMEOUT:
                errorMessage = 'انتهت مهلة طلب الموقع.';
                break;
        }
        showError(errorMessage);
    }
    
    // جلب اتجاه القبلة من API
    async function fetchQiblaDirection(lat, lng) {
        const apiUrl = `https://api.aladhan.com/v1/qibla/${lat}/${lng}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('فشل الاتصال بخدمة القبلة');
        const data = await response.json();
        if (data.code === 200 && data.data) {
            return data.data;
        }
        return null;
    }

    // جلب اسم الموقع (مدينة، دولة)
    async function fetchLocationName(lat, lng) {
        try {
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`;
            const response = await fetch(apiUrl);
            if (!response.ok) return "غير معروف";
            const data = await response.json();
            const address = data.address;
            return `${address.city || address.town || address.village || ''}, ${address.country || ''}`;
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            return "غير قادر على تحديد الموقع";
        }
    }

    // حساب المسافة بين نقطتين
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // نصف قطر الأرض بالكيلومتر
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (R * c).toFixed(2); // تقريب لرقمين عشريين
    }

    // تحديث لوحة المعلومات
    function updateInfoPanel(data) {
        qiblaResultsContainer.innerHTML = `
            <div class="qibla-info-item animate-fade-in">
                <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
                <div class="details">
                    <div class="label">موقعك الحالي</div>
                    <div class="value">${data.locationName}</div>
                </div>
            </div>
            <div class="qibla-info-item animate-fade-in" style="animation-delay: 0.1s;">
                <div class="icon"><i class="fas fa-compass"></i></div>
                <div class="details">
                    <div class="label">اتجاه القبلة</div>
                    <div class="value">${data.direction.toFixed(2)} درجة</div>
                </div>
            </div>
            <div class="qibla-info-item animate-fade-in" style="animation-delay: 0.2s;">
                <div class="icon"><i class="fas fa-route"></i></div>
                <div class="details">
                    <div class="label">المسافة إلى الكعبة</div>
                    <div class="value">${data.distance} كم</div>
                </div>
            </div>
            <div class="qibla-info-item animate-fade-in" style="animation-delay: 0.3s;">
                <div class="icon"><i class="fas fa-globe"></i></div>
                <div class="details">
                    <div class="label">الإحداثيات</div>
                    <div class="value">${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}</div>
                </div>
            </div>
        `;
        resetButtonState(true);
    }

    // تحديث عرض الخريطة
    function updateMapView(userLat, userLng) {
        initMap();
        
        const userLatLng = [userLat, userLng];
        const kaabaLatLng = [KAABA_LAT, KAABA_LNG];

        // إزالة العلامات والخطوط القديمة
        if (userMarker) map.removeLayer(userMarker);
        if (kaabaMarker) map.removeLayer(kaabaMarker);
        if (qiblaLine) map.removeLayer(qiblaLine);

        // إضافة علامات جديدة
        userMarker = L.marker(userLatLng, { icon: icons.user }).addTo(map)
            .bindPopup("<b>موقعك الحالي</b>").openPopup();
        kaabaMarker = L.marker(kaabaLatLng, { icon: icons.kaaba }).addTo(map)
            .bindPopup("<b>الكعبة المشرفة</b>");

        // رسم خط القبلة
        qiblaLine = L.polyline([userLatLng, kaabaLatLng], {
            color: 'var(--accent-color)',
            weight: 3,
            opacity: 0.9,
        }).addTo(map);

        // ضبط عرض الخريطة ليناسب العلامتين
        map.fitBounds([userLatLng, kaabaLatLng], { padding: [50, 50] });
    }

    // إظهار حالة التحميل
    function showLoadingState() {
        getLocationButton.disabled = true;
        getLocationButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديد...';
        qiblaResultsContainer.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>جاري تحديد موقعك وحساب اتجاه القبلة...</span>
            </div>
        `;
    }

    // إعادة حالة الزر
    function resetButtonState(isSuccess) {
        getLocationButton.disabled = false;
        getLocationButton.innerHTML = isSuccess 
            ? '<i class="fas fa-location-arrow"></i> تحديد موقعي مرة أخرى'
            : '<i class="fas fa-location-arrow"></i> تحديد موقعي';
    }

    // إظهار رسالة خطأ
    function showError(message) {
        qiblaResultsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        `;
        resetButtonState(false);
    }
});
