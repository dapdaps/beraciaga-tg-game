import { motion } from 'framer-motion';
import ImgAnimate from '@/sections/home/components/img-animate';
import { useMemo } from 'react';
import Big from 'big.js';
import { SceneItem } from '@/sections/home/components/types';

const Scene = (props: Props) => {
  const { scene, initial, animate, onAnimationComplete, duration, zIndex, speed } = props;

  let _speed = useMemo(() => {
    if (typeof speed !== 'number') return 1;
    if (Big(speed).lte(0)) return 1;
    return Big(1).div(speed).toNumber();
  }, [speed]);

  return (
    <motion.div
      className="h-full w-full overflow-x-hidden absolute left-0 top-0 z-[1]"
      style={{ zIndex }}
      variants={{
        visible: {
          opacity: 1,
        },
        hidden: {
          opacity: 0,
        },
      }}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        ease: 'linear',
      }}
      onAnimationComplete={onAnimationComplete}
    >
      <ImgAnimate
        height={scene.height?.top || '60vh'}
        bgSrc={`/svg/bg/${scene.path}/top-bg.${formatFileTypes(scene, 'topBg')}`}
        src={`/svg/bg/${scene.path}/top.${formatFileTypes(scene, 'top')}`}
        duration={60 * _speed}
        backgroundSize={scene.height?.backgroundSize}
      />
      <div className="absolute left-0 bottom-0 z-[2]">
        <ImgAnimate
          height={scene.height?.mid || 400}
          src={`/svg/bg/${scene.path}/mid.${formatFileTypes(scene, 'mid')}`}
          duration={40 * _speed}
          className="absolute left-0 z-[1]"
          style={{
            top: scene.y?.mid || '-300px'
          }}
        />
        <ImgAnimate
          height={scene.height?.botBg || 234}
          src={`/svg/bg/${scene.path}/bot-bg.${formatFileTypes(scene, 'botBg')}`}
          duration={20 * _speed}
          className=""
        />
        <ImgAnimate
          height={scene.height?.bot || 234}
          src={`/svg/bg/${scene.path}/bot.${formatFileTypes(scene, 'bot')}`}
          duration={10 * _speed}
          className="absolute left-0 bottom-0 z-[2]"
        />
      </div>
    </motion.div>
  );
};

export default Scene;

interface Props {
  scene: SceneItem;
  initial: 'visible' | 'hidden';
  animate: 'visible' | 'hidden';
  duration: number;
  zIndex: number;
  speed?: number;
  onAnimationComplete?(): void;
}

const formatFileTypes = (scene: SceneItem, position: "top" | "topBg" | "mid" | "botBg" | "bot") => {
  return scene?.fileType?.[position] ?? 'svg';
};
