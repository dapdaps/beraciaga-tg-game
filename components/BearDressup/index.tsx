import { motion, useAnimation } from 'framer-motion'
import { useEffect } from "react";
import { useGameState } from "./useGameState";
import Bear from "@/components/BearDressup/Bear";
import Hat from "@/components/BearDressup/Hat";
import Jacket from "@/components/BearDressup/Jacket";

import Transportation from "@/components/BearDressup/Transportation";
import Airflow from './Airflows'
import clsx from 'clsx';

const DressUpGame: React.FC<any> = (props) => {
  const { className, style } = props;

  const { userItems, bearState, randomizeBearAppearance } = useGameState();

  const currentVehicle = userItems.find(
    (item) => item.category === "cars" && item.isBuyStatus
  );
  const level = 0;
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
    <div
      className={clsx("relative", className)}
      style={style}
    >
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
