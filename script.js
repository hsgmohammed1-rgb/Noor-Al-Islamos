document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    // تنقل بين الأقسام
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            document.getElementById(button.dataset.section).classList.add('active');
            button.classList.add('active');
        });
    });

    // المسبحة الإلكترونية
    const tasbihCounter = document.getElementById('score');
    const tasbihCircle = document.getElementById('circle');
    const resetTasbihBtn = document.getElementById('reset-tasbih');
    const presetBtns = document.querySelectorAll('.preset-btn');
    
    let countValue = 0;
    let currentTasbihText = 'سبح';
    
    // دالة العد
    function count() {
        countValue++;
        tasbihCounter.textContent = countValue;
        
        // إضافة تأثير حركي عند النقر
        tasbihCircle.classList.add('clicked');
        setTimeout(() => {
            tasbihCircle.classList.remove('clicked');
        }, 150);
    }
    
    // إضافة حدث النقر للمسبحة
    tasbihCircle.addEventListener('click', count);
    
    // إعادة تعيين العداد
    resetTasbihBtn.addEventListener('click', function() {
        countValue = 0;
        tasbihCounter.textContent = countValue;
        
        // إضافة تأثير حركي عند إعادة التعيين
        tasbihCounter.classList.add('reset');
        setTimeout(() => {
            tasbihCounter.classList.remove('reset');
        }, 300);
    });
    
    // تغيير نص المسبحة عند اختيار تسبيحة
    presetBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.dataset.text;
            tasbihCircle.textContent = text;
            currentTasbihText = text;
            
            // إضافة الفئة النشطة للزر المحدد
            presetBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // إعادة تعيين العداد
            countValue = 0;
            tasbihCounter.textContent = countValue;
        });
    });
    
    // إضافة دعم لوحة المفاتيح للمسبحة
    document.addEventListener('keydown', function(e) {
        // استخدام مفتاح المسافة أو Enter للعد
        if ((e.key === ' ' || e.key === 'Enter') && document.getElementById('tasbih-section').classList.contains('active')) {
            count();
            e.preventDefault(); // منع التمرير عند الضغط على المسافة
        }
    });
    
    // إضافة CSS للتأثيرات الحركية للمسبحة
    const tasbihStyle = document.createElement('style');
    tasbihStyle.textContent = `
        #circle.clicked {
            transform: scale(0.95);
            box-shadow: 0 0 30px rgba(243, 156, 18, 0.9);
        }
        
        #score.reset {
            animation: fadeOut 0.3s;
        }
        
        @keyframes fadeOut {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
        
        .preset-btn.active {
            background: var(--accent-color);
            color: white;
        }
    `;
    document.head.appendChild(tasbihStyle);

});