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

    // المسبحة الإلكترونية المطورة
    // Check if we are on the Tasbih section
    if (document.getElementById('tasbih-section')) {
        // --- DOM Elements ---
        const elements = {
            mainButton: document.getElementById('tasbih-main-button'),
            mainText: document.getElementById('tasbih-main-text'),
            scoreDisplay: document.getElementById('tasbih-score-pro'),
            goalDisplay: document.getElementById('tasbih-goal-display'),
            
            // Controls
            resetBtn: document.getElementById('tasbih-reset-pro'),
            soundToggleBtn: document.getElementById('tasbih-sound-toggle'),
            autoToggleBtn: document.getElementById('tasbih-auto-toggle'),
            autoControls: document.getElementById('tasbih-auto-controls'),
            
            // Speed & Goal
            speedBtns: document.querySelectorAll('.speed-btn'),
            goalBtns: document.querySelectorAll('.goal-btn'),
            
            // Presets
            presetsContainer: document.querySelector('.tasbih-presets-scroller'),
            presetBtns: document.querySelectorAll('.preset-btn-pro'),
            
            // Progress & Sound
            progressRing: document.getElementById('tasbih-progress-ring'),
            clickSound: document.getElementById('tasbih-click-sound')
        };
    
        // --- State ---
        let state = {
            count: 0,
            goal: 33,
            isSoundOn: true,
            isAutoOn: false,
            autoSpeed: 1000, // ms
            autoIntervalId: null,
            ringCircumference: 0,
        };
    
        // --- Initialization ---
        function init() {
            // Set up progress ring
            const radius = elements.progressRing.r.baseVal.value;
            state.ringCircumference = 2 * Math.PI * radius;
            elements.progressRing.style.strokeDasharray = `${state.ringCircumference} ${state.ringCircumference}`;
            
            updateDisplay();
            setupEventListeners();
        }
    
        // --- Event Listeners ---
        function setupEventListeners() {
            elements.mainButton.addEventListener('click', manualCount);
            elements.resetBtn.addEventListener('click', reset);
            elements.soundToggleBtn.addEventListener('click', toggleSound);
            elements.autoToggleBtn.addEventListener('click', toggleAutoTasbih);
    
            elements.presetsContainer.addEventListener('click', e => {
                if (e.target.classList.contains('preset-btn-pro')) {
                    selectPreset(e.target);
                }
            });
    
            elements.goalBtns.forEach(btn => btn.addEventListener('click', () => setGoal(btn)));
            elements.speedBtns.forEach(btn => btn.addEventListener('click', () => setSpeed(btn)));
    
            document.addEventListener('keydown', e => {
                if (document.getElementById('tasbih-section').classList.contains('active')) {
                    if ((e.key === ' ' || e.key === 'Enter') && !state.isAutoOn) {
                        e.preventDefault();
                        // Trigger press effect
                        elements.mainButton.style.transform = 'scale(0.96)';
                        setTimeout(() => elements.mainButton.style.transform = 'scale(1)', 100);
                        manualCount();
                    }
                }
            });
        }
    
        // --- Core Functions ---
        function manualCount() {
            if (state.isAutoOn) return; // Disable manual count in auto mode
            incrementCount();
        }
    
        function incrementCount() {
            state.count++;
            if (state.isSoundOn) playSound();
            updateDisplay();
            
            // Check for goal completion
            if (state.goal > 0 && state.count === state.goal) {
                handleGoalCompletion();
            }
        }
    
        function reset() {
            state.count = 0;
            if (state.isAutoOn) toggleAutoTasbih(); // Turn off auto mode on reset
            updateDisplay();
        }
    
        // --- UI Updates ---
        function updateDisplay() {
            elements.scoreDisplay.textContent = state.count;
            updateProgressRing();
        }
    
        function updateProgressRing() {
            if (state.goal <= 0) {
                elements.progressRing.style.strokeDashoffset = 0; // Full ring for infinity
                return;
            }
            const offset = state.ringCircumference - (state.count / state.goal) * state.ringCircumference;
            elements.progressRing.style.strokeDashoffset = Math.max(0, offset);
        }
        
        function playSound() {
            elements.clickSound.currentTime = 0;
            elements.clickSound.play().catch(e => console.error("Sound play failed:", e));
        }
    
        function handleGoalCompletion() {
            navigator.vibrate?.(200); // Vibrate on goal completion if supported
            elements.mainButton.classList.add('goal-reached');
            setTimeout(() => {
                elements.mainButton.classList.remove('goal-reached');
                if (state.isAutoOn) { // Continue if in auto mode
                    state.count = 0;
                    updateDisplay();
                }
            }, 1000);
        }
    
        // --- Feature Toggles & Setters ---
        function toggleSound() {
            state.isSoundOn = !state.isSoundOn;
            elements.soundToggleBtn.classList.toggle('active', state.isSoundOn);
            elements.soundToggleBtn.innerHTML = state.isSoundOn ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        }
    
        function toggleAutoTasbih() {
            state.isAutoOn = !state.isAutoOn;
            elements.autoToggleBtn.classList.toggle('active', state.isAutoOn);
            elements.mainButton.classList.toggle('auto-mode', state.isAutoOn);
            elements.autoControls.classList.toggle('hidden', !state.isAutoOn);
    
            if (state.isAutoOn) {
                state.autoIntervalId = setInterval(incrementCount, state.autoSpeed);
            } else {
                clearInterval(state.autoIntervalId);
            }
        }
    
        function selectPreset(selectedBtn) {
            elements.presetBtns.forEach(btn => btn.classList.remove('active'));
            selectedBtn.classList.add('active');
            elements.mainText.textContent = selectedBtn.dataset.text;
            reset();
        }
        
        function setGoal(selectedBtn) {
            elements.goalBtns.forEach(btn => btn.classList.remove('active'));
            selectedBtn.classList.add('active');
            state.goal = parseInt(selectedBtn.dataset.goal, 10);
            elements.goalDisplay.textContent = state.goal > 0 ? `الهدف: ${state.goal}` : 'الهدف: ∞';
            state.count = 0;
            updateDisplay();
        }
        
        function setSpeed(selectedBtn) {
            elements.speedBtns.forEach(btn => btn.classList.remove('active'));
            selectedBtn.classList.add('active');
            state.autoSpeed = parseInt(selectedBtn.dataset.speed, 10);
            if (state.isAutoOn) {
                clearInterval(state.autoIntervalId);
                state.autoIntervalId = setInterval(incrementCount, state.autoSpeed);
            }
        }
        
        // --- Run ---
        init();
        
        // Add CSS for goal reached animation dynamically
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
        #tasbih-main-button.goal-reached {
            animation: goal-celebration 1s ease;
        }
        @keyframes goal-celebration {
            0% { transform: scale(1); }
            25% { transform: scale(1.1); box-shadow: 0 0 40px var(--accent-color); }
            50% { transform: scale(0.9); }
            75% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }`;
        document.head.appendChild(styleSheet);
    }
});