import type { Language } from './languageContext';
import { Milk, Baby, Award, Sparkles, Sprout, Layers, ShieldCheck, GraduationCap, Users, HeartHandshake, Briefcase } from 'lucide-react';

export interface CarouselProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  idealFor: string;
  form?: string;
  src: string;
  bg: string;
  panel: string;
  scale?: number;
}

export interface StoreCategory {
  title: string;
  subtitle: string;
  image: string;
  filterKey: string;
}

export interface StoreProduct {
  name: string;
  subtitle: string;
  category: string;
  description: string;
  idealFor: string;
  form: string;
  packaging: string;
  variants: string[];
  variantPrices: Record<string, number>;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  usage: string;
  importantNote?: string;
  deliveryNote?: string;
}

export interface DiscoverItem {
  name: string;
  subtitle: string;
  category: string;
  desc: string;
  idealFor: string;
  form: string;
  packaging: string;
  image: string;
  highlights: string[];
  usage: string;
  importantNote?: string;
  deliveryNote?: string;
}

export interface DiscoverSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  badgeColor: string;
  items: DiscoverItem[];
}

export interface AboutWhyChoose {
  title: string;
  description: string;
  icon: any;
}

export interface AboutCategory {
  title: string;
  description: string;
  icon: any;
  color: string;
}

