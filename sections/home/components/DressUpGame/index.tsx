import { motion, useAnimation } from 'framer-motion'
import { useEffect } from "react";
import { useGameState } from "./useGameState";
import Bear from "@/sections/home/components/DressUpGame/Bear";
import Hat from "@/sections/home/components/DressUpGame/Hat";
import Jacket from "@/sections/home/components/DressUpGame/Jacket";

import Transportation from "@/sections/home/components/DressUpGame/Transportation";
import Airflow from './Airflows'

const DressUpGame: React.FC = () => {
  const { userItems, bearState, randomizeBearAppearance } = useGameState();

  const currentVehicle = userItems.find(
    (item) => item.category === "cars" && item.isBuyStatus
  );
  const level = currentVehicle?.level || 0;
  const controls = useAnimation()

  useEffect(() => {
    if (level < 1) return
    controls.start({
      scaleY: [1, 0.98, 1], 
      transition: {
        duration: 0.4,
        repeat: Infinity, 
        repeatType: "loop", 
        ease: "easeInOut",
      },
    })
  }, [controls, level])
  return (
    <div className="relative">
      <svg
        viewBox="0 0 360 340"
        style={{ width: "22.5rem", height: "21.25rem" }}
      >
        <motion.g 
          id="main" 
          animate={controls}
          style={{ transformOrigin: "center bottom" }}
        >
          <Bear
            colors={bearState.colors}
            level={level}
            face={bearState.currentFace}
          />
          <Hat level={level} />
          <Jacket userItems={userItems} />
          {level > 0 && <Transportation level={level} />}
        </motion.g>
        {level > 0 && <Airflow />}
      </svg>
      {/* <button
          onClick={randomizeBearAppearance}
          className="mt-4 px-4 py-2 bg-[#E49F63] text-white rounded fixed top-[-10dvh] right-0"
          >
          Random Bear
          </button> */}
    </div>
  );
};

export default DressUpGame;
