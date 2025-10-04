document.addEventListener("DOMContentLoaded", function () {
    const azkarCategories = [
        { "ID": 27, "TITLE": "أذكار الصباح والمساء", "ICON": "fa-sun" },
        { "ID": 28, "TITLE": "أذكار النوم", "ICON": "fa-bed" },
        { "ID": 1, "TITLE": "أذكار الاستيقاظ", "ICON": "fa-clock" },
        { "ID": 25, "TITLE": "بعد السلام من الصلاة", "ICON": "fa-mosque" },
        { "ID": 34, "TITLE": "دعاء الهم والحزن", "ICON": "fa-sad-tear" },
        { "ID": 35, "TITLE": "دعاء الكرب", "ICON": "fa-bolt" },
        { "ID": 129, "TITLE": "الاستغفار و التوبة", "ICON": "fa-hands-praying" },
        { "ID": 6, "TITLE": "دعاء دخول الخلاء", "ICON": "fa-toilet" },
        { "ID": 7, "TITLE": "دعاء الخروج من الخلاء", "ICON": "fa-door-open" },
        { "ID": 9, "TITLE": "بعد الفراغ من الوضوء", "ICON": "fa-tint" },
        { "ID": 10, "TITLE": "عند الخروج من المنزل", "ICON": "fa-house-user" },
        { "ID": 11, "TITLE": "عند دخول المنزل", "ICON": "fa-house-chimney" },
        { "ID": 12, "TITLE": "دعاء الذهاب للمسجد", "ICON": "fa-walking" },
        { "ID": 13, "TITLE": "دعاء دخول المسجد", "ICON": "fa-person-booth" },
        { "ID": 14, "TITLE": "دعاء الخروج من المسجد", "ICON": "fa-door-closed" },
        { "ID": 15, "TITLE": "أذكار الآذان", "ICON": "fa-bullhorn" },
        { "ID": 2, "TITLE": "دعاء ُلبْس الثوب", "ICON": "fa-tshirt" },
        { "ID": 16, "TITLE": "دعاء الاستفتاح", "ICON": "fa-comment-dots" },
        { "ID": 26, "TITLE": "دعاء صلاة الاستخارة", "ICON": "fa-question-circle" },
        { "ID": 41, "TITLE": "دعاء قضاء الدين", "ICON": "fa-hand-holding-usd" },
        { "ID": 61, "TITLE": "دعاء الريح", "ICON": "fa-wind" },
        { "ID": 64, "TITLE": "إذا نزل المطر", "ICON": "fa-cloud-showers-heavy" },
        { "ID": 96, "TITLE": "دعاء السفر", "ICON": "fa-plane" },
    ];

    const allAzkarData = {
        "1": { "content": [{"ID":1,"ARABIC_TEXT":"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/2.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه البخاري مع الفتح 11/ 113 ومسلم 4/ 2083","FADL":""}] },
        "2": { "content": [{"ID":2,"ARABIC_TEXT":"الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/3.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن إلا النسائي وسنده حسن، وانظر: إرواء الغليل 7/ 47.","FADL":""}] },
        "3": { "content": [{"ID":3,"ARABIC_TEXT":"اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/4.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أبو داود والترمذي والبغوي، وانظر: مختصر شمائل الترمذي للألباني، ص47.","FADL":""}] },
        "4": { "content": [{"ID":4,"ARABIC_TEXT":"تُبْلِي وَيُخْلِفُ اللَّهُ تَعَالَى.","AUDIO":"https://www.hisnmuslim.com/audio/ar/5.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أبو داود 4/ 41، وانظر: صحيح أبي داود 2/ 760.","FADL":""}] },
        "5": { "content": [{"ID":5,"ARABIC_TEXT":"بِسْمِ اللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/6.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه الترمذي 2/ 505، وغيره، وانظر: إرواء الغليل، رقم 50، وصحيح الجامع 3/ 203.","FADL":""}] },
        "6": { "content": [{"ID":6,"ARABIC_TEXT":"[بِسْمِ اللَّهِ] اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/7.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 45، ومسلم 1/ 283، وزيادة \"بسم الله\" في أوله، أخرجها سعيد بن منصور، انظر: فتح الباري 1/ 244.","FADL":""}] },
        "7": { "content": [{"ID":7,"ARABIC_TEXT":"غُفْرَانَكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/8.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن إلا النسائي، وهو في صحيح الترمذي 1/ 7.","FADL":""}] },
        "8": { "content": [{"ID":8,"ARABIC_TEXT":"بِسْمِ اللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/9.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن إلا البخاري، وانظر: إرواء الغليل 1/ 122.","FADL":""}] },
        "9": { "content": [{"ID":9,"ARABIC_TEXT":"أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّداً عَبْدُهُ وَرَسُولُهُ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/10.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 1/ 209.","FADL":""},{"ID":10,"ARABIC_TEXT":"اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/11.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 1/ 78، وانظر: صحيح الترمذي 1/ 18.","FADL":""}] },
        "10": { "content": [{"ID":11,"ARABIC_TEXT":"بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/12.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 325، والترمذي 5/ 490، وانظر: صحيح الترمذي 3/ 151.","FADL":""},{"ID":12,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ، أَوْ أُضَلَّ، أَوْ أَزِلَّ، أَوْ أُزَلَّ، أَوْ أَظْلِمَ، أَوْ أُظْلَمَ، أَوْ أَجْهَلَ، أَوْ يُجْهَلَ عَلَيَّ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/13.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن، وانظر: صحيح الترمذي 3/ 152، وصحيح ابن ماجه 2/ 336.","FADL":""}] },
        "11": { "content": [{"ID":13,"ARABIC_TEXT":"بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا، ثُمَّ لِيُسَلِّمْ عَلَى أَهْلِهِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/14.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه أبو داود 4/ 325، وحسن الألباني سنده في صحيح أبي داود 3/ 959.","FADL":""}] },
        "12": { "content": [{"ID":14,"ARABIC_TEXT":"اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُوراً، وَفِي لِسَانِي نُوراً، وَفِي سَمْعِي نُوراً، وَفِي بَصَرِي نُوراً، وَمِنْ فَوْقِي نُوراً، وَمِنْ تَحْتِي نُوراً، وَعَنْ يَمِينِي نُوراً، وَعَنْ شِمَالِي نُوراً، وَمِنْ أَمَامِي نُوراً، وَمِنْ خَلْفِي نُوراً، وَاجْعَلْ فِي نَفْسِي نُوراً، وَأَعْظِمْ لِي نُوراً، وَعَظِّم لِي نُوراً، وَاجْعَلْ لِي نُوراً، وَاجْعَلْنِي نُوراً، اللَّهُمَّ أَعْطِنِي نُوراً، وَاجْعَلْ فِي عَصَبِي نُوراً، وَفِي لَحْمِي نُوراً، وَفِي دَمِي نُوراً، وَفِي شَعْرِي نُوراً، وَفِي بَشَرِي نُوراً [اللَّهُمَّ اجْعَلْ لِي نُوراً فِي قَبْرِي.. وَنُوراً فِي عِظَامِي] [وَزِدْنِي نُوراً، وَزِدْنِي نُوراً، وَزِدْنِي نُوراً] [وَهَبْ لِي نُوراً عَلَى نُورٍ].","AUDIO":"https://www.hisnmuslim.com/audio/ar/15.mp3","REPEAT_COUNT":1,"REFERENCE":"جميع هذه الزيادات في البخاري مع الفتح، انظر: 11/ 116، برقم 6316، وفي مسلم 1/ 526، 529، 530، برقم 763. وما بين المعكوفين الأولين للترمذي 5/ 483، برقم 3419. والمعكوف الثالث لابن حجر في الفتح، وذكر أن رواياته عند ابن أبي عاصم في كتاب السنة، انظر: فتح الباري 11/ 118. والمعكوف الرابع للبخاري في الأدب المفرد، برقم 695، ص258، وصححه الألباني في صحيح الأدب المفرد برقم 536.","FADL":""}] },
        "13": { "content": [{"ID":15,"ARABIC_TEXT":"يَبْدَأُ بِرِجْلِهِ الْيُمْنَى وَيَقُولُ: أَعُوذُ بِاللَّهِ العَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ، [بِسْمِ اللَّهِ، وَالصَّلَاةُ] [وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ]، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/16.mp3","REPEAT_COUNT":1,"REFERENCE":"انظر: تخريج الكلم الطيب للألباني ص65. أما زيادة \"بسم الله\"، فرواها ابن السني برقم 88، وحسنها الألباني. وما بين المعكوفين الثانيين فمن رواية أبي داود 1/ 126، وانظر: صحيح الجامع 1/ 528. والمعكوف الثالث رواه مسلم 1/ 494. وفي سنن ابن ماجه من حديث فاطمة رضي الله عنها: \"اللهم اغفر لي ذنوبي وافتح لي أبواب رحمتك\"، وصححه الألباني لشواهده، انظر: صحيح ابن ماجه 1/ 128-129.","FADL":""}] },
        "14": { "content": [{"ID":16,"ARABIC_TEXT":"يَبْدَأُ بِرِجْلِهِ الْيُسْرَى وَيَقُولُ: بِسْمِ اللَّهِ وَالصّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/17.mp3","REPEAT_COUNT":1,"REFERENCE":"انظر تخريج الحديث السابق رقم 20، وزيادة \"اللهم اعصمني من الشيطان الرجيم\"، لابن ماجه، انظر: صحيح ابن ماجه 1/ 129.","FADL":""}] },
        "15": { "content": [{"ID":17,"ARABIC_TEXT":"يَقُولُ مِثْلَ مَا يَقُولُ الْمُؤَذِّنُ إِلَّا فِي \"حَيَّ عَلَى الصَّلَاةِ وَحَيَّ عَلَى الْفَلَاحِ\" فَإِنَّهُ يَقُولُ: \"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ\".","AUDIO":"https://www.hisnmuslim.com/audio/ar/18.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 152، ومسلم 1/ 288.","FADL":""}] },
        "16": { "content": [{"ID":18,"ARABIC_TEXT":"اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/19.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 1/ 181، ومسلم 1/ 419.","FADL":""},{"ID":19,"ARABIC_TEXT":"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/20.mp3","REPEAT_COUNT":1,"REFERENCE":"أخرجه أصحاب السنن الأربعة، وانظر: صحيح الترمذي 1/ 77، وصحيح ابن ماجه 1/ 135.","FADL":""}] },
        "25": { "content": [{"ID":27,"ARABIC_TEXT":"أَسْتَغْفِرُ اللَّهَ (ثَلاثاً) اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/28.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 1/ 414.","FADL":""}] },
        "26": { "content": [{"ID":28,"ARABIC_TEXT":"قَالَ جَابِرُ بْنُ عَبْدِ اللَّهِ رَضِيَ اللَّهُ عَنْهُمَا: كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يُعَلِّمُنَا الِاسْتِخَارَةَ فِي الْأُمُورِ كُلِّهَا كَمَا يُعَلِّمُنَا السُّورَةَ مِنَ الْقُرْآنِ، يَقُولُ: إِذَا هَمَّ أَحَدُكُمْ بِالْأَمْرِ فَلْيَرْكَعْ رَكْعَتَيْنِ مِنْ غَيْرِ الْفَرِيضَةِ ثُمَّ لِيَقُلْ: اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ –وَيُسَمِّي حَاجَتَهُ– خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، –أَوْ قَالَ: عَاجِلِهِ وَآجِلِهِ–، فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي، –أَوْ قَالَ: عَاجِلِهِ وَآجِلِهِ–، فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ. وَمَا نَدِمَ مَنِ اسْتَخَارَ الْخَالِقَ، وَشَاوَرَ الْمَخْلُوقِينَ الْمُؤْمِنِينَ وَتَثَبَّتَ فِي أَمْرِهِ، فَقَدْ قَالَ سُبْحَانَهُ: ﴿وَشَاوِرْهُمْ فِي الأَمْرِ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ﴾.","AUDIO":"https://www.hisnmuslim.com/audio/ar/29.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 7/ 162.","FADL":""}] },
        "27": { "content": [{"ID":29,"ARABIC_TEXT":"أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.\n[آية الكرسى - البقرة 255].","AUDIO":"https://www.hisnmuslim.com/audio/ar/30.mp3","REPEAT_COUNT":1,"REFERENCE":"من قالها حين يصبح أجير من الجن حتى يمسى ومن قالها حين يمسى أجير منهم حتى يصبح. رواه الحاكم وصححه الألبانى 1/562.","FADL":"من قالها حين يصبح أجير من الجن حتى يمسى ومن قالها حين يمسى أجير منهم حتى يصبح"},{"ID":30,"ARABIC_TEXT":"بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/31.mp3","REPEAT_COUNT":3,"REFERENCE":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء. رواه أبو داود والترمذى، وانظر صحيح الترمذى 3/182.","FADL":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء"},{"ID":31,"ARABIC_TEXT":"بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/32.mp3","REPEAT_COUNT":3,"REFERENCE":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء. رواه أبو داود والترمذى، وانظر صحيح الترمذى 3/182.","FADL":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء"},{"ID":32,"ARABIC_TEXT":"بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/33.mp3","REPEAT_COUNT":3,"REFERENCE":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء. رواه أبو داود والترمذى، وانظر صحيح الترمذى 3/182.","FADL":"من قالها ثلاث مرات حين يصبح وحين يمسى كفته من كل شىء"}] },
        "28": { "content": [{"ID":33,"ARABIC_TEXT":"يَجْمَعُ كَفَّيْهِ ثُمَّ يَنْفُثُ فِيهِمَا فَيَقْرَأُ فِيهِمَا: ﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾ وَ﴿قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ﴾ وَ﴿قُلْ أَعُوذُ بِرَبِّ النَّاسِ﴾ ثُمَّ يَمْسَحُ بِهِمَا مَا اسْتَطَاعَ مِنْ جَسَدِهِ، يَبْدَأُ بِهِمَا عَلَى رَأْسِهِ وَوَجْهِهِ وَمَا أَقْبَلَ مِنْ جَسَدِهِ، (يَفْعَلُ ذَلِكَ ثَلَاثَ مَرَّاتٍ).","AUDIO":"https://www.hisnmuslim.com/audio/ar/34.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 9/ 62، ومسلم 4/ 1723.","FADL":""}] },
        "34": { "content": [{"ID":34,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/35.mp3","REPEAT_COUNT":1,"REFERENCE":"كان رسول الله صلى الله عليه وسلم يكثر من هذا الدعاء. انظر: البخاري 7/ 158، وانظر: صحيح الجامع 1/ 354.","FADL":""}] },
        "35": { "content": [{"ID":35,"ARABIC_TEXT":"لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/36.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري 8/ 154، ومسلم 4/ 2092.","FADL":""}] },
        "41": { "content": [{"ID":41,"ARABIC_TEXT":"اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/42.mp3","REPEAT_COUNT":1,"REFERENCE":"الترمذي 5/ 560، وانظر: صحيح الترمذي 3/ 180.","FADL":""}] },
        "61": { "content": [{"ID":61,"ARABIC_TEXT":"اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا.","AUDIO":"https://www.hisnmuslim.com/audio/ar/62.mp3","REPEAT_COUNT":1,"REFERENCE":"أبو داود 4/ 326، وابن ماجه 2/ 1228، وانظر: صحيح ابن ماجه 2/ 305.","FADL":""}] },
        "64": { "content": [{"ID":64,"ARABIC_TEXT":"اللَّهُمَّ صَيِّباً نَافِعاً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/65.mp3","REPEAT_COUNT":1,"REFERENCE":"البخاري مع الفتح 2/ 518.","FADL":""}] },
        "96": { "content": [{"ID":96,"ARABIC_TEXT":"اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، ﴿سُبْحانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ * وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ﴾ اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ، وَإِذَا رَجَعَ قَالَهُنَّ وَزَادَ فِيهِنَّ: آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/97.mp3","REPEAT_COUNT":1,"REFERENCE":"مسلم 2/ 998.","FADL":""}] },
        "129": { "content": [{"ID":129,"ARABIC_TEXT":"قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم: وَاللَّهِ إِنِّي لَأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً.","AUDIO":"https://www.hisnmuslim.com/audio/ar/130.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه البخاري مع الفتح 11/ 101.","FADL":""},{"ID":130,"ARABIC_TEXT":"وَقَالَ صلى الله عليه وسلم: يَا أَيُّهَا النَّاسُ، تُوبُوا إِلَى اللَّهِ فَإِنِّي أَتُوبُ فِي الْيَوْمِ إِلَيْهِ مِائَةَ مَرَّةٍ.","AUDIO":"https://www.hisnmuslim.com/audio/ar/131.mp3","REPEAT_COUNT":1,"REFERENCE":"رواه مسلم 4/ 2076.","FADL":""}] }
    };

    // --- DOM Elements ---
    const searchInput = document.getElementById('azkar-search-input');
    const categoriesList = document.getElementById('azkar-categories-list');
    const azkarContent = document.getElementById('azkar-content');
    const categoryTitle = document.getElementById('current-category-title');
    const progressFill = document.getElementById('azkar-progress-bar-fill');
    const progressText = document.getElementById('azkar-progress-text');
    const audioPlayer = document.getElementById('azkar-audio-player');
    const playerStatus = document.getElementById('player-status-text');
    const playerPlayBtn = document.getElementById('azkar-player-play');
    const playerPauseBtn = document.getElementById('azkar-player-pause');
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
        playerPlayBtn.addEventListener('click', () => audioPlayer.play());
        playerPauseBtn.addEventListener('click', () => audioPlayer.pause());
        audioPlayer.addEventListener('play', () => {
            if(activeAudioBtn) activeAudioBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        audioPlayer.addEventListener('pause', () => {
            if(activeAudioBtn) activeAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        audioPlayer.addEventListener('ended', () => {
             if(activeAudioBtn) activeAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }

    function populateCategories() {
        categoriesList.innerHTML = '';
        azkarCategories.forEach((category, index) => {
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
            categoriesList.appendChild(btn);
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
                    const zikrText = card.querySelector('.azkar-card-text').innerText;
                    playAudio(audioSrc, playBtn, zikrText);
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
        
        // Animation
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
    
    function playAudio(src, btn, zikrText) {
        if (activeAudioBtn && activeAudioBtn !== btn) {
            activeAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        activeAudioBtn = btn;

        playerStatus.textContent = zikrText ? `تشغيل: ${zikrText.substring(0, 30)}...` : "جاري تشغيل الصوت...";
        audioPlayer.src = src;
        audioPlayer.play().catch(e => {
            console.error("Audio play failed:", e);
            playerStatus.textContent = "فشل تشغيل الصوت";
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