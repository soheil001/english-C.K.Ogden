export interface WordExercise {
  sentence: {
    en: string;
    fa: string;
    hint: string;
  };
  qa: {
    qEn: string;
    qFa: string;
    aEn: string;
    aFa: string;
  };
  story: {
    en: string;
    fa: string;
    hint: string;
  };
  dialogue: {
    personA: string;
    personAFa: string;
    personB: string;
    personBFa: string;
  };
  listen?: {
    prompt: string;
    speed: number;
    tip: string;
  };
  repeat?: {
    target: string;
    phonetic: string;
    tip: string;
  };
}

export interface WordItem {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  category: string;
  emoji: string;
  exercise: WordExercise;
}

export interface CourseClass {
  id: number;
  title: string;
  level: string;
  isUnlocked: boolean;
  badgeText: string;
  wordsCount: number;
  description: string;
}

export const CLASSES_LIST: CourseClass[] = [
  {
    id: 1,
    title: 'کلاس اول',
    level: 'مقدماتی',
    isUnlocked: true,
    badgeText: 'در حال یادگیری',
    wordsCount: 100,
    description: '۱۰۰ کلمه بنیادین و ضروری متد C. K. Ogden همراه با جمله‌سازی و تمرین کامل'
  },
  {
    id: 2,
    title: 'کلاس دوم',
    level: 'مقدماتی',
    isUnlocked: false,
    badgeText: 'به‌زودی',
    wordsCount: 100,
    description: '۱۰۰ کلمه تکمیلی برای ساخت ترکیبات پیچیده‌تر و افعال کاربردی'
  },
  {
    id: 3,
    title: 'کلاس سوم',
    level: 'متوسط',
    isUnlocked: false,
    badgeText: 'به‌زودی',
    wordsCount: 150,
    description: 'واژگان توصیفی، احساسات، محیط کار و ساختارهای بیانی'
  },
  {
    id: 4,
    title: 'کلاس چهارم',
    level: 'متوسط',
    isUnlocked: false,
    badgeText: 'به‌زودی',
    wordsCount: 200,
    description: 'افعال مرکب و عبارات استعاری ساده بر اساس قواعد آگدن'
  },
  {
    id: 5,
    title: 'کلاس پنجم',
    level: 'پیشرفته',
    isUnlocked: false,
    badgeText: 'به‌زودی',
    wordsCount: 300,
    description: 'تسلط کامل بر تمام ۸۵۰ لغت بیسیک انگلیش و روان‌خوانی متن‌های علمی'
  }
];

// Helper to create exercises
function createExercise(
  word: string,
  meaning: string,
  sentenceEn: string,
  sentenceFa: string,
  qEn: string,
  qFa: string,
  aEn: string,
  aFa: string,
  storyEn: string,
  storyFa: string,
  pAEn: string,
  pAFa: string,
  pBEn: string,
  pBFa: string,
  includeAudioSpeaking: boolean = false
): WordExercise {
  const base: WordExercise = {
    sentence: {
      en: sentenceEn,
      fa: sentenceFa,
      hint: `جمله‌ای ساده با «${word}» بسازید؛ مانند: I have a ${word}. یا This ${word} is good.`
    },
    qa: {
      qEn,
      qFa,
      aEn,
      aFa
    },
    story: {
      en: storyEn,
      fa: storyFa,
      hint: `داستانی دو جمله‌ای بنویسید که کلمه «${word}» در آن نقشی کلیدی داشته باشد.`
    },
    dialogue: {
      personA: pAEn,
      personAFa: pAFa,
      personB: pBEn,
      personBFa: pBFa
    }
  };

  if (includeAudioSpeaking) {
    base.listen = {
      prompt: `Focus on the exact pronunciation of '${word}' in everyday conversation.`,
      speed: 0.85,
      tip: `تلفظ روان «${word}» را چندین بار بشنوید و در ذهن تصویرسازی کنید.`
    };
    base.repeat = {
      target: sentenceEn,
      phonetic: `[${word}]`,
      tip: `جمله را با صدای بلند و شمرده تکرار کنید تا ماهیچه‌های گفتاری به لهجه طبیعی عادت کنند.`
    };
  }

  return base;
}

