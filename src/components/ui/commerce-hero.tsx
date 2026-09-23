"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, Search, ShoppingBasket, Trash2, Plus, Minus, MessageSquare, Receipt, ArrowLeft, ArrowRight, MapPin, User, Phone, Building2, CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ProductRevealCard } from "@/components/ui/product-reveal-card";
import { getAssetUrl } from "@/lib/utils";

interface CommerceHeroProps {
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateProducts?: () => void;
  onNavigateDiscover?: () => void;
}

interface CartItem {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  image: string;
  category: string;
}

const categories = [
  {
    title: "Cattle Feed",
    subtitle: "Dugdhsamrudhi Sarki Pend",
    image: "/sarkhi.png",
    filterKey: "Cattle Feed",
  },
  {
    title: "Liquid Calcium",
    subtitle: "MilkMax Calcium Supplement",
    image: "/milk1.png",
    filterKey: "Calcium Supplement",
  },
  {
    title: "Chelated Minerals",
    subtitle: "NavMin Mineral Mixture",
    image: "/navmin.png",
    filterKey: "Chelated Minerals",
  },
  {
    title: "Maize Silage",
    subtitle: "Advanta 756 Quality Silage",
    image: "/Makka_Sailage.png",
    filterKey: "Fermented Silage",
  },
];

