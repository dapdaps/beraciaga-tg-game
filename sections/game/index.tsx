import Back from '@components/Back';

const GameView = () => {

  return (
    <div className="w-full h-full">
      <Back />
      <iframe
        className="w-full h-full"
        src="https://core-game.beratown.app/"
      />
    </div>
  );
};

export default GameView;
