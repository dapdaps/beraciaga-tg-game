import Coin from '@/sections/home/components/Coin';
import { numberFormatter } from '@/utils/number-formatter';
import { useGlobalUser } from '@/context/UserContext';

const DropCoins = () => {
  const {
    coins,
    handleCollected,
  } = useGlobalUser();

  if (!coins || !coins.length) return null;

  return (
    <div className="w-full h-full absolute left-0 top-0 z-[0] overflow-hidden">
      {coins.map((coin: any) => (
        <Coin
          amount={numberFormatter(coin.amount, 3, true)}
          key={coin.id}
          id={coin.id}
          initialX={coin.x}
          onCollected={handleCollected}
          duration={6}
        />
      ))}
    </div>
  );
};

export default DropCoins;
