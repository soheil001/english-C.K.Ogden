export interface WordItem {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  category: string;
  exampleEn: string;
  exampleFa: string;
  lessonId: number;
  iconName?: string;
  image?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  rangeText: string;
}

export const LESSONS: Lesson[] = [
  { id: 1, title: 'درس ۱: اشیاء و مفاهیم پایه', description: '۱۰ کلمه پرکاربرد روزمره', rangeText: '۱ تا ۱۰' },
  { id: 2, title: 'درس ۲: افعال کلیدی آگدن', description: '۱۰ فعل اصلی برای ساخت صدها جمله', rangeText: '۱۱ تا ۲۰' },
  { id: 3, title: 'درس ۳: موقعیت‌ها و جهت‌ها', description: '۱۰ کلمه اتصال‌دهنده و جهات', rangeText: '۲۱ تا ۳۰' },
  { id: 4, title: 'درس ۴: صفت‌ها و توصیف‌ها', description: '۱۰ صفت ضروری برای توصیف جهان', rangeText: '۳۱ تا ۴۰' },
  { id: 5, title: 'درس ۵: ذهن، گفت‌وگو و ارتباط', description: '۱۰ مفهوم کلیدی ارتباط انسانی', rangeText: '۴۱ تا ۵۰' },
];

export const WORDS_DATA: WordItem[] = [
  // Lesson 1 (1-10)
  {
    id: 1,
    word: 'book',
    phonetic: '/bʊk/',
    meaning: 'کتاب',
    category: 'مفهوم جدید',
    exampleEn: 'I have a book.',
    exampleFa: 'من یک کتاب دارم.',
    lessonId: 1,
    image: '/src/assets/images/purple_book_3d_1791081323930.jpg'
  },
  {
    id: 2,
    word: 'water',
    phonetic: '/ˈwɔːtər/',
    meaning: 'آب',
    category: 'نیازهای پایه',
    exampleEn: 'Clean water is necessary for life.',
    exampleFa: 'آب تمیز برای زندگی ضروری است.',
    lessonId: 1
  },
  {
    id: 3,
    word: 'house',
    phonetic: '/haʊs/',
    meaning: 'خانه',
    category: 'مکان‌ها',
    exampleEn: 'This is a peaceful house.',
    exampleFa: 'این یک خانه آرام است.',
    lessonId: 1
  },
  {
    id: 4,
    word: 'friend',
    phonetic: '/frend/',
    meaning: 'دوست',
    category: 'روابط',
    exampleEn: 'She is my best friend.',
    exampleFa: 'او صمیمی‌ترین دوست من است.',
    lessonId: 1
  },
  {
    id: 5,
    word: 'time',
    phonetic: '/taɪm/',
    meaning: 'زمان / وقت',
    category: 'مفاهیم پایه',
    exampleEn: 'Time is the most valuable thing.',
    exampleFa: 'زمان ارزشمندترین چیز است.',
    lessonId: 1
  },
  {
    id: 6,
    word: 'door',
    phonetic: '/dɔːr/',
    meaning: 'در / درب',
    category: 'اشیاء',
    exampleEn: 'Please open the door.',
    exampleFa: 'لطفاً در را باز کنید.',
    lessonId: 1
  },
  {
    id: 7,
    word: 'food',
    phonetic: '/fuːd/',
    meaning: 'غذا',
    category: 'نیازهای پایه',
    exampleEn: 'We need healthy food.',
    exampleFa: 'ما به غذای سالم نیاز داریم.',
    lessonId: 1
  },
  {
    id: 8,
    word: 'light',
    phonetic: '/laɪt/',
    meaning: 'نور / روشنایی',
    category: 'طبیعت',
    exampleEn: 'Turn on the soft light.',
    exampleFa: 'نور ملایم را روشن کن.',
    lessonId: 1
  },
  {
    id: 9,
    word: 'night',
    phonetic: '/naɪt/',
    meaning: 'شب',
    category: 'زمان',
    exampleEn: 'Good night, sleep well.',
    exampleFa: 'شب بخیر، خوب بخوابی.',
    lessonId: 1
  },
  {
    id: 10,
    word: 'day',
    phonetic: '/deɪ/',
    meaning: 'روز',
    category: 'زمان',
    exampleEn: 'Today is a wonderful day.',
    exampleFa: 'امروز یک روز فوق‌العاده است.',
    lessonId: 1
  },

  // Lesson 2 (11-20)
  {
    id: 11,
    word: 'give',
    phonetic: '/ɡɪv/',
    meaning: 'دادن',
    category: 'افعال پایه آگدن',
    exampleEn: 'Give me the book, please.',
    exampleFa: 'لطفاً کتاب را به من بده.',
    lessonId: 2
  },
  {
    id: 12,
    word: 'take',
    phonetic: '/teɪk/',
    meaning: 'گرفتن / برداشتن',
    category: 'افعال پایه آگدن',
    exampleEn: 'Take this cup with you.',
    exampleFa: 'این فنجان را با خودت ببر.',
    lessonId: 2
  },
  {
    id: 13,
    word: 'come',
    phonetic: '/kʌm/',
    meaning: 'آمدن',
    category: 'افعال حرکتی',
    exampleEn: 'Come here and look at this.',
    exampleFa: 'بیا اینجا و به این نگاه کن.',
    lessonId: 2
  },
  {
    id: 14,
    word: 'go',
    phonetic: '/ɡoʊ/',
    meaning: 'رفتن',
    category: 'افعال حرکتی',
    exampleEn: 'I go to work every morning.',
    exampleFa: 'من هر روز صبح به سر کار می‌روم.',
    lessonId: 2
  },
  {
    id: 15,
    word: 'make',
    phonetic: '/meɪk/',
    meaning: 'ساختن / درست کردن',
    category: 'افعال عملیاتی',
    exampleEn: 'Let us make a simple sentence.',
    exampleFa: 'بیایید یک جمله ساده بسازیم.',
    lessonId: 2
  },
  {
    id: 16,
    word: 'put',
    phonetic: '/pʊt/',
    meaning: 'گذاشتن / قرار دادن',
    category: 'افعال عملیاتی',
    exampleEn: 'Put the book on the table.',
    exampleFa: 'کتاب را روی میز بگذار.',
    lessonId: 2
  },
  {
    id: 17,
    word: 'see',
    phonetic: '/siː/',
    meaning: 'دیدن',
    category: 'حواس',
    exampleEn: 'I see what you mean.',
    exampleFa: 'می‌فهمم (می‌بینم) منظورت چیست.',
    lessonId: 2
  },
  {
    id: 18,
    word: 'get',
    phonetic: '/ɡet/',
    meaning: 'گرفتن / به دست آوردن',
    category: 'افعال کلیدی',
    exampleEn: 'You can get good results.',
    exampleFa: 'می‌توانی نتایج خوبی بگیری.',
    lessonId: 2
  },
  {
    id: 19,
    word: 'say',
    phonetic: '/seɪ/',
    meaning: 'گفتن',
    category: 'گفتار',
    exampleEn: 'Say the word clearly.',
    exampleFa: 'کلمه را به وضوح بگو.',
    lessonId: 2
  },
  {
    id: 20,
    word: 'keep',
    phonetic: '/kiːp/',
    meaning: 'نگه‌داشتن / حفظ کردن',
    category: 'افعال ماندگار',
    exampleEn: 'Keep learning step by step.',
    exampleFa: 'گام‌به‌گام به یادگیری ادامه بده.',
    lessonId: 2
  },

  // Lesson 3 (21-30)
  {
    id: 21,
    word: 'in',
    phonetic: '/ɪn/',
    meaning: 'در / داخل',
    category: 'موقعیت و جهت',
    exampleEn: 'The word is in the book.',
    exampleFa: 'کلمه در کتاب است.',
    lessonId: 3
  },
  {
    id: 22,
    word: 'out',
    phonetic: '/aʊt/',
    meaning: 'بیرون / خارج',
    category: 'موقعیت و جهت',
    exampleEn: 'Step out into the sunshine.',
    exampleFa: 'قدم بگذار بیرون در روشنایی آفتاب.',
    lessonId: 3
  },
  {
    id: 23,
    word: 'with',
    phonetic: '/wɪð/',
    meaning: 'با / همراه با',
    category: 'روابط',
    exampleEn: 'Learn with joy and ease.',
    exampleFa: 'با لذت و آسودگی یاد بگیر.',
    lessonId: 3
  },
  {
    id: 24,
    word: 'from',
    phonetic: '/frʌm/',
    meaning: 'از / از مبدأ',
    category: 'مبدأ و منشأ',
    exampleEn: 'Start from simple words.',
    exampleFa: 'از کلمات ساده شروع کن.',
    lessonId: 3
  },
  {
    id: 25,
    word: 'to',
    phonetic: '/tuː/',
    meaning: 'به / به سوی',
    category: 'جهت و مقصد',
    exampleEn: 'Listen to the sound.',
    exampleFa: 'به صدا گوش بده.',
    lessonId: 3
  },
  {
    id: 26,
    word: 'up',
    phonetic: '/ʌp/',
    meaning: 'بالا',
    category: 'جهت',
    exampleEn: 'Look up at the stars.',
    exampleFa: 'به ستاره‌ها در بالا نگاه کن.',
    lessonId: 3
  },
  {
    id: 27,
    word: 'down',
    phonetic: '/daʊn/',
    meaning: 'پایین',
    category: 'جهت',
    exampleEn: 'Write down the new word.',
    exampleFa: 'کلمه جدید را یادداشت کن (بنویس).',
    lessonId: 3
  },
  {
    id: 28,
    word: 'after',
    phonetic: '/ˈæftər/',
    meaning: 'بعد از / پس از',
    category: 'ترتیب زمانی',
    exampleEn: 'Rest after practice.',
    exampleFa: 'بعد از تمرین استراحت کن.',
    lessonId: 3
  },
  {
    id: 29,
    word: 'before',
    phonetic: '/bɪˈfɔːr/',
    meaning: 'قبل از / پیش از',
    category: 'ترتیب زمانی',
    exampleEn: 'Think before you speak.',
    exampleFa: 'قبل از حرف زدن فکر کن.',
    lessonId: 3
  },
  {
    id: 30,
    word: 'between',
    phonetic: '/bɪˈtwiːn/',
    meaning: 'میان / بین دو چیز',
    category: 'موقعیت مکانی',
    exampleEn: 'Choose between the two options.',
    exampleFa: 'بین دو گزینه انتخاب کن.',
    lessonId: 3
  },

  // Lesson 4 (31-40)
  {
    id: 31,
    word: 'good',
    phonetic: '/ɡʊd/',
    meaning: 'خوب',
    category: 'کیفیت‌ها',
    exampleEn: 'You have good progress.',
    exampleFa: 'پیشرفت خوبی داری.',
    lessonId: 4
  },
  {
    id: 32,
    word: 'bad',
    phonetic: '/bæd/',
    meaning: 'بد / نامناسب',
    category: 'کیفیت‌ها',
    exampleEn: 'Mistakes are not bad, they teach us.',
    exampleFa: 'اشتباهات بد نیستند، به ما یاد می‌دهند.',
    lessonId: 4
  },
  {
    id: 33,
    word: 'new',
    phonetic: '/nuː/',
    meaning: 'جدید / تازه',
    category: 'ویژگی‌ها',
    exampleEn: 'This is a new method.',
    exampleFa: 'این یک متد جدید است.',
    lessonId: 4
  },
  {
    id: 34,
    word: 'old',
    phonetic: '/oʊld/',
    meaning: 'قدیمی / کهن',
    category: 'ویژگی‌ها',
    exampleEn: 'Wisdom comes from old books.',
    exampleFa: 'حکمت از کتاب‌های قدیمی می‌آید.',
    lessonId: 4
  },
  {
    id: 35,
    word: 'great',
    phonetic: '/ɡreɪt/',
    meaning: 'عالی / شگفت‌انگیز',
    category: 'کیفیت‌ها',
    exampleEn: 'Ogden had a great idea.',
    exampleFa: 'آگدن ایده فوق‌العاده‌ای داشت.',
    lessonId: 4
  },
  {
    id: 36,
    word: 'small',
    phonetic: '/smɔːl/',
    meaning: 'کوچک / اندک',
    category: 'اندازه',
    exampleEn: 'A small group of words is enough.',
    exampleFa: 'گروه کوچکی از کلمات کافی است.',
    lessonId: 4
  },
  {
    id: 37,
    word: 'true',
    phonetic: '/truː/',
    meaning: 'واقعی / درست',
    category: 'حقیقت',
    exampleEn: 'This statement is true.',
    exampleFa: 'این گزاره درست است.',
    lessonId: 4
  },
  {
    id: 38,
    word: 'simple',
    phonetic: '/ˈsɪmpl/',
    meaning: 'ساده / بی‌پیرایه',
    category: 'روش آگدن',
    exampleEn: 'Keep everything simple and clear.',
    exampleFa: 'همه‌چیز را ساده و شفاف نگه دار.',
    lessonId: 4
  },
  {
    id: 39,
    word: 'easy',
    phonetic: '/ˈiːzi/',
    meaning: 'آسان / راحت',
    category: 'یادگیری',
    exampleEn: 'English becomes easy with Ogden.',
    exampleFa: 'انگلیسی با آگدن آسان می‌شود.',
    lessonId: 4
  },
  {
    id: 40,
    word: 'hard',
    phonetic: '/hɑːrd/',
    meaning: 'سخت / نیازمند تلاش',
    category: 'چالش‌ها',
    exampleEn: 'Work hard and stay consistent.',
    exampleFa: 'سخت تلاش کن و ثابت‌قدم بمان.',
    lessonId: 4
  },

  // Lesson 5 (41-50)
  {
    id: 41,
    word: 'person',
    phonetic: '/ˈpɜːrsn/',
    meaning: 'فرد / شخص / انسان',
    category: 'انسان و جامعه',
    exampleEn: 'Every person can learn languages.',
    exampleFa: 'هر فردی می‌تواند زبان بیاموزد.',
    lessonId: 5
  },
  {
    id: 42,
    word: 'word',
    phonetic: '/wɜːrd/',
    meaning: 'کلمه / واژه',
    category: 'زبان و کلمات',
    exampleEn: 'One word can change a mind.',
    exampleFa: 'یک کلمه می‌تواند تفکری را تغییر دهد.',
    lessonId: 5
  },
  {
    id: 43,
    word: 'idea',
    phonetic: '/aɪˈdiːə/',
    meaning: 'ایده / فکر / اندیشه',
    category: 'تفکر',
    exampleEn: 'Share your idea with us.',
    exampleFa: 'ایده خودت را با ما در میان بگذار.',
    lessonId: 5
  },
  {
    id: 44,
    word: 'question',
    phonetic: '/ˈkwestʃən/',
    meaning: 'سوال / پرسش',
    category: 'مکالمه',
    exampleEn: 'Ask questions without hesitation.',
    exampleFa: 'بدون تردید سوال بپرس.',
    lessonId: 5
  },
  {
    id: 45,
    word: 'answer',
    phonetic: '/ˈænsər/',
    meaning: 'پاسخ / جواب',
    category: 'مکالمه',
    exampleEn: 'I know the correct answer.',
    exampleFa: 'من پاسخ صحیح را می‌دانم.',
    lessonId: 5
  },
  {
    id: 46,
    word: 'story',
    phonetic: '/ˈstɔːri/',
    meaning: 'داستان / روایت',
    category: 'روایت',
    exampleEn: 'Tell us a short story.',
    exampleFa: 'برای ما یک داستان کوتاه تعریف کن.',
    lessonId: 5
  },
  {
    id: 47,
    word: 'help',
    phonetic: '/help/',
    meaning: 'کمک / یاری',
    category: 'همکاری',
    exampleEn: 'Can I help you today?',
    exampleFa: 'می‌توانم امروز کمکتان کنم؟',
    lessonId: 5
  },
  {
    id: 48,
    word: 'hope',
    phonetic: '/hoʊp/',
    meaning: 'امید / آرزو',
    category: 'احساسات',
    exampleEn: 'Never lose hope in yourself.',
    exampleFa: 'هرگز امیدت را به خودت از دست نده.',
    lessonId: 5
  },
  {
    id: 49,
    word: 'love',
    phonetic: '/lʌv/',
    meaning: 'عشق / دوست داشتن عمیق',
    category: 'احساسات',
    exampleEn: 'I love learning new words.',
    exampleFa: 'من عاشق یادگیری کلمات جدید هستم.',
    lessonId: 5
  },
  {
    id: 50,
    word: 'way',
    phonetic: '/weɪ/',
    meaning: 'راه / مسیر / روش',
    category: 'مسیر',
    exampleEn: 'This is the Ogden way to fluency.',
    exampleFa: 'این روش آگدن برای تسلط بر زبان است.',
    lessonId: 5
  },
];
