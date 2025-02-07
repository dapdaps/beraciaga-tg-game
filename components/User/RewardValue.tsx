import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';

const RewardValue = (props: Props) => {
  const { children, className } = props;

  return (
    <div className={`text-[#FFBABB] text-stroke-2 font-cherryBomb text-[1rem] font-[400] leading-[100%] overflow-hidden text-ellipsis ${className}`}>
      {numberFormatter(children, 2, true)}
    </div>
  );
};

export default RewardValue;

interface Props {
  children: string | number | Big.Big;
  className?: string;
}
