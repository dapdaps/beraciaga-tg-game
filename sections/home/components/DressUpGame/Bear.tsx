import React from 'react';
import IconSit from '@public/svg/dressup/bears/sit.svg';
import IconStand from '@public/svg/dressup/bears/stand.svg';
import IconHead from '@public/svg/dressup/bears/head.svg';
import { BearProps, BEAR_FACES, DEFAULT_COLORS, bearColors } from './config';



const Bear: React.FC<BearProps> = ({ 
  colors = DEFAULT_COLORS, 
  level = 0,
  face = 1,
}) => {

  const safeface = face in BEAR_FACES ? face : 1;
  const FaceComponent = BEAR_FACES[safeface as keyof typeof BEAR_FACES];


  const bearColor = bearColors[level] || DEFAULT_COLORS;

  return (
    <g id="bear" fill="none">
      <svg 
        width="360" 
        height="340" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {level <= 1 ? (
          <IconStand 
            style={{ 
              color: bearColor.primary,
            }}
          />
        ) : (
            <IconSit 
              style={{ 
                color: bearColor.primary,
              }}
            />
        )}
        <IconHead 
          style={{ 
            color: bearColor.primary,
            '--ear-color': bearColor.tertiary,
          } as React.CSSProperties}
        />

        <g transform="translate(82,70)">
          <FaceComponent 
            style={{ 
              color: bearColor.secondary,
              '--eyebrow-color': bearColor.eyebrow,
            }}
          />
        </g>
      </svg>
    </g>
  );
};

export default Bear;
