import { motion, useAnimation } from 'framer-motion'
import { useContext, useEffect } from "react";
import Bear from "@/components/BearDressup/Bear";
import Hat from "@/components/BearDressup/Hat";
import Clothes from "@/components/BearDressup/Clothes";

import { Category } from "@/components/BearDressup/mappings";

import Transportation from "@/components/BearDressup/Transportation";
import Airflow from './Airflows'
import clsx from 'clsx';
import { useGlobalUser } from '@/context/UserContext';
import Glasses from './Glasses';
import Necklace from './Necklace';

const DressUpGame: React.FC<any> = (props) => {
  const { className, style, onClick } = props;

  const { userInfo, userLooksFlattened } = useGlobalUser();

  const { level: userLevel } = userInfo || {};

  const controls = useAnimation()

  useEffect(() => {
    if (!userLevel || !userLooksFlattened?.vehicle || userLooksFlattened?.vehicle?.level < 4) return
    controls.start({
      scaleY: [1, 0.98, 1], 
      transition: {
        duration: 0.4,
        repeat: Infinity, 
        repeatType: "loop", 
        ease: "easeInOut",
      },
    })
  }, [controls, userLevel])


  if (!userLooksFlattened || !userLooksFlattened?.face) return null
  
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
          onClick={onClick}
          style={{ transformOrigin: "center bottom" }}
        >
          <Bear userLooks={userLooksFlattened} />
          {
            userLooksFlattened?.hat && (
              <Hat
                item={userLooksFlattened}
              />
            )
          }
          {
            userLooksFlattened?.clothes && (
              <Clothes 
                clothesItem={userLooksFlattened.clothes}
                vehicleItem={userLooksFlattened?.vehicle}
              />
            )
          }
          {
            userLooksFlattened?.necklace && (
              <Necklace item={userLooksFlattened?.necklace} />
            )
          }
          {
            userLooksFlattened?.glasses && (
              <Glasses item={userLooksFlattened?.glasses} />
            )
          }
          {
            userLooksFlattened?.vehicle && (
              <Transportation 
                item={userLooksFlattened}
              />
            )
          }
        </motion.g>
        {
          userLooksFlattened?.vehicle && userLooksFlattened.vehicle.level >= 4 && (
            <g id="Airflows">
              <Airflow />
            </g>
          )
        }
      </svg>
    </div>
  );
};

export default DressUpGame;
