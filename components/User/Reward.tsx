import RewardIcon from '@components/User/RewardIcon';
import RewardValue from '@components/User/RewardValue';
import Big from 'big.js';

const Reward = (props: Props) => {
  const { children, className } = props;

  return (
    <div className={`flex items-center gap-[0.5rem] w-full ${className}`}>
      <RewardIcon />
      <RewardValue>{children}</RewardValue>
    </div>
  );
};

export default Reward;

interface Props {
  children: string | number | Big.Big;
  className?: string;
}
