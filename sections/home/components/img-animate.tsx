import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { motion } from 'framer-motion';
import Big from 'big.js';

const ImgAnimate = forwardRef<any, any>((props, ref) => {
  const {
    // only number & vh supported
    height,
    bgSrc,
    src,
    duration,
    className,
    style,
    backgroundSize,
  } = props;

  const [ready, setReady] = useState<any>(false);
  const [bgReady, setBgReady] = useState<any>(false);
  const [width, setWidth] = useState<any>();

  const refs = {
    ready,
    width,
  };
  useImperativeHandle(ref, () => refs);

  useEffect(() => {
    const calc = () => {
      setReady(false);
      const img = new Image();
      img.src = src;
      img.onload = () => {
        let _h = height;
        if (typeof height === 'string') {
          _h = Big(window?.innerHeight).div(100).times(parseFloat(height)).toNumber();
        }
        const _width = Big(img.width).div(Big(img.height).div(_h)).toNumber();
        setWidth(_width);
        setReady(true);
      };
    };

    calc();
    window.addEventListener("resize", calc);

    return () => {
      window.removeEventListener("resize", calc);
    };
  }, [src]);

  useEffect(() => {
    setBgReady(false);
    const img = new Image();
    img.src = bgSrc;
    img.onload = () => {
      setBgReady(true);
    };
  }, [bgSrc]);

  return (
    <div className={`${className}`} style={style}>
      {
        ready ? (
          <div className="relative" style={{ height }}>
            {
              bgReady && (
                <motion.div
                  className="h-full bg-repeat-x bg-[auto_100%] will-change-transform"
                  initial={{ width, backgroundImage: `url("${bgSrc}")` }}
                />
              )
            }
            <motion.div
              className="h-full flex items-stretch absolute z-[1] left-0 top-0 bg-repeat-x will-change-transform"
              initial={{
                width: width * 2,
                backgroundSize: backgroundSize || `${width}px 100%`,
                backgroundImage: `url("${src}")`
            }}
              variants={{
                startX: {
                  x: [0, -width],
                },
              }}
              animate="startX"
              transition={{
                repeat: Infinity,
                duration,
                ease: 'linear',
              }}
            />
          </div>
        ) : null
      }
    </div>
  );
});

export default ImgAnimate;
