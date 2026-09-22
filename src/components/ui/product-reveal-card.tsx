"use client" 
import { motion, useReducedMotion } from "framer-motion" 
import { buttonVariants } from "@/components/ui/button" 
import { ShoppingCart, Star, Heart, Plus, Minus, Eye, Check, X, CheckCircle2, MessageSquare } from "lucide-react" 
import { useState } from "react" 
import { cn } from "@/lib/utils" 

export interface ProductRevealCardProps { 
  name?: string 
  price?: string | number
  originalPrice?: string 
  image?: string 
  description?: string 
  rating?: number 
  reviewCount?: number 
  category?: string
  subtitle?: string
  packaging?: string
  idealFor?: string
  form?: string
  variants?: string[]
  variantPrices?: Record<string, number>
  highlights?: string[]
  usage?: string
  importantNote?: string
  onAddToCart?: (item: { name: string; variant: string; quantity: number; unitPrice: number; image: string; category: string }) => void 
  onViewDetails?: () => void 
  onFavorite?: () => void 
  enableAnimations?: boolean 
  className?: string 
} 

export function ProductRevealCard({ 
  name = "DUGDHSAMRUDHI SARKI PEND", 
  price = "1800", 
  originalPrice, 
  image = "/sarkhi.png", 
  description = "Dugdhsamrudhi Sarki Pend is a cattle feed solution designed for dairy farmers looking to provide balanced nutritional support to their milking animals.", 
  rating = 4.9, 
  reviewCount = 124, 
  category = "Cattle Feed",
  subtitle = "Cattle Feed for Dairy Animals",
  packaging = "40 kg Bag",
  idealFor = "🐄 Cows • 🐃 Buffaloes",
  form = "Solid Cake",
  variants = ["40 kg Bag"],
  variantPrices = { "40 kg Bag": 1800 },
  highlights = [
    "Designed specifically for milking dairy animals",
    "Supports nutritional requirements during peak lactation",
    "Suitable for regular dairy management & commercial operations",
    "Available in convenient bulk packaging"
  ],
  usage = "50 g per animal daily. For every additional 1 litre of capacity, increase the dosage by 5 g.",
  importantNote,
  onAddToCart,
  onViewDetails,
  onFavorite, 
  enableAnimations = true, 
  className, 
}: ProductRevealCardProps) { 
  const [isFavorite, setIsFavorite] = useState(false) 
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || packaging)
  const [quantity, setQuantity] = useState(1)
  const [addedSuccess, setAddedSuccess] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentUnitPrice = variantPrices[selectedVariant] || (typeof price === 'number' ? price : parseInt(price.replace(/[^0-9]/g, '')) || 0)

  const shouldReduceMotion = useReducedMotion() 
  const shouldAnimate = enableAnimations && !shouldReduceMotion 
 
  const handleFavorite = () => { 
    setIsFavorite(!isFavorite) 
    onFavorite?.() 
  }

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        name,
        variant: selectedVariant,
        quantity,
        unitPrice: currentUnitPrice,
        image,
        category,
      })
    }
    setAddedSuccess(true)
    setTimeout(() => setAddedSuccess(false), 1800)
  }

  const handleOpenDetails = () => {
    setIsModalOpen(true)
    if (onViewDetails) {
      onViewDetails()
    }
  }
 
  const containerVariants = { 
    rest: {  
      scale: 1, 
      y: 0, 
      filter: "blur(0px)", 
    }, 
    hover: shouldAnimate ? {  
      scale: 1.03,  
      y: -8, 
      filter: "blur(0px)", 
      transition: {  
        type: "spring",  
        stiffness: 300,  
        damping: 30, 
        mass: 0.8, 
      } 
    } : {}, 
  } 
 
  const imageVariants = { 
    rest: { scale: 1 }, 
    hover: { scale: 1.08 }, 
  } 
 
  const overlayVariants = { 
    rest: {  
      y: "100%",  
      opacity: 0, 
      filter: "blur(4px)", 
    }, 
    hover: {  
      y: "0%",  
      opacity: 1, 
      filter: "blur(0px)", 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 28, 
        mass: 0.6, 
        staggerChildren: 0.08, 
        delayChildren: 0.08, 
      }, 
    }, 
  } 
 
  const contentVariants = { 
    rest: {  
      opacity: 0,  
      y: 15, 
      scale: 0.96, 
    }, 
    hover: {  
      opacity: 1,  
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25, 
        mass: 0.5, 
      }, 
    }, 
  } 
 
  const buttonVariants_motion = { 
    rest: { scale: 1, y: 0 }, 
    hover: shouldAnimate ? {  
      scale: 1.03,  
      y: -2, 
      transition: {  
        type: "spring",  
        stiffness: 400,  
        damping: 25  
      } 
    } : {}, 
    tap: shouldAnimate ? { scale: 0.95 } : {}, 
  } 
 
  const favoriteVariants = { 
    rest: { scale: 1, rotate: 0 }, 
    favorite: {  
      scale: [1, 1.3, 1],  
      rotate: [0, 10, -10, 0], 
      transition: {  
        duration: 0.5, 
        ease: "easeInOut" 
      } 
    }, 
  } 
 
  return ( 
    <>
      <motion.div 
        data-slot="product-reveal-card" 
        initial="rest" 
        whileHover="hover" 
        variants={containerVariants} 
        className={cn( 
          "relative w-full max-w-sm rounded-3xl border-2 border-[#123814]/15 bg-white text-card-foreground overflow-hidden", 
          "shadow-lg shadow-black/5 cursor-pointer group flex flex-col justify-between", 
          className 
        )} 
      > 
        {/* Image Container */} 
        <div className="relative overflow-hidden bg-[#EFFDF0]/60 p-6 flex items-center justify-center h-60"> 
          <motion.img 
            src={image} 
            alt={name} 
            className="h-44 w-auto max-w-full object-contain drop-shadow-md" 
            variants={imageVariants} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }} 
          /> 
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" /> 
           
          {/* Favorite Button */} 
          <motion.button 
            onClick={(e) => {
              e.stopPropagation();
              handleFavorite();
            }} 
            variants={favoriteVariants} 
            animate={isFavorite ? "favorite" : "rest"} 
            className={cn( 
              "absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border border-[#123814]/10 shadow-sm z-10", 
              isFavorite  
                ? "bg-red-500 text-white"  
                : "bg-white/80 text-[#123814] hover:bg-white" 
            )} 
          > 
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} /> 
          </motion.button> 
   
          {/* Category Badge */} 
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: -20 }} 
            animate={{ opacity: 1, scale: 1, x: 0 }} 
            transition={{ delay: 0.2 }} 
            className="absolute top-4 left-4 bg-[#123814] text-white px-3 py-1 rounded-full text-xs font-extrabold tracking-wide shadow-sm" 
          > 
            {category} 
          </motion.div> 
        </div> 
   
        {/* Content */} 
        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between"> 
          <div>
            {/* Rating & Price Badge */} 
            <div className="flex items-center justify-between gap-2 mb-1.5"> 
              <div className="flex items-center gap-1"> 
                {[...Array(5)].map((_, i) => ( 
                  <Star 
                    key={i} 
                    className={cn( 
                      "w-3.5 h-3.5", 
                      i < Math.floor(rating)  
                        ? "text-yellow-400 fill-current"  
                        : "text-muted-foreground" 
                    )} 
                  /> 
                ))} 
                <span className="text-xs font-semibold text-gray-500 ml-1"> 
                  {rating} 
                </span> 
              </div>

              {/* Price Tag Badge */}
              <div className="bg-[#123814] text-white px-3 py-1 rounded-full text-xs font-black shadow-xs">
                ₹{currentUnitPrice.toLocaleString('en-IN')}
              </div>
            </div> 
     
            {/* Product Info */} 
            <div className="space-y-1"> 
              <motion.h3  
                className="text-lg font-extrabold text-[#123814] leading-snug tracking-tight" 
                initial={{ opacity: 0.9 }} 
                whileHover={{ opacity: 1 }} 
                transition={{ duration: 0.3 }} 
              > 
                {name} 
              </motion.h3> 
              <p className="text-xs font-semibold text-[#E86A10]">{subtitle}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#123814]/10 flex items-center justify-between"> 
            <span className="text-xs font-bold text-[#123814] bg-[#EFFDF0] px-3 py-1 rounded-full border border-[#123814]/15">
              📦 {packaging}
            </span> 
            <span className="text-xs font-extrabold text-[#E86A10]">
              ₹{currentUnitPrice.toLocaleString('en-IN')}
            </span>
          </div> 
        </div> 
   
        {/* Reveal Overlay */} 
        <motion.div 
          variants={overlayVariants} 
          className="absolute inset-0 bg-[#EFFDF0]/98 backdrop-blur-xl flex flex-col justify-between p-5 z-20 border-2 border-[#123814]/20 rounded-3xl" 
        > 
          <div className="space-y-3"> 
            {/* Product Header & Category */} 
            <motion.div variants={contentVariants}> 
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E86A10] bg-[#E86A10]/10 px-2.5 py-0.5 rounded-full">
                  {category}
                </span>
                <span className="text-xs font-extrabold text-[#123814]">₹{currentUnitPrice.toLocaleString('en-IN')}</span>
              </div>
              <h4 className="font-extrabold text-[#123814] text-base leading-snug">{name}</h4> 
            </motion.div> 
   
            {/* Variant Selection Options */} 
            <motion.div variants={contentVariants} className="space-y-1.5"> 
              <label className="text-xs font-bold text-[#123814] block">
                Select Variant / Size:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariant(v);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border flex items-center gap-1",
                      selectedVariant === v
                        ? "bg-[#123814] text-white border-[#123814] shadow-sm"
                        : "bg-white text-[#123814] border-[#123814]/20 hover:border-[#123814]/60"
                    )}
                  >
                    <span>{v}</span>
                    <span className={selectedVariant === v ? "text-white/80" : "text-[#E86A10]"}>
                      ₹{(variantPrices[v] || currentUnitPrice).toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div> 

            {/* Quantity Selector Counter & Total Price */}
            <motion.div variants={contentVariants} className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs font-bold text-[#123814] block">Quantity:</span>
                <span className="text-[11px] font-extrabold text-[#E86A10]">
                  Total: ₹{(currentUnitPrice * quantity).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center bg-white border border-[#123814]/20 rounded-full p-1 shadow-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity((q) => Math.max(1, q - 1));
                  }}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-[#123814] flex items-center justify-center font-bold cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-extrabold text-[#123814]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity((q) => q + 1);
                  }}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-[#123814] flex items-center justify-center font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div> 

          {/* Action Buttons: Add to Cart & View Details */} 
          <motion.div variants={contentVariants} className="space-y-2 mt-3"> 
            <motion.button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }} 
              variants={buttonVariants_motion} 
              initial="rest" 
              whileHover="hover" 
              whileTap="tap" 
              className={cn( 
                buttonVariants({ variant: "default" }),  
                "w-full h-11 font-bold text-sm rounded-full cursor-pointer transition-all", 
                addedSuccess
                  ? "bg-[#25D366] text-white"
                  : "bg-gradient-to-r from-[#E86A10] to-[#E86A10]/90 hover:from-[#d05c0b] hover:to-[#E86A10] text-white shadow-md shadow-[#E86A10]/20", 
                "flex items-center justify-center gap-2" 
              )} 
            > 
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  Added to Cart! (₹{(currentUnitPrice * quantity).toLocaleString('en-IN')})
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> 
                  Add to Cart • ₹{(currentUnitPrice * quantity).toLocaleString('en-IN')}
                </>
              )}
            </motion.button> 
             
            <motion.button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDetails();
              }} 
              variants={buttonVariants_motion} 
              initial="rest" 
              whileHover="hover" 
              whileTap="tap" 
              className={cn( 
                buttonVariants({ variant: "outline" }),  
                "w-full h-10 font-bold text-xs rounded-full border-[#123814]/30 text-[#123814] bg-white hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer" 
              )} 
            > 
              <Eye className="w-3.5 h-3.5 text-[#123814]" /> 
              View Details 
            </motion.button> 
          </motion.div> 
        </motion.div> 
      </motion.div> 

      {/* Product Details Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#123814]/20 shadow-2xl relative p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#123814]/10 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#E86A10] bg-[#E86A10]/10 px-3 py-1 rounded-full border border-[#E86A10]/20">
                  {category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#123814] mt-2">{name}</h3>
                <p className="text-xs font-semibold text-[#E86A10]">{subtitle}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Product Image & Badges */}
            <div className="bg-[#EFFDF0] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-around gap-6 border border-[#123814]/15">
              <img src={image} alt={name} className="h-44 object-contain drop-shadow-lg" />
              <div className="space-y-2 text-xs font-bold text-[#123814]">
                <div className="bg-white px-3 py-1.5 rounded-xl border border-[#123814]/15 shadow-xs flex items-center justify-between gap-4">
                  <span>💰 Price:</span>
                  <span className="text-[#E86A10] font-black text-sm">₹{currentUnitPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl border border-[#123814]/15 shadow-xs">
                  📦 Variant: <span className="text-[#E86A10]">{selectedVariant}</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl border border-[#123814]/15 shadow-xs">
                  🥣 Form: <span className="text-gray-700">{form}</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl border border-[#123814]/15 shadow-xs">
                  🐾 Ideal For: <span className="text-gray-700">{idealFor}</span>
                </div>
              </div>
            </div>

            {/* Product Overview & Description */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-sm text-[#123814]">Product Description</h4>
              <p className="text-xs text-gray-700 leading-relaxed font-medium bg-gray-50 p-4 rounded-xl border border-gray-200">
                {description}
              </p>
            </div>

            {/* Highlights List */}
            {highlights && highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-[#123814]">Key Highlights & Benefits</h4>
                <ul className="space-y-1.5">
                  {highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Usage */}
            {usage && (
              <div className="bg-[#EFFDF0] border border-[#123814]/20 p-4 rounded-2xl space-y-1">
                <h5 className="font-extrabold text-xs text-[#123814]">💡 Recommended Dosage & Usage</h5>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">{usage}</p>
              </div>
            )}

            {importantNote && (
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 font-medium">
                ⚠️ <strong>Note:</strong> {importantNote}
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#123814]/10 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleAdd();
                  setIsModalOpen(false);
                }}
                className="w-full sm:w-1/2 bg-[#E86A10] hover:bg-[#d05c0b] text-white py-3 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart (₹{currentUnitPrice.toLocaleString('en-IN')})
              </button>
              <a
                href={`https://wa.me/918237795424?text=${encodeURIComponent(`Hello Navbharat Agro! I am interested in ordering ${name} (${selectedVariant}) for ₹${currentUnitPrice}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 bg-[#25D366] hover:bg-[#1eb956] text-white py-3 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  ) 
} 
