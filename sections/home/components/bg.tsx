'use client';

import Scene from '@/sections/home/components/scene';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { useThrottleFn } from 'ahooks';
import { SceneItem, SceneList, SwitchSceneDuration, Scenes } from '@/sections/home/components/types';
import { useGlobalUser } from '@/context/UserContext';

const getLevelScene = (level: number): SceneItem => {
  const sceneKeys = Object.keys(SceneList) as Scenes[];
  const index = Math.min(Math.max(level - 1, 0), sceneKeys.length - 1);
  return SceneList[sceneKeys[index]];
};

const HomeBg = forwardRef<any, any>((props, ref) => {
  const { children, onSceneComplete = () => {}, speed } = props;
  const { userInfo } = useGlobalUser();
  const userLevel = userInfo?.level || 1;
  
  const [currentScene, setCurrentScene] = useState<SceneItem | undefined>(getLevelScene(userLevel));
  const [currentSceneIndex, setCurrentSceneIndex] = useState<any>(1);
  const [nextScene, setNextScene] = useState<SceneItem | undefined>();
  const [nextSceneIndex, setNextSceneIndex] = useState<any>(1);
  const [firstScene, setFirstScene] = useState(true);

  useEffect(() => {
    if (userLevel) {
      setCurrentScene(getLevelScene(userLevel));
    }
  }, [userLevel]);

  const { run: handleNextScene } = useThrottleFn((scene: SceneItem) => {
    if (currentScene) {
      setNextScene(scene);
      setCurrentSceneIndex(1);
      setNextSceneIndex(2);
      return;
    }
    setCurrentScene(scene);
    setCurrentSceneIndex(2);
    setNextSceneIndex(1);
  }, { wait: SwitchSceneDuration * 1000 });

  const refs = {
    firstScene,
    handleNextScene,
    currentScene,
    nextScene,
  };
  useImperativeHandle(ref, () => refs);

  return (
    <div className="h-full w-full relative">
      <div className="h-full w-full relative overflow-x-hidden overflow-y-auto z-[1]">
        {children}
      </div>
      <div className="h-full w-full absolute left-0 top-0 z-[0]">
        {
          currentScene && (
            <Scene
              scene={currentScene}
              duration={firstScene ? 0 : SwitchSceneDuration}
              zIndex={currentSceneIndex}
              speed={speed}
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => {
                setNextScene(void 0);
                setFirstScene(false);
                onSceneComplete({ scene: currentScene, firstScene });
              }}
            />
          )
        }
        {
          nextScene && (
            <Scene
              scene={nextScene}
              duration={SwitchSceneDuration}
              zIndex={nextSceneIndex}
              speed={speed}
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => {
                setCurrentScene(void 0);
                onSceneComplete({ scene: nextScene, firstScene });
              }}
            />
          )
        }
      </div>
    </div>
  );
});

export default HomeBg;