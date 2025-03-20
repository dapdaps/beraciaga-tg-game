import clsx from 'clsx';
import { numberFormatter } from '@/utils/number-formatter';
import { AnimatePresence, motion } from 'framer-motion';

const Coupon = (props: any) => {
  const { className, selected, item, onSelect } = props;

  return (
    <motion.div
      className={clsx("w-[271px] shrink-0 h-[70px] bg-no-repeat bg-center bg-contain flex justify-between items-center pl-[34px] pr-[32px]", className)}
      animate={{
        backgroundImage: selected ? 'url(/images/shop/bg-coupon-selected.png)' : 'url(/images/shop/bg-coupon.png)',
      }}
      onClick={onSelect}
    >
      <div className="flex-1 w-0 whitespace-nowrap overflow-hidden text-ellipsis leading-[1]">
        <div className="text-[#4B371F] text-[16px] font-cherryBomb">
          {item.source}
        </div>
        <div className="mt-[5px] text-[#F7F9EA] text-stroke-2 text-[16px] font-cherryBomb uppercase">
          {numberFormatter(item.discount_value, 2, true, { prefix: "$" })}
        </div>
      </div>
      <AnimatePresence>
        {
          selected && (
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src="/images/shop/icon-coupon-selected.svg" alt="" className="w-[28px] h-[28px] object-contain object-center" />
            </motion.div>
          )
        }
      </AnimatePresence>
    </motion.div>
  );
};

export default Coupon;