// 100 Foundational Words of Class 1 based on C. K. Ogden Basic English
export const CLASS_1_WORDS: WordItem[] = [
  // 1. book (First 10 words have all 6 exercises)
  {
    id: 1,
    word: 'book',
    phonetic: '/bʊk/',
    meaning: 'کتاب',
    category: 'اشیاء پایه',
    emoji: '📚',
    exercise: createExercise(
      'book', 'کتاب',
      'I have a good book on my table.',
      'من یک کتاب خوب روی میزم دارم.',
      'Where is your English book?',
      'کتاب انگلیسی‌ات کجاست؟',
      'It is in my bag.',
      'آن داخل کیفم است.',
      'A boy opened an old book. Inside the book was a map of a quiet city.',
      'پسری یک کتاب قدیمی را باز کرد. داخل کتاب نقشه‌ای از یک شهر آرام بود.',
      'Can I take your book for one day?',
      'می‌توانم کتابت را برای یک روز بردارم؟',
      'Yes, keep it as long as you need.',
      'بله، تا هر زمان که لازم داری نگهش دار.',
      true
    )
  },
  // 2. house
  {
    id: 2,
    word: 'house',
    phonetic: '/haʊs/',
    meaning: 'خانه / منزل',
    category: 'مکان‌ها',
    emoji: '🏡',
    exercise: createExercise(
      'house', 'خانه',
      'This house has big windows and bright rooms.',
      'این خانه پنجره‌های بزرگ و اتاق‌های روشنی دارد.',
      'Who lives in that white house?',
      'چه کسی در آن خانه سفید زندگی می‌کند؟',
      'My teacher lives in that house.',
      'معلم من در آن خانه زندگی می‌کند.',
      'The little bird built a house in the tree. It was safe from the cold wind.',
      'پرنده کوچک خانه‌ای در درخت ساخت. از باد سرد در امان بود.',
      'Is your house far from the station?',
      'آیا خانه‌ات از ایستگاه دور است؟',
      'No, my house is five minutes away.',
      'خیر، خانه من پنج دقیقه فاصله دارد.',
      true
    )
  },
  // 3. water
  {
    id: 3,
    word: 'water',
    phonetic: '/ˈwɔːtər/',
    meaning: 'آب',
    category: 'نیازهای پایه',
    emoji: '💧',
    exercise: createExercise(
      'water', 'آب',
      'Clean water gives life to every plant.',
      'آب تمیز به هر گیاهی زندگی می‌بخشد.',
      'Do you drink cold water in the morning?',
      'آیا صبح‌ها آب سرد می‌نوشی؟',
      'No, I drink warm water.',
      'خیر، من آب گرم می‌نوشم.',
      'The sun was hot in the valley. They found fresh water near the tall green tree.',
      'خورشید در دره داغ بود. آن‌ها نزدیک درخت بلند سبز آب گوارا پیدا کردند.',
      'Please give me a cup of clean water.',
      'لطفاً به من یک لیوان آب تمیز بدهید.',
      'Here is fresh water for you.',
      'این آب گوارا برای شما.',
      true
    )
  },
  // 4. friend
  {
    id: 4,
    word: 'friend',
    phonetic: '/frend/',
    meaning: 'دوست / یار',
    category: 'روابط انسانی',
    emoji: '🤝',
    exercise: createExercise(
      'friend', 'دوست',
      'A true friend is a great treasure in life.',
      'یک دوست واقعی گنجینه‌ای بزرگ در زندگی است.',
      'How long has she been your friend?',
      'چند وقت است که او دوست توست؟',
      'She has been my friend for ten years.',
      'او به مدت ده سال دوست من بوده است.',
      'Two travelers walked in silence. One said: you are a good friend in hard times.',
      'دو مسافر در سکوت قدم زدند. یکی گفت: تو در روزهای سخت دوستی خوبی هستی.',
      'Are you meeting a friend today?',
      'آیا امروز با دوستی ملاقات می‌کنی؟',
      'Yes, my old friend is coming here.',
      'بله، دوست قدیمی‌ام به اینجا می‌آید.',
      true
    )
  },
  // 5. time
  {
    id: 5,
    word: 'time',
    phonetic: '/taɪm/',
    meaning: 'زمان / وقت',
    category: 'مفاهیم اصلی',
    emoji: '⏱️',
    exercise: createExercise(
      'time', 'زمان',
      'Time is the most precious thing we have.',
      'زمان گران‌بهاترین چیزی است که داریم.',
      'What time do you start your study?',
      'چه زمانی مطالعه‌ات را شروع می‌کنی؟',
      'I start my study at seven in the evening.',
      'من ساعت هفت عصر مطالعه را شروع می‌کنم.',
      'With time, any language becomes clear. Give time to practice every day.',
      'با گذشت زمان، هر زبانی روشن می‌شود. هر روز برای تمرین وقت بگذارید.',
      'Do you have time for a question?',
      'آیا برای یک سوال وقت داری؟',
      'Yes, I have enough time now.',
      'بله، اکنون وقت کافی دارم.',
      true
    )
  },
  // 6. give
  {
    id: 6,
    word: 'give',
    phonetic: '/ɡɪv/',
    meaning: 'دادن',
    category: 'افعال اصلی آگدن',
    emoji: '🎁',
    exercise: createExercise(
      'give', 'دادن',
      'Please give me the key to the door.',
      'لطفاً کلید در را به من بده.',
      'What can you give to help your friend?',
      'چه چیزی می‌توانی برای کمک به دوستت بدهی؟',
      'I give my time and attention.',
      'من زمان و توجه خودم را می‌دهم.',
      'Ogden said: give simple words to the learner. With simple words, ideas grow fast.',
      'آگدن گفت: کلمات ساده را به یادگیرنده بدهید. با کلمات ساده ایده‌ها سریع رشد می‌کنند.',
      'Will you give me an answer today?',
      'آیا امروز به من پاسخ می‌دهی؟',
      'I will give you the answer before noon.',
      'من قبل از ظهر پاسخ را به تو می‌دهم.',
      true
    )
  },
  // 7. take
  {
    id: 7,
    word: 'take',
    phonetic: '/teɪk/',
    meaning: 'برداشتن / گرفتن',
    category: 'افعال اصلی آگدن',
    emoji: '🤲',
    exercise: createExercise(
      'take', 'برداشتن',
      'Take this small step every single day.',
      'هر روز این قدم کوچک را بردار.',
      'Did you take the right train?',
      'آیا قطار درست را سوار شدی؟',
      'Yes, I took the train to the center.',
      'بله، من قطار به سمت مرکز را سوار شدم.',
      'He had to take a difficult decision. In the end, he took the quiet path.',
      'او مجبور بود تصمیمی سخت بگیرد. در پایان، او مسیر آرام را در پیش گرفت.',
      'Please take a seat and rest.',
      'لطفاً بنشینید و استراحت کنید.',
      'Thank you, I will take five minutes.',
      'متشکرم، من پنج دقیقه استراحت خواهم کرد.',
      true
    )
  },
  // 8. come
  {
    id: 8,
    word: 'come',
    phonetic: '/kʌm/',
    meaning: 'آمدن',
    category: 'افعال اصلی آگدن',
    emoji: '🚶',
    exercise: createExercise(
      'come', 'آمدن',
      'Come with me to see the new garden.',
      'با من بیا تا باغ جدید را ببینی.',
      'When will you come to our city?',
      'کی به شهر ما خواهی آمد؟',
      'I will come next month.',
      'من ماه آینده خواهم آمد.',
      'Spring will come after the cold winter. The flowers come out into the light.',
      'بهار پس از زمستان سرد خواهد آمد. گل‌ها به سوی نور بیرون می‌آیند.',
      'Can you come early tomorrow?',
      'می‌توانی فردا زود بیایی؟',
      'Yes, I can come at eight in the morning.',
      'بله، من می‌توانم ساعت هشت صبح بیایم.',
      true
    )
  },
  // 9. go
  {
    id: 9,
    word: 'go',
    phonetic: '/ɡoʊ/',
    meaning: 'رفتن',
    category: 'افعال اصلی آگدن',
    emoji: '🏃',
    exercise: createExercise(
      'go', 'رفتن',
      'We go to learn English step by step.',
      'ما می‌رویم تا گام به گام انگلیسی بیاموزیم.',
      'Where do you go every morning?',
      'هر روز صبح کجا می‌روی؟',
      'I go to my office by bike.',
      'من با دوچرخه به دفتر کارم می‌روم.',
      'The train had to go through the mountain. It will go fast to the open plain.',
      'قطار باید از میان کوه می‌رفت. با سرعت به سمت دشت باز خواهد رفت.',
      'Let us go together right now.',
      'بیا همین الان با هم برویم.',
      'Good idea, let us go before dark.',
      'ایده خوبی است، بیا قبل از تاریکی برویم.',
      true
    )
  },
  // 10. make
  {
    id: 10,
    word: 'make',
    phonetic: '/meɪk/',
    meaning: 'ساختن / درست کردن',
    category: 'افعال اصلی آگدن',
    emoji: '🔨',
    exercise: createExercise(
      'make', 'ساختن',
      'You can make simple sentences with Ogden words.',
      'تو می‌توانی با کلمات آگدن جملات ساده بسازی.',
      'How do you make your daily plan?',
      'چگونه برنامه روزانه‌ات را می‌سازی؟',
      'I make a list on small paper.',
      'من فهرستی روی کاغذی کوچک می‌نویسم.',
      'Two friends wanted to make a boat. They used wood from an old house.',
      'دو دوست می‌خواستند قایقی بسازند. آن‌ها از چوب یک خانه قدیمی استفاده کردند.',
      'Can you make a cup of tea for me?',
      'می‌توانی برای من یک فنجان چای درست کنی؟',
      'Certainly, I will make warm tea now.',
      'حتماً، همین الان چای گرم درست می‌کنم.',
      true
    )
  },

  // 11 to 100: Words 11+ have the 4 Core Generative Exercises (sentence, qa, story, dialogue)
  ...[
    { id: 11, word: 'food', phonetic: '/fuːd/', meaning: 'غذا / خوراک', cat: 'نیازهای پایه', emoji: '🍲', sEn: 'Healthy food gives power to the mind.', sFa: 'غذای سالم به ذهن قدرت می‌بخشد.' },
    { id: 12, word: 'see', phonetic: '/siː/', meaning: 'دیدن / فهمیدن', cat: 'حواس و ادراک', emoji: '👁️', sEn: 'I see the blue sky through the window.', sFa: 'من آسمان آبی را از پنجره می‌بینم.' },
    { id: 13, word: 'get', phonetic: '/ɡet/', meaning: 'به دست آوردن / رسیدن', cat: 'افعال اصلی آگدن', emoji: '🎯', sEn: 'You will get great fluency with Ogden.', sFa: 'تو با متد آگدن به تسلط عالی دست خواهی یافت.' },
    { id: 14, word: 'say', phonetic: '/seɪ/', meaning: 'گفتن', cat: 'گفتار', emoji: '🗣️', sEn: 'Say each new word with a clear voice.', sFa: 'هر کلمه جدید را با صدایی رسا بگو.' },
    { id: 15, word: 'put', phonetic: '/pʊt/', meaning: 'گذاشتن / قرار دادن', cat: 'افعال اصلی آگدن', emoji: '📥', sEn: 'Put the book on the wooden table.', sFa: 'کتاب را روی میز چوبی بگذار.' },
    { id: 16, word: 'keep', phonetic: '/kiːp/', meaning: 'نگه‌داشتن / ادامه دادن', cat: 'افعال اصلی آگدن', emoji: '🔒', sEn: 'Keep your heart peaceful and your mind open.', sFa: 'قلبت را آرام و ذهنت را گشوده نگه دار.' },
    { id: 17, word: 'light', phonetic: '/laɪt/', meaning: 'نور / روشنایی', cat: 'طبیعت و اشیاء', emoji: '💡', sEn: 'Morning light entered the quiet room.', sFa: 'نور صبحگاهی وارد اتاق آرام شد.' },
    { id: 18, word: 'door', phonetic: '/dɔːr/', meaning: 'در / درب', cat: 'اشیاء و مکان‌ها', emoji: '🚪', sEn: 'Open the door to welcome your guests.', sFa: 'در را باز کن تا به مهمانانت خوش‌آمد بگویی.' },
    { id: 19, word: 'day', phonetic: '/deɪ/', meaning: 'روز', cat: 'زمان', emoji: '☀️', sEn: 'Today is a beautiful day to learn.', sFa: 'امروز روز زیبایی برای یادگیری است.' },
    { id: 20, word: 'night', phonetic: '/naɪt/', meaning: 'شب', cat: 'زمان', emoji: '🌙', sEn: 'Stars shine in the dark night sky.', sFa: 'ستارگان در آسمان تاریک شب می‌درخشند.' },
    { id: 21, word: 'good', phonetic: '/ɡʊd/', meaning: 'خوب / نیکو', cat: 'صفت‌ها', emoji: '👍', sEn: 'A good mind creates good actions.', sFa: 'ذهنی خوب، کردارهای خوب خلق می‌کند.' },
    { id: 22, word: 'new', phonetic: '/nuː/', meaning: 'جدید / تازه', cat: 'صفت‌ها', emoji: '✨', sEn: 'Every morning brings a new chance.', sFa: 'هر بامداد فرصتی تازه به همراه می‌آورد.' },
    { id: 23, word: 'man', phonetic: '/mæn/', meaning: 'مرد / انسان', cat: 'انسان و جامعه', emoji: '👨', sEn: 'The wise man spoke with kind words.', sFa: 'مرد خردمند با واژگانی مهربان سخن گفت.' },
    { id: 24, word: 'woman', phonetic: '/ˈwʊmən/', meaning: 'زن / بانو', cat: 'انسان و جامعه', emoji: '👩', sEn: 'The woman showed the way to the library.', sFa: 'آن بانو راه کتابخانه را نشان داد.' },
    { id: 25, word: 'child', phonetic: '/tʃaɪld/', meaning: 'کودک / فرزند', cat: 'انسان و جامعه', emoji: '🧒', sEn: 'Every child loves listening to a story.', sFa: 'هر کودکی عاشق گوش دادن به داستان است.' },
    { id: 26, word: 'hand', phonetic: '/hænd/', meaning: 'دست', cat: 'بدن انسان', emoji: '✋', sEn: 'Give me your hand and walk with me.', sFa: 'دستت را به من بده و با من قدم بزن.' },
    { id: 27, word: 'eye', phonetic: '/aɪ/', meaning: 'چشم', cat: 'بدن انسان', emoji: '👁️', sEn: 'Look at this picture with an open eye.', sFa: 'با چشمی باز به این تصویر نگاه کن.' },
    { id: 28, word: 'ear', phonetic: '/ɪr/', meaning: 'گوش', cat: 'بدن انسان', emoji: '👂', sEn: 'Give your ear to the native pronunciation.', sFa: 'گوش جان به تلفظ اصیل بسپار.' },
    { id: 29, word: 'head', phonetic: '/hed/', meaning: 'سر / رئیس', cat: 'بدن و مفاهیم', emoji: '🧠', sEn: 'Keep a calm head during tests.', sFa: 'در طول آزمون‌ها سری آرام داشته باش.' },
    { id: 30, word: 'heart', phonetic: '/hɑːrt/', meaning: 'قلب / دل', cat: 'بدن و احساسات', emoji: '❤️', sEn: 'Learn with a warm and patient heart.', sFa: 'با قلبی گرم و صبور یاد بگیر.' },
    { id: 31, word: 'word', phonetic: '/wɜːrd/', meaning: 'کلمه / واژه', cat: 'زبان و سخن', emoji: '🔤', sEn: 'One simple word can change a mind.', sFa: 'یک کلمه ساده می‌تواند ذهنی را دگرگون سازد.' },
    { id: 32, word: 'name', phonetic: '/neɪm/', meaning: 'نام / اسم', cat: 'شناسه‌ها', emoji: '🏷️', sEn: 'What is your name, please?', sFa: 'نام شما چیست، لطفاً؟' },
    { id: 33, word: 'place', phonetic: '/pleɪs/', meaning: 'مکان / جا', cat: 'مفاهیم فضا', emoji: '📍', sEn: 'This library is a quiet place to read.', sFa: 'این کتابخانه مکانی آرام برای خواندن است.' },
    { id: 34, word: 'room', phonetic: '/ruːm/', meaning: 'اتاق / فضا', cat: 'مکان‌ها', emoji: '🛋️', sEn: 'My study room has warm sunlight.', sFa: 'اتاق مطالعه من نور گرم خورشید دارد.' },
    { id: 35, word: 'table', phonetic: '/ˈteɪbl/', meaning: 'میز', cat: 'اشیاء', emoji: '🪑', sEn: 'Place your notebook on the table.', sFa: 'دفترت را روی میز قرار بده.' },
    { id: 36, word: 'tree', phonetic: '/triː/', meaning: 'درخت', cat: 'طبیعت', emoji: '🌳', sEn: 'The big green tree gives sweet shadow.', sFa: 'درخت بزرگ سبز سایه‌ای دلپذیر می‌بخشد.' },
    { id: 37, word: 'sun', phonetic: '/sʌn/', meaning: 'خورشید / آفتاب', cat: 'طبیعت', emoji: '☀️', sEn: 'The sun brings warmth to the earth.', sFa: 'خورشید گرما را به زمین می‌آورد.' },
    { id: 38, word: 'moon', phonetic: '/muːn/', meaning: 'ماه', cat: 'طبیعت', emoji: '🌕', sEn: 'The full moon shines silver in the dark.', sFa: 'ماه بدر در تاریکی سیمین‌فام می‌درخشد.' },
    { id: 39, word: 'star', phonetic: '/stɑːr/', meaning: 'ستاره', cat: 'طبیعت', emoji: '⭐', sEn: 'Every star tells a distant story.', sFa: 'هر ستاره داستانی از دوردست‌ها بازمی‌گوید.' },
    { id: 40, word: 'sky', phonetic: '/skaɪ/', meaning: 'آسمان', cat: 'طبیعت', emoji: '🌌', sEn: 'The clear blue sky has no clouds today.', sFa: 'آسمان آبی و زلال امروز هیچ ابری ندارد.' },
    { id: 41, word: 'fire', phonetic: '/ˈfaɪər/', meaning: 'آتش', cat: 'طبیعت و عناصر', emoji: '🔥', sEn: 'The warm fire gave comfort.', sFa: 'آتش گرم آرامش بخشید.' },
    { id: 42, word: 'earth', phonetic: '/ɜːrθ/', meaning: 'زمین / خاک', cat: 'طبیعت', emoji: '🌍', sEn: 'We care for the green earth.', sFa: 'ما مراقب زمین سبز هستیم.' },
    { id: 43, word: 'wind', phonetic: '/wɪnd/', meaning: 'باد / نسیم', cat: 'طبیعت', emoji: '💨', sEn: 'A gentle wind moved the leaves.', sFa: 'نسیمی ملایم برگ‌ها را تکان داد.' },
    { id: 44, word: 'sea', phonetic: '/siː/', meaning: 'دریا', cat: 'طبیعت', emoji: '🌊', sEn: 'The sea was calm and blue.', sFa: 'دریا آرام و آبی بود.' },
    { id: 45, word: 'river', phonetic: '/ˈrɪvər/', meaning: 'رودخانه', cat: 'طبیعت', emoji: '🏞️', sEn: 'Clean water flows in the river.', sFa: 'آب زلال در رودخانه روان است.' },
    { id: 46, word: 'road', phonetic: '/roʊd/', meaning: 'جاده / راه', cat: 'مکان‌ها', emoji: '🛣️', sEn: 'Follow this long road to the town.', sFa: 'این جاده طولانی را تا شهر دنبال کن.' },
    { id: 47, word: 'city', phonetic: '/ˈsɪti/', meaning: 'شهر', cat: 'مکان‌ها', emoji: '🏙️', sEn: 'The city has libraries and parks.', sFa: 'شهر کتابخانه‌ها و بوستان‌ها دارد.' },
    { id: 48, word: 'country', phonetic: '/ˈkʌntri/', meaning: 'کشور / روستا', cat: 'مکان‌ها', emoji: '🗺️', sEn: 'People from every country can learn.', sFa: 'مردم از هر کشوری می‌توانند بیاموزند.' },
    { id: 49, word: 'school', phonetic: '/skuːl/', meaning: 'مدرسه', cat: 'آموزش', emoji: '🏫', sEn: 'School is a temple of knowledge.', sFa: 'مدرسه معبد دانش است.' },
    { id: 50, word: 'story', phonetic: '/ˈstɔːri/', meaning: 'داستان', cat: 'زبان و ادبیات', emoji: '📖', sEn: 'Tell me an interesting story.', sFa: 'داستانی جالب برایم بازگو کن.' },
    { id: 51, word: 'question', phonetic: '/ˈkwestʃən/', meaning: 'سوال / پرسش', cat: 'گفت‌وگو', emoji: '❓', sEn: 'Ask any question you have.', sFa: 'هر سوالی داری بپرس.' },
    { id: 52, word: 'answer', phonetic: '/ˈænsər/', meaning: 'پاسخ / جواب', cat: 'گفت‌وگو', emoji: '💡', sEn: 'Find the simple answer in the book.', sFa: 'پاسخ ساده را در کتاب بیاب.' },
    { id: 53, word: 'help', phonetic: '/help/', meaning: 'کمک / یاری', cat: 'ارتباط', emoji: '🆘', sEn: 'Can you help me with this word?', sFa: 'می‌توانی در این کلمه به من کمک کنی؟' },
    { id: 54, word: 'work', phonetic: '/wɜːrk/', meaning: 'کار / فعالیت', cat: 'زندگی', emoji: '💼', sEn: 'Honest work brings good peace.', sFa: 'کار صادقانه آرامش نیکو می‌آورد.' },
    { id: 55, word: 'play', phonetic: '/pleɪ/', meaning: 'بازی کردن / نواختن', cat: 'فعالیت', emoji: '🎮', sEn: 'Children play in the sunshine.', sFa: 'کودکان در روشنایی آفتاب بازی می‌کنند.' },
    { id: 56, word: 'learn', phonetic: '/lɜːrn/', meaning: 'یاد گرفتن', cat: 'آموزش', emoji: '🎓', sEn: 'Learn with joy every single morning.', sFa: 'هر بامداد با شادی بیاموز.' },
    { id: 57, word: 'read', phonetic: '/riːd/', meaning: 'خواندن', cat: 'آموزش', emoji: '👓', sEn: 'Read words aloud to hear your voice.', sFa: 'کلمات را بلند بخوان تا صدایت را بشنوی.' },
    { id: 58, word: 'write', phonetic: '/raɪt/', meaning: 'نوشتن', cat: 'آموزش', emoji: '✍️', sEn: 'Write the meaning in your notebook.', sFa: 'معنی را در دفترچه‌ات بنویس.' },
    { id: 59, word: 'listen', phonetic: '/ˈlɪsn/', meaning: 'گوش دادن', cat: 'ارتباط', emoji: '🎧', sEn: 'Listen to the sound of each word.', sFa: 'به آوای هر کلمه گوش فرا ده.' },
    { id: 60, word: 'speak', phonetic: '/spiːk/', meaning: 'صحبت کردن', cat: 'ارتباط', emoji: '🗣️', sEn: 'Speak English with confidence.', sFa: 'با اعتماد به نفس انگلیسی صحبت کن.' },
    { id: 61, word: 'love', phonetic: '/lʌv/', meaning: 'عشق / دوست داشتن', cat: 'احساسات', emoji: '💖', sEn: 'I love learning languages.', sFa: 'من عاشق یادگیری زبان‌ها هستم.' },
    { id: 62, word: 'hope', phonetic: '/hoʊp/', meaning: 'امید', cat: 'احساسات', emoji: '🌱', sEn: 'There is always hope for tomorrow.', sFa: 'همواره برای فردا امید هست.' },
    { id: 63, word: 'peace', phonetic: '/piːs/', meaning: 'صلح / آرامش', cat: 'مفاهیم والا', emoji: '🕊️', sEn: 'Ogden designed English for world peace.', sFa: 'آگدن انگلیسی را برای صلح جهانی طراحی کرد.' },
    { id: 64, word: 'mind', phonetic: '/maɪnd/', meaning: 'ذهن / اندیشه', cat: 'فکر', emoji: '🧠', sEn: 'Keep an open and curious mind.', sFa: 'ذهنی باز و کنجکاو داشته باش.' },
    { id: 65, word: 'idea', phonetic: '/aɪˈdiːə/', meaning: 'ایده / فکر', cat: 'فکر', emoji: '💡', sEn: 'Basic English is a brilliant idea.', sFa: 'بیسیک انگلیش ایده‌ای درخشان است.' },
    { id: 66, word: 'way', phonetic: '/weɪ/', meaning: 'راه / روش', cat: 'مسیر', emoji: '🧭', sEn: 'Practice is the true way to succeed.', sFa: 'تمرین راه واقعی رسیدن به موفقیت است.' },
    { id: 67, word: 'step', phonetic: '/step/', meaning: 'قدم / گام', cat: 'حرکت', emoji: '👣', sEn: 'Take one step forward every day.', sFa: 'هر روز یک قدم به پیش بردار.' },
    { id: 68, word: 'start', phonetic: '/stɑːrt/', meaning: 'شروع کردن', cat: 'حرکت', emoji: '🚀', sEn: 'Start your lesson right now.', sFa: 'درست همین الان درستان را شروع کنید.' },
    { id: 69, word: 'stop', phonetic: '/stɑːp/', meaning: 'ایستادن / توقف', cat: 'حرکت', emoji: '🛑', sEn: 'Never stop learning new words.', sFa: 'هرگز یادگیری کلمات جدید را متوقف نکن.' },
    { id: 70, word: 'open', phonetic: '/ˈoʊpən/', meaning: 'باز کردن / گشوده', cat: 'حالت', emoji: '🔓', sEn: 'Open your eyes to new knowledge.', sFa: 'چشمانت را به سوی دانشی نو بگشای.' },
    { id: 71, word: 'close', phonetic: '/kloʊz/', meaning: 'بستن / نزدیک', cat: 'حالت', emoji: '🔐', sEn: 'Close the door before leaving.', sFa: 'قبل از رفتن در را ببند.' },
    { id: 72, word: 'in', phonetic: '/ɪn/', meaning: 'در / داخل', cat: 'حروف اضافه', emoji: '📥', sEn: 'The book is in my hand.', sFa: 'کتاب در دست من است.' },
    { id: 73, word: 'out', phonetic: '/aʊt/', meaning: 'بیرون / خارج', cat: 'حروف اضافه', emoji: '📤', sEn: 'Walk out into the fresh air.', sFa: 'به بیرون در هوای تازه قدم بگذار.' },
    { id: 74, word: 'on', phonetic: '/ɑːn/', meaning: 'روی / بر فراز', cat: 'حروف اضافه', emoji: '🔛', sEn: 'Put the cup on the table.', sFa: 'فنجان را روی میز بگذار.' },
    { id: 75, word: 'under', phonetic: '/ˈʌndər/', meaning: 'زیر / پایین', cat: 'حروف اضافه', emoji: '👇', sEn: 'The cat rests under the chair.', sFa: 'گربه زیر صندلی استراحت می‌کند.' },
    { id: 76, word: 'with', phonetic: '/wɪð/', meaning: 'با / به همراه', cat: 'حروف اضافه', emoji: '🔗', sEn: 'Come with me to study.', sFa: 'برای مطالعه با من بیا.' },
    { id: 77, word: 'from', phonetic: '/frʌm/', meaning: 'از / مبدأ', cat: 'حروف اضافه', emoji: '🛫', sEn: 'Start from the first word.', sFa: 'از نخستین کلمه آغاز کن.' },
    { id: 78, word: 'to', phonetic: '/tuː/', meaning: 'به / به سوی', cat: 'حروف اضافه', emoji: '➡️', sEn: 'Go to the next lesson.', sFa: 'به درس بعدی برو.' },
    { id: 79, word: 'up', phonetic: '/ʌp/', meaning: 'بالا', cat: 'جهت‌ها', emoji: '⬆️', sEn: 'Look up at the blue sky.', sFa: 'به آسمان آبی بالا بنگر.' },
    { id: 80, word: 'down', phonetic: '/daʊn/', meaning: 'پایین', cat: 'جهت‌ها', emoji: '⬇️', sEn: 'Sit down and take a rest.', sFa: 'بنشین و استراحت کن.' },
    { id: 81, word: 'before', phonetic: '/bɪˈfɔːr/', meaning: 'قبل از / پیش از', cat: 'زمان', emoji: '⏮️', sEn: 'Think before you speak.', sFa: 'قبل از سخن گفتن بیندیش.' },
    { id: 82, word: 'after', phonetic: '/ˈæftər/', meaning: 'بعد از / پس از', cat: 'زمان', emoji: '⏭️', sEn: 'Rest after your study time.', sFa: 'پس از زمان مطالعه‌ات استراحت کن.' },
    { id: 83, word: 'now', phonetic: '/naʊ/', meaning: 'اکنون / حالا', cat: 'زمان', emoji: '⌛', sEn: 'The best time to learn is now.', sFa: 'بهترین زمان برای آموختن هم‌اکنون است.' },
    { id: 84, word: 'then', phonetic: '/ðen/', meaning: 'سپس / آنگاه', cat: 'زمان', emoji: '⏳', sEn: 'First listen, then speak aloud.', sFa: 'نخست گوش بده، سپس بلند بگو.' },
    { id: 85, word: 'here', phonetic: '/hɪr/', meaning: 'اینجا', cat: 'مکان', emoji: '📍', sEn: 'We are here to learn together.', sFa: 'ما اینجا هستیم تا با هم بیاموزیم.' },
    { id: 86, word: 'there', phonetic: '/ðer/', meaning: 'آنجا', cat: 'مکان', emoji: '👉', sEn: 'Look over there at the mountain.', sFa: 'آن سو به کوهستان نگاه کن.' },
    { id: 87, word: 'all', phonetic: '/ɔːl/', meaning: 'همه / تمام', cat: 'کمیت', emoji: '🌐', sEn: 'All one hundred words are useful.', sFa: 'تمام صد کلمه کاربردی هستند.' },
    { id: 88, word: 'some', phonetic: '/sʌm/', meaning: 'مقداری / برخی', cat: 'کمیت', emoji: '⚖️', sEn: 'Give me some clean water.', sFa: 'مقداری آب تمیز به من بده.' },
    { id: 89, word: 'no', phonetic: '/noʊ/', meaning: 'نه / هیچ', cat: 'منفی', emoji: '🚫', sEn: 'No task is hard with patience.', sFa: 'هیچ کاری با بردباری سخت نیست.' },
    { id: 90, word: 'yes', phonetic: '/jes/', meaning: 'بله / آری', cat: 'مثبت', emoji: '✅', sEn: 'Yes, you can speak English.', sFa: 'بله، تو می‌توانی انگلیسی صحبت کنی.' },
    { id: 91, word: 'small', phonetic: '/smɔːl/', meaning: 'کوچک', cat: 'اندازه', emoji: '🔹', sEn: 'A small word has great power.', sFa: 'کلمه‌ای کوچک قدرتی بزرگ دارد.' },
    { id: 92, word: 'big', phonetic: '/bɪɡ/', meaning: 'بزرگ', cat: 'اندازه', emoji: '🔷', sEn: 'This house has a big window.', sFa: 'این خانه پنجره‌ای بزرگ دارد.' },
    { id: 93, word: 'long', phonetic: '/lɔːŋ/', meaning: 'طولانی / دراز', cat: 'اندازه', emoji: '📏', sEn: 'A long journey begins with a step.', sFa: 'سفری دراز با یک گام آغاز می‌شود.' },
    { id: 94, word: 'short', phonetic: '/ʃɔːrt/', meaning: 'کوتاه', cat: 'اندازه', emoji: '📐', sEn: 'Make short and clear sentences.', sFa: 'جملاتی کوتاه و روشن بساز.' },
    { id: 95, word: 'fast', phonetic: '/fæst/', meaning: 'سریع / تند', cat: 'سرعت', emoji: '⚡', sEn: 'Do not go too fast, stay steady.', sFa: 'بیش از حد سریع مرو، پیوسته بمان.' },
    { id: 96, word: 'slow', phonetic: '/sloʊ/', meaning: 'آرام / آهسته', cat: 'سرعت', emoji: '🐢', sEn: 'Slow learning builds strong roots.', sFa: 'یادگیری آرام ریشه‌هایی نیرومند می‌سازد.' },
    { id: 97, word: 'easy', phonetic: '/ˈiːzi/', meaning: 'آسان / راحت', cat: 'کیفیت', emoji: '✨', sEn: 'English is easy with Ogden.', sFa: 'انگلیسی با آگدن آسان است.' },
    { id: 98, word: 'hard', phonetic: '/hɑːrd/', meaning: 'سخت / کوشا', cat: 'کیفیت', emoji: '🧗', sEn: 'Work hard and believe in yourself.', sFa: 'سخت بکوش و به خودت باور داشته باش.' },
    { id: 99, word: 'true', phonetic: '/truː/', meaning: 'درست / واقعی', cat: 'حقیقت', emoji: '💎', sEn: 'Speak words that are true and kind.', sFa: 'کلماتی بگو که راستین و مهربان باشند.' },
    { id: 100, word: 'simple', phonetic: '/ˈsɪmpl/', meaning: 'ساده / بی‌پیرایه', cat: 'روش آگدن', emoji: '🎯', sEn: 'Simple words unlock the world.', sFa: 'کلمات ساده کلید گشودن جهانند.' },
  ].map((item) => ({
    id: item.id,
    word: item.word,
    phonetic: item.phonetic,
    meaning: item.meaning,
    category: item.cat,
    emoji: item.emoji,
    exercise: createExercise(
      item.word, item.meaning,
      item.sEn, item.sFa,
      `How do you use the word '${item.word}'?`,
      `چگونه از کلمه «${item.word}» استفاده می‌کنی؟`,
      `We use '${item.word}' in everyday talk.`,
      `ما از «${item.word}» در مکالمات روزمره استفاده می‌کنیم.`,
      `In the quiet village of words, '${item.word}' had an important place. Everyone who spoke used '${item.word}' with confidence.`,
      `در دهکده آرام کلمات، «${item.word}» جایگاهی مهم داشت. هر کس سخن می‌گفت با اعتمادبه‌نفس از «${item.word}» استفاده می‌کرد.`,
      `Can you say '${item.word}' one more time?`,
      `می‌توانی «${item.word}» را یک بار دیگر بگویی؟`,
      `Yes, listen: '${item.word}'.`,
      `بله، گوش کن: «${item.word}».`,
      false // Words 11+ have 4 exercises
    )
  }))
];
