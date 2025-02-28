import React, { useState, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { useCollisionDetection } from "@/sections/home/hooks/useCollisionDetection";

const Coin = memo(({id, initialX, onCollected, amount, duration = 3 }: {id: any; initialX: number; onCollected: (id: number) => void; amount?: string; duration?: number; }) => {
  const [opacity, setOpacity] = useState(1);
  const coinRef = useRef<HTMLDivElement>(null);
  // const isColliding = useCollisionDetection(coinRef);
  
  // useEffect(() => {
  //   if (isColliding) {
  //     onCollected(id);
  //   }
  // }, [isColliding, id, onCollected]);

  return (
    <motion.div
      ref={coinRef}
      initial={{ x: initialX, y: 0, opacity: 1 }}
      animate={{
        y: [0, '20rem', '23rem', '25rem'],
        opacity: [1, 1, 0.3, 0],
    }}
      transition={{
        times: [0, 0.8, 0.9, 1],
        duration: duration,
        ease: "linear",
      }}
      onUpdate={(latest) => {
        // if (typeof latest.y === 'string' && latest.y.endsWith('rem')) {
        //   const currentDvh = parseFloat(latest.y);
        //   if (currentDvh > 23) {
        //     setOpacity(0.3);
        //   }
        // }
      }}
      onAnimationComplete={() => {
        console.log('Coin animation completed!');
        onCollected(id);
      }}
      className="flex flex-col items-center justify-center"
      style={{
        position: "absolute",
        width: "82px",
        textAlign: "center",
      }}
    >
      <motion.div
        className="font-cherryBomb text-[26px] font-[400] leading-[26px] text-left underline-[from-font] text-decoration-skip-ink-[none] text-stroke-2"
        style={{
          color: "#F7F9EA",
          marginBottom: "5px",
          opacity,
        }}
      >
        +{amount || '0'}
      </motion.div>
      <motion.div
        style={{
          width: "40px",
          height: "40px",
          background: "url('/svg/coin.svg') no-repeat center",
          backgroundSize: "contain",
          opacity,
        }}
      />
    </motion.div>
  );
});

export default Coin;