document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    // وظيفة للتحكم في الأقسام وتفعيل الأزرار
    function setActiveSection(sectionId) {
        // إخفاء جميع الأقسام
        sections.forEach(section => section.classList.remove('active'));
        
        // إظهار القسم المستهدف
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // تحديث أزرار التنقل
        navButtons.forEach(btn => {
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // قم بالتمرير إلى أعلى الصفحة عند تغيير القسم
        window.scrollTo(0, 0);
    }

    // إضافة مستمعي الأحداث لجميع أزرار التنقل
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            setActiveSection(this.dataset.section);
        });
    });

    // المسبحة الإلكترونية المطورة
    const tasbihSection = document.getElementById('tasbih-section');
    if (tasbihSection) {
        // --- DOM Elements ---
        const elements = {
            mainButton: document.getElementById('tasbih-main-button'),
            mainText: document.getElementById('tasbih-main-text'),
            scoreDisplay: document.getElementById('tasbih-score-pro'),
            goalDisplay: document.getElementById('tasbih-goal-display'),
            resetBtn: document.getElementById('tasbih-reset-pro'),
            soundToggleBtn: document.getElementById('tasbih-sound-toggle'),
            presetsContainer: document.querySelector('.tasbih-presets-scroller'),
            goalBtnsContainer: document.querySelector('.goal-controls'),
            progressRing: document.getElementById('tasbih-progress-ring'),
            clickSound: document.getElementById('tasbih-click-sound'),
            autoToggleBtn: document.getElementById('tasbih-auto-toggle'),
            autoControlsContainer: document.getElementById('tasbih-auto-controls'),
            speedBtnsContainer: document.querySelector('#tasbih-auto-controls .speed-controls'),
        };

        // --- State ---
        let state = {
            count: 0,
            goal: 33,
            isSoundOn: true,
            currentPreset: 'سبحان الله',
            ringCircumference: 0,
            isAutoOn: false,
            autoSpeed: 1000,
            autoInterval: null,
        };

        // --- Persistence ---
        const saveState = () => {
            try {
                localStorage.setItem('tasbihState', JSON.stringify({
                    count: state.count,
                    goal: state.goal,
                    isSoundOn: state.isSoundOn,
                    currentPreset: state.currentPreset,
                    isAutoOn: state.isAutoOn,
                    autoSpeed: state.autoSpeed,
                }));
            } catch (e) {
                console.error("Could not save Tasbih state:", e);
            }
        };

        const loadState = () => {
            try {
                const savedState = localStorage.getItem('tasbihState');
                if (savedState) {
                    const parsedState = JSON.parse(savedState);
                    state.count = parsedState.count || 0;
                    state.goal = parsedState.goal || 33;
                    state.isSoundOn = typeof parsedState.isSoundOn === 'boolean' ? parsedState.isSoundOn : true;
                    state.currentPreset = parsedState.currentPreset || 'سبحان الله';
                    state.isAutoOn = parsedState.isAutoOn || false;
                    state.autoSpeed = parsedState.autoSpeed || 1000;
                }
            } catch (e) {
                console.error("Could not load Tasbih state:", e);
            }
        };

        // --- UI & Effects ---
        const playSound = () => {
            if (state.isSoundOn) {
                elements.clickSound.currentTime = 0;
                elements.clickSound.play().catch(err => console.error("Sound play failed:", err));
            }
        };
        
        const vibrate = (duration) => {
            if (navigator.vibrate) {
                navigator.vibrate(duration);
            }
        };

        const updateUI = () => {
            elements.scoreDisplay.textContent = state.count;
            elements.goalDisplay.textContent = state.goal > 0 ? `الهدف: ${state.goal}` : 'الهدف: ∞';

            if (state.goal > 0) {
                const progress = Math.min(state.count / state.goal, 1);
                const offset = state.ringCircumference - progress * state.ringCircumference;
                elements.progressRing.style.strokeDashoffset = offset;
            } else {
                elements.progressRing.style.strokeDashoffset = state.ringCircumference;
            }
            
            elements.mainText.textContent = state.currentPreset;
            elements.soundToggleBtn.classList.toggle('active', state.isSoundOn);
            elements.soundToggleBtn.innerHTML = state.isSoundOn ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';

            document.querySelectorAll('.preset-btn-pro').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.text === state.currentPreset);
            });

            document.querySelectorAll('.goal-btn').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.goal, 10) === state.goal);
            });
            
            // Update auto-tasbih UI
            elements.autoToggleBtn.classList.toggle('active', state.isAutoOn);
            elements.autoControlsContainer.classList.toggle('hidden', !state.isAutoOn);
            elements.mainButton.disabled = state.isAutoOn;
            elements.mainButton.style.cursor = state.isAutoOn ? 'not-allowed' : 'pointer';
            elements.mainButton.style.opacity = state.isAutoOn ? 0.7 : 1;
            
            document.querySelectorAll('.speed-btn').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.speed, 10) === state.autoSpeed);
            });
        };
        
        // --- Core Logic ---
        const handleGoalCompletion = () => {
            vibrate(200);
            elements.mainButton.classList.add('goal-reached');
            setTimeout(() => {
                elements.mainButton.classList.remove('goal-reached');
                state.count = 0;
                if (!state.isAutoOn) {
                   updateUI();
                   saveState();
                }
            }, 1200);
        };

        const incrementCount = () => {
            if (state.goal > 0 && state.count >= state.goal) {
                state.count = 1;
            } else {
                state.count++;
            }
            
            playSound();
            if (!state.isAutoOn) vibrate(50);
            
            if (state.goal > 0 && state.count === state.goal) {
                handleGoalCompletion();
            }
            updateUI();
            if (!state.isAutoOn) saveState();
        };
        
        const stopAutoTasbih = () => {
            clearInterval(state.autoInterval);
            state.autoInterval = null;
        };
        
        const startAutoTasbih = () => {
            stopAutoTasbih();
            state.autoInterval = setInterval(() => {
                incrementCount();
                saveState(); // Save state on each auto-increment
            }, state.autoSpeed);
        };

        const resetCount = () => {
            state.count = 0;
            if (state.isAutoOn) {
                state.isAutoOn = false;
                stopAutoTasbih();
            }
            updateUI();
            saveState();
        };

        // --- Event Handlers ---
        const onMainButtonClick = () => {
            incrementCount();
        };
        
        const onResetButtonClick = () => {
            resetCount();
        };

        const onSoundToggleClick = () => {
            state.isSoundOn = !state.isSoundOn;
            updateUI();
            saveState();
        };

        const onPresetClick = (e) => {
            const target = e.target.closest('.preset-btn-pro');
            if (target) {
                state.currentPreset = target.dataset.text;
                resetCount();
            }
        };

        const onGoalClick = (e) => {
            const target = e.target.closest('.goal-btn');
            if(target) {
                state.goal = parseInt(target.dataset.goal, 10);
                resetCount();
            }
        };
        
        const onAutoToggleClick = () => {
            state.isAutoOn = !state.isAutoOn;
            if (state.isAutoOn) {
                startAutoTasbih();
            } else {
                stopAutoTasbih();
            }
            updateUI();
            saveState();
        };
        
        const onSpeedClick = (e) => {
            const target = e.target.closest('.speed-btn');
            if(target) {
                state.autoSpeed = parseInt(target.dataset.speed, 10);
                if (state.isAutoOn) {
                    startAutoTasbih();
                }
                updateUI();
                saveState();
            }
        };
        
        // --- Initialization ---
        const init = () => {
            const radius = elements.progressRing.r.baseVal.value;
            state.ringCircumference = 2 * Math.PI * radius;
            elements.progressRing.style.strokeDasharray = `${state.ringCircumference} ${state.ringCircumference}`;
            
            loadState();
            updateUI();

            elements.mainButton.addEventListener('click', onMainButtonClick);
            elements.resetBtn.addEventListener('click', onResetButtonClick);
            elements.soundToggleBtn.addEventListener('click', onSoundToggleClick);
            elements.presetsContainer.addEventListener('click', onPresetClick);
            elements.goalBtnsContainer.addEventListener('click', onGoalClick);
            elements.autoToggleBtn.addEventListener('click', onAutoToggleClick);
            elements.speedBtnsContainer.addEventListener('click', onSpeedClick);
            
            document.addEventListener('keydown', (e) => {
                if (tasbihSection.classList.contains('active') && (e.key === ' ' || e.key === 'Enter') && !state.isAutoOn) {
                    e.preventDefault();
                    elements.mainButton.style.transform = 'scale(0.95)';
                    setTimeout(() => elements.mainButton.style.transform = 'scale(1)', 100);
                    incrementCount();
                }
            });

            if(state.isAutoOn) {
                startAutoTasbih();
            }
        };

        init();
    }
});