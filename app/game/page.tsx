import GameView from '@/sections/game';
import { TabBarWrapper } from '@components/Layout/TabBarWrapper';

const Game = () => {
  return (
    <TabBarWrapper>
      <GameView />
    </TabBarWrapper>
  );
};

export default Game;
