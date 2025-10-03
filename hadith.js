document.addEventListener("DOMContentLoaded", function () {
    // عناصر واجهة المستخدم
    const hadithSearchInput = document.getElementById('hadith-search-input');
    const hadithSearchBtn = document.getElementById('hadith-search-btn');
    const hadithCollection = document.getElementById('hadith-collection');
    const hadithContent = document.getElementById('hadith-content');
    const prevHadithPageBtn = document.getElementById('prev-hadith-page');
    const nextHadithPageBtn = document.getElementById('next-hadith-page');
    const hadithPageInfo = document.getElementById('hadith-page-info');
    
    // متغيرات عامة
    let currentPage = 1;
    let totalPages = 1;
    let currentCollection = 'abu-dawud';
    let searchQuery = '';
    let hadithsPerPage = 10;
    let allHadiths = [];
    
    // تهيئة القسم
    function init() {
        // تحميل الأحاديث عند فتح الصفحة
        fetchHadiths();
        
        // إضافة أحداث النقر
        setupEventListeners();
    }
    
    // إعداد أحداث النقر
    function setupEventListeners() {
        // حدث البحث
        hadithSearchBtn.addEventListener('click', function() {
            searchQuery = hadithSearchInput.value.trim();
            currentPage = 1;
            // لا حاجة لـ fetchHadiths() هنا، التصفية تتم في displayHadiths
            displayHadiths();
            updatePaginationInfo();
        });
        
        hadithSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchQuery = hadithSearchInput.value.trim();
                currentPage = 1;
                displayHadiths();
                updatePaginationInfo();
            }
        });
        
        // حدث تغيير مجموعة الأحاديث
        hadithCollection.addEventListener('change', function() {
            currentCollection = this.value;
            currentPage = 1;
            searchQuery = '';
            hadithSearchInput.value = '';
            fetchHadiths();
        });
        
        // أزرار التنقل بين الصفحات
        prevHadithPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayHadiths();
                updatePaginationInfo();
            }
        });
        
        nextHadithPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                displayHadiths();
                updatePaginationInfo();
            }
        });
    }
    
    // جلب الأحاديث من API
    async function fetchHadiths() {
        showLoading(true);
        
        try {
            // بناء رابط API - تم إصلاح الرابط بإزالة page=2
            let apiUrl = `https://hadis-api-id.vercel.app/hadith/${currentCollection}?limit=300`;
            
            // جلب البيانات من API
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('فشل في الاتصال بخدمة الأحاديث');
            }
            
            const data = await response.json();
            
            if (data && data.items && Array.isArray(data.items)) {
                // تخزين جميع الأحاديث
                allHadiths = data.items;
                
                // عرض الأحاديث
                displayHadiths();
                updatePaginationInfo();
            } else {
                throw new Error('تنسيق البيانات غير صحيح');
            }
        } catch (error) {
            console.error('خطأ في جلب الأحاديث:', error);
            showError('تعذر تحميل الأحاديث. يرجى المحاولة مرة أخرى لاحقًا.');
        } finally {
            showLoading(false);
        }
    }
    
    // عرض الأحاديث في الصفحة الحالية
    function displayHadiths() {
        let filteredHadiths = allHadiths;

        // تصفية الأحاديث حسب البحث إذا كان هناك استعلام بحث
        if (searchQuery) {
            filteredHadiths = allHadiths.filter(hadith => 
                hadith.arab.toLowerCase().includes(searchQuery.toLowerCase()) || 
                (hadith.id && hadith.id.toString().includes(searchQuery))
            );
        }

        // حساب عدد الصفحات بناء على الأحاديث المصفاة
        totalPages = Math.ceil(filteredHadiths.length / hadithsPerPage);
        if(totalPages === 0) totalPages = 1;
        if(currentPage > totalPages) currentPage = 1;

        if (filteredHadiths.length === 0) {
            hadithContent.innerHTML = '<div class="no-results">لم يتم العثور على أحاديث مطابقة للبحث</div>';
            updatePaginationInfo();
            prevHadithPageBtn.disabled = true;
            nextHadithPageBtn.disabled = true;
            return;
        }
        
        // حساب الأحاديث التي سيتم عرضها في الصفحة الحالية
        const startIdx = (currentPage - 1) * hadithsPerPage;
        const endIdx = Math.min(startIdx + hadithsPerPage, filteredHadiths.length);
        const currentHadiths = filteredHadiths.slice(startIdx, endIdx);
        
        // إنشاء HTML للأحاديث
        let html = '';
        
        currentHadiths.forEach(hadith => {
            html += `
                <div class="hadith-item">
                    <span class="hadith-number">حديث رقم ${hadith.number}</span>
                    <div class="hadith-text">${hadith.arab}</div>
                </div>
            `;
        });
        
        hadithContent.innerHTML = html;
        
        // تحديث حالة أزرار التنقل
        updatePaginationInfo();
        prevHadithPageBtn.disabled = currentPage === 1;
        nextHadithPageBtn.disabled = currentPage === totalPages || totalPages === 1;
    }
    
    // تحديث معلومات الصفحات
    function updatePaginationInfo() {
        hadithPageInfo.textContent = `الصفحة ${currentPage} من ${totalPages}`;
    }
    
    // إظهار رسالة خطأ
    function showError(message) {
        hadithContent.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
    }
    
    // إظهار مؤشر التحميل
    function showLoading(show) {
        if (show) {
            hadithContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> جاري تحميل الأحاديث...</div>';
        }
    }
    
    // بدء التشغيل
    init();
});