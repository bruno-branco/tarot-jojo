"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- Data Structure for the Tarot Deck (Corrected) ---
const TAROT_DECK = [
  {
    id: 1,
    name: "O Mago - Freddie Mercury",
    image: "/png/card-1.png",
    description: `
O Mago representa a manifestação, o poder criativo e a capacidade de transformar ideias em realidade. Ele tem todos os elementos à sua disposição e sabe usá-los com maestria, como um verdadeiro alquimista do mundo real. É símbolo de carisma, talento e domínio técnico.

Freddie Mercury foi exatamente isso: um mestre da criação. Sua presença de palco magnética, sua voz única e sua habilidade de unir performance teatral com composições poderosas o tornaram uma figura mágica na história do rock. Como o Mago, Freddie canalizava energia e emoção, transformando-as em arte. Ele tinha domínio sobre sua imagem, sua música e seu público — e por isso, representa com perfeição o arquétipo do Mago.,
`,
  },
  {
    id: 2,
    name: "O Louco - Raul Seixas",
    image: "/png/card-2.png",
    description:
      "O Louco é a carta do início da jornada, do impulso criativo, da liberdade sem amarras e da coragem de ser diferente, mesmo que isso pareça insano aos olhos dos outros. Ele representa aquele que segue seu próprio caminho, mesmo que sem rumo claro, guiado apenas pelo desejo de viver intensamente. Raul Seixas traduz essa energia como ninguém. Conhecido como o “maluco beleza”, ele desafiou normas sociais e musicais com letras que misturavam filosofia, crítica social, misticismo e humor. Sua atitude provocadora, seu espírito livre e sua recusa em se encaixar nos padrões fazem dele a personificação perfeita do Louco — alguém que ousou seguir seu próprio caminho, custe o que custar.",
  },
  {
    id: 3,
    name: "O Imperador – Elvis Presley",
    image: "/png/card-3.png",
    description: `
O Imperador simboliza estrutura, liderança, autoridade e domínio sobre o mundo material. Ele representa a figura do pai, do rei, daquele que estabelece ordem e governa com presença firme. Está ligado ao poder terreno e à construção de uma base sólida.

Elvis Presley, o “Rei do Rock”, é a própria figura imperial dentro da história da música. Com sua presença imponente, ele mudou o cenário cultural e estabeleceu uma nova era no entretenimento. Seu legado influenciou gerações, e sua imagem continua sendo sinônimo de poder, status e influência. Como Imperador, Elvis representa a autoridade conquistada pelo talento e pela inovação — um pilar inabalável no universo do rock.,
`,
  },
  {
    id: 4,
    name: "A Sacerdotisa - Stevie Nicks",
    image: "/png/card-4.png",
    description: `
A Sacerdotisa é símbolo do mistério, da intuição e da sabedoria interior. Ela guarda os segredos do inconsciente e da espiritualidade, conectando o visível ao invisível. É uma figura enigmática, ligada à lua, à magia e ao poder feminino introspectivo.

Stevie Nicks, com sua imagem mística e sua voz hipnótica, incorpora todas essas qualidades. Desde os figurinos esvoaçantes até as letras repletas de simbolismos e espiritualidade, Stevie sempre se apresentou como uma figura quase etérea. Ela representa o lado sensível, intuitivo e mágico do rock, sendo a Sacerdotisa perfeita: aquela que canta as emoções mais profundas com uma força silenciosa e enfeitiçante.
`,
  },
  {
    id: 5,
    name: "A Imperatriz - Rita Lee",
    image: "/png/card-5.png",
    description: `
A Imperatriz é a carta da criatividade fértil, da abundância, do amor, da natureza e da expressão do feminino em sua forma mais plena. Ela é mãe, artista, amante, criadora. Representa o florescimento das ideias e a força da mulher que cria mundos com sua sensibilidade.

Rita Lee foi um furacão criativo que marcou gerações. Como Imperatriz, ela desafiou papéis de gênero, revolucionou a música brasileira com irreverência e inteligência, e foi pioneira em muitos sentidos. Ao mesmo tempo, mostrou seu lado doce, maternal e sensível — sem nunca deixar de ser livre. Rita encarna o poder feminino em toda sua complexidade, e por isso ocupa com maestria o trono da Imperatriz neste baralho.,
`,
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
    <div className="h-screen bg-[#11121C] text-neutral-300 flex flex-col relative overflow-hidden mb-20">
      <div
        className={`w-full text-center py-6 flex-shrink-0 ${isRevealed && currentCardData ? "hidden" : null}`}
      >
        <motion.h1
          className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 font-mostera`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Astros do Rock TAROT
        </motion.h1>
      </div>

      <div className="flex-grow relative flex flex-col items-center justify-center p-4 overflow-y-auto pb-8">
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
              className={`flex flex-col items-center mt-[500px] md:m-0 ${
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

              <p className="text-3xl text-center max-w-md mt-8 text-white font-bold font-monas">
                {currentCardData.name}
              </p>
              <p className="text-neutral-400 text-lg text-center max-w-md mt-4 font-cormorant">
                {currentCardData.description}
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors flex-shrink-0"
                style={{ marginTop: 20, marginBottom: 80 }}
              >
                Tirar outra carta
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
