"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- Data Structure for the Tarot Deck (Corrected) ---
const TAROT_DECK = [
  {
    id: 1,
    name: "The Magician",
    image: "/png/card-1.png",
    description:
      "The Magician is the master of manifestation and resourcefulness. You have all the tools and power you need to turn your visions into reality. It's a sign to take action and apply your will to the world.",
  },
  {
    id: 2,
    name: "The Fool",
    image: "/png/card-2.png",
    description:
      "The Fool represents new beginnings, innocence, and pure spontaneity. Embrace the unknown and take a leap of faith into a new adventure. This is a time of unlimited potential and open roads.",
  },
  {
    id: 3,
    name: "The Emperor",
    image: "/png/card-3.png",
    description:
      "This card represents authority, structure, and control. It signifies a time for strategic thinking and disciplined action to achieve your goals. The Emperor encourages you to establish order and create a solid foundation for your future endeavors.",
  },
  {
    id: 4,
    name: "The High Priestess",
    image: "/png/card-4.png",
    description:
      "This card points to intuition, sacred knowledge, and the subconscious mind. It's a call to trust your inner voice and look beyond the obvious. Secrets may be revealed, and your intuition is your best guide.",
  },
  {
    id: 5,
    name: "The Sun",
    image: "/png/card-5.png",
    description:
      "A card of pure positivity, fun, and success. The Sun brings warmth and clarity, illuminating your path and promising joyful outcomes. It is one of the most uplifting cards in the deck.",
  },
];

// --- Custom Hook for Media Queries ---
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener(); // Set initial state
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [cardStyles, setCardStyles] = useState<
    { rotate: number; x: number; y: number }[]
  >([]);
  const [particleStyles, setParticleStyles] = useState<
    { left: string; top: string; duration: number; delay: number }[]
  >([]);
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsClient(true);
    const deckCount = isMobile ? 0 : 5; // No deck needed for mobile
    const particleCount = isMobile ? 5 : 12;

    const generatedCardStyles = Array.from({ length: deckCount }, () => ({
      rotate: (Math.random() - 0.5) * 15,
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
    }));
    setCardStyles(generatedCardStyles);

    const generatedParticleStyles = Array.from(
      { length: particleCount },
      () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
      }),
    );
    setParticleStyles(generatedParticleStyles);
  }, [isMobile]);

  const handleDrawCard = () => {
    const randomCardId = Math.floor(Math.random() * TAROT_DECK.length) + 1;
    setSelectedCardId(randomCardId);
    setIsRevealed(true);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setSelectedCardId(null);
  };

  const currentCardData =
    TAROT_DECK.find((card) => card.id === selectedCardId) || null;

  return (
    <div className="h-screen bg-[#11121C] text-neutral-300 flex flex-col relative overflow-hidden">
      <div className="w-full text-center py-6 flex-shrink-0">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Astros do Rock TAROT
        </motion.h1>
      </div>

      <div className="flex-grow relative flex flex-col items-center justify-center p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!isRevealed && isClient ? (
            isMobile ? (
              // --- MOBILE: Single card, simple fade transition ---
              <motion.div
                key="mobile-verse"
                className="cursor-pointer"
                onClick={handleDrawCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/png/card-verse.png"
                  alt="Tarot deck"
                  width={280}
                  height={400}
                  className="shadow-2xl shadow-black/50"
                  priority
                />
              </motion.div>
            ) : (
              // --- DESKTOP: Stacked deck, "spread" animation ---
              <div
                key="desktop-deck"
                className="absolute w-[280px] h-[400px] cursor-pointer group"
                onClick={handleDrawCard}
              >
                {cardStyles.map((style, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 will-change-transform"
                    style={{ zIndex: cardStyles.length - index }}
                    initial={{ ...style, opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, rotate: 0, x: 0, y: 0 }}
                    exit={{
                      x: (Math.random() - 0.5) * 1000,
                      y: (Math.random() - 0.5) * 1000,
                      rotate: (Math.random() - 0.5) * 360,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.7, ease: "circOut" }}
                  >
                    <Image
                      src="/png/card-verse.png"
                      alt="Tarot deck"
                      width={280}
                      height={400}
                      className="shadow-2xl shadow-black/50"
                      priority
                    />
                  </motion.div>
                ))}
              </div>
            )
          ) : null}

          {isRevealed && currentCardData && (
            <motion.div
              key="revealed-card"
              className={`flex flex-col items-center ${
                isMobile ? "gap-6 py-4" : "w-full h-full justify-around"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4, delay: isMobile ? 0 : 0.5 }}
            >
              <Image
                src={currentCardData.image}
                alt={currentCardData.name}
                width={320}
                height={460}
                className="shadow-2xl shadow-black/50 flex-shrink-0"
              />
              <p className="text-neutral-400 text-lg text-center max-w-md">
                {currentCardData.description}
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors flex-shrink-0"
              >
                Draw Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {particleStyles.map((style, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/50 rounded-full pointer-events-none"
          style={{ left: style.left, top: style.top }}
          animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: style.duration,
            repeat: Infinity,
            delay: style.delay,
          }}
        />
      ))}
    </div>
  );
}