// ------------------------------------------------------------------------------------------------
// 1. CAROUSEL PRODUCTS
// ------------------------------------------------------------------------------------------------
export function getCarouselProducts(lang: Language): CarouselProduct[] {
  if (lang === 'mr') {
    return [
      {
        id: 'milk-max',
        name: 'मिल्क मॅक्स',
        subtitle: 'दुभत्या जनावरांसाठी लिक्विड कॅल्शियम सप्लिमेंट',
        description:
          'मिल्क मॅक्स / मिल्कियाणा हे दुभत्या गायी व म्हशींच्या कॅल्शियमच्या गरजा पूर्ण करण्यासाठी आणि दुग्धोत्पादनाच्या काळात दूध व फॅट वाढवण्यासाठी उत्कृष्ट पूरक आहार आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'द्रवरूप (लिक्विड)',
        src: '/milk1.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'sarki-pend',
        name: 'दुग्धसमृद्धी सरकी पेंड',
        subtitle: 'दुभत्या जनावरांसाठी पौष्टिक पशुखाद्य',
        description:
          'दुग्धसमृद्धी सरकी पेंड हे दुग्ध उत्पादक शेतकऱ्यांसाठी संतुलित पोषण देणारे आणि दुधातील फॅट व एसएनएफ वाढवणारे सर्वोत्तम दर्जेदार पशुखाद्य आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'पेंड / गोळी',
        src: '/sarkhi.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
        scale: 1.35,
      },
      {
        id: 'navmin',
        name: 'नवमिन',
        subtitle: 'चिलेटेड खनिज व पोषक मिश्रण',
        description:
          'नवमिन हे जनावरांमधील खनिजांची कमतरता दूर करून रोगप्रतिकारशक्ती आणि प्रजनन क्षमता सुधारण्यासाठी तयार केलेले उच्च दर्जाचे चिलेटेड खनिज मिश्रण आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी • 🐐 शेळ्या',
        form: 'चिलेटेड पावडर',
        src: '/navmin.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'fat-max',
        name: 'फॅट मॅक्स',
        subtitle: 'दुधातील फॅट व डिग्री वाढवणारे सप्लिमेंट',
        description:
          'फॅट मॅक्स हे दुधातील फॅटची टक्केवारी आणि दुग्ध उत्पादन वाढवण्यासाठी गोठ्यामध्ये नियमित वापरले जाणारे विशेष पोषक आहार सप्लिमेंट आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'पावडर',
        src: '/fatmax.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'garbha-care',
        name: 'गर्भ केअर',
        subtitle: 'गाभण जनावरांची काळजी व गर्भाशय टॉनिक',
        description:
          'गर्भ केअर हे जनावरांच्या विताना गर्भाशयाची स्वच्छता, गर्भाची निरोगी वाढ आणि विल्यानंतर होणारा त्रास कमी करणारे गुणकारी टॉनिक आहे.',
        idealFor: '🐄 गाभण गायी • 🐃 गाभण म्हशी',
        form: 'लिक्विड टॉनिक',
        src: '/garbhaCare.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'grow-max',
        name: 'ग्रो मॅक्स',
        subtitle: 'वासरांच्या वाढीसाठी व वजनवाढीसाठी पावडर',
        description:
          'ग्रो मॅक्स लहान वासरांची योग्य वाढ, पचनक्रिया आणि स्नायूंचा विकास जलद करून त्यांना निरोगी व धष्टपुष्ट बनवण्यासाठी अत्यंत उपयुक्त आहे.',
        idealFor: '🐮 वासरे • 🐄 लहान जनावरे',
        form: 'पावडर',
        src: '/growmax.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'heat-max',
        name: 'हिट मॅक्स',
        subtitle: 'जनावरांना वेळेवर माजावर आणणारे सप्लिमेंट',
        description:
          'हिट मॅक्स जीवनसत्त्वे व खनिजांनी समृद्ध असून उलटणाऱ्या जनावरांना वेळेवर माजावर आणण्यास आणि गर्भधारणा क्षमता वाढवण्यास मदत करते.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'गोळी / पावडर',
        src: '/heatmax.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'mast-guard',
        name: 'मस्ट गार्ड',
        subtitle: 'कासदाह (मस्टायटिस) पासून संरक्षण',
        description:
          'मस्ट गार्ड हे कासदाह प्रतिबंध, कासेचे आरोग्य आणि दुधाची स्वच्छता टिकवून ठेवण्यासाठी रोगप्रतिकारक शक्ती वाढवणारे सप्लिमेंट आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'पावडर / मलम',
        src: '/mastguard.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
    ];
  }

  if (lang === 'hi') {
    return [
      {
        id: 'milk-max',
        name: 'मिल्क मैक्स',
        subtitle: 'दुधारू पशुओं के लिए लिक्विड कैल्शियम सप्लीमेंट',
        description:
          'मिल्क मैक्स / मिल्कियाणा दुधारू गायों और भैंसों की कैल्शियम की जरूरतों को पूरा करने और दूध व फैट उत्पादन बढ़ाने वाला बेहतरीन पूरक आहार है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'तरल (लिक्विड)',
        src: '/milk1.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'sarki-pend',
        name: 'दुग्धसमृद्धि सरकी खली',
        subtitle: 'दुधारू पशुओं के लिए पौष्टिक पशु आहार',
        description:
          'दुग्धसमृद्धि सरकी खली (पेंड) डेयरी किसानों के लिए संतुलित पोषण और दूध में फैट व एसएनएफ बढ़ाने वाला प्रीमियम पशु आहार है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'खली / पेलेट',
        src: '/sarkhi.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
        scale: 1.35,
      },
      {
        id: 'navmin',
        name: 'नवमिन',
        subtitle: 'चिलेटेड खनिज एवं पोषण मिश्रण',
        description:
          'नवमिन पशुओं में पोषक तत्वों व खनिजों की कमी को दूर करके रोग प्रतिरोधक क्षमता और प्रजनन स्वास्थ्य सुधारने वाला चिलेटेड मिनरल मिक्सचर है।',
        idealFor: '🐄 गायें • 🐃 भैंसें • 🐐 बकरियां',
        form: 'चिलेटेड पाउडर',
        src: '/navmin.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'fat-max',
        name: 'फैट मैक्स',
        subtitle: 'दूध में फैट व डिग्री बढ़ाने वाला सप्लीमेंट',
        description:
          'फैट मैक्स दुधारू पशुओं के दूध में फैट प्रतिशत और उत्पादन क्षमता को बढ़ाने के लिए तैयार किया गया विशेष पोषण पूरक है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'पाउडर',
        src: '/fatmax.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'garbha-care',
        name: 'गर्भ केयर',
        subtitle: 'गर्भवती पशुओं की देखभाल व गर्भाशय टॉनिक',
        description:
          'गर्भ केयर प्रसव के बाद गर्भाशय की सफाई, गर्भ की स्वस्थ वृद्धि और प्रसव संबंधी समस्याओं को दूर करने वाला असरदार टॉनिक है।',
        idealFor: '🐄 गर्भवती गायें • 🐃 गर्भवती भैंसें',
        form: 'लिक्विड टॉनिक',
        src: '/garbhaCare.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'grow-max',
        name: 'ग्रो मैक्स',
        subtitle: 'बछड़ों के विकास और वजन वृद्धि के लिए',
        description:
          'ग्रो मैक्स छोटे बछड़ों के उचित विकास, पाचन तंत्र और मांसपेशियों की मजबूती के लिए एक बेहतरीन ग्रोथ प्रमोटर है।',
        idealFor: '🐮 बछड़े • 🐄 छोटे पशु',
        form: 'पाउडर',
        src: '/growmax.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'heat-max',
        name: 'हीट मैक्स',
        subtitle: 'पशुओं को समय पर हीट (मद) में लाने हेतु',
        description:
          'हीट मैक्स विटामिन और खनिजों से भरपूर है जो बार-बार फिरने वाले पशुओं को समय पर हीट में लाने और गर्भाधान दर बढ़ाने में मदद करता है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'बोलस / पाउडर',
        src: '/heatmax.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
      {
        id: 'mast-guard',
        name: 'मस्ट गार्ड',
        subtitle: 'थनैला (मस्टाइटिस) से बचाव एवं अडर केयर',
        description:
          'मस्ट गार्ड थनैला रोग की रोकथाम, अयन (लेवटी) के स्वास्थ्य और दूध की शुद्धता बनाए रखने के लिए रोग प्रतिरोधक क्षमता बढ़ाता है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'पाउडर / मलहम',
        src: '/mastguard.png',
        bg: '#6BBF7A',
        panel: '#85CC92',
      },
    ];
  }

  // English fallback
  return [
    {
      id: 'milk-max',
      name: 'Milk Max',
      subtitle: 'Calcium Supplement for Dairy Animals',
      description:
        'MilkMax / Milkiyana is a calcium supplement designed to support the nutritional requirements of dairy animals, particularly during important stages of the lactation cycle.',
      idealFor: '🐄 Cows • 🐃 Buffaloes',
      form: 'Liquid',
      src: '/milk1.png',
      bg: '#6BBF7A',
      panel: '#85CC92',
    },
    {
      id: 'sarki-pend',
      name: 'Dugdhsamrudhi Sarki Pend',
      subtitle: 'Cattle Feed for Dairy Animals',
      description:
        'Dugdhsamrudhi Sarki Pend is a cattle feed solution designed for dairy farmers looking to provide balanced nutritional support to their milking animals.',
      idealFor: '🐄 Cows • 🐃 Buffaloes',
      form: 'Solid Cake',
      src: '/sarkhi.png',
      bg: '#6BBF7A',
      panel: '#85CC92',
      scale: 1.35,
    },
    {
      id: 'navmin',
      name: 'NavMin',
      subtitle: 'Mineral & Nutritional Supplement',
      description:
        "NavMin is a mineral and nutritional supplement designed to support the nutritional requirements of dairy animals. It can be incorporated into a suitable livestock nutrition program based on the animal's requirements and professional guidance.",
      idealFor: '🐄 Cows • 🐃 Buffaloes • 🐐 Goats',
      form: 'Chelated Mineral Powder',
      src: '/navmin.png',
      bg: '#6BBF7A',
      panel: '#85CC92',
    },
    {
      id: 'fat-max',
      name: 'FatMax',
      subtitle: 'Milk Fat Booster Supplement',
      description:
        'FatMax is a specialized nutritional supplement designed for dairy animals as part of a balanced feeding program to optimize milk fat percentage and yield.',
      idealFor: '🐄 Cows • 🐃 Buffaloes',
      form: 'Powder',
      src: '/fatmax.png',
      bg: '#6BBF7A',
      panel: '#85CC92',
    },
    {
      id: 'garbha-care',
      name: 'Garbha Care',
      subtitle: 'Uterine & Pregnancy Care Supplement',
      description:
        'Garbha Care is a specialized tonic formulated to support uterine health, post-calving cleansing, and overall pregnancy wellness in dairy animals.',
      idealFor: '🐄 Cows • 🐃 Buffaloes',
      form: 'Liquid Tonic',
      src: '/garbhaCare.png',
      bg: '#6BBF7A',
      panel: '#85CC92',
    },
    {
      id: 'grow-max',
      name: 'Grow Max',
      subtitle: 'Calf Growth & Muscle Development',
      description:
        'Grow Max is a growth promoter and weight-gain supplement for calves and young cattle, supporting early muscle development and gut digestion.',
      idealFor: '🐄 Calves • 🐃 Young Cattle',
      form: 'Powder',
      src: '/growmax.png',
      bg: '#6BBF7A',
      panel: '#85CC92',
    },
    {
      id: 'heat-max',
      name: 'Heat Max',
      subtitle: 'Advanced Estrous & Reproductive Booster',
      description:
        'Heat Max is an advanced reproductive formulation enriched with vitamins and chelated minerals to induce timely heat and optimize breeding results.',
      idealFor: '🐄 Cows • 🐃 Buffaloes',
      form: 'Bolus / Powder Pack',
      src: '/heatmax.png',
      bg: '#6BBF7A',
      panel: '#85CC92',
    },
    {
      id: 'mast-guard',
      name: 'Mast Guard',
      subtitle: 'Udder Care & Mastitis Protection',
      description:
        'Mast Guard is an udder immunity and tissue recovery supplement designed to protect against mastitis, support teat health, and preserve milk purity.',
      idealFor: '🐄 Cows • 🐃 Buffaloes',
      form: 'Powder / Ointment',
      src: '/mastguard.png',
      bg: '#6BBF7A',
      panel: '#85CC92',
    },
  ];
}

// ------------------------------------------------------------------------------------------------
// 2. STORE CATEGORIES
// ------------------------------------------------------------------------------------------------
export function getStoreCategories(lang: Language): StoreCategory[] {
  if (lang === 'mr') {
    return [
      {
        title: 'पशुखाद्य',
        subtitle: 'दुग्धसमृद्धी सरकी पेंड',
        image: '/sarkhi.png',
        filterKey: 'Cattle Feed',
      },
      {
        title: 'लिक्विड कॅल्शियम',
        subtitle: 'मिल्क मॅक्स कॅल्शियम सप्लिमेंट',
        image: '/milk1.png',
        filterKey: 'Calcium Supplement',
      },
      {
        title: 'चिलेटेड खनिजे',
        subtitle: 'नवमिन मिनरल मिक्श्चर',
        image: '/navmin.png',
        filterKey: 'Chelated Minerals',
      },
      {
        title: 'मका मुरघास',
        subtitle: 'अ‍ॅडव्हांटा ७५६ क्वालिटी सायलेज',
        image: '/Makka_Sailage.png',
        filterKey: 'Fermented Silage',
      },
    ];
  }

  if (lang === 'hi') {
    return [
      {
        title: 'पशु आहार',
        subtitle: 'दुग्धसमृद्धि सरकी खली',
        image: '/sarkhi.png',
        filterKey: 'Cattle Feed',
      },
      {
        title: 'लिक्विड कैल्शियम',
        subtitle: 'मिल्क मैक्स कैल्शियम सप्लीमेंट',
        image: '/milk1.png',
        filterKey: 'Calcium Supplement',
      },
      {
        title: 'चिलेटेड खनिज',
        subtitle: 'नवमिन मिनरल मिक्सचर',
        image: '/navmin.png',
        filterKey: 'Chelated Minerals',
      },
      {
        title: 'मक्का साइलेज',
        subtitle: 'एडवांटा 756 क्वालिटी साइलेज',
        image: '/Makka_Sailage.png',
        filterKey: 'Fermented Silage',
      },
    ];
  }

  return [
    {
      title: 'Cattle Feed',
      subtitle: 'Dugdhsamrudhi Sarki Pend',
      image: '/sarkhi.png',
      filterKey: 'Cattle Feed',
    },
    {
      title: 'Liquid Calcium',
      subtitle: 'MilkMax Calcium Supplement',
      image: '/milk1.png',
      filterKey: 'Calcium Supplement',
    },
    {
      title: 'Chelated Minerals',
      subtitle: 'NavMin Mineral Mixture',
      image: '/navmin.png',
      filterKey: 'Chelated Minerals',
    },
    {
      title: 'Maize Silage',
      subtitle: 'Advanta 756 Quality Silage',
      image: '/Makka_Sailage.png',
      filterKey: 'Fermented Silage',
    },
  ];
}

// ------------------------------------------------------------------------------------------------
// 3. STORE PRODUCTS
// ------------------------------------------------------------------------------------------------
export function getStoreProducts(lang: Language): StoreProduct[] {
  if (lang === 'mr') {
    return [
      {
        name: 'दुग्धसमृद्धी सरकी पेंड',
        subtitle: 'दुभत्या जनावरांसाठी संतुलित पशुखाद्य',
        category: 'पशुखाद्य (Cattle Feed)',
        description: 'दुग्धसमृद्धी सरकी पेंड हे दुग्ध उत्पादक शेतकऱ्यांसाठी संतुलित पोषण देणारे आणि दुधातील फॅट व एसएनएफ वाढवणारे सर्वोत्तम दर्जेदार पशुखाद्य आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'पेंड / गोळी',
        packaging: '४० किलो बॅग',
        variants: ['४० किलो बॅग'],
        variantPrices: { '४० किलो बॅग': 1800 },
        price: 1800,
        image: '/sarkhi.png',
        rating: 4.9,
        reviewCount: 142,
        highlights: [
          'दुभत्या जनावरांसाठी खास शास्त्रोक्त पद्धतीने तयार',
          'उच्च दुग्धोत्पादनाच्या काळात पोषक घटकांची कमतरता भरून काढते',
          'व्यावसायिक व घरगुती दुग्ध व्यवसायासाठी अत्यंत फायदेशीर',
          'सुलभ ४० किलो मजबूत पोत्यामध्ये उपलब्ध'
        ],
        usage: '५० ग्रॅम प्रति जनावर दररोज. अतिरिक्त दुधासाठी प्रति लिटर ५ ग्रॅम वाढवावे.',
      },
      {
        name: 'मिल्क मॅक्स',
        subtitle: 'दुभत्या जनावरांसाठी लिक्विड कॅल्शियम सप्लिमेंट',
        category: 'कॅल्शियम सप्लिमेंट (Calcium)',
        description: 'मिल्क मॅक्स हे दुभत्या गायी व म्हशींच्या शरीरातील कॅल्शियमची पातळी योग्य ठेवून दूध वाढवणारे चविष्ट व प्रभावी लिक्विड टॉनिक आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'द्रवरूप (लिक्विड)',
        packaging: '१ लिटर | ५ लिटर',
        variants: ['१ लिटर', '५ लिटर'],
        variantPrices: { '१ लिटर': 399, '५ लिटर': 599 },
        price: 399,
        image: '/milk1.png',
        rating: 4.8,
        reviewCount: 98,
        highlights: [
          'जास्त दूध देणाऱ्या दुभत्या जनावरांसाठी उत्तम कॅल्शियम पोषण',
          'विण्यानंतर जनावरांना अशक्तपणा व मिल्क फीव्हरपासून वाचवते',
          'पिण्यास सुलभ आणि चविष्ट लिक्विड फॉर्म्युला',
          'दररोजच्या खाद्यामध्ये सहज मिसळता येते'
        ],
        usage: 'लेबलवरील निर्देशानुसार किंवा पशुवैद्यकांच्या सल्ल्यानुसार.',
      },
      {
        name: 'नवमिन',
        subtitle: 'चिलेटेड खनिज व सूक्ष्म पोषक मिश्रण',
        category: 'चिलेटेड खनिजे (Minerals)',
        description: 'नवमिन हे जनावरांमधील खनिजांची कमतरता भरून काढून त्यांची रोगप्रतिकारशक्ती, दुग्ध उत्पादकता आणि वेळेवर गाभण राहण्याची क्षमता सुधारते.',
        idealFor: '🐄 गायी • 🐃 म्हशी • 🐐 शेळ्या',
        form: 'चिलेटेड पावडर',
        packaging: '१ किलो | ५ किलो | २० किलो',
        variants: ['१ किलो', '५ किलो', '२० किलो'],
        variantPrices: { '१ किलो': 217, '५ किलो': 1015, '२० किलो': 4060 },
        price: 217,
        image: '/navmin.png',
        rating: 4.9,
        reviewCount: 186,
        highlights: [
          'भागनिहाय आवश्यक सूक्ष्म व मुख्य खनिजांचा संतुलित संच',
          'गायी, म्हशी आणि शेळ्यांसाठी अत्यंत उपयुक्त',
          'लहान व मोठ्या गोठ्यांसाठी विविध आकाराच्या पॅकमध्ये उपलब्ध',
          'प्रजनन क्षमता आणि शरीरातील ऊर्जा टिकवून ठेवते'
        ],
        usage: 'लेबलवरील निर्देशानुसार किंवा पशुवैद्यकांच्या सल्ल्यानुसार.',
      },
      {
        name: 'फॅट मॅक्स',
        subtitle: 'दुधातील फॅट व डिग्री वाढवणारे सप्लिमेंट',
        category: 'मिल्क फॅट बूस्टर',
        description: 'फॅट मॅक्स हे जनावरांच्या दुधातील फॅटची टक्केवारी (Fat & SNF) वाढवण्यासाठी आणि दुधाला जास्त दर मिळवून देण्यासाठी अत्यंत प्रभावी आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'पावडर',
        packaging: '३०० ग्रॅम',
        variants: ['३०० ग्रॅम'],
        variantPrices: { '३०० ग्रॅम': 260 },
        price: 260,
        image: '/fatmax.png',
        rating: 4.7,
        reviewCount: 85,
        highlights: [
          'दुधातील फॅट व एसएनएफ वाढवण्यासाठी विशेष फॉर्म्युला',
          'दुग्ध व्यवसाय नफ्यात आणण्यास मदत करते',
          'किफायतशीर ३०० ग्रॅम पॅकमध्ये उपलब्ध',
          'नियमित आहारात देणे अगदी सोपे'
        ],
        usage: 'लेबलवरील निर्देशानुसार दररोजच्या खाद्यात द्यावे.',
      },
      {
        name: 'ग्रो मॅक्स',
        subtitle: 'वासरांच्या वाढीसाठी व पोषणासाठी पावडर',
        category: 'वासरांचे पोषण (Calf Growth)',
        description: 'ग्रो मॅक्स हे लहान वासरांची जलद वाढ, योग्य वजन आणि निरोगी पचनसंस्थेसाठी तयार केलेले संतुलित पोषण सप्लिमेंट आहे.',
        idealFor: '🐮 वासरे • 🐄 लहान जनावरे',
        form: 'पावडर',
        packaging: '३०० ग्रॅम | १ किलो',
        variants: ['३०० ग्रॅम', '१ किलो'],
        variantPrices: { '३०० ग्रॅम': 230, '१ किलो': 595 },
        price: 230,
        image: '/growmax.png',
        rating: 4.8,
        reviewCount: 76,
        highlights: [
          'लहान वासरांच्या लवकर शारीरिक वाढीसाठी उपयुक्त',
          'पचनक्रिया सुधारून वासरांचे वजन झपाट्याने वाढवते',
          '३०० ग्रॅम आणि १ किलो पॅकमध्ये उपलब्ध',
          'गोठ्यातील पुढील पिढी सक्षम बनवण्यासाठी सर्वोत्तम'
        ],
        usage: 'लेबलवरील प्रमाणानुसार नियमित खाद्यात द्यावे.',
      },
      {
        name: 'हिट प्लस / मॅक्स',
        subtitle: 'प्रजनन सुधारणा व वेळेवर माज सप्लिमेंट',
        category: 'प्रजनन व्यवस्थापन (Reproduction)',
        description: 'हिट प्लस हे जनावरांना वेळेवर माजावर आणण्यासाठी, उलटण्याची समस्या थांबवण्यासाठी आणि गर्भधारणा क्षमता वाढवण्यासाठी उपयुक्त आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'पावडर / बोलस',
        packaging: '४०० ग्रॅम | २.७५ किलो',
        variants: ['४०० ग्रॅम', '२.७५ किलो'],
        variantPrices: { '४०० ग्रॅम': 480, '२.७५ किलो': 1280 },
        price: 480,
        image: '/heatmax.png',
        rating: 4.9,
        reviewCount: 110,
        highlights: [
          'जनावरांमधील मूक माज व उलटण्याची समस्या दूर करण्यास सहाय्यक',
          'गायी व म्हशींच्या गर्भाशयाचे आरोग्य सुधारते',
          '४०० ग्रॅम व २.७५ किलो या दोन सुलभ पॅकमध्ये उपलब्ध',
          'नियोजित गोठा व्यवस्थापनासाठी अत्यंत फायदेशीर'
        ],
        usage: 'लेबलवरील निर्देशानुसार किंवा पशुवैद्यकांच्या सल्ल्यानुसार.',
        importantNote: 'जनावरांच्या गंभीर प्रजनन समस्या किंवा आजारांसाठी पशुवैद्यकीय डॉक्टरांचा सल्ला अवश्य घ्या.'
      },
      {
        name: 'गर्भ केअर',
        subtitle: 'गाभण जनावरांसाठी पोषक टॉनिक',
        category: 'गाभण जनावरांची काळजी',
        description: 'गर्भ केअर हे गाभण काळात गर्भाची निरोगी वाढ, सुलभ प्रसूती आणि विल्यानंतर वार पडण्यास मदत करणारे विशेष टॉनिक आहे.',
        idealFor: '🐄 गाभण गायी • 🐃 गाभण म्हशी',
        form: 'लिक्विड / पावडर',
        packaging: '१ किलो',
        variants: ['१ किलो'],
        variantPrices: { '१ किलो': 576 },
        price: 576,
        image: '/garbhaCare.png',
        rating: 4.9,
        reviewCount: 94,
        highlights: [
          'गाभण गायी व म्हशींच्या विशेष पोषणासाठी तयार',
          'गर्भाशयाचे आरोग्य व गर्भाचा उत्तम विकास',
          '१ किलो पॅकमध्ये उपलब्ध',
          'प्रसूतीनंतर जनावराची ऊर्जा त्वरित पूर्ववत करते'
        ],
        usage: 'पशुवैद्यक किंवा तज्ज्ञांच्या सल्ल्यानुसार द्यावे.',
      },
      {
        name: 'मस्ट गार्ड',
        subtitle: 'कासदाह (मस्टायटिस) नियंत्रण व कास संरक्षण',
        category: 'कास संरक्षण (Udder Care)',
        description: 'मस्ट गार्ड हे कासदाह रोखण्यासाठी, कासेची सूज व पेशींची संख्या नियंत्रित ठेवण्यासाठी रोगप्रतिकारशक्ती वाढवणारे सप्लिमेंट आहे.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: 'पावडर / मलम',
        packaging: '२५० ग्रॅम | ५०० ग्रॅम',
        variants: ['२५० ग्रॅम', '५०० ग्रॅम'],
        variantPrices: { '२५० ग्रॅम': 420, '५०० ग्रॅम': 770 },
        price: 420,
        image: '/mastguard.png',
        rating: 4.8,
        reviewCount: 63,
        highlights: [
          'कासेचे आरोग्य टिकवून दुधाची गुणवत्ता उत्तम राखते',
          'गोठ्यातील स्वच्छता व दूध व्यवस्थापनाला पूरक',
          '२५० ग्रॅम व ५०० ग्रॅम पॅकमध्ये उपलब्ध'
        ],
        usage: 'लेबलवरील निर्देशानुसार वापरावे.',
        importantNote: 'कासदाह हा संसर्गजन्य आजार आहे; संशय आल्यास योग्य निदानासाठी त्वरित पशुवैद्यकांचा सल्ला घ्यावा.'
      },
      {
        name: 'मका मुरघास (अ‍ॅडव्हांटा ७५६)',
        subtitle: 'दुभत्या जनावरांसाठी उच्च प्रतीचा मका मुरघास',
        category: 'मुरघास (Fermented Silage)',
        description: 'अ‍ॅडव्हांटा ७५६ मक्यापासून बनवलेला आमचा मका मुरघास वर्षभर हिरव्या चाऱ्याची उपलब्धता देऊन दुधाचे प्रमाण व फॅट टिकवून ठेवतो.',
        idealFor: '🐄 गायी • 🐃 म्हशी',
        form: '६० किलो बेल्स (गाठी)',
        packaging: '६० किलो बॅग',
        variants: ['६० किलो बॅग'],
        variantPrices: { '६० किलो बॅग': 1800 },
        price: 1800,
        image: '/Makka_Sailage.png',
        rating: 5.0,
        reviewCount: 210,
        highlights: [
          'अधिक स्टार्चयुक्त अ‍ॅडव्हांटा ७५६ मका वाणापासून निर्मित',
          '६० किलोच्या हवाबंद पॅकिंगमुळे हाताळण्यास व साठवण्यास सोपे',
          'उन्हाळ्यात आणि टंचाईच्या काळात हिरव्या चाऱ्याची हमी',
          'चारा खर्च नियंत्रित करून दुग्ध व्यवसाय फायदेशीर बनवतो'
        ],
        usage: 'शिफारस केलेल्या सायलेज साठवणूक व वापर पद्धतीनुसार वापरावे.',
      },
    ];
  }

  if (lang === 'hi') {
    return [
      {
        name: 'दुग्धसमृद्धि सरकी खली',
        subtitle: 'दुधारू पशुओं के लिए संतुलित पशु आहार',
        category: 'पशु आहार (Cattle Feed)',
        description: 'दुग्धसमृद्धि सरकी खली डेयरी किसानों के लिए संतुलित पोषण और दूध में फैट व एसएनएफ बढ़ाने वाला प्रीमियम पशु आहार है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'खली / पेलेट',
        packaging: '40 किग्रा बैग',
        variants: ['40 किग्रा बैग'],
        variantPrices: { '40 किग्रा बैग': 1800 },
        price: 1800,
        image: '/sarkhi.png',
        rating: 4.9,
        reviewCount: 142,
        highlights: [
          'दुधारू पशुओं के लिए विशेष वैज्ञानिक फॉर्मूलेशन',
          'उच्च दुग्ध उत्पादन के दौरान पोषण की कमी को पूरा करता है',
          'व्यावसायिक और घरेलू डेयरी फार्मों के लिए बेहद फायदेमंद',
          'सुविधाजनक 40 किग्रा मजबूत बैग में उपलब्ध'
        ],
        usage: '50 ग्राम प्रति पशु प्रतिदिन। अतिरिक्त दूध के लिए प्रति लीटर 5 ग्राम बढ़ाएं।',
      },
      {
        name: 'मिल्क मैक्स',
        subtitle: 'दुधारू पशुओं के लिए लिक्विड कैल्शियम सप्लीमेंट',
        category: 'कैल्शियम सप्लीमेंट (Calcium)',
        description: 'मिल्क मैक्स दुधारू गायों और भैंसों में कैल्शियम के स्तर को बनाए रखकर दूध उत्पादन बढ़ाने वाला स्वादिष्ट लिक्विड टॉनिक है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'तरल (लिक्विड)',
        packaging: '1 लीटर | 5 लीटर',
        variants: ['1 लीटर', '5 लीटर'],
        variantPrices: { '1 लीटर': 399, '5 लीटर': 599 },
        price: 399,
        image: '/milk1.png',
        rating: 4.8,
        reviewCount: 98,
        highlights: [
          'अधिक दूध देने वाले पशुओं के लिए उत्तम कैल्शियम पोषण',
          'प्रसव के बाद कमजोरी व मिल्क फीवर से बचाव',
          'पीने में स्वादिष्ट और आसानी से पचने वाला',
          'दैनिक आहार में आसानी से मिलाया जा सकता है'
        ],
        usage: 'उत्पाद लेबल या पशु चिकित्सक की सलाह के अनुसार।',
      },
      {
        name: 'नवमिन',
        subtitle: 'चिलेटेड खनिज एवं सूक्ष्म पोषक मिश्रण',
        category: 'चिलेटेड खनिज (Minerals)',
        description: 'नवमिन पशुओं में पोषक तत्वों व खनिजों की कमी दूर कर रोग प्रतिरोधक क्षमता और प्रजनन दर सुधारने वाला चिलेटेड मिनरल मिक्सचर है।',
        idealFor: '🐄 गायें • 🐃 भैंसें • 🐐 बकरियां',
        form: 'चिलेटेड पाउडर',
        packaging: '1 किग्रा | 5 किग्रा | 20 किग्रा',
        variants: ['1 किग्रा', '5 किग्रा', '20 किग्रा'],
        variantPrices: { '1 किग्रा': 217, '5 किग्रा': 1015, '20 किग्रा': 4060 },
        price: 217,
        image: '/navmin.png',
        rating: 4.9,
        reviewCount: 186,
        highlights: [
          'क्षेत्र-विशिष्ट आवश्यक सूक्ष्म व मुख्य खनिजों का संतुलित मिश्रण',
          'गायों, भैंसों और बकरियों के लिए अत्यंत उपयोगी',
          'छोटे और बड़े डेयरी फार्मों के लिए विभिन्न पैक साइज',
          'प्रजनन क्षमता और शरीर में ऊर्जा बनाए रखता है'
        ],
        usage: 'लेबल या पशु चिकित्सक की सिफारिश के अनुसार।',
      },
      {
        name: 'फैट मैक्स',
        subtitle: 'दूध में फैट व डिग्री बढ़ाने वाला सप्लीमेंट',
        category: 'मिल्क फैट बूस्टर',
        description: 'फैट मैक्स पशुओं के दूध में फैट प्रतिशत और उत्पादन क्षमता को बढ़ाने के लिए तैयार किया गया विशेष पोषण सप्लीमेंट है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'पाउडर',
        packaging: '300 ग्राम',
        variants: ['300 ग्राम'],
        variantPrices: { '300 ग्राम': 260 },
        price: 260,
        image: '/fatmax.png',
        rating: 4.7,
        reviewCount: 85,
        highlights: [
          'दूध में फैट व एसएनएफ बढ़ाने के लिए विशेष फॉर्मूला',
          'डेयरी व्यवसाय को अधिक लाभदायक बनाने में सहायक',
          'किफायती 300 ग्राम पैक में उपलब्ध',
          'नियमित आहार में देना बेहद आसान'
        ],
        usage: 'लेबल निर्देशानुसार दैनिक चारे में दें।',
      },
      {
        name: 'ग्रो मैक्स',
        subtitle: 'बछड़ों के विकास और पोषण के लिए पाउडर',
        category: 'बछड़ों का पोषण (Calf Growth)',
        description: 'ग्रो मैक्स छोटे बछड़ों की तेजी से शारीरिक वृद्धि, वजन बढ़ाने और पाचन तंत्र को मजबूत बनाने वाला पोषण सप्लीमेंट है।',
        idealFor: '🐮 बछड़े • 🐄 छोटे पशु',
        form: 'पाउडर',
        packaging: '300 ग्राम | 1 किग्रा',
        variants: ['300 ग्राम', '1 किग्रा'],
        variantPrices: { '300 ग्राम': 230, '1 किग्रा': 595 },
        price: 230,
        image: '/growmax.png',
        rating: 4.8,
        reviewCount: 76,
        highlights: [
          'छोटे बछड़ों के प्रारंभिक शारीरिक विकास के लिए उपयुक्त',
          'पाचन सुधारकर बछड़ों का वजन तेजी से बढ़ाता है',
          '300 ग्राम और 1 किग्रा पैक में उपलब्ध',
          'स्वस्थ और मजबूत पशु तैयार करने के लिए सर्वोत्तम'
        ],
        usage: 'लेबल के अनुसार दैनिक आहार में दें।',
      },
      {
        name: 'हीट प्लस / मैक्स',
        subtitle: 'प्रजनन सुधार एवं समय पर मद (हीट) सप्लीमेंट',
        category: 'प्रजनन प्रबंधन (Reproduction)',
        description: 'हीट प्लस पशुओं को समय पर हीट में लाने, बार-बार फिरने की समस्या रोकने और गर्भाधान दर सुधारने में अत्यंत प्रभावी है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'पाउडर / बोलस',
        packaging: '400 ग्राम | 2.75 किग्रा',
        variants: ['400 ग्राम', '2.75 किग्रा'],
        variantPrices: { '400 ग्राम': 480, '2.75 किग्रा': 1280 },
        price: 480,
        image: '/heatmax.png',
        rating: 4.9,
        reviewCount: 110,
        highlights: [
          'पशुओं में साइलेंट हीट और बार-बार फिरने की समस्या दूर करता है',
          'गायों और भैंसों के गर्भाशय का स्वास्थ्य सुधारता है',
          '400 ग्राम और 2.75 किग्रा पैक में उपलब्ध',
          'डेयरी प्रजनन योजना को सफल बनाता है'
        ],
        usage: 'लेबल निर्देशानुसार या पशु चिकित्सक की सलाह अनुसार।',
        importantNote: 'पशुओं की गंभीर प्रजनन समस्याओं के लिए योग्य पशु चिकित्सक से परामर्श करें।'
      },
      {
        name: 'गर्भ केयर',
        subtitle: 'गर्भवती पशुओं के लिए पोषण टॉनिक',
        category: 'गर्भवती पशु देखभाल',
        description: 'गर्भ केयर गर्भावस्था के दौरान गर्भ की स्वस्थ वृद्धि, आसान प्रसव और प्रसव बाद गर्भाशय की सफाई में मदद करता है।',
        idealFor: '🐄 गर्भवती गायें • 🐃 गर्भवती भैंसें',
        form: 'तरल / पाउडर',
        packaging: '1 किग्रा',
        variants: ['1 किग्रा'],
        variantPrices: { '1 किग्रा': 576 },
        price: 576,
        image: '/garbhaCare.png',
        rating: 4.9,
        reviewCount: 94,
        highlights: [
          'गर्भवती गायों व भैंसों के विशेष पोषण हेतु तैयार',
          'गर्भाशय स्वास्थ्य और भ्रूण का समुचित विकास',
          '1 किग्रा सुविधाजनक पैक में उपलब्ध',
          'प्रसव के बाद पशु की कमजोरी को तुरंत दूर करता है'
        ],
        usage: 'पशु चिकित्सक या विशेषज्ञ की सलाह अनुसार दें।',
      },
      {
        name: 'मस्ट गार्ड',
        subtitle: 'थनैला (मस्टाइटिस) रोकथाम व अयन सुरक्षा',
        category: 'अडर केयर (Udder Care)',
        description: 'मस्ट गार्ड थनैला रोग की रोकथाम, अयन (लेवटी) के स्वास्थ्य और दूध की शुद्धता बनाए रखने के लिए रोग प्रतिरोधक क्षमता बढ़ाता है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: 'पाउडर / मलहम',
        packaging: '250 ग्राम | 500 ग्राम',
        variants: ['250 ग्राम', '500 ग्राम'],
        variantPrices: { '250 ग्राम': 420, '500 ग्राम': 770 },
        price: 420,
        image: '/mastguard.png',
        rating: 4.8,
        reviewCount: 63,
        highlights: [
          'अयन के स्वास्थ्य की रक्षा कर दूध की गुणवत्ता बनाए रखता है',
          'डेयरी स्वच्छता और स्वास्थ्य प्रबंधन में सहायक',
          '250 ग्राम और 500 ग्राम पैक में उपलब्ध'
        ],
        usage: 'लेबल निर्देशानुसार उपयोग करें।',
        importantNote: 'थनैला एक गंभीर पशु रोग है; लक्षण दिखने पर तुरंत पशु चिकित्सक से संपर्क करें।'
      },
      {
        name: 'मक्का साइलेज (एडवांटा 756)',
        subtitle: 'दुधारू पशुओं के लिए उच्च गुणवत्ता मक्का साइलेज',
        category: 'साइलेज (Fermented Silage)',
        description: 'एडवांटा 756 मक्का से तैयार हमारा साइलेज साल भर हरे चारे की आपूर्ति सुनिश्चित करता है और दूध उत्पादन को बढ़ाता है।',
        idealFor: '🐄 गायें • 🐃 भैंसें',
        form: '60 किग्रा बेल्स (गांठें)',
        packaging: '60 किग्रा बैग',
        variants: ['60 किग्रा बैग'],
        variantPrices: { '60 किग्रा बैग': 1800 },
        price: 1800,
        image: '/Makka_Sailage.png',
        rating: 5.0,
        reviewCount: 210,
        highlights: [
          'उच्च स्टार्च वाले एडवांटा 756 मक्का से निर्मित',
          '60 किग्रा एयरटाइट पैकिंग से रखने और संभालने में आसान',
          'गर्मियों और सूखे के मौसम में भी हरे चारे की गारंटी',
          'चारे की लागत घटाकर डेयरी को अधिक मुनाफा देता है'
        ],
        usage: 'साइलेज भंडारण और उपयोग की अनुशंसित विधि अनुसार उपयोग करें।',
      },
    ];
  }

  // English fallback
  return [
    {
      name: "DUGDHSAMRUDHI SARKI PEND",
      subtitle: "Cattle Feed for Dairy Animals",
      category: "Cattle Feed",
      description: "Dugdhsamrudhi Sarki Pend is a cattle feed solution designed for dairy farmers looking to provide balanced nutritional support to their milking animals.",
      idealFor: "🐄 Cows • 🐃 Buffaloes",
      form: "Solid Cake / Pend",
      packaging: "40 kg Bag",
      variants: ["40 kg Bag"],
      variantPrices: { "40 kg Bag": 1800 },
      price: 1800,
      image: "/sarkhi.png",
      rating: 4.9,
      reviewCount: 142,
      highlights: [
        "Designed specifically for milking dairy animals",
        "Supports nutritional requirements during peak lactation",
        "Suitable for regular dairy management & commercial operations",
        "Available in convenient 40 kg bulk packaging"
      ],
      usage: "50 g per animal daily. For every additional 1 litre of capacity, increase the dosage by 5 g.",
    },
    {
      name: "MILKMAX",
      subtitle: "Calcium Supplement for Dairy Animals",
      category: "Calcium Supplement",
      description: "MilkMax / Milkiyana is a calcium supplement designed to support the nutritional requirements of dairy animals, particularly during lactation.",
      idealFor: "🐄 Cows • 🐃 Buffaloes",
      form: "Liquid",
      packaging: "1 Litre | 5 Litre",
      variants: ["1 Litre", "5 Litre"],
      variantPrices: { "1 Litre": 399, "5 Litre": 599 },
      price: 399,
      image: "/milk1.png",
      rating: 4.8,
      reviewCount: 98,
      highlights: [
        "Calcium supplementation for high-yielding dairy animals",
        "Supports nutritional management during lactation",
        "Convenient, palatable liquid formulation",
        "Easy to administer with daily feed ration"
      ],
      usage: "As per approved product label / expert recommendation.",
    },
    {
      name: "NAVMIN",
      subtitle: "Mineral & Nutritional Supplement",
      category: "Chelated Minerals",
      description: "NavMin is a mineral and nutritional supplement designed to support the nutritional requirements of dairy animals, enhancing conception rates and vitality.",
      idealFor: "🐄 Cows • 🐃 Buffaloes • 🐐 Goats",
      form: "Powder Pack",
      packaging: "1 kg | 5 kg | 20 kg",
      variants: ["1 kg", "5 kg", "20 kg"],
      variantPrices: { "1 kg": 217, "5 kg": 1015, "20 kg": 4060 },
      price: 217,
      image: "/navmin.png",
      rating: 4.9,
      reviewCount: 186,
      highlights: [
        "Area-specific chelated mineral & trace element supplement",
        "Suitable for dairy cows, buffaloes, and goats",
        "Available in multiple pack sizes for small & commercial farms",
        "Enhances conception rates and overall vitality"
      ],
      usage: "As per product label / veterinary or nutritionist recommendation.",
    },
    {
      name: "FATMAX",
      subtitle: "Dairy Nutrition Supplement",
      category: "Milk Fat Booster",
      description: "FatMax is a nutritional supplement designed for dairy animals as part of a balanced feeding program to optimize milk fat percentage.",
      idealFor: "🐄 Cows • 🐃 Buffaloes",
      form: "Powder",
      packaging: "300 g",
      variants: ["300 g"],
      variantPrices: { "300 g": 260 },
      price: 260,
      image: "/fatmax.png",
      rating: 4.7,
      reviewCount: 85,
      highlights: [
        "Formulated specifically for milk fat enhancement",
        "Supports nutritional management of milking animals",
        "Convenient 300 g pack size",
        "Suitable for regular dairy-farm feeding programs"
      ],
      usage: "As per product label / expert recommendation.",
    },
    {
      name: "GROWMAX",
      subtitle: "Calf Growth & Nutrition Supplement",
      category: "Calf Growth",
      description: "GrowMax is a nutritional supplement designed for calves and young livestock as part of a proper feeding and growth-management program.",
      idealFor: "🐮 Calves • 🐄 Young Stock",
      form: "Powder",
      packaging: "300 g | 1 kg",
      variants: ["300 g", "1 kg"],
      variantPrices: { "300 g": 230, "1 kg": 595 },
      price: 230,
      image: "/growmax.png",
      rating: 4.8,
      reviewCount: 76,
      highlights: [
        "Designed specifically for growing calves & young stock",
        "Supports nutritional requirements during early growth stages",
        "Convenient 300 g & 1 kg pack options",
        "Ideal for calf-rearing and weight-gain programs"
      ],
      usage: "As per product label / expert recommendation.",
    },
    {
      name: "HEAT PLUS",
      subtitle: "Reproductive Nutrition Support",
      category: "Reproductive Support",
      description: "Heat Plus is a nutritional supplement designed to support reproductive management in dairy animals as part of a proper nutrition program.",
      idealFor: "🐄 Cows • 🐃 Buffaloes",
      form: "Powder / Bolus",
      packaging: "400 g | 2.75 kg",
      variants: ["400 g", "2.75 kg"],
      variantPrices: { "400 g": 480, "2.75 kg": 1280 },
      price: 480,
      image: "/heatmax.png",
      rating: 4.9,
      reviewCount: 110,
      highlights: [
        "Designed for reproductive nutrition support",
        "Suitable for dairy cows and buffaloes",
        "Available in two convenient pack sizes (400 g & 2.75 kg)",
        "Can be incorporated into a planned dairy reproductive program"
      ],
      usage: "As per product label / veterinary recommendation.",
      importantNote: "For reproductive problems, repeat breeding, delayed heat, pregnancy-related concerns, or other animal-health conditions, consult a qualified veterinary professional."
    },
    {
      name: "GARBHACARE",
      subtitle: "Pregnancy Nutrition Supplement",
      category: "Pregnancy Care",
      description: "Garbhacare is a nutritional supplement designed to support the nutritional management of pregnant dairy animals during critical gestation periods.",
      idealFor: "🐄 Pregnant Cows • 🐃 Buffaloes",
      form: "Liquid / Powder",
      packaging: "1 kg",
      variants: ["1 kg"],
      variantPrices: { "1 kg": 576 },
      price: 576,
      image: "/garbhaCare.png",
      rating: 4.9,
      reviewCount: 94,
      highlights: [
        "Formulated for pregnant dairy cows and buffaloes",
        "Supports nutritional management during pregnancy",
        "Convenient 1 kg pack",
        "Promotes uterine health and calf development"
      ],
      usage: "As per product label / veterinary or nutritionist recommendation.",
    },
    {
      name: "MUSTGUARD",
      subtitle: "Mastitis Management Support",
      category: "Udder Care",
      description: "MustGuard is a livestock nutrition/management product intended to support udder care and somatic cell count management in milking herds.",
      idealFor: "🐄 Cows • 🐃 Buffaloes",
      form: "Powder / Ointment",
      packaging: "250 g | 500 g",
      variants: ["250 g", "500 g"],
      variantPrices: { "250 g": 420, "500 g": 770 },
      price: 420,
      image: "/mastguard.png",
      rating: 4.8,
      reviewCount: 63,
      highlights: [
        "Specialized support for udder care & somatic cell count management",
        "Designed to complement hygiene and herd management",
        "Available in 250 g & 500 g packs"
      ],
      usage: "As per product label / veterinary recommendation.",
      importantNote: "Mastitis is an animal-health condition. In case of suspected mastitis, consult a qualified veterinary professional for diagnosis and treatment."
    },
    {
      name: "MAIZE SILAGE (ADVANTA 756)",
      subtitle: "Quality Maize Silage for Dairy Farming",
      category: "Fermented Silage",
      description: "Our Maize Silage is prepared using Advanta 756 maize variety, providing farmers with a convenient stored fodder option for year-round green feeding.",
      idealFor: "🐄 Cows • 🐃 Buffaloes",
      form: "60 kg Bales",
      packaging: "60 kg Bag",
      variants: ["60 kg Bag"],
      variantPrices: { "60 kg Bag": 1800 },
      price: 1800,
      image: "/Makka_Sailage.png",
      rating: 5.0,
      reviewCount: 210,
      highlights: [
        "Prepared with high-starch Advanta 756 maize variety",
        "60 kg convenient pack for easy storage & handling",
        "Ensures year-round green fodder availability",
        "Helps dairy farmers plan feed costs and availability"
      ],
      usage: "Store according to the recommended silage storage and handling instructions.",
    },
  ];
}

// ------------------------------------------------------------------------------------------------
// 4. DISCOVER SECTIONS
// ------------------------------------------------------------------------------------------------
export function getDiscoverSections(lang: Language): DiscoverSection[] {
  const storeProds = getStoreProducts(lang);

  const filterByCategories = (catNames: string[]) => {
    return storeProds.filter(p => catNames.some(c => p.category.toLowerCase().includes(c.toLowerCase())));
  };

  const toDiscoverItem = (p: StoreProduct): DiscoverItem => ({
    name: p.name,
    subtitle: p.subtitle,
    category: p.category,
    desc: p.description,
    idealFor: p.idealFor,
    form: p.form,
    packaging: p.packaging,
    image: p.image,
    highlights: p.highlights,
    usage: p.usage,
    importantNote: p.importantNote,
    deliveryNote: p.deliveryNote,
  });

  if (lang === 'mr') {
    return [
      {
        id: 'dairy-nutrition',
        title: 'सर्व दुग्ध पोषण',
        subtitle: 'संपूर्ण दुग्ध व पशु पोषण उत्पादन श्रेणी',
        description:
          'दुभत्या जनावरांच्या दैनंदिन पोषणाच्या गरजा पूर्ण करण्यासाठी, दूध उत्पादन वाढवण्यासाठी आणि उत्तम शारीरिक आरोग्य राखण्यासाठी तयार केलेली संपूर्ण उत्पादने.',
        icon: Milk,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        items: storeProds.map(toDiscoverItem),
      },
      {
        id: 'calf-nutrition',
        title: 'वासरांचे पोषण',
        subtitle: 'लहान वासरांच्या जलद वाढीसाठी व प्रतिकारशक्तीसाठी विशेष पोषण',
        description:
          'लहान वासरांची पचनसंस्था मजबूत करण्यासाठी आणि जलद वजनवाढीसाठी शास्त्रोक्त पोषण फॉर्म्युला.',
        icon: Baby,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        items: filterByCategories(['वासरांचे पोषण', 'Calf']).map(toDiscoverItem),
      },
      {
        id: 'minerals',
        title: 'खनिज व पोषक सप्लिमेंट्स',
        subtitle: 'आवश्यक सूक्ष्म व मुख्य खनिजांचा परिपूर्ण समतोल',
        description:
          'जनावरांमधील खनिजांची कमतरता दूर करून दुग्ध उत्पादकता आणि रोगप्रतिकारशक्ती वाढवणारी चिलेटेड खनिजे.',
        icon: Award,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        items: filterByCategories(['खनिजे', 'Minerals', 'कास संरक्षण', 'Udder']).map(toDiscoverItem),
      },
      {
        id: 'reproductive',
        title: 'प्रजनन व्यवस्थापन',
        subtitle: 'वेळेवर माज, प्रजनन क्षमता आणि गाभण जनावरांची काळजी',
        description:
          'जनावरांना वेळेवर माजावर आणण्यासाठी, उलटण्याची समस्या दूर करण्यासाठी आणि गर्भाच्या निरोगी वाढीसाठी पूरक पोषण.',
        icon: Sparkles,
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
        items: filterByCategories(['प्रजनन', 'Reproduction', 'गाभण', 'Pregnancy']).map(toDiscoverItem),
      },
      {
        id: 'feed-fodder',
        title: 'पशुखाद्य व चारा',
        subtitle: 'पोषक घटकांनी समृद्ध सरकी पेंड व संतुलित पशुखाद्य',
        description:
          'जनावरांची पचनक्रिया उत्तम ठेवणारे, सतत ऊर्जा देणारे आणि दुधातील फॅट वाढवणारे उत्कृष्ट पशुखाद्य.',
        icon: Sprout,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        items: filterByCategories(['पशुखाद्य', 'Feed']).map(toDiscoverItem),
      },
      {
        id: 'silage',
        title: 'मका मुरघास (सायलेज)',
        subtitle: 'वर्षभर हिरव्या चाऱ्याची हमी आणि पौष्टिक चारा सुरक्षा',
        description:
          'उच्च प्रतीचा हवाबंद मका मुरघास, जो टंचाईच्या काळातही जनावरांना रसरशीत हिरवा चारा उपलब्ध करतो.',
        icon: Layers,
        badgeColor: 'bg-green-100 text-green-900 border-green-300',
        items: filterByCategories(['मुरघास', 'Silage']).map(toDiscoverItem),
      },
    ];
  }

  if (lang === 'hi') {
    return [
      {
        id: 'dairy-nutrition',
        title: 'संपूर्ण डेयरी पोषण',
        subtitle: 'संपूर्ण डेयरी एवं पशु पोषण उत्पाद श्रृंखला',
        description:
          'दुधारू पशुओं की दैनिक पोषण आवश्यकताओं को पूरा करने, दूध उत्पादन बढ़ाने और स्वास्थ्य सुधारने के लिए सम्पूर्ण उत्पाद।',
        icon: Milk,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        items: storeProds.map(toDiscoverItem),
      },
      {
        id: 'calf-nutrition',
        title: 'बछड़ों का पोषण',
        subtitle: 'बछड़ों के तीव्र विकास और रोग प्रतिरोधक क्षमता हेतु',
        description:
          'छोटे बछड़ों के पाचन तंत्र को मजबूत बनाने और तेजी से वजन वृद्धि के लिए वैज्ञानिक पोषण समाधान।',
        icon: Baby,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        items: filterByCategories(['बछड़ों', 'Calf']).map(toDiscoverItem),
      },
      {
        id: 'minerals',
        title: 'खनिज एवं पोषण सप्लीमेंट्स',
        subtitle: 'आवश्यक सूक्ष्म एवं मुख्य खनिजों का परिपूर्ण संतुलन',
        description:
          'पशुओं में खनिजों की कमी को दूर कर दूध उत्पादन और रोग प्रतिरोधक क्षमता बढ़ाने वाले चिलेटेड खनिज मिश्रण।',
        icon: Award,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        items: filterByCategories(['खनिज', 'Minerals', 'अडर', 'Udder']).map(toDiscoverItem),
      },
      {
        id: 'reproductive',
        title: 'प्रजनन प्रबंधन',
        subtitle: 'समय पर हीट, प्रजनन क्षमता और गर्भवती पशुओं की देखभाल',
        description:
          'पशुओं को समय पर हीट में लाने, बार-बार फिरने की समस्या रोकने और गर्भ की स्वस्थ वृद्धि के लिए विशेष पोषण।',
        icon: Sparkles,
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
        items: filterByCategories(['प्रजनन', 'Reproduction', 'गर्भवती', 'Pregnancy']).map(toDiscoverItem),
      },
      {
        id: 'feed-fodder',
        title: 'पशु आहार एवं चारा',
        subtitle: 'पोषक तत्वों से भरपूर सरकी खली और संतुलित पशु आहार',
        description:
          'पशुओं के बेहतर पाचन, निरंतर ऊर्जा और दूध में फैट बढ़ाने वाला उच्च गुणवत्ता युक्त पशु आहार।',
        icon: Sprout,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        items: filterByCategories(['पशु आहार', 'Feed']).map(toDiscoverItem),
      },
      {
        id: 'silage',
        title: 'मक्का साइलेज (मुरघास)',
        subtitle: 'वर्ष भर हरे चारे की उपलब्धता और पौष्टिक चारा सुरक्षा',
        description:
          'उच्च गुणवत्ता वाला एयरटाइट मक्का साइलेज जो सूखे मौसम में भी दुधारू पशुओं को रसदार हरा चारा उपलब्ध कराता है।',
        icon: Layers,
        badgeColor: 'bg-green-100 text-green-900 border-green-300',
        items: filterByCategories(['साइलेज', 'Silage']).map(toDiscoverItem),
      },
    ];
  }

  // English fallback
  return [
    {
      id: 'dairy-nutrition',
      title: 'All Dairy Nutrition',
      subtitle: 'Complete Dairy & Animal Nutrition Portfolio',
      description:
        'Comprehensive nutrition solutions formulated to satisfy daily dietary requirements, improve milk yield, maintain body score, and boost overall dairy health.',
      icon: Milk,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      items: storeProds.map(toDiscoverItem),
    },
    {
      id: 'calf-nutrition',
      title: 'Calf Nutrition',
      subtitle: 'Specialized Growth & Immunity for Young Stock',
      description:
        'Targeted formulas crafted for growing calves to ensure early rumen development, robust immune response, and rapid weight gain.',
      icon: Baby,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      items: filterByCategories(['Calf Growth']).map(toDiscoverItem),
    },
    {
      id: 'minerals',
      title: 'Mineral & Nutritional Supplements',
      subtitle: 'Essential Micro & Macro Mineral Balance',
      description:
        'Bioavailable mineral mixtures and essential trace elements designed to correct nutritional deficiencies and enhance reproductive health.',
      icon: Award,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      items: filterByCategories(['Chelated Minerals', 'Udder Care']).map(toDiscoverItem),
    },
    {
      id: 'reproductive',
      title: 'Reproductive Management',
      subtitle: 'Fertility & Heat Cycle Regularity Support',
      description:
        'Nutritional solutions formulated to support heat induction, reproductive wellness, and optimal breeding efficiency in dairy herds.',
      icon: Sparkles,
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      items: filterByCategories(['Reproductive Support', 'Pregnancy Care']).map(toDiscoverItem),
    },
    {
      id: 'feed-fodder',
      title: 'Feed & Fodder',
      subtitle: 'High-Fiber & Balanced Concentrate Solutions',
      description:
        'Quality forage, concentrates, and cattle feed solutions engineered for daily digestion, gut health, and continuous energy.',
      icon: Sprout,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      items: filterByCategories(['Cattle Feed']).map(toDiscoverItem),
    },
    {
      id: 'silage',
      title: 'Silage',
      subtitle: 'Year-Round Green Fodder Security',
      description:
        'Premium quality fermented corn and grass silage enabling farmers to maintain green fodder availability even during dry seasons.',
      icon: Layers,
      badgeColor: 'bg-green-100 text-green-900 border-green-300',
      items: filterByCategories(['Fermented Silage']).map(toDiscoverItem),
    },
  ];
}

// ------------------------------------------------------------------------------------------------
// 5. ABOUT US DATA
// ------------------------------------------------------------------------------------------------
export function getAboutUsData(lang: Language) {
  if (lang === 'mr') {
    return {
      whyChooseUs: [
        {
          title: 'गुणवत्तेला प्रथम प्राधान्य',
          description: 'आमच्या प्रत्येक उत्पादनाची गुणवत्ता आणि सातत्य यावर आमचा सर्वोच्च भर आहे.',
          icon: ShieldCheck,
        },
        {
          title: 'तज्ज्ञ मार्गदर्शन',
          description: 'पशुवैद्यकीय व पोषण तज्ज्ञांच्या मार्गदर्शनाखाली आमचे सर्व फॉर्म्युलेशन्स तयार केले जातात.',
          icon: GraduationCap,
        },
        {
          title: 'शेतकरी-केंद्रित दृष्टिकोन',
          description: 'शेतकऱ्यांच्या प्रत्यक्ष गरजा आणि समस्या लक्षात घेऊन आमची उत्पादने विकसित केली जातात.',
          icon: Users,
        },
        {
          title: 'विश्वासार्ह सेवा व मदत',
          description: 'आम्ही शेतकरी आणि डीलर्ससोबत दीर्घकालीन विश्वासाचे नाते निर्माण करतो.',
          icon: HeartHandshake,
        },
        {
          title: 'ग्रामीण उद्योजकता',
          description: 'ग्रामीण भागातील तरुण, व्यावसायिक आणि महिला बचत गटांना पशुखाद्य व्यवसायात संधी देतो.',
          icon: Sprout,
        },
        {
          title: 'आधुनिक तंत्रज्ञान व नवोपक्रम',
          description: 'आधुनिक तंत्रज्ञानाचा वापर करून शेतकरी आणि गोठ्यांपर्यंत तत्पर सेवा पोहोचवतो.',
          icon: Briefcase,
        },
      ],
      commitments: [
        'उत्कृष्ट दुग्ध पोषण व्यवस्थापन',
        'योग्य व खात्रीशीर उत्पादनांची निवड',
        'गोठा व्यवस्थापनासाठी प्रत्यक्ष मार्गदर्शन',
        'दुग्ध उत्पादकता व नफा वाढवण्यास मदत',
        'वासरांचे योग्य संगोपन व वाढ',
        'हिरव्या व सुक्या चाऱ्याचे काटेकोर नियोजन',
        'व्यवसाय व बाजारपेठेच्या संधी उपलब्ध करणे',
      ],
    };
  }

  if (lang === 'hi') {
    return {
      whyChooseUs: [
        {
          title: 'गुणवत्ता को प्राथमिकता',
          description: 'हम अपने प्रत्येक उत्पाद की गुणवत्ता और निरंतरता पर विशेष ध्यान देते हैं।',
          icon: ShieldCheck,
        },
        {
          title: 'विशेषज्ञ मार्गदर्शन',
          description: 'पशु चिकित्सा एवं पोषण विशेषज्ञों के अनुभव और शोध के आधार पर उत्पाद तैयार किए जाते हैं।',
          icon: GraduationCap,
        },
        {
          title: 'किसान-केंद्रित दृष्टिकोण',
          description: 'डेयरी किसानों की जमीनी जरूरतों और समस्याओं को समझकर उत्पाद विकसित किए जाते हैं।',
          icon: Users,
        },
        {
          title: 'विश्वसनीय सहयोग',
          description: 'हम किसानों और डीलरों के साथ विश्वास और भरोसे का दीर्घकालिक संबंध बनाते हैं।',
          icon: HeartHandshake,
        },
        {
          title: 'ग्रामीण उद्यमिता',
          description: 'ग्रामीण युवाओं और महिला समूहों को पशु पोषण व्यवसाय में भागीदारी के अवसर प्रदान करते हैं।',
          icon: Sprout,
        },
        {
          title: 'आधुनिक तकनीक व नवाचार',
          description: 'आधुनिक तकनीक के माध्यम से डेयरी व्यवसाय को अधिक कुशल और सुलभ बनाते हैं।',
          icon: Briefcase,
        },
      ],
      commitments: [
        'उन्नत डेयरी पोषण प्रबंधन',
        'सटीक एवं गुणवत्तापूर्ण उत्पादों का चयन',
        'व्यावहारिक पशु प्रबंधन में सहयोग',
        'दूध उत्पादन और मुनाफे में वृद्धि',
        'बछड़ों का उचित पोषण एवं देखभाल',
        'चारा एवं साइलेज का सही नियोजन',
        'व्यवसाय व बाजार के नए अवसरों से जुड़ाव',
      ],
    };
  }

  return {
    whyChooseUs: [
      {
        title: 'Quality First',
        description: 'We place strong emphasis on product quality and consistency.',
        icon: ShieldCheck,
      },
      {
        title: 'Expert Guidance',
        description: 'Our approach is supported by knowledge from veterinary and animal nutrition professionals.',
        icon: GraduationCap,
      },
      {
        title: 'Farmer-Centric Approach',
        description: 'Our products and services are developed with the practical needs of dairy farmers in mind.',
        icon: Users,
      },
      {
        title: 'Reliable Support',
        description: 'We focus on building long-term relationships with farmers, dealers, and business partners.',
        icon: HeartHandshake,
      },
      {
        title: 'Rural Entrepreneurship',
        description: 'We create opportunities for rural entrepreneurs, dealers, and women-led groups.',
        icon: Sprout,
      },
      {
        title: 'Technology & Innovation',
        description: 'We believe technology can make rural businesses more connected, efficient, and accessible.',
        icon: Briefcase,
      },
    ],
    commitments: [
      'Better Dairy Animals nutrition practices',
      'Appropriate product selection',
      'Practical animal management guidance',
      'Dairy productivity support',
      'Calf and young-stock nutrition',
      'Feed and fodder management',
      'Access to business and market opportunities',
    ],
  };
}