const STORE_PRODUCTS = [
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

interface FlyingCartItem {
  id: string;
  image: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

export function CommerceHero({
  onNavigateHome,
  onNavigateAbout,
}: CommerceHeroProps = {}) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'address' | 'success'>('cart');
  const [customerAddress, setCustomerAddress] = useState({
    fullName: '',
    phone: '',
    deliveryAddress: '',
    taluka: '',
    cityDistrict: '',
    pincode: '',
    landmark: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [flyingItems, setFlyingItems] = useState<FlyingCartItem[]>([]);
  const [isCartBouncing, setIsCartBouncing] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalBillAmount = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const triggerCartBounce = () => {
    setIsCartBouncing(true);
    setTimeout(() => {
      setIsCartBouncing(false);
    }, 450);
  };

  const handleAddToCart = (
    newItem: { name: string; variant: string; quantity: number; unitPrice: number; image: string; category: string },
    sourceElement?: HTMLElement | null
  ) => {
    const itemId = `${newItem.name}-${newItem.variant}`;
    
    // 1. Immediately update cart items state without opening drawer or navigating
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: itemId,
          name: newItem.name,
          variant: newItem.variant,
          quantity: newItem.quantity,
          unitPrice: newItem.unitPrice,
          image: newItem.image,
          category: newItem.category,
        },
      ];
    });

    // 2. Perform flying clone animation if motion is enabled
    if (!shouldReduceMotion) {
      const desktopBtn = document.getElementById('header-cart-button-desktop');
      const mobileBtn = document.getElementById('header-cart-button-mobile');

      let targetX = window.innerWidth - 48;
      let targetY = 32;

      const checkVisible = (el: HTMLElement | null) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        if (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.top >= 0 &&
          window.getComputedStyle(el).display !== 'none' &&
          window.getComputedStyle(el).visibility !== 'hidden'
        ) {
          return rect;
        }
        return null;
      };

      const desktopRect = checkVisible(desktopBtn);
      const mobileRect = checkVisible(mobileBtn);
      const activeRect = desktopRect || mobileRect;

      if (activeRect) {
        targetX = activeRect.left + activeRect.width / 2;
        targetY = activeRect.top + activeRect.height / 2;
      }

      let startX = window.innerWidth / 2;
      let startY = window.innerHeight / 2;

      if (sourceElement) {
        const imgEl = sourceElement.querySelector('img') || sourceElement;
        const rect = imgEl.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
      }

      const flyId = `${Date.now()}-${Math.random()}`;
      setFlyingItems((prev) => [
        ...prev,
        {
          id: flyId,
          image: newItem.image,
          startX,
          startY,
          targetX,
          targetY,
        },
      ]);
    } else {
      triggerCartBounce();
    }
  };

  const handleFlyComplete = (id: string) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
    triggerCartBounce();
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!customerAddress.fullName.trim()) errors.fullName = 'Please enter your full name';
    
    const cleanPhone = customerAddress.phone.trim();
    if (!cleanPhone) {
      errors.phone = 'Please enter your 10-digit mobile number';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Mobile number must be 10 digits starting with 6, 7, 8, or 9';
    }

    if (!customerAddress.deliveryAddress.trim()) errors.deliveryAddress = 'Please enter farm / village address';
    if (!customerAddress.taluka.trim()) errors.taluka = 'Please enter taluka / tehsil';
    if (!customerAddress.cityDistrict.trim()) errors.cityDistrict = 'Please enter district / city';

    const cleanPincode = customerAddress.pincode.trim();
    if (!cleanPincode) {
      errors.pincode = 'Please enter pincode';
    } else if (!/^\d{6}$/.test(cleanPincode)) {
      errors.pincode = 'Pincode must be exactly 6 digits';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    // Generate formatted WhatsApp message with full order & delivery address details
    let text = `🌾 *NEW ORDER - NAVBHARAT AGRO SERVICES* 🌾\n\n`;
    text += `📦 *ORDERED ITEMS:*\n`;
    cartItems.forEach((item, index) => {
      const lineTotal = item.unitPrice * item.quantity;
      text += `${index + 1}. *${item.name}*\n   • Variant: ${item.variant}\n   • Qty: ${item.quantity} × ₹${item.unitPrice.toLocaleString('en-IN')} = *₹${lineTotal.toLocaleString('en-IN')}*\n\n`;
    });
    text += `------------------------------------\n`;
    text += `💰 *TOTAL FINAL BILL: ₹${totalBillAmount.toLocaleString('en-IN')}*\n`;
    text += `🚚 *DISPATCH:* Direct Farm Delivery\n`;
    text += `------------------------------------\n\n`;
    text += `📍 *DELIVERY & FARM ADDRESS:*\n`;
    text += `👤 *Name:* ${customerAddress.fullName.trim()}\n`;
    text += `📞 *Phone / WhatsApp:* ${customerAddress.phone.trim()}\n`;
    text += `🏡 *Address:* ${customerAddress.deliveryAddress.trim()}\n`;
    text += `🏛️ *Taluka / Tehsil:* ${customerAddress.taluka.trim()}\n`;
    text += `🏙️ *District / City:* ${customerAddress.cityDistrict.trim()}\n`;
    text += `📮 *Pincode:* ${customerAddress.pincode.trim()}\n`;
    if (customerAddress.landmark.trim()) {
      text += `🚩 *Landmark / Instructions:* ${customerAddress.landmark.trim()}\n`;
    }
    text += `\nPlease confirm order acceptance and delivery dispatch schedule. Thank you!`;

    const whatsappUrl = `https://wa.me/918237795424?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setCheckoutStep('success');
  };

  const scrollToProducts = (filterKey?: string) => {
    if (filterKey) {
      setActiveFilter(filterKey);
    }
    const elem = document.getElementById("store-products");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredProducts = activeFilter === "All"
    ? STORE_PRODUCTS
    : STORE_PRODUCTS.filter(p => p.category === activeFilter);

  const filterTabs = [
    { label: "All Products", key: "All" },
    { label: "Cattle Feed", key: "Cattle Feed" },
    { label: "Calcium", key: "Calcium Supplement" },
    { label: "Chelated Minerals", key: "Chelated Minerals" },
    { label: "Silage", key: "Fermented Silage" },
    { label: "Reproductive & Care", key: "Reproductive Support" },
  ];

  return (
    <div className="w-full min-h-screen font-['Inter',sans-serif] bg-[#EFFDF0]">
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#EFFDF0]/90 backdrop-blur-md py-3 px-2 sm:px-4 border-b border-[#123814]/10 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl flex items-center justify-between border border-[#123814]/10 shadow-sm">
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <img
              src={getAssetUrl("/Whitte Circle logo(3).png")}
              alt="Navbharat Agro Services Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full shadow-sm"
            />
            <span className="font-extrabold text-base sm:text-xl text-[#123814] tracking-tight">
              Navbharat Store
            </span>
          </div>

          <nav className="hidden lg:flex items-center justify-end gap-6 w-full ml-6">
            <Button
              variant="link"
              onClick={onNavigateHome}
              className="cursor-pointer text-[#123814] hover:text-[#E86A10] font-semibold"
            >
              Home
            </Button>
            <Button
              variant="link"
              onClick={onNavigateAbout}
              className="cursor-pointer text-[#123814] hover:text-[#E86A10] font-semibold"
            >
              About Us
            </Button>
            <Button
              variant="link"
              onClick={() => scrollToProducts("All")}
              className="cursor-pointer text-[#123814] hover:text-[#E86A10] font-bold"
            >
              All Products
            </Button>
            <Button variant="ghost" size="icon" onClick={() => scrollToProducts("All")} className="cursor-pointer hover:text-[#E86A10]">
              <Search className="w-5 h-5" />
            </Button>

            {/* Desktop Navbar Cart Button with Bounce & Badge */}
            <motion.button
              id="header-cart-button-desktop"
              type="button"
              onClick={() => setIsCartOpen(true)}
              animate={isCartBouncing ? { scale: [1, 1.35, 0.88, 1.15, 1], rotate: [0, -8, 8, -4, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="cursor-pointer relative p-2.5 rounded-full hover:bg-black/5 text-[#123814] hover:text-[#E86A10] transition-colors focus-visible:outline-2 focus-visible:outline-[#E86A10] select-none"
              aria-label={`Open shopping cart, ${totalCartCount} items`}
            >
              <ShoppingBasket className="w-5 h-5 text-[#123814]" />
              {totalCartCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-5 h-5 bg-[#E86A10] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md transition-transform duration-200 ${isCartBouncing ? 'scale-125' : 'scale-100'}`}>
                  {totalCartCount}
                </span>
              )}
            </motion.button>
          </nav>

          {/* Mobile Right Navigation: Cart Button + Sheet Nav */}
          <div className="flex lg:hidden items-center gap-1.5 ml-auto">
            <motion.button
              id="header-cart-button-mobile"
              type="button"
              onClick={() => setIsCartOpen(true)}
              animate={isCartBouncing ? { scale: [1, 1.35, 0.88, 1.15, 1], rotate: [0, -8, 8, -4, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="cursor-pointer relative p-2 rounded-full hover:bg-black/5 text-[#123814] hover:text-[#E86A10] transition-colors focus-visible:outline-2 focus-visible:outline-[#E86A10] select-none"
              aria-label={`Open shopping cart, ${totalCartCount} items`}
            >
              <ShoppingBasket className="w-5 h-5 text-[#123814]" />
              {totalCartCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#E86A10] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs transition-transform duration-200 ${isCartBouncing ? 'scale-125' : 'scale-100'}`}>
                  {totalCartCount}
                </span>
              )}
            </motion.button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:text-[#E86A10]">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 bg-white/95 backdrop-blur-md">
              <SheetHeader className="p-6 text-left border-b">
                <SheetTitle className="flex items-center gap-3">
                  <img src={getAssetUrl("/Whitte Circle logo(3).png")} alt="Logo" className="w-10 h-10 object-contain rounded-full" />
                  <span className="text-lg font-bold text-[#123814]">Navbharat Store</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6 space-y-1">
                <Button variant="ghost" onClick={onNavigateHome} className="justify-start px-2 h-12 text-base font-medium">
                  Home
                </Button>
                <Button variant="ghost" onClick={onNavigateAbout} className="justify-start px-2 h-12 text-base font-medium">
                  About Us
                </Button>
                <Button variant="ghost" onClick={() => scrollToProducts("All")} className="justify-start px-2 h-12 text-base font-medium font-bold text-[#123814]">
                  Products Catalog
                </Button>
              </nav>
              <Separator className="mx-6" />
              <div className="p-6 flex flex-col gap-4">
                <Button variant="outline" onClick={() => scrollToProducts("All")} className="justify-start gap-2 h-12">
                  <Search className="w-4 h-4" />
                  Search Products
                </Button>
                <Button variant="outline" onClick={() => setIsCartOpen(true)} className="justify-start gap-2 h-12 relative">
                  <ShoppingBasket className="w-4 h-4" />
                  Cart Items
                  <span className="absolute right-3 w-5 h-5 bg-[#E86A10] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalCartCount}
                  </span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>

      {/* Main Page Scrollable Content */}
      <main className="w-full relative container px-2 sm:px-4 mx-auto max-w-7xl pb-12">
        {/* Store Hero Banner */}
        <div className="mt-4 bg-[#EFFDF0] border-2 border-[#123814]/15 rounded-3xl relative shadow-xl overflow-hidden p-6 sm:p-10">
          <motion.section
            className="w-full px-4 py-4 sm:py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mx-auto text-center max-w-3xl">
              <motion.h1
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-tight text-[#123814]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <span>Premium Dairy Nutrition</span>
                <br />
                <span className="text-[#E86A10]">Directly To Your Farm</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg text-[#1e4d21] max-w-2xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                Explore our complete range of high-yield cattle feeds, chelated minerals, liquid calcium supplements, and premium maize silage formulated for healthy dairy herds.
              </motion.p>
            </div>
          </motion.section>
        </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mt-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            className="group relative bg-white border-2 border-[#123814]/15 rounded-3xl p-6 min-h-[260px] w-full overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-[#123814]/30 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            onClick={() => scrollToProducts(category.filterKey)}
          >
            <div className="relative z-20">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#123814] group-hover:text-[#E86A10] transition-colors duration-300">
                {category.title}
              </h2>
              <p className="text-xs text-gray-600 font-medium mt-1">
                {category.subtitle}
              </p>
              <div className="mt-6 flex items-center justify-center p-2">
                <img
                  src={getAssetUrl(category.image)}
                  alt={category.title}
                  className="w-auto h-36 max-h-36 object-contain group-hover:scale-110 transition-all duration-500 drop-shadow-md"
                />
              </div>
              <div className="absolute bottom-3 right-3 w-10 h-10 bg-[#123814] text-white rounded-full flex items-center justify-center group-hover:bg-[#E86A10] group-hover:scale-110 transition-all duration-300 shadow-md">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Store Products Reveal Cards Section */}
      <div id="store-products" className="mt-14 mb-10 max-w-7xl mx-auto px-2 scroll-mt-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E86A10] bg-[#E86A10]/10 px-3 py-1 rounded-full border border-[#E86A10]/20">
            Complete Dairy Nutrition Range
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123814] tracking-tight mt-3">
            Explore All Store Products
          </h2>
          <p className="text-sm text-[#1e4d21] font-medium mt-2 leading-relaxed">
            Select a category filter or hover over any product card to select variant, set quantity, and add to cart with real-time billing!
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeFilter === tab.key
                    ? "bg-[#123814] text-white shadow-md scale-105"
                    : "bg-white text-[#123814] border border-[#123814]/20 hover:border-[#123814]/50 hover:bg-[#EFFDF0]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductRevealCard
              key={product.name}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </main>

      {/* Slide-out Cart & Delivery Address Drawer */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right" className="w-[340px] sm:w-[480px] p-0 bg-white/98 backdrop-blur-xl flex flex-col justify-between border-l-2 border-[#123814]/20">
          <div>
            <SheetHeader className="p-5 sm:p-6 border-b border-[#123814]/10 bg-[#EFFDF0]">
              <SheetTitle className="flex items-center justify-between">
                {checkoutStep === 'address' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCheckoutStep('cart')}
                      className="p-1 rounded-full hover:bg-black/5 text-[#123814] transition-colors cursor-pointer"
                      aria-label="Back to cart"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <span className="text-[#123814] font-extrabold text-base sm:text-lg flex items-center gap-1.5">
                      <MapPin className="w-4.5 h-4.5 text-[#E86A10]" />
                      Delivery & Farm Address
                    </span>
                  </div>
                ) : checkoutStep === 'success' ? (
                  <div className="flex items-center gap-2 text-[#123814] font-extrabold text-base sm:text-lg">
                    <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                    <span>Order Placed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[#123814] font-extrabold text-base sm:text-lg">
                    <ShoppingBasket className="w-5 h-5 text-[#E86A10]" />
                    <span>Your Shopping Cart</span>
                  </div>
                )}
                {checkoutStep === 'cart' && totalCartCount > 0 && (
                  <span className="bg-[#E86A10] text-white text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                    {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'}
                  </span>
                )}
              </SheetTitle>
            </SheetHeader>

            {/* STEP 1: CART ITEMS LIST */}
            {checkoutStep === 'cart' && (
              <div className="p-4 sm:p-6 space-y-4 max-h-[55vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <ShoppingBasket className="w-12 h-12 text-gray-300 mx-auto" />
                    <p className="text-sm font-bold text-gray-600">Your cart is currently empty</p>
                    <Button
                      onClick={() => {
                        setIsCartOpen(false);
                        scrollToProducts();
                      }}
                      className="bg-[#123814] hover:bg-[#1a4d1d] text-white rounded-full px-5 py-2 text-xs font-bold cursor-pointer"
                    >
                      Browse Store Products
                    </Button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const lineTotal = item.unitPrice * item.quantity;
                    return (
                      <div key={item.id} className="flex items-center justify-between bg-[#EFFDF0]/80 p-3 sm:p-3.5 rounded-2xl border border-[#123814]/15 shadow-xs">
                        <div className="flex items-center gap-3">
                          <img src={getAssetUrl(item.image)} alt={item.name} className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-xl bg-white p-1 border border-[#123814]/10 shadow-xs" />
                          <div>
                            <h5 className="font-extrabold text-xs text-[#123814] leading-snug">{item.name}</h5>
                            <p className="text-[11px] font-bold text-[#E86A10]">Variant: {item.variant}</p>
                            <p className="text-[11px] font-bold text-[#123814]">₹{item.unitPrice.toLocaleString('en-IN')} × {item.quantity} = <span className="text-[#E86A10] font-black">₹{lineTotal.toLocaleString('en-IN')}</span></p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-white border border-[#123814]/20 rounded-full px-1 py-0.5 shadow-xs">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#123814] flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-extrabold text-[#123814]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#123814] flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveCartItem(item.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* STEP 2: DELIVERY ADDRESS FORM */}
            {checkoutStep === 'address' && (
              <form onSubmit={handleProceedToWhatsApp} id="checkout-form" className="p-4 sm:p-6 space-y-3.5 max-h-[62vh] sm:max-h-[68vh] overflow-y-auto pb-8">
                <div className="bg-[#EFFDF0] p-3 rounded-xl border border-[#123814]/15 flex items-center justify-between text-xs font-bold text-[#123814]">
                  <span>Items: <span className="text-[#E86A10]">{totalCartCount}</span></span>
                  <span>Total Amount: <span className="text-[#E86A10] text-sm font-black">₹{totalBillAmount.toLocaleString('en-IN')}</span></span>
                </div>

                {/* Full Name Field */}
                <div>
                  <label className="block text-xs font-extrabold text-[#123814] mb-1">
                    Farmer / Customer Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Sahil Shipurkar"
                      value={customerAddress.fullName}
                      onChange={(e) => {
                        setCustomerAddress({ ...customerAddress, fullName: e.target.value });
                        if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                        formErrors.fullName ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#123814]/20'
                      }`}
                    />
                  </div>
                  {formErrors.fullName && <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.fullName}</p>}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className="block text-xs font-extrabold text-[#123814] mb-1">
                    WhatsApp / Mobile Number (10 digits) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="e.g. 9823456789"
                      value={customerAddress.phone}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setCustomerAddress({ ...customerAddress, phone: digits });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                        formErrors.phone ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#123814]/20'
                      }`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.phone}</p>}
                </div>

                {/* Farm / Delivery Address Field */}
                <div>
                  <label className="block text-xs font-extrabold text-[#123814] mb-1">
                    Delivery Address / Farm Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <textarea
                      rows={2}
                      placeholder="Farm Name / House No., Village / Area"
                      value={customerAddress.deliveryAddress}
                      onChange={(e) => {
                        setCustomerAddress({ ...customerAddress, deliveryAddress: e.target.value });
                        if (formErrors.deliveryAddress) setFormErrors({ ...formErrors, deliveryAddress: '' });
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 resize-none ${
                        formErrors.deliveryAddress ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#123814]/20'
                      }`}
                    />
                  </div>
                  {formErrors.deliveryAddress && <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.deliveryAddress}</p>}
                </div>

                {/* Taluka & District Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold text-[#123814] mb-1">
                      Taluka / Tehsil <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g. Karveer / Shirol"
                        value={customerAddress.taluka}
                        onChange={(e) => {
                          setCustomerAddress({ ...customerAddress, taluka: e.target.value });
                          if (formErrors.taluka) setFormErrors({ ...formErrors, taluka: '' });
                        }}
                        className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                          formErrors.taluka ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#123814]/20'
                        }`}
                      />
                    </div>
                    {formErrors.taluka && <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.taluka}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#123814] mb-1">
                      District / City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g. Kolhapur"
                        value={customerAddress.cityDistrict}
                        onChange={(e) => {
                          setCustomerAddress({ ...customerAddress, cityDistrict: e.target.value });
                          if (formErrors.cityDistrict) setFormErrors({ ...formErrors, cityDistrict: '' });
                        }}
                        className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                          formErrors.cityDistrict ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#123814]/20'
                        }`}
                      />
                    </div>
                    {formErrors.cityDistrict && <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.cityDistrict}</p>}
                  </div>
                </div>

                {/* Pincode Field */}
                <div>
                  <label className="block text-xs font-extrabold text-[#123814] mb-1">
                    Pincode (6 digits) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 416001"
                    maxLength={6}
                    value={customerAddress.pincode}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setCustomerAddress({ ...customerAddress, pincode: digits });
                      if (formErrors.pincode) setFormErrors({ ...formErrors, pincode: '' });
                    }}
                    className={`w-full px-3 py-2 text-xs rounded-xl border bg-white focus:outline-none focus:ring-2 ${
                      formErrors.pincode ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-[#123814]/20'
                    }`}
                  />
                  {formErrors.pincode && <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.pincode}</p>}
                </div>

                {/* Landmark / Notes (Optional) */}
                <div className="pb-2">
                  <label className="block text-xs font-extrabold text-[#123814] mb-1">
                    Landmark / Delivery Instructions <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Primary School / Milk Dairy / Temple"
                    value={customerAddress.landmark}
                    onChange={(e) => setCustomerAddress({ ...customerAddress, landmark: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#123814]/20"
                  />
                </div>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS STATE */}
            {checkoutStep === 'success' && (
              <div className="p-6 text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-[#123814]">Order Details Sent!</h4>
                  <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto leading-relaxed">
                    Your complete order and delivery address have been sent to our WhatsApp team. We will confirm your delivery dispatch schedule shortly.
                  </p>
                </div>
                <div className="bg-[#EFFDF0] p-4 rounded-2xl border border-[#123814]/15 text-left text-xs space-y-1.5 font-medium text-[#123814]">
                  <p>👤 <strong>Recipient:</strong> {customerAddress.fullName}</p>
                  <p>📞 <strong>Phone:</strong> {customerAddress.phone}</p>
                  <p>📍 <strong>Deliver To:</strong> {customerAddress.deliveryAddress}, Tal. {customerAddress.taluka}, Dist. {customerAddress.cityDistrict} ({customerAddress.pincode})</p>
                  {customerAddress.landmark && <p>🚩 <strong>Landmark:</strong> {customerAddress.landmark}</p>}
                  <p>💰 <strong>Total Amount:</strong> <span className="font-bold text-[#E86A10]">₹{totalBillAmount.toLocaleString('en-IN')}</span></p>
                </div>
                <Button
                  onClick={() => {
                    setCartItems([]);
                    setCheckoutStep('cart');
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-[#123814] hover:bg-[#1a4d1d] text-white rounded-full py-3 text-xs font-bold shadow-md cursor-pointer"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>

          {/* Drawer Footer Buttons */}
          {cartItems.length > 0 && checkoutStep !== 'success' && (
            <div className="p-4 sm:p-6 border-t-2 border-[#123814]/15 bg-[#EFFDF0] space-y-3">
              {checkoutStep === 'cart' && (
                <>
                  <div className="bg-white p-3.5 rounded-2xl border border-[#123814]/15 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                      <span>Subtotal ({totalCartCount} items):</span>
                      <span className="font-bold text-[#123814]">₹{totalBillAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                      <span>Farm Delivery Dispatch:</span>
                      <span className="font-bold text-[#25D366]">Standard Delivery</span>
                    </div>
                    <Separator className="my-1 bg-[#123814]/10" />
                    <div className="flex items-center justify-between text-sm font-extrabold text-[#123814]">
                      <span className="flex items-center gap-1.5">
                        <Receipt className="w-4 h-4 text-[#E86A10]" />
                        Total Final Bill:
                      </span>
                      <span className="text-[#E86A10] font-black text-lg">₹{totalBillAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep('address')}
                    className="w-full bg-[#123814] hover:bg-[#1a4d1d] text-white py-3.5 rounded-full font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <span>Enter Delivery Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {checkoutStep === 'address' && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleProceedToWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#1eb956] text-white py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <MessageSquare className="w-4.5 h-4.5 fill-white shrink-0" />
                    <span>Send Order Details on WhatsApp (₹{totalBillAmount.toLocaleString('en-IN')})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full text-center text-xs font-bold text-gray-600 hover:text-[#123814] transition-colors py-1 cursor-pointer"
                  >
                    ← Back to Cart Items
                  </button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Floating Visual Clone Add-to-Cart Flight Animation Layer */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {flyingItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                position: "fixed",
                left: item.startX,
                top: item.startY,
                x: "-50%",
                y: "-50%",
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                left: item.targetX,
                top: item.targetY,
                scale: 0.18,
                opacity: [1, 1, 0.9, 0],
              }}
              exit={{ opacity: 0, scale: 0.05 }}
              transition={{
                duration: 1.5, // Smooth pace
                ease: [0.22, 0.8, 0.28, 1], // Smooth direct path
                opacity: {
                  duration: 1.5,
                  times: [0, 0.75, 0.92, 1],
                  ease: "easeInOut",
                },
              }}
              onAnimationComplete={() => handleFlyComplete(item.id)}
              className="w-18 h-18 sm:w-22 sm:h-22 bg-white rounded-2xl p-2.5 border-2 border-[#E86A10] shadow-[0_16px_36px_rgba(232,106,16,0.4)] flex items-center justify-center backdrop-blur-md ring-4 ring-[#E86A10]/25 pointer-events-none"
            >
              <img
                src={getAssetUrl(item.image)}
                alt=""
                className="w-full h-full object-contain drop-shadow-md"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 
