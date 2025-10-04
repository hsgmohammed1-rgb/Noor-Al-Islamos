document.addEventListener("DOMContentLoaded", function () {
    const azkarCategories = [
        { "ID": 27, "TITLE": "أذكار الصباح والمساء", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_028.mp3", "ICON": "fa-sun" },
        { "ID": 28, "TITLE": "أذكار النوم", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_029.mp3", "ICON": "fa-bed" },
        { "ID": 1, "TITLE": "أذكار الاستيقاظ", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_002.mp3", "ICON": "fa-clock" },
        { "ID": 6, "TITLE": "دعاء دخول الخلاء", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_007.mp3", "ICON": "fa-toilet" },
        { "ID": 7, "TITLE": "دعاء الخروج من الخلاء", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_008.mp3", "ICON": "fa-door-open" },
        { "ID": 8, "TITLE": "الذكر قبل الوضوء", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_009.mp3", "ICON": "fa-faucet" },
        { "ID": 9, "TITLE": "الذكر بعد الوضوء", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_010.mp3", "ICON": "fa-tint" },
        { "ID": 10, "TITLE": "الذكر عند الخروج من المنزل", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_011.mp3", "ICON": "fa-house-user" },
        { "ID": 11, "TITLE": "الذكر عند دخول المنزل", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_012.mp3", "ICON": "fa-house-chimney" },
        { "ID": 12, "TITLE": "دعاء الذهاب إلى المسجد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_013.mp3", "ICON": "fa-walking" },
        { "ID": 13, "TITLE": "دعاء دخول المسجد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_014.mp3", "ICON": "fa-person-booth" },
        { "ID": 14, "TITLE": "دعاء الخروج من المسجد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_015.mp3", "ICON": "fa-door-closed" },
        { "ID": 15, "TITLE": "أذكار الآذان", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_016.mp3", "ICON": "fa-bullhorn" },
        { "ID": 2, "TITLE": "دعاء ُلبْس الثوب", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_003.mp3", "ICON": "fa-tshirt" },
        { "ID": 3, "TITLE": "دعاء ُلبْس الثوب الجديد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_004.mp3", "ICON": "fa-tshirt" },
        { "ID": 4, "TITLE": "الدعاء لمن لبس ثوبا جديدا", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_005.mp3", "ICON": "fa-gift" },
        { "ID": 5, "TITLE": "ما يقول إذا وضع ثوبه", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_006.mp3", "ICON": "fa-user-slash" },
        { "ID": 16, "TITLE": "دعاء الاستفتاح", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_017.mp3", "ICON": "fa-comment-dots" },
        { "ID": 17, "TITLE": "دعاء الركوع", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_018.mp3", "ICON": "fa-person-praying" },
        { "ID": 18, "TITLE": "دعاء الرفع من الركوع", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_019.mp3", "ICON": "fa-person-praying" },
        { "ID": 19, "TITLE": "دعاء السجود", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_020.mp3", "ICON": "fa-person-praying" },
        { "ID": 20, "TITLE": "دعاء الجلسة بين السجدتين", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_021.mp3", "ICON": "fa-person-praying" },
        { "ID": 21, "TITLE": "دعاء سجود التلاوة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_022.mp3", "ICON": "fa-book-open" },
        { "ID": 22, "TITLE": "التشهد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_023.mp3", "ICON": "fa-hand-pointer" },
        { "ID": 23, "TITLE": "الصلاة على النبي بعد التشهد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_024.mp3", "ICON": "fa-mosque" },
        { "ID": 24, "TITLE": "الدعاء بعد التشهد الأخير", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_025.mp3", "ICON": "fa-hands-praying" },
        { "ID": 25, "TITLE": "الأذكار بعد السلام من الصلاة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_026.mp3", "ICON": "fa-mosque" },
        { "ID": 26, "TITLE": "دعاء صلاة الاستخارة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_027.mp3", "ICON": "fa-question-circle" },
        { "ID": 29, "TITLE": "الدعاء إذا تقلب ليلا", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_030.mp3", "ICON": "fa-moon" },
        { "ID": 30, "TITLE": "دعاء الفزع في النوم", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_031.mp3", "ICON": "fa-bolt" },
        { "ID": 31, "TITLE": "ما يفعل من رأى الرؤيا", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_032.mp3", "ICON": "fa-cloud" },
        { "ID": 32, "TITLE": "دعاء قنوت الوتر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_033.mp3", "ICON": "fa-moon" },
        { "ID": 33, "TITLE": "الذكر عقب السلام من الوتر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_034.mp3", "ICON": "fa-moon" },
        { "ID": 34, "TITLE": "دعاء الهم والحزن", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_035.mp3", "ICON": "fa-sad-tear" },
        { "ID": 35, "TITLE": "دعاء الكرب", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_036.mp3", "ICON": "fa-bolt" },
        { "ID": 36, "TITLE": "دعاء لقاء العدو", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_037.mp3", "ICON": "fa-shield-alt" },
        { "ID": 37, "TITLE": "دعاء من خاف ظلم السلطان", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_038.mp3", "ICON": "fa-balance-scale" },
        { "ID": 38, "TITLE": "الدعاء على العدو", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_039.mp3", "ICON": "fa-bomb" },
        { "ID": 39, "TITLE": "ما يقول من خاف قوما", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_040.mp3", "ICON": "fa-users" },
        { "ID": 40, "TITLE": "دعاء الوسوسة في الإيمان", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_041.mp3", "ICON": "fa-comment-slash" },
        { "ID": 41, "TITLE": "دعاء قضاء الدين", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_042.mp3", "ICON": "fa-hand-holding-usd" },
        { "ID": 42, "TITLE": "دعاء الوسوسة في الصلاة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_043.mp3", "ICON": "fa-mosque" },
        { "ID": 43, "TITLE": "دعاء من استصعب عليه أمر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_044.mp3", "ICON": "fa-exclamation-triangle" },
        { "ID": 44, "TITLE": "ما يفعل من أذنب ذنبا", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_045.mp3", "ICON": "fa-heart-broken" },
        { "ID": 45, "TITLE": "دعاء طرد الشيطان", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_046.mp3", "ICON": "fa-user-secret" },
        { "ID": 46, "TITLE": "الدعاء حينما يقع ما لا يرضاه", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_047.mp3", "ICON": "fa-thumbs-down" },
        { "ID": 47, "TITLE": "ﺗﻬنئة المولود له", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_048.mp3", "ICON": "fa-baby" },
        { "ID": 48, "TITLE": "ما يعوذ به الأولاد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_049.mp3", "ICON": "fa-child" },
        { "ID": 49, "TITLE": "الدعاء للمريض", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_050.mp3", "ICON": "fa-briefcase-medical" },
        { "ID": 50, "TITLE": "فضل عيادة المريض", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_051.mp3", "ICON": "fa-hand-holding-heart" },
        { "ID": 51, "TITLE": "دعاء المريض الذي يئس من حياته", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_052.mp3", "ICON": "fa-procedures" },
        { "ID": 52, "TITLE": "تلقين المحتضر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_053.mp3", "ICON": "fa-bed" },
        { "ID": 53, "TITLE": "دعاء من أصيب بمصيبة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_054.mp3", "ICON": "fa-heartbeat" },
        { "ID": 54, "TITLE": "الدعاء عند إغماض الميت", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_055.mp3", "ICON": "fa-bed" },
        { "ID": 55, "TITLE": "الدعاء للميت في الصلاة عليه", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_056.mp3", "ICON": "fa-person-praying" },
        { "ID": 56, "TITLE": "الدعاء للفرط في الصلاة عليه", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_057.mp3", "ICON": "fa-child" },
        { "ID": 57, "TITLE": "دعاء التعزية", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_058.mp3", "ICON": "fa-hands" },
        { "ID": 58, "TITLE": "الدعاء عند إدخال الميت القبر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_059.mp3", "ICON": "fa-dolly" },
        { "ID": 59, "TITLE": "الدعاء بعد دفن الميت", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_060.mp3", "ICON": "fa-hands-praying" },
        { "ID": 60, "TITLE": "دعاء زيارة القبور", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_061.mp3", "ICON": "fa-tombstone" },
        { "ID": 61, "TITLE": "دعاء الريح", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_062.mp3", "ICON": "fa-wind" },
        { "ID": 62, "TITLE": "دعاء الرعد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_063.mp3", "ICON": "fa-cloud-bolt" },
        { "ID": 63, "TITLE": "من أدعية الاستسقاء", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_064.mp3", "ICON": "fa-cloud-rain" },
        { "ID": 64, "TITLE": "الدعاء إذا نزل المطر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_065.mp3", "ICON": "fa-cloud-showers-heavy" },
        { "ID": 65, "TITLE": "الذكر بعد نزول المطر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_066.mp3", "ICON": "fa-tint" },
        { "ID": 66, "TITLE": "من أدعية الاستصحاء", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_067.mp3", "ICON": "fa-sun" },
        { "ID": 67, "TITLE": "دعاء رؤية الهلال", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_068.mp3", "ICON": "fa-moon" },
        { "ID": 68, "TITLE": "الدعاء عند إفطار الصائم", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_069.mp3", "ICON": "fa-utensils" },
        { "ID": 69, "TITLE": "الدعاء قبل الطعام", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_070.mp3", "ICON": "fa-utensils" },
        { "ID": 70, "TITLE": "الدعاء عند الفراغ من الطعام", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_071.mp3", "ICON": "fa-utensils" },
        { "ID": 71, "TITLE": "دعاء الضيف لصاحب الطعام", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_072.mp3", "ICON": "fa-handshake" },
        { "ID": 72, "TITLE": "الدعاء لطلب الطعام أو الشراب", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_073.mp3", "ICON": "fa-glass-whiskey" },
        { "ID": 73, "TITLE": "الدعاء إذا أفطر عند أهل بيت", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_074.mp3", "ICON": "fa-house-user" },
        { "ID": 74, "TITLE": "دعاء الصائم إذا حضر الطعام", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_075.mp3", "ICON": "fa-utensils" },
        { "ID": 75, "TITLE": "ما يقول الصائم إذا سابه أحد", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_076.mp3", "ICON": "fa-comment-slash" },
        { "ID": 76, "TITLE": "الدعاء عند رؤية باكورة الثمر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_077.mp3", "ICON": "fa-apple-alt" },
        { "ID": 77, "TITLE": "دعاء العطاس", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_078.mp3", "ICON": "fa-head-side-cough" },
        { "ID": 78, "TITLE": "ما يقال للكافر إذا عطس", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_079.mp3", "ICON": "fa-head-side-cough" },
        { "ID": 79, "TITLE": "الدعاء للمتزوج", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_080.mp3", "ICON": "fa-ring" },
        { "ID": 80, "TITLE": "دعاء المتزوج وشراء الدابة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_081.mp3", "ICON": "fa-horse" },
        { "ID": 81, "TITLE": "الدعاء قبل إتيان الزوجة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_082.mp3", "ICON": "fa-heart" },
        { "ID": 82, "TITLE": "دعاء الغضب", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_083.mp3", "ICON": "fa-angry" },
        { "ID": 83, "TITLE": "دعاء من رأى مبتلى", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_084.mp3", "ICON": "fa-eye" },
        { "ID": 84, "TITLE": "ما يقال في اﻟﻤﺠلس", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_085.mp3", "ICON": "fa-users" },
        { "ID": 85, "TITLE": "كفارة اﻟﻤﺠلس", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_086.mp3", "ICON": "fa-users" },
        { "ID": 86, "TITLE": "الدعاء لمن قال غفر الله لك", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_087.mp3", "ICON": "fa-hand-holding-heart" },
        { "ID": 87, "TITLE": "الدعاء لمن صنع إليك معروفا", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_088.mp3", "ICON": "fa-gift" },
        { "ID": 88, "TITLE": "ما يعصم الله به من الدجال", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_089.mp3", "ICON": "fa-shield-alt" },
        { "ID": 89, "TITLE": "الدعاء لمن قال إني أحبك في الله", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_090.mp3", "ICON": "fa-heart" },
        { "ID": 90, "TITLE": "الدعاء لمن عرض عليك ماله", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_091.mp3", "ICON": "fa-donate" },
        { "ID": 91, "TITLE": "الدعاء لمن أقرض عند القضاء", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_091.mp3", "ICON": "fa-credit-card" },
        { "ID": 92, "TITLE": "دعاء الخوف من الشرك", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_092.mp3", "ICON": "fa-exclamation-triangle" },
        { "ID": 93, "TITLE": "الدعاء لمن قال بارك الله فيك", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_094.mp3", "ICON": "fa-hand-holding-heart" },
        { "ID": 94, "TITLE": "دعاء كراهية الطيرة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_095.mp3", "ICON": "fa-dove" },
        { "ID": 95, "TITLE": "دعاء الركوب", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_096.mp3", "ICON": "fa-car" },
        { "ID": 96, "TITLE": "دعاء السفر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_097.mp3", "ICON": "fa-plane" },
        { "ID": 97, "TITLE": "دعاء دخول القرية أو البلدة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_098.mp3", "ICON": "fa-city" },
        { "ID": 98, "TITLE": "دعاء دخول السوق", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_099.mp3", "ICON": "fa-store" },
        { "ID": 99, "TITLE": "الدعاء إذا تعس المركوب", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_100.mp3", "ICON": "fa-car-crash" },
        { "ID": 100, "TITLE": "دعاء المسافر للمقيم", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_101.mp3", "ICON": "fa-plane-departure" },
        { "ID": 101, "TITLE": "دعاء المقيم للمسافر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_102.mp3", "ICON": "fa-plane-arrival" },
        { "ID": 102, "TITLE": "التكبير و التسبيح في السفر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_103.mp3", "ICON": "fa-mountain" },
        { "ID": 103, "TITLE": "دعاء المسافر إذا أسحر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_104.mp3", "ICON": "fa-moon" },
        { "ID": 104, "TITLE": "الدعاء إذا نزل منزلا", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_105.mp3", "ICON": "fa-campground" },
        { "ID": 105, "TITLE": "ذكر الرجوع من السفر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_106.mp3", "ICON": "fa-home" },
        { "ID": 106, "TITLE": "ما يقول من أتاه أمر يسره", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_107.mp3", "ICON": "fa-smile" },
        { "ID": 107, "TITLE": "فضل الصلاة على النبي", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_108.mp3", "ICON": "fa-mosque" },
        { "ID": 108, "TITLE": "إفشاء السلام", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_109.mp3", "ICON": "fa-handshake" },
        { "ID": 109, "TITLE": "كيف يرد السلام على الكافر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_110.mp3", "ICON": "fa-handshake" },
        { "ID": 110, "TITLE": "دعاء صياح الديك ونهيق الحمار", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_111.mp3", "ICON": "fa-crow" },
        { "ID": 111, "TITLE": "دعاء نباح الكلاب بالليل", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_112.mp3", "ICON": "fa-dog" },
        { "ID": 112, "TITLE": "الدعاء لمن سببته", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_113.mp3", "ICON": "fa-hands-praying" },
        { "ID": 113, "TITLE": "ما يقول المسلم إذا مدح", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_114.mp3", "ICON": "fa-comment-dots" },
        { "ID": 114, "TITLE": "ما يقول المسلم إذا زكي", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_115.mp3", "ICON": "fa-user-check" },
        { "ID": 115, "TITLE": "كيف يلبي المحرم", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_116.mp3", "ICON": "fa-kaaba" },
        { "ID": 116, "TITLE": "التكبير إذا أتى الركن الأسود", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_117.mp3", "ICON": "fa-kaaba" },
        { "ID": 117, "TITLE": "الدعاء بين الركن اليماني والحجر الأسود", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_118.mp3", "ICON": "fa-kaaba" },
        { "ID": 118, "TITLE": "دعاء الوقوف على الصفا والمروة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_119.mp3", "ICON": "fa-kaaba" },
        { "ID": 119, "TITLE": "الدعاء يوم عرفة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_120.mp3", "ICON": "fa-mountain" },
        { "ID": 120, "TITLE": "الذكر عند المشعر الحرام", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_121.mp3", "ICON": "fa-kaaba" },
        { "ID": 121, "TITLE": "التكبير عند رمي الجمار", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_122.mp3", "ICON": "fa-hand-rock" },
        { "ID": 122, "TITLE": "دعاء التعجب والأمر السار", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_123.mp3", "ICON": "fa-surprise" },
        { "ID": 123, "TITLE": "ما يفعل من أتاه أمر يسره", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_124.mp3", "ICON": "fa-grin-stars" },
        { "ID": 124, "TITLE": "ما يقول من أحس وجعا في جسده", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_125.mp3", "ICON": "fa-briefcase-medical" },
        { "ID": 125, "TITLE": "دعاء من خشي أن يصيب شيئا بعينه", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_126.mp3", "ICON": "fa-eye" },
        { "ID": 126, "TITLE": "ما يقال عند الفزع", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_127.mp3", "ICON": "fa-bolt" },
        { "ID": 127, "TITLE": "ما يقول عند الذبح أو النحر", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_128.mp3", "ICON": "fa-drumstick-bite" },
        { "ID": 128, "TITLE": "ما يقول لرد كيد مردة الشياطين", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_129.mp3", "ICON": "fa-shield-alt" },
        { "ID": 129, "TITLE": "الاستغفار و التوبة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_130.mp3", "ICON": "fa-hands-praying" },
        { "ID": 130, "TITLE": "فضل التسبيح و التحميد، و التهليل، و التكبير", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_131.mp3", "ICON": "fa-star" },
        { "ID": 131, "TITLE": "كيف كان النبي يسبح؟", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_132.mp3", "ICON": "fa-hand-pointer" },
        { "ID": 132, "TITLE": "من أنواع الخير والآداب الجامعة", "AUDIO_URL": "http://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_133.mp3", "ICON": "fa-book-heart" },
    ];

    const allAzkarData = {
        "1": { "content": [{"ID":1,"ARABIC_TEXT":"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/1.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه البخاري مع الفتح 11/ 113 ومسلم 4/ 2083","FADL":""}] },
        "2": { "content": [{"ID":2,"ARABIC_TEXT":"الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/2.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن إلا النسائي وسنده حسن، وانظر: إرواء الغليل 7/ 47.","FADL":""}] },
        "3": { "content": [{"ID":3,"ARABIC_TEXT":"اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/3.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أبو داود والترمذي والبغوي، وانظر: مختصر شمائل الترمذي للألباني، ص47.","FADL":""}] },
        "4": { "content": [{"ID":4,"ARABIC_TEXT":"تُبْلِي وَيُخْلِفُ اللَّهُ تَعَالَى.","AUDIO":"https://www.hisnmuslim.com/audio/ar/4.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أبو داود 4/ 41، وانظر: صحيح أبي داود 2/ 760.","FADL":""}] },
        "5": { "content": [{"ID":5,"ARABIC_TEXT":"بِسْمِ اللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/5.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه الترمذي 2/ 505، وغيره، وانظر: إرواء الغليل، رقم 50، وصحيح الجامع 3/ 203.","FADL":""}] },
        "6": { "content": [{"ID":6,"ARABIC_TEXT":"[بِسْمِ اللَّهِ] اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/6.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 45، ومسلم 1/ 283، وزيادة \"بسم الله\" في أوله، أخرجها سعيد بن منصور، انظر: فتح الباري 1/ 244.","FADL":""}] },
        "7": { "content": [{"ID":7,"ARABIC_TEXT":"غُفْرَانَكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/7.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن إلا النسائي، وهو في صحيح الترمذي 1/ 7.","FADL":""}] },
        "8": { "content": [{"ID":8,"ARABIC_TEXT":"بِسْمِ اللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/8.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن إلا البخاري، وانظر: إرواء الغليل 1/ 122.","FADL":""}] },
        "9": { "content": [{"ID":9,"ARABIC_TEXT":"أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/9.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 1/ 209.","FADL":""},{"ID":10,"ARABIC_TEXT":"اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/10.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 1/ 78، وانظر: صحيح الترمذي 1/ 18.","FADL":""}] },
        "10": { "content": [{"ID":11,"ARABIC_TEXT":"بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/11.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 325، والترمذي 5/ 490، وانظر: صحيح الترمذي 3/ 151.","FADL":""},{"ID":12,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ، أَوْ أُضَلَّ، أَوْ أَزِلَّ، أَوْ أُزَلَّ، أَوْ أَظْلِمَ، أَوْ أُظْلَمَ، أَوْ أَجْهَلَ، أَوْ يُجْهَلَ عَلَيَّ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/12.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن، وانظر: صحيح الترمذي 3/ 152، وصحيح ابن ماجه 2/ 336.","FADL":""}] },
        "11": { "content": [{"ID":13,"ARABIC_TEXT":"بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا، ثُمَّ لِيُسَلِّمْ عَلَى أَهْلِهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/13.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أبو داود 4/ 325، وحسن الألباني سنده في صحيح أبي داود 3/ 959.","FADL":""}] },
        "12": { "content": [{"ID":14,"ARABIC_TEXT":"اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُوراً، وَفِي لِسَانِي نُوراً، وَفِي سَمْعِي نُوراً، وَفِي بَصَرِي نُوراً، وَمِنْ فَوْقِي نُوراً، وَمِنْ تَحْتِي نُوراً، وَعَنْ يَمِينِي نُوراً، وَعَنْ شِمَالِي نُوراً، وَمِنْ أَمَامِي نُوراً، وَمِنْ خَلْفِي نُوراً، وَاجْعَلْ فِي نَفْسِي نُوراً، وَأَعْظِمْ لِي نُوراً، وَعَظِّم لِي نُوراً، وَاجْعَلْ لِي نُوراً، وَاجْعَلْنِي نُوراً، اللَّهُمَّ أَعْطِنِي نُوراً، وَاجْعَلْ فِي عَصَبِي نُوراً، وَفِي لَحْمِي نُوراً، وَفِي دَمِي نُوراً، وَفِي شَعْرِي نُوراً، وَفِي بَشَرِي نُوراً [اللَّهُمَّ اجْعَلْ لِي نُوراً فِي قَبْرِي.. وَنُوراً فِي عِظَامِي] [وَزِدْنِي نُوراً، وَزِدْنِي نُوراً، وَزِدْنِي نُوراً] [وَهَبْ لِي نُوراً عَلَى نُورٍ].","AUDIO":"https://www.hisnmuslim.com/audio/ar/14.mp3","REPEAT_COUNT":1,"REFERENCE":"جميع هذه الزيادات في البخاري مع الفتح، انظر: 11/ 116، برقم 6316، وفي مسلم 1/ 526، 529، 530، برقم 763. وما بين المعكوفين الأولين للترمذي 5/ 483، برقم 3419. والمعكوف الثالث لابن حجر في الفتح، وذكر أن رواياته عند ابن أبي عاصم في كتاب السنة، انظر: فتح الباري 11/ 118. والمعكوف الرابع للبخاري في الأدب المفرد، برقم 695، ص258، وصححه الألباني في صحيح الأدب المفرد برقم 536.","FADL":""}] },
        "13": { "content": [{"ID":15,"ARABIC_TEXT":"يَبْدَأُ بِرِجْلِهِ الْيُمْنَى وَيَقُولُ: أَعُوذُ بِاللَّهِ العَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ، [بِسْمِ اللَّهِ، وَالصَّلَاةُ] [وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ]، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/15.mp3","REPEAT_COUNT":1,"REFERENCE":"انظر: تخريج الكلم الطيب للألباني ص65. أما زيادة \"بسم الله\"، فرواها ابن السني برقم 88، وحسنها الألباني. وما بين المعكوفين الثانيين فمن رواية أبي داود 1/ 126، وانظر: صحيح الجامع 1/ 528. والمعكوف الثالث رواه مسلم 1/ 494. وفي سنن ابن ماجه من حديث فاطمة رضي الله عنها: \"اللهم اغفر لي ذنوبي وافتح لي أبواب رحمتك\"، وصححه الألباني لشواهده، انظر: صحيح ابن ماجه 1/ 128-129.","FADL":""}] },
        "14": { "content": [{"ID":16,"ARABIC_TEXT":"يَبْدَأُ بِرِجْلِهِ الْيُسْرَى وَيَقُولُ: بِسْمِ اللَّهِ وَالصّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/16.mp3","REPEAT_COUNT":1,"REFERENCE":"انظر تخريج الحديث السابق رقم 20، وزيادة \"اللهم اعصمني من الشيطان الرجيم\"، لابن ماجه، انظر: صحيح ابن ماجه 1/ 129.","FADL":""}] },
        "15": { "content": [{"ID":17,"ARABIC_TEXT":"يَقُولُ مِثْلَ مَا يَقُولُ الْمُؤَذِّنُ إِلَّا فِي \"حَيَّ عَلَى الصَّلَاةِ وَحَيَّ عَلَى الْفَلَاحِ\" فَإِنَّهُ يَقُولُ: \"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ\".","AUDIO":"https://www.hisnmuslim.com/audio/ar/17.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 152، ومسلم 1/ 288.","FADL":""},{"ID":18,"ARABIC_TEXT":"يَقُولُ بَعْدَ فَرَاغِهِ مِنْ مُتَابَعَةِ الْمُؤَذِّنِ: وَأَنَا أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ، رَضِيتُ بِاللَّهِ رَبَّاً، وَبِمُحَمَّدٍ رَسُولاً، وَبِالْإِسْلَامِ دِينَاً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/18.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه مسلم 1/ 290.","FADL":""}] },
        "16": { "content": [{"ID":19,"ARABIC_TEXT":"اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/19.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 181، ومسلم 1/ 419.","FADL":""},{"ID":20,"ARABIC_TEXT":"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/20.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن الأربعة، وانظر: صحيح الترمذي 1/ 77، وصحيح ابن ماجه 1/ 135.","FADL":""}] },
        "17": { "content": [{"ID":21,"ARABIC_TEXT":"سُبْحَانَ رَبِّيَ الْعَظِيمِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/21.mp3","REPEAT_COUNT":3,"REFERENCE":"أخرجه أصحاب السنن، وانظر: صحيح الترمذي 1/ 83.","FADL":""}] },
        "18": { "content": [{"ID":22,"ARABIC_TEXT":"سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/22.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 2/ 282.","FADL":""}] },
        "19": { "content": [{"ID":23,"ARABIC_TEXT":"سُبْحَانَ رَبِّيَ الْأَعْلَى.","AUDIO":"https://www.hisnmuslim.com/audio/ar/23.mp3","REPEAT_COUNT":3,"REFERENCE":"أخرجه أصحاب السنن، وانظر: صحيح الترمذي 1/ 83.","FADL":""}] },
        "20": { "content": [{"ID":24,"ARABIC_TEXT":"رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي.","AUDIO":"https://www.hisnmuslim.com/audio/ar/24.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أبو داود وابن ماجه، وانظر: صحيح ابن ماجه 1/ 148.","FADL":""}] },
        "21": { "content": [{"ID":25,"ARABIC_TEXT":"سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ، ﴿فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ﴾.","AUDIO":"https://www.hisnmuslim.com/audio/ar/25.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 2/ 474، وأحمد 6/ 30، والحاكم وصححه ووافقه الذهبي 1/ 220، والزيادة للمؤمنين.","FADL":""}] },
        "22": { "content": [{"ID":26,"ARABIC_TEXT":"التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/26.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 1/ 13، ومسلم 1/ 301.","FADL":""}] },
        "23": { "content": [{"ID":27,"ARABIC_TEXT":"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/27.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 6/ 408.","FADL":""}] },
        "24": { "content": [{"ID":28,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/28.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 2/ 102، ومسلم 1/ 412.","FADL":""}] },
        "25": { "content": [{"ID":29,"ARABIC_TEXT":"أَسْتَغْفِرُ اللَّهَ (ثَلاثاً) اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/29.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 1/ 414.","FADL":""},{"ID":30,"ARABIC_TEXT":"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/30.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 255، ومسلم 1/ 414.","FADL":""}] },
        "26": { "content": [{"ID":31,"ARABIC_TEXT":"قَالَ جَابِرُ بْنُ عَبْدِ اللَّهِ رَضِيَ اللَّهُ عَنْهُمَا: كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يُعَلِّمُنَا الِاسْتِخَارَةَ فِي الْأُمُورِ كُلِّهَا كَمَا يُعَلِّمُنَا السُّورَةَ مِنَ الْقُرْآنِ، يَقُولُ: إِذَا هَمَّ أَحَدُكُمْ بِالْأَمْرِ فَلْيَرْكَعْ رَكْعَتَيْنِ مِنْ غَيْرِ الْفَرِيضَةِ ثُمَّ لِيَقُلْ: اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ –وَيُسَمِّي حَاجَتَهُ– خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، –أَوْ قَالَ: عَاجِلِهِ وَآجِلِهِ–، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، –أَوْ قَالَ: عَاجِلِهِ وَآجِلِهِ–، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ. وَمَا نَدِمَ مَنِ اسْتَخَارَ الْخَالِقَ، وَشَاوَرَ الْمَخْلُوقِينَ الْمُؤْمِنِينَ وَتَثَبَّتَ فِي أَمْرِهِ، فَقَدْ قَالَ سُبْحَانَهُ: ﴿وَشَاوِرْهُمْ فِي الأَمْرِ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ﴾.","AUDIO":"https://www.hisnmuslim.com/audio/ar/31.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 7/ 162.","FADL":""}] },
        "27": { "content": [
            {"ID":32,"ARABIC_TEXT":"أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.\n[آية الكرسى - البقرة 255].","AUDIO":"https://www.hisnmuslim.com/audio/ar/32.mp3","REPEAT_COUNT":1,"REFERENCE":"من قالها حين يصبح أجير من الجن حتى يمسى ومن قالها حين يمسى أجير منهم حتى يصبح. رواه الحاكم وصححه الألبانى 1/562.","FADL":"من قالها حين يصبح أجير من الجن حتى يمسى ومن قالها حين يمسى أجير منهم حتى يصبح"},
            {"ID":33,"ARABIC_TEXT":"بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/33.mp3","REPEAT_COUNT":3,"REFERENCE":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء. رواه أبو داود والترمذى، وانظر صحيح الترمذى 3/182.","FADL":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء"},
            {"ID":34,"ARABIC_TEXT":"بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/34.mp3","REPEAT_COUNT":3,"REFERENCE":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء. رواه أبو داود والترمذى، وانظر صحيح الترمذى 3/182.","FADL":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء"},
            {"ID":35,"ARABIC_TEXT":"بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/35.mp3","REPEAT_COUNT":3,"REFERENCE":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء. رواه أبو داود والترمذى، وانظر صحيح الترمذى 3/182.","FADL":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء"},
            {"ID":143,"ARABIC_TEXT":"أَصْبَحْنَا وَأَصْبَحَ (أَمْسَيْنَا وَأَمْسَى) الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ (هَذِهِ اللَّيْلَةِ) وَخَيْرَ مَا بَعْدَهُ (بَعْدَهَا)، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ (هَذِهِ اللَّيْلَةِ) وَشَرِّ مَا بَعْدَهُ (بَعْدَهَا)، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.","REPEAT_COUNT":1,"REFERENCE":"مسلم ٤ / ٢٠٨٨","FADL":""},
            {"ID":144,"ARABIC_TEXT":"اللَّهُمَّ بِكَ أَصْبَحْنَا (أَمْسَيْنَا)، وَبِكَ أَمْسَيْنَا (أَصْبَحْنَا)، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ (الْمَصِيرُ).","REPEAT_COUNT":1,"REFERENCE":"الترمذي ٥ / ٤٦٦","FADL":""},
            {"ID":145,"ARABIC_TEXT":"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.","REPEAT_COUNT":1,"REFERENCE":"البخاري ٧ / ١٥٠","FADL":"من قالها موقناً بها حين يمسي، فمات من ليلته دخل الجنة، وكذلك إذا أصبح."},
            {"ID":146,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَصْبَحْتُ (أَمْسَيْتُ) أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ.","REPEAT_COUNT":4,"REFERENCE":"أبو داود ٤ / ٣١٧","FADL":"من قالها حين يصبح أو يمسي أربع مرات أعتقه الله من النار."},
            {"ID":147,"ARABIC_TEXT":"اللَّهُمَّ مَا أَصْبَحَ بِي (أَمْسَى بِي) مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.","REPEAT_COUNT":1,"REFERENCE":"أبو داود ٤ / ٣١٨","FADL":"من قالها حين يصبح فقد أدى شكر يومه، ومن قالها حين يمسي فقد أدى شكر ليلته."},
            {"ID":148,"ARABIC_TEXT":"اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ.","REPEAT_COUNT":3,"REFERENCE":"أبو داود ٤ / ٣٢٤","FADL":""},
            {"ID":149,"ARABIC_TEXT":"حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ.","REPEAT_COUNT":7,"REFERENCE":"ابن السني برقم ٧١، أبو داود ٤ / ٣٢١","FADL":"من قالها حين يصبح وحين يمسي سبع مرات كفاه الله ما أهمه من أمر الدنيا والآخرة."},
            {"ID":150,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي.","REPEAT_COUNT":1,"REFERENCE":"أبو داود وابن ماجه","FADL":""},
            {"ID":151,"ARABIC_TEXT":"اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا، أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ.","REPEAT_COUNT":1,"REFERENCE":"الترمذي وأبو داود","FADL":""},
            {"ID":152,"ARABIC_TEXT":"بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.","REPEAT_COUNT":3,"REFERENCE":"أبو داود والترمذي","FADL":"من قالها ثلاثاً إذا أصبح وثلاثاً إذا أمسى لم يضره شيء."},
            {"ID":153,"ARABIC_TEXT":"رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا.","REPEAT_COUNT":3,"REFERENCE":"أحمد والترمذي","FADL":"من قالها ثلاثاً حين يصبح وثلاثاً حين يمسي كان حقاً على الله أن يرضيه يوم القيامة."},
            {"ID":154,"ARABIC_TEXT":"يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.","REPEAT_COUNT":1,"REFERENCE":"الحاكم وصححه الألباني","FADL":""},
            {"ID":155,"ARABIC_TEXT":"أَصْبَحْنَا (أَمْسَيْنَا) عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ.","REPEAT_COUNT":1,"REFERENCE":"أحمد","FADL":""},
            {"ID":156,"ARABIC_TEXT":"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.","REPEAT_COUNT":100,"REFERENCE":"مسلم ٤ / ٢٠٧١","FADL":"من قالها مائة مرة حين يصبح وحين يمسي لم يأت أحد يوم القيامة بأفضل مما جاء به إلا أحد قال مثل ما قال أو زاد عليه."},
            {"ID":157,"ARABIC_TEXT":"لَا إِلَهَ إِلَّا اللَّهُ، وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.","REPEAT_COUNT":100,"REFERENCE":"البخاري ٤ / ٩٥ ومسلم ٤ / ٢٠٧١","FADL":"من قالها مائة مرة في يوم كانت له عدل عشر رقاب، وكتبت له مائة حسنة، ومحيت عنه مائة سيئة، وكانت له حرزاً من الشيطان يومه ذلك حتى يمسي، ولم يأت أحد بأفضل مما جاء به إلا أحد عمل أكثر من ذلك."},
            {"ID":158,"ARABIC_TEXT":"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.","REPEAT_COUNT":3,"REFERENCE":"مسلم ٤ / ٢٠٩٠","FADL":""},
            {"ID":159,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا. (يقال في الصباح)","REPEAT_COUNT":1,"REFERENCE":"ابن ماجه","FADL":""},
            {"ID":160,"ARABIC_TEXT":"أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ.","REPEAT_COUNT":100,"REFERENCE":"البخاري ومسلم","FADL":""},
            {"ID":161,"ARABIC_TEXT":"اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ.","REPEAT_COUNT":10,"REFERENCE":"الطبراني","FADL":"من صلى علي حين يصبح عشراً وحين يمسي عشراً أدركته شفاعتي يوم القيامة."}
        ] },
        "28": { "content": [{"ID":36,"ARABIC_TEXT":"يَجْمَعُ كَفَّيْهِ ثُمَّ يَنْفُثُ فِيهِمَا فَيَقْرَأُ فِيهِمَا: ﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾ وَ﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ﴾ وَ﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ﴾ ثُمَّ يَمْسَحُ بِهِمَا مَا اسْتَطَاعَ مِنْ جَسَدِهِ، يَبْدَأُ بِهِمَا عَلَى رَأْسِهِ وَوَجْهِهِ وَمَا أَقْبَلَ مِنْ جَسَدِهِ، (يَفْعَلُ ذَلِكَ ثَلَاثَ مَرَّاتٍ).","AUDIO":"https://www.hisnmuslim.com/audio/ar/36.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 9/ 62، ومسلم 4/ 1723.","FADL":""},{"ID":37,"ARABIC_TEXT":"بِاسْمِكَ رَبِّ وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/37.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 11/ 126، ومسلم 4/ 2084.","FADL":""}] },
        "29": { "content": [{"ID":38,"ARABIC_TEXT":"لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، الْحَمْدُ لِلَّهِ، وَسُبْحَانَ اللهِ، وَلاَ إِلَهَ إِلاَّ اللهُ، وَاللهُ أَكْبَرُ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/38.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه ابن ماجه، وانظر: صحيح ابن ماجه 2/ 335.","FADL":""}] },
        "30": { "content": [{"ID":39,"ARABIC_TEXT":"أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ، وَشَرِّ عِبَادِهِ، وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/39.mp3","REPEAT_COUNT":1,"REFERENCE":"انظر: صحيح الترمذي 3/ 171.","FADL":""}] },
        "31": { "content": [{"ID":40,"ARABIC_TEXT":"يَنْفُثُ عَنْ يَسَارِهِ (ثَلاثاً)، يَسْتَعِيذُ بِاللَّهِ مِنَ الشَّيْطَانِ وَمِنْ شَرِّ مَا رَأَى (ثَلاثَ مَرَّاتٍ)، لا يُحَدِّثْ بِهَا أَحَداً، يَتَحَوَّلُ عَنْ جَنْبِهِ الَّذِي كَانَ عَلَيْهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/40.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 4/ 1772.","FADL":""}] },
        "32": { "content": [{"ID":41,"ARABIC_TEXT":"اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلاَ يُقْضَى عَلَيْكَ، إِنَّهُ لاَ يَذِلُّ مَنْ وَالَيْتَ، [وَلاَ يَعِزُّ مَنْ عَادَيْتَ]، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/41.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن، وانظر: صحيح الترمذي 1/ 144.","FADL":""}] },
        "33": { "content": [{"ID":42,"ARABIC_TEXT":"سُبْحَانَ الْمَلِكِ الْقُدُّوسِ (ثَلاثَ مَرَّاتٍ).","AUDIO":"https://www.hisnmuslim.com/audio/ar/42.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه النسائي 3/ 245، والدارقطني، وغيرهما، وانظر: صحيح الجامع 1/ 502، وإرواء الغليل 2/ 166.","FADL":""}] },
        "34": { "content": [{"ID":43,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/43.mp3","REPEAT_COUNT":1,"REFERENCE":"كان رسول الله صلى الله عليه وسلم يكثر من هذا الدعاء. انظر: البخاري 7/ 158، وانظر: صحيح الجامع 1/ 354.","FADL":""}] },
        "35": { "content": [{"ID":44,"ARABIC_TEXT":"لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/44.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 8/ 154، ومسلم 4/ 2092.","FADL":""}] },
        "36": { "content": [{"ID":45,"ARABIC_TEXT":"اللَّهُمَّ رَحْمَتَكَ أَرْجُو، فَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لاَ إِلَهَ إِلاَّ أَنْتَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/45.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 324، وأحمد 5/ 42، وحسنه الألباني، انظر: صحيح أبي داود 3/ 959.","FADL":""}] },
        "37": { "content": [{"ID":46,"ARABIC_TEXT":"اللَّهُ، اللَّهُ رَبِّي لاَ أُشْرِكُ بِهِ شَيْئاً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/46.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أبو داود 2/ 87، وانظر: صحيح ابن ماجه 2/ 335.","FADL":""}] },
        "38": { "content": [{"ID":47,"ARABIC_TEXT":"اللَّهُمَّ مُنْزِلَ الْكِتَابِ، سَرِيعَ الْحِسَابِ، اهْزِمِ الْأَحْزَابَ، اللَّهُمَّ اهْزِمْهُمْ وَزَلْزِلْهُمْ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/47.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 3/ 1362.","FADL":""}] },
        "39": { "content": [{"ID":48,"ARABIC_TEXT":"اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/48.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 4/ 2300.","FADL":""}] },
        "40": { "content": [{"ID":49,"ARABIC_TEXT":"يَسْتَعِيذُ بِاللَّهِ مِنْهُ، [آمَنْتُ بِاللَّهِ وَرُسُلِهِ]، يَقْرَأُ قَوْلَهُ تَعَالَى: ﴿هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ﴾.","AUDIO":"https://www.hisnmuslim.com/audio/ar/49.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 1/ 119-120، وما بين المعكوفين لأبي داود 4/ 334، وأحمد 6/ 208، وحسنه الألباني في صحيح أبي داود 3/ 962.","FADL":""}] },
        "41": { "content": [{"ID":50,"ARABIC_TEXT":"اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/50.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 5/ 560، وانظر: صحيح الترمذي 3/ 180.","FADL":""}] },
        "42": { "content": [{"ID":51,"ARABIC_TEXT":"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ، وَاتْفُلْ عَلَى يَسَارِكَ (ثَلاثاً).","AUDIO":"https://www.hisnmuslim.com/audio/ar/51.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 4/ 1729.","FADL":""}] },
        "43": { "content": [{"ID":52,"ARABIC_TEXT":"اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/52.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه ابن حبان في صحيحه، وابن السني، وانظر: السلسلة الصحيحة برقم 2886.","FADL":""}] },
        "44": { "content": [{"ID":53,"ARABIC_TEXT":"مَا مِنْ عَبْدٍ يُذْنِبُ ذَنْباً فَيُحْسِنُ الطُّهُورَ، ثُمَّ يَقُومُ فَيُصَلِّي رَكْعَتَيْنِ، ثُمَّ يَسْتَغْفِرُ اللَّهَ، إِلاَّ غَفَرَ اللَّهُ لَهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/53.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 2/ 86، والترمذي 2/ 257، وانظر: صحيح أبي داود 1/ 283.","FADL":""}] },
        "45": { "content": [{"ID":54,"ARABIC_TEXT":"الِاسْتِعَاذَةُ بِاللَّهِ مِنْهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/54.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 1/ 42، والترمذي 1/ 129، وانظر: صحيح الترمذي 1/ 42.","FADL":""}] },
        "46": { "content": [{"ID":55,"ARABIC_TEXT":"قَدَرُ اللَّهِ وَمَا شَاءَ فَعَلَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/55.mp3","REPEAT_COUNT":1,"REFERENCE":"(إن المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف وفي كل خير، احرص على ما ينفعك، واستعن بالله ولا تعجز، وإن أصابك شيء فلا تقل: لو أني فعلت كان كذا وكذا، ولكن قل: قدر الله وما شاء فعل، فإن لو تفتح عمل الشيطان) مسلم 4/ 2052.","FADL":""}] },
        "47": { "content": [{"ID":56,"ARABIC_TEXT":"بَارَكَ اللَّهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ. وَيَرُدُّ عَلَيْهِ الْمُهَنَّأُ فَيَقُولُ: بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ، وَجَزَاكَ اللَّهُ خَيْراً، وَرَزَقَكَ اللَّهُ مِثْلَهُ، وَأَجْزَلَ ثَوَابَكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/56.mp3","REPEAT_COUNT":1,"REFERENCE":"انظر: الأذكار للنووي، ص349، وصحيح الأذكار للنووي، للشيخ سليم الهلالي 2/ 713.","FADL":""}] },
        "48": { "content": [{"ID":57,"ARABIC_TEXT":"أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/57.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 4/ 119.","FADL":""}] },
        "49": { "content": [{"ID":58,"ARABIC_TEXT":"لاَ بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/58.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 10/ 118.","FADL":""}] },
        "50": { "content": [{"ID":59,"ARABIC_TEXT":"قَالَ صلى الله عليه وسلم: إِذَا عَادَ الرَّجُلُ أَخَاهُ الْمُسْلِمَ مَشَى فِي خِرَافَةِ الْجَنَّةِ حَتَّى يَجْلِسَ، فَإِذَا جَلَسَ غَمَرَتْهُ الرَّحْمَةُ، فَإِنْ كَانَ غُدْوَةً صَلَّى عَلَيْهِ سَبْعُونَ أَلْفَ مَلَكٍ حَتَّى يُمْسِيَ، وَإِنْ كَانَ مَسَاءً صَلَّى عَلَيْهِ سَبْعُونَ أَلْفَ مَلَكٍ حَتَّى يُصْبِحَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/59.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أحمد، وابن ماجه، والترمذي، وانظر: صحيح ابن ماجه 1/ 244، وصحيح الترمذي 1/ 286.","FADL":""}] },
        "51": { "content": [{"ID":60,"ARABIC_TEXT":"اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَأَلْحِقْنِي بِالرَّفِيقِ الْأَعْلَى.","AUDIO":"https://www.hisnmuslim.com/audio/ar/60.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 7/ 10، ومسلم 4/ 1893.","FADL":""}] },
        "52": { "content": [{"ID":61,"ARABIC_TEXT":"لاَ إِلَهَ إِلاَّ اللَّهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/61.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 8/ 101، ومسلم 2/ 631.","FADL":""}] },
        "53": { "content": [{"ID":62,"ARABIC_TEXT":"إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي، وَأَخْلِفْ لِي خَيْراً مِنْهَا.","AUDIO":"https://www.hisnmuslim.com/audio/ar/62.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 632.","FADL":""}] },
        "54": { "content": [{"ID":63,"ARABIC_TEXT":"اللَّهُمَّ اغْفِرْ لِأَبِي سَلَمَةَ وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهُ فِي قَبْرِهِ وَنَوِّرْ لَهُ فِيهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/63.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 634.","FADL":""}] },
        "55": { "content": [{"ID":64,"ARABIC_TEXT":"اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ، وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَاراً خَيْراً مِنْ دَارِهِ، وَأَهْلاً خَيْراً مِنْ أَهْلِهِ، وَزَوْجاً خَيْراً مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ، وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ، وَعَذَابِ النَّارِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/64.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 663.","FADL":""}] },
        "56": { "content": [{"ID":65,"ARABIC_TEXT":"اللَّهُمَّ اجْعَلْهُ لَنَا فَرَطاً وَسَلَفاً وَأَجْراً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/65.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 2/ 113.","FADL":""}] },
        "57": { "content": [{"ID":66,"ARABIC_TEXT":"إِنَّ لِلَّهِ مَا أَخَذَ، وَلَهُ مَا أَعْطَى، وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى... فَلْتَصْبِرْ وَلْتَحْتَسِبْ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/66.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 2/ 80، ومسلم 2/ 636.","FADL":""}] },
        "58": { "content": [{"ID":67,"ARABIC_TEXT":"بِسْمِ اللَّهِ وَعَلَى سُنَّةِ رَسُولِ اللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/67.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 3/ 314، بسند صحيح.","FADL":""}] },
        "59": { "content": [{"ID":68,"ARABIC_TEXT":"اللَّهُمَّ اغْفِرْ لَهُ، اللَّهُمَّ ثَبِّتْهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/68.mp3","REPEAT_COUNT":1,"REFERENCE":"كان النبي صلى الله عليه وسلم إذا فرغ من دفن الميت وقف عليه فقال: \"استغفروا لأخيكم وسلوا له التثبيت؛ فإنه الآن يسأل\" أبو داود 3/ 315، والحاكم 1/ 370 وصححه ووافقه الذهبي.","FADL":""}] },
        "60": { "content": [{"ID":69,"ARABIC_TEXT":"السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، [وَيَرْحَمُ اللَّهُ الْمُسْتَقدِمِينَ مِنَّا وَالْمُسْتأْخِرِينَ] أَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/69.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 671، وابن ماجه 1/ 494، واللفظ له، وما بين المعكوفين من رواية مسلم.","FADL":""}] },
        "61": { "content": [{"ID":70,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا.","AUDIO":"https://www.hisnmuslim.com/audio/ar/70.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 326، وابن ماجه 2/ 1228، وانظر: صحيح ابن ماجه 2/ 305.","FADL":""}] },
        "62": { "content": [{"ID":71,"ARABIC_TEXT":"سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/71.mp3","REPEAT_COUNT":1,"REFERENCE":"الموطأ 2/ 992، وصحح إسناده النووي في الأذكار ص235، وصححه الألباني في صحيح الكلم الطيب ص156.","FADL":""}] },
        "63": { "content": [{"ID":72,"ARABIC_TEXT":"اللَّهُمَّ أَسْقِنَا غَيْثاً مُغِيثاً، مَرِيئاً، مَرِيعاً، نَافِعاً غَيْرَ ضَارٍّ، عَاجِلاً غَيْرَ آجِلٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/72.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 1/ 303، وانظر: صحيح أبي داود 1/ 216.","FADL":""}] },
        "64": { "content": [{"ID":73,"ARABIC_TEXT":"اللَّهُمَّ صَيِّباً نَافِعاً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/73.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 2/ 518.","FADL":""}] },
        "65": { "content": [{"ID":74,"ARABIC_TEXT":"مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/74.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 205، ومسلم 1/ 83.","FADL":""}] },
        "66": { "content": [{"ID":75,"ARABIC_TEXT":"اللَّهُمَّ حَوَالَيْنَا وَلاَ عَلَيْنَا، اللَّهُمَّ عَلَى الآكَامِ وَالظِّرَابِ، وَبُطُونِ الْأَوْدِيَةِ، وَمَنَابِتِ الشَّجَرِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/75.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 224، ومسلم 2/ 614.","FADL":""}] },
        "67": { "content": [{"ID":76,"ARABIC_TEXT":"اللَّهُ أَكْبَرُ، اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، وَالتَّوْفِيقِ لِمَا تُحِبُّ رَبَّنَا وَتَرْضَى، رَبُّنَا وَرَبُّكَ اللَّهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/76.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 5/ 504، والدارمي 1/ 336، وانظر: صحيح الترمذي 3/ 157.","FADL":""}] },
        "68": { "content": [{"ID":77,"ARABIC_TEXT":"ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/77.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 2/ 306، وحسنه الألباني، انظر: صحيح أبي داود 2/ 449.","FADL":""}] },
        "69": { "content": [{"ID":78,"ARABIC_TEXT":"بِسْمِ اللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/78.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 3/ 34، والترمذي 4/ 264، وانظر: صحيح الترمذي 2/ 105.","FADL":""}] },
        "70": { "content": [{"ID":79,"ARABIC_TEXT":"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/79.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 5/ 508، وابن ماجه 2/ 1092، وانظر: صحيح الترمذي 3/ 159.","FADL":""}] },
        "71": { "content": [{"ID":80,"ARABIC_TEXT":"اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/80.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 3/ 1615.","FADL":""}] },
        "72": { "content": [{"ID":81,"ARABIC_TEXT":"اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي، وَاسْقِ مَنْ سَقَانِي.","AUDIO":"https://www.hisnmuslim.com/audio/ar/81.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 3/ 126.","FADL":""}] },
        "73": { "content": [{"ID":82,"ARABIC_TEXT":"أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/82.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 3/ 367، وابن ماجه 1/ 556، والنسائي في عمل اليوم والليلة 296، وصححه الألباني، انظر: صحيح أبي داود 2/ 730.","FADL":""}] },
        "74": { "content": [{"ID":83,"ARABIC_TEXT":"إِذَا دُعِيَ أَحَدُكُمْ فَلْيُجِبْ، فَإِنْ كَانَ صَائِماً فَلْيُصَلِّ، وَإِنْ كَانَ مُفْطِراً فَلْيَطْعَمْ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/83.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 1054.","FADL":""}] },
        "75": { "content": [{"ID":84,"ARABIC_TEXT":"إِنِّي صَائِمٌ، إِنِّي صَائِمٌ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/84.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 2/ 226، ومسلم 2/ 806.","FADL":""}] },
        "76": { "content": [{"ID":85,"ARABIC_TEXT":"اللَّهُمَّ بَارِكْ لَنَا فِي ثَمَرِنَا، وَبَارِكْ لَنَا فِي مَدِينَتِنَا، وَبَارِكْ لَنَا فِي صَاعِنَا، وَبَارِكْ لَنَا فِي مُدِّنَا.","AUDIO":"https://www.hisnmuslim.com/audio/ar/85.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 1000.","FADL":""}] },
        "77": { "content": [{"ID":86,"ARABIC_TEXT":"إِذَا عَطَسَ أَحَدُكُمْ فَلْيَقُلْ: الْحَمْدُ لِلَّهِ، وَلْيَقُلْ لَهُ أَخُوهُ أَوْ صَاحِبُهُ: يَرْحَمُكَ اللَّهُ، فَإِذَا قَالَ لَهُ: يَرْحَمُكَ اللَّهُ، فَلْيَقُلْ: يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/86.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 7/ 127.","FADL":""}] },
        "78": { "content": [{"ID":87,"ARABIC_TEXT":"يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/87.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 308، والترمذي 5/ 82، وانظر: صحيح أبي داود 3/ 947.","FADL":""}] },
        "79": { "content": [{"ID":88,"ARABIC_TEXT":"بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/88.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن، وانظر: صحيح الترمذي 1/ 316.","FADL":""}] },
        "80": { "content": [{"ID":89,"ARABIC_TEXT":"إِذَا تَزَوَّجَ أَحَدُكُمُ امْرَأَةً، أَوْ إِذَا اشْتَرَى خَادِماً فَلْيَقُلْ: اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَمِنْ شَرِّ مَا جَبَلْتَهَا عَلَيْهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/89.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 2/ 248، وابن ماجه 1/ 617، وانظر: صحيح ابن ماجه 1/ 324.","FADL":""}] },
        "81": { "content": [{"ID":90,"ARABIC_TEXT":"بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا.","AUDIO":"https://www.hisnmuslim.com/audio/ar/90.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 6/ 141، ومسلم 2/ 1028.","FADL":""}] },
        "82": { "content": [{"ID":91,"ARABIC_TEXT":"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/91.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 137، ومسلم 4/ 2015.","FADL":""}] },
        "83": { "content": [{"ID":92,"ARABIC_TEXT":"الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ، وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلاً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/92.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 5/ 493، وانظر: صحيح الترمذي 3/ 153.","FADL":""}] },
        "84": { "content": [{"ID":93,"ARABIC_TEXT":"عَنِ ابْنِ عُمَرَ رَضِيَ اللَّهُ عَنْهُمَا قَالَ: كَانَ يُعَدُّ لِرَسُولِ اللَّهِ صلى الله عليه وسلم فِي الْمَجْلِسِ الْوَاحِدِ مِائَةُ مَرَّةٍ مِنْ قَبْلِ أَنْ يَقُومَ: رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الْغَفُورُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/93.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 5/ 465، وابن ماجه 2/ 1253، وانظر: صحيح الترمذي 3/ 139.","FADL":""}] },
        "85": { "content": [{"ID":94,"ARABIC_TEXT":"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/94.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن، وانظر: صحيح الترمذي 3/ 153.","FADL":""}] },
        "86": { "content": [{"ID":95,"ARABIC_TEXT":"وَلَكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/95.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أحمد 5/ 82، والنسائي في عمل اليوم والليلة، ص 218، برقم 292، وصححه الألباني في الكلم الطيب، برقم 228.","FADL":""}] },
        "87": { "content": [{"ID":96,"ARABIC_TEXT":"جَزَاكَ اللَّهُ خَيْراً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/96.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 3/ 365، وانظر: صحيح الترمذي 2/ 200.","FADL":""}] },
        "88": { "content": [{"ID":97,"ARABIC_TEXT":"مَنْ حَفِظَ عَشْرَ آيَاتٍ مِنْ أَوَّلِ سُورَةِ الْكَهْفِ عُصِمَ مِنَ الدَّجَّالِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/97.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 1/ 555.","FADL":""}] },
        "89": { "content": [{"ID":98,"ARABIC_TEXT":"أَحَبَّكَ الَّذِي أَحْبَبْتَنِي لَهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/98.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 333، وحسنه الألباني، انظر: صحيح أبي داود 3/ 965.","FADL":""}] },
        "90": { "content": [{"ID":99,"ARABIC_TEXT":"بَارَكَ اللَّهُ لَكَ فِي أَهْلِكَ وَمَالِكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/99.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 4/ 88.","FADL":""}] },
        "91": { "content": [{"ID":100,"ARABIC_TEXT":"بَارَكَ اللَّهُ لَكَ فِي أَهْلِكَ وَمَالِكَ، إِنَّمَا جَزَاءُ السَّلَفِ الْحَمْدُ وَالْأَدَاءُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/100.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه النسائي في عمل اليوم والليلة ص300، وابن ماجه 2/ 809، وانظر: صحيح ابن ماجه 2/ 55.","FADL":""}] },
        "92": { "content": [{"ID":101,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/101.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أحمد 4/ 403، وغيره، وانظر: صحيح الجامع 3/ 233.","FADL":""}] },
        "93": { "content": [{"ID":102,"ARABIC_TEXT":"وَفِيكَ بَارَكَ اللَّهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/102.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه ابن السني ص 138، برقم 278، وانظر: الوابل الصيب، ص 294.","FADL":""}] },
        "94": { "content": [{"ID":103,"ARABIC_TEXT":"اللَّهُمَّ لاَ طَيْرَ إِلاَّ طَيْرُكَ، وَلاَ خَيْرَ إِلاَّ خَيْرُكَ، وَلاَ إِلَهَ غَيْرُكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/103.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أحمد 2/ 220، وابن السني برقم 292، وانظر: السلسلة الصحيحة 3/ 54.","FADL":""}] },
        "95": { "content": [{"ID":104,"ARABIC_TEXT":"بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، ﴿سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ﴾، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/104.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 3/ 34، والترمذي 5/ 501، وانظر: صحيح الترمذي 3/ 156.","FADL":""}] },
        "96": { "content": [{"ID":105,"ARABIC_TEXT":"اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، ﴿سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ﴾ اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ، وَإِذَا رَجَعَ قَالَهُنَّ وَزَادَ فِيهِنَّ: آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/105.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 998.","FADL":""}] },
        "97": { "content": [{"ID":106,"ARABIC_TEXT":"اللَّهُمَّ رَبَّ السَّمَوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ، وَرَبَّ الْأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ، وَرَبَّ الشَّيَاطِينِ وَمَا أَضْلَلْنَ، وَرَبَّ الرِّيَاحِ وَمَا ذَرَيْنَ، أَسْأَلُكَ خَيْرَ هَذِهِ الْقَرْيَةِ، وَخَيْرَ أَهْلِهَا، وَخَيْرَ مَا فِيهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ أَهْلِهَا، وَشَرِّ مَا فِيهَا.","AUDIO":"https://www.hisnmuslim.com/audio/ar/106.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه الحاكم وصححه ووافقه الذهبي 2/ 100، وابن السني برقم 524، وحسنه الحافظ في تخريج الأذكار 5/ 154.","FADL":""}] },
        "98": { "content": [{"ID":107,"ARABIC_TEXT":"لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لاَ يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/107.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 5/ 291، والحاكم 1/ 538، وحسنه الألباني، انظر: صحيح ابن ماجه 2/ 21.","FADL":""}] },
        "99": { "content": [{"ID":108,"ARABIC_TEXT":"بِسْمِ اللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/108.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 296، وصححه الألباني، انظر: صحيح أبي داود 3/ 941.","FADL":""}] },
        "100": { "content": [{"ID":109,"ARABIC_TEXT":"أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لاَ تَضِيعُ وَدَائِعُهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/109.mp3","REPEAT_COUNT":1,"REFERENCE":"أحمد 2/ 403، وابن ماجه 2/ 943، وانظر: صحيح ابن ماجه 2/ 133.","FADL":""}] },
        "101": { "content": [{"ID":110,"ARABIC_TEXT":"أَسْتَوْدِعُ اللَّهَ دِينَكَ، وَأَمَانَتَكَ، وَخَوَاتِيمَ عَمَلِكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/110.mp3","REPEAT_COUNT":1,"REFERENCE":"أحمد 2/ 7، والترمذي 5/ 499، وانظر: صحيح الترمذي 3/ 155.","FADL":""}] },
        "102": { "content": [{"ID":111,"ARABIC_TEXT":"كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم إِذَا سَافَرَ فَاسْتَوَى عَلَى بَعِيرِهِ كَبَّرَ ثَلاثاً، ثُمَّ قَالَ: ﴿سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ﴾.","AUDIO":"https://www.hisnmuslim.com/audio/ar/111.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 998.","FADL":""}] },
        "103": { "content": [{"ID":112,"ARABIC_TEXT":"سَمَّعَ سَامِعٌ بِحَمْدِ اللَّهِ وَحُسْنِ بَلاَئِهِ عَلَيْنَا، رَبَّنَا صَاحِبْنَا وَأَفْضِلْ عَلَيْنَا عَائِذاً بِاللَّهِ مِنَ النَّارِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/112.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 4/ 2086.","FADL":""}] },
        "104": { "content": [{"ID":113,"ARABIC_TEXT":"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/113.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 4/ 2080.","FADL":""}] },
        "105": { "content": [{"ID":114,"ARABIC_TEXT":"آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/114.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 7/ 163، ومسلم 2/ 980.","FADL":""}] },
        "106": { "content": [{"ID":115,"ARABIC_TEXT":"الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/115.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه ابن ماجه، وصححه الألباني، انظر: صحيح ابن ماجه 2/ 321.","FADL":""}] },
        "107": { "content": [{"ID":116,"ARABIC_TEXT":"قَالَ صلى الله عليه وسلم: مَنْ صَلَّى عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْراً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/116.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 1/ 288.","FADL":""}] },
        "108": { "content": [{"ID":117,"ARABIC_TEXT":"قَالَ صلى الله عليه وسلم: لا تَدْخُلُوا الْجَنَّةَ حَتَّى تُؤْمِنُوا، وَلا تُؤْمِنُوا حَتَّى تَحَابُّوا، أَوَلا أَدُلُّكُمْ عَلَى شَيْءٍ إِذَا فَعَلْتُمُوهُ تَحَابَبْتُمْ؟ أَفْشُوا السَّلامَ بَيْنَكُمْ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/117.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 1/ 74.","FADL":""}] },
        "109": { "content": [{"ID":118,"ARABIC_TEXT":"وَعَلَيْكُمُ السَّلَامُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/118.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 11/ 39، ومسلم 4/ 1705.","FADL":""}] },
        "110": { "content": [{"ID":119,"ARABIC_TEXT":"إِذَا سَمِعْتُمْ صِيَاحَ الدِّيَكَةِ فَاسْأَلُوا اللَّهَ مِنْ فَضْلِهِ؛ فَإِنَّهَا رَأَتْ مَلَكاً، وَإِذَا سَمِعْتُمْ نَهِيقَ الْحِمَارِ فَتَعَوَّذُوا بِاللَّهِ مِنَ الشَّيْطَانِ؛ فَإِنَّهُ رَأَى شَيْطَاناً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/119.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 6/ 350، ومسلم 4/ 2092.","FADL":""}] },
        "111": { "content": [{"ID":120,"ARABIC_TEXT":"إِذَا سَمِعْتُمْ نُبَاحَ الْكِلاَبِ وَنَهِيقَ الْحَمِيرِ مِنَ اللَّيْلِ فَتَعَوَّذُوا بِاللَّهِ مِنْهُنَّ؛ فَإِنَّهُنَّ يَرَيْنَ مَا لاَ تَرَوْنَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/120.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 327، وأحمد 3/ 306، وصححه الألباني، انظر: صحيح أبي داود 3/ 961.","FADL":""}] },
        "112": { "content": [{"ID":121,"ARABIC_TEXT":"اللَّهُمَّ فَأَيُّمَا مُؤْمِنٍ سَبَبْتُهُ فَاجْعَلْ ذَلِكَ لَهُ قُرْبَةً إِلَيْكَ يَوْمَ الْقِيَامَةِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/121.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 11/ 171، ومسلم 4/ 2007.","FADL":""}] },
        "113": { "content": [{"ID":122,"ARABIC_TEXT":"اللَّهُمَّ لاَ تُؤَاخِذْنِي بِمَا يَقُولُونَ، وَاغْفِرْ لِي مَا لاَ يَعْلَمُونَ، وَاجْعَلْنِي خَيْراً مِمَّا يَظُنُّونَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/122.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري في الأدب المفرد برقم 761، وصحح إسناده الألباني في صحيح الأدب المفرد برقم 585.","FADL":""}] },
        "114": { "content": [{"ID":123,"ARABIC_TEXT":"اللَّهُمَّ لاَ تُؤَاخِذْنِي بِمَا يَقُولُونَ، وَاغْفِرْ لِي مَا لاَ يَعْلَمُونَ، وَاجْعَلْنِي خَيْراً مِمَّا يَظُنُّونَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/123.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري في الأدب المفرد برقم 761، وصحح إسناده الألباني في صحيح الأدب المفرد برقم 585.","FADL":""}] },
        "115": { "content": [{"ID":124,"ARABIC_TEXT":"لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/124.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 2/ 147، ومسلم 2/ 841.","FADL":""}] },
        "116": { "content": [{"ID":125,"ARABIC_TEXT":"اللَّهُ أَكْبَرُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/125.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 2/ 161.","FADL":""}] },
        "117": { "content": [{"ID":126,"ARABIC_TEXT":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/126.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 2/ 179، وأحمد 3/ 411، وحسنه الألباني، انظر: صحيح أبي داود 1/ 354.","FADL":""}] },
        "118": { "content": [{"ID":127,"ARABIC_TEXT":"لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/127.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 888.","FADL":""}] },
        "119": { "content": [{"ID":128,"ARABIC_TEXT":"لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/128.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 5/ 504، وابن ماجه 2/ 977، وانظر: صحيح الترمذي 3/ 157.","FADL":""}] },
        "120": { "content": [{"ID":129,"ARABIC_TEXT":"كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يُكَبِّرُ اللَّهَ عِنْدَ الْمَشْعَرِ الْحَرَامِ، وَيُهَلِّلُهُ، وَيُوَحِّدُهُ، وَيَدْعُو حَتَّى أَسْفَرَ جِدّاً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/129.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 891.","FADL":""}] },
        "121": { "content": [{"ID":130,"ARABIC_TEXT":"اللَّهُ أَكْبَرُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/130.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 2/ 178، ومسلم 2/ 943.","FADL":""}] },
        "122": { "content": [{"ID":131,"ARABIC_TEXT":"سُبْحَانَ اللَّهِ، اللَّهُ أَكْبَرُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/131.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 6/ 345، ومسلم 4/ 2070.","FADL":""}] },
        "123": { "content": [{"ID":132,"ARABIC_TEXT":"السُّجُودُ شُكْراً لِلَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/132.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 3/ 99، والترمذي 3/ 115، وابن ماجه 1/ 446، وانظر: صحيح الترمذي 2/ 98.","FADL":""}] },
        "124": { "content": [{"ID":133,"ARABIC_TEXT":"بِسْمِ اللَّهِ (ثَلاثاً)، أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سَبْعَ مَرَّاتٍ).","AUDIO":"https://www.hisnmuslim.com/audio/ar/133.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 4/ 1728.","FADL":""}] },
        "125": { "content": [{"ID":134,"ARABIC_TEXT":"إِذَا رَأَى أَحَدُكُمْ مِنْ أَخِيهِ، أَوْ مِنْ نَفْسِهِ، أَوْ مِنْ مَالِهِ مَا يُعْجِبُهُ فَلْيُبَرِّكْهُ، فَإِنَّ الْعَيْنَ حَقٌّ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/134.mp3","REPEAT_COUNT":1,"REFERENCE":"أحمد 3/ 447، وابن ماجه 2/ 1160، وصححه الألباني، انظر: صحيح الجامع 1/ 212.","FADL":""}] },
        "126": { "content": [{"ID":135,"ARABIC_TEXT":"لاَ إِلَهَ إِلاَّ اللَّهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/135.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 6/ 346، ومسلم 4/ 2209.","FADL":""}] },
        "127": { "content": [{"ID":136,"ARABIC_TEXT":"بِسْمِ اللَّهِ، وَاللَّهُ أَكْبَرُ، اللَّهُمَّ مِنْكَ وَلَكَ، اللَّهُمَّ تَقَبَّلْ مِنِّي.","AUDIO":"https://www.hisnmuslim.com/audio/ar/136.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 3/ 1557، والبيهقي 9/ 287.","FADL":""}] },
        "128": { "content": [{"ID":137,"ARABIC_TEXT":"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ الَّتِي لاَ يُجَاوِزُهُنَّ بَرٌّ وَلاَ فَاجِرٌ مِنْ شَرِّ مَا خَلَقَ، وَبَرَأَ وَذَرَأَ، وَمِنْ شَرِّ مَا يَنْزِلُ مِنَ السَّمَاءِ، وَمِنْ شَرِّ مَا يَعْرُجُ فِيهَا، وَمِنْ شَرِّ مَا ذَرَأَ فِي الْأَرْضِ، وَمِنْ شَرِّ مَا يَخْرُجُ مِنْهَا، وَمِنْ شَرِّ فِتَنِ اللَّيْلِ وَالنَّهَارِ، وَمِنْ شَرِّ كُلِّ طَارِقٍ إِلاَّ طَارِقاً يَطْرُقُ بِخَيْرٍ يَا رَحْمَنُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/137.mp3","REPEAT_COUNT":1,"REFERENCE":"أحمد 3/ 419، بإسناد صحيح، وابن السني برقم 637، وانظر: مجمع الزوائد 10/ 127.","FADL":""}] },
        "129": { "content": [{"ID":138,"ARABIC_TEXT":"قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم: وَاللَّهِ إِنِّي لَأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/138.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه البخاري مع الفتح 11/ 101.","FADL":""},{"ID":139,"ARABIC_TEXT":"وَقَالَ صلى الله عليه وسلم: يَا أَيُّهَا النَّاسُ، تُوبُوا إِلَى اللَّهِ فَإِنِّي أَتُوبُ فِي الْيَوْمِ إِلَيْهِ مِائَةَ مَرَّةٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/139.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه مسلم 4/ 2076.","FADL":""}] },
        "130": { "content": [{"ID":140,"ARABIC_TEXT":"قَالَ صلى الله عليه وسلم: مَنْ قَالَ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ فِي يَوْمٍ مِائَةَ مَرَّةٍ حُطَّتْ خَطَايَاهُ وَلَوْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/140.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 7/ 168، ومسلم 4/ 2071.","FADL":""}] },
        "131": { "content": [{"ID":141,"ARABIC_TEXT":"عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو رَضِيَ اللَّهُ عَنْهُمَا قَالَ: رَأَيْتُ النَّبِيَّ صلى الله عليه وسلم يَعْقِدُ التَّسْبِيحَ بِيَمِينِهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/141.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 2/ 81، والترمذي 5/ 521، وانظر: صحيح الجامع 4/ 271، برقم 4865.","FADL":""}] },
        "132": { "content": [{"ID":142,"ARABIC_TEXT":"إِذَا نَامَ أَحَدُكُمْ عَقَدَ الشَّيْطَانُ عَلَى قَافِيَةِ رَأْسِهِ ثَلاَثَ عُقَدٍ، يَضْرِبُ كُلَّ عُقْدَةٍ عَلَيْكَ لَيْلٌ طَوِيلٌ فَارْقُدْ، فَإِنِ اسْتَيْقَظَ فَذَكَرَ اللَّهَ انْحَلَّتْ عُقْدَةٌ، فَإِنْ تَوَضَّأَ انْحَلَّتْ عُقْدَةٌ، فَإِنْ صَلَّى انْحَلَّتْ عُقَدُهُ كُلُّهَا، فَأَصْبَحَ نَشِيطاً طَيِّبَ النَّفْسِ، وَإِلاَّ أَصْبَحَ خَبِيثَ النَّفْسِ كَسْلاَنَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/142.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 3/ 34، ومسلم 1/ 538.","FADL":""}] }
    };
    
    // --- DOM Elements ---
    const searchInput = document.getElementById('azkar-search-input');
    const categoriesList = document.getElementById('azkar-categories-list');
    const azkarContent = document.getElementById('azkar-content');
    const categoryTitle = document.getElementById('current-category-title');
    const progressFill = document.getElementById('azkar-progress-bar-fill');
    const progressText = document.getElementById('azkar-progress-text');
    const audioPlayer = document.getElementById('azkar-audio-player');
    const clickSound = document.getElementById('azkar-click-sound');

    let currentCategoryData = [];
    let activeAudioBtn = null;

    function init() {
        try {
            populateCategories();
            setupEventListeners();
            if (azkarCategories.length > 0) {
                loadAzkarByCategory(azkarCategories[0].ID);
            }
        } catch (error) {
            console.error("Failed to initialize Azkar section:", error);
            azkarContent.innerHTML = `<div class="error-message" style="text-align: center; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <span>حدث خطأ أثناء تحميل الأذكار. يرجى تحديث الصفحة والمحاولة مرة أخرى.</span>
            </div>`;
        }
    }

    function setupEventListeners() {
        searchInput.addEventListener('input', (e) => filterAzkar(e.target.value));
        audioPlayer.addEventListener('play', () => {
            if(activeAudioBtn) activeAudioBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        audioPlayer.addEventListener('pause', () => {
            if(activeAudioBtn) activeAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        audioPlayer.addEventListener('ended', () => {
             if(activeAudioBtn) {
                activeAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
                activeAudioBtn = null;
             }
        });
    }

    function populateCategories() {
        categoriesList.innerHTML = '';
        azkarCategories.forEach((category, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'category-item-wrapper';

            const btn = document.createElement('button');
            btn.className = 'category-btn-new';
            btn.dataset.id = category.ID;
            if (index === 0) btn.classList.add('active');
            btn.innerHTML = `<i class="fas ${category.ICON}"></i> <span>${category.TITLE}</span>`;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn-new').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                loadAzkarByCategory(category.ID);
            });

            const playBtn = document.createElement('button');
            playBtn.className = 'category-play-btn action-btn';
            playBtn.dataset.audioSrc = category.AUDIO_URL;
            playBtn.title = `تشغيل صوت ${category.TITLE}`;
            playBtn.innerHTML = `<i class="fas fa-play"></i>`;
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const audioSrc = playBtn.dataset.audioSrc;
                if (activeAudioBtn === playBtn && !audioPlayer.paused) {
                    audioPlayer.pause();
                } else {
                    playAudio(audioSrc, playBtn);
                }
            });

            wrapper.appendChild(btn);
            wrapper.appendChild(playBtn);
            categoriesList.appendChild(wrapper);
        });
    }
    
    function loadAzkarByCategory(id) {
        const category = azkarCategories.find(c => c.ID == id);
        if (!category) {
            console.error(`Category with ID ${id} not found.`);
            azkarContent.innerHTML = '<div class="no-results">لم يتم العثور على هذا القسم.</div>';
            return;
        }
        categoryTitle.textContent = category.TITLE;
        currentCategoryData = allAzkarData[id]?.content || [];
        displayAzkar(currentCategoryData);
        searchInput.value = '';
    }

    function filterAzkar(query) {
        query = query.trim().toLowerCase();
        if (!query) {
            displayAzkar(currentCategoryData);
            return;
        }
        const filtered = currentCategoryData.filter(zikr =>
            zikr.ARABIC_TEXT.toLowerCase().includes(query) ||
            (zikr.FADL && zikr.FADL.toLowerCase().includes(query))
        );
        displayAzkar(filtered);
    }

    function displayAzkar(azkar) {
        azkarContent.innerHTML = '';
        if (!azkar || azkar.length === 0) {
            azkarContent.innerHTML = '<div class="no-results" style="text-align: center; padding: 2rem;">لا توجد أذكار متاحة في هذا القسم</div>';
            updateProgress(0, 0);
            return;
        }

        azkar.forEach(zikr => {
            const card = document.createElement('div');
            card.className = 'azkar-card animate-fade-in';
            card.dataset.id = zikr.ID;
            card.dataset.completed = "false";

            card.innerHTML = `
                ${zikr.REFERENCE ? `<span class="azkar-card-source">${zikr.REFERENCE}</span>` : ''}
                <p class="azkar-card-text">${zikr.ARABIC_TEXT.replace(/\n/g, '<br>')}</p>
                ${zikr.FADL ? `<div class="azkar-card-fadl"><i class="fas fa-lightbulb"></i><p>${zikr.FADL}</p></div>` : ''}
                <div class="azkar-card-footer">
                    <div class="azkar-card-actions">
                        ${zikr.AUDIO ? `<button class="action-btn play-btn" data-audio-src="${zikr.AUDIO}" title="تشغيل الصوت"><i class="fas fa-play"></i></button>` : ''}
                        <button class="action-btn copy-btn" title="نسخ النص"><i class="fas fa-copy"></i></button>
                        <button class="action-btn share-btn" title="مشاركة"><i class="fas fa-share-alt"></i></button>
                    </div>
                    ${zikr.REPEAT_COUNT > 1 ? `
                    <div class="azkar-card-counter" data-goal="${zikr.REPEAT_COUNT}" data-count="0">
                        <div class="counter-btn">
                            <span class="counter-text">${zikr.REPEAT_COUNT}</span>
                        </div>
                    </div>` : ''}
                </div>
            `;
            azkarContent.appendChild(card);
        });
        
        attachCardEventListeners();
        updateProgress();
    }

    function attachCardEventListeners() {
        azkarContent.querySelectorAll('.azkar-card').forEach(card => {
            const counterBtn = card.querySelector('.counter-btn');
            if (counterBtn) {
                counterBtn.addEventListener('click', () => handleCounterClick(card, counterBtn));
            }

            const playBtn = card.querySelector('.play-btn');
            if(playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const audioSrc = playBtn.dataset.audioSrc;
                    
                    if (activeAudioBtn === playBtn && !audioPlayer.paused) {
                        audioPlayer.pause();
                    } else {
                        playAudio(audioSrc, playBtn);
                    }
                });
            }
            
            const copyBtn = card.querySelector('.copy-btn');
            copyBtn.addEventListener('click', (e) => {
                 e.stopPropagation();
                 copyToClipboard(card);
            });

            const shareBtn = card.querySelector('.share-btn');
            shareBtn.addEventListener('click', (e) => {
                 e.stopPropagation();
                 shareZikr(card);
            });
        });
    }

    function handleCounterClick(card, btn) {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.error("Sound play failed", e));
        }

        const counterWrapper = btn.parentElement;
        let count = parseInt(counterWrapper.dataset.count, 10);
        const goal = parseInt(counterWrapper.dataset.goal, 10);
        
        count++;
        counterWrapper.dataset.count = count;
        
        btn.querySelector('.counter-text').textContent = goal - count;
        
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => btn.style.transform = 'scale(1)', 100);

        if (count >= goal) {
            btn.querySelector('.counter-text').innerHTML = '<i class="fas fa-check"></i>';
            btn.classList.add('done');
            card.dataset.completed = "true";
            card.classList.add('completed');
        }
        updateProgress();
    }
    
    function playAudio(src, btn) {
        if (activeAudioBtn && activeAudioBtn !== btn) {
            activeAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        activeAudioBtn = btn;

        audioPlayer.src = src;
        audioPlayer.play().catch(e => {
            console.error("Audio play failed:", e);
            showNotification('فشل تشغيل الصوت', 'error');
            if(activeAudioBtn) activeAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }

    function copyToClipboard(card) {
        const text = card.querySelector('.azkar-card-text').innerText;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('تم نسخ النص بنجاح');
        }, () => {
            showNotification('فشل النسخ', 'error');
        });
    }
    
    function shareZikr(card) {
        const zikrText = card.querySelector('.azkar-card-text').innerText;
        if (navigator.share) {
            navigator.share({
                title: 'ذكر من حصن المسلم',
                text: `${zikrText}\n\n(من تطبيق نور الإسلام)`,
            }).catch(console.error);
        } else {
             showNotification('المتصفح لا يدعم المشاركة', 'warning');
        }
    }

    function updateProgress() {
        const cards = azkarContent.querySelectorAll('.azkar-card');
        const total = cards.length;
        if (total === 0) {
             progressFill.style.width = '0%';
             progressText.textContent = `0/0`;
             return;
        }
        const completed = Array.from(cards).filter(c => {
            const counter = c.querySelector('.azkar-card-counter');
            return !counter || c.dataset.completed === "true";
        }).length;
        
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${completed}/${total}`;
    }

    function showNotification(message, type = 'success') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    init();
});