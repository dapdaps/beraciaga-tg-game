import clsx from 'clsx';
import ProductCardTitle from '@/sections/shop/components/card-title';

const ProductCard: React.FC<any> = (props) => {
  const { className, children, type, innerClassName } = props;

  return (
    <div className={clsx("relative pb-[15px] bg-[url('/images/shop/card-shadow-bg.svg')] bg-no-repeat bg-left-bottom bg-[length:100%_auto]", className)}>
      <ProductCardTitle
        icon={type?.icon}
        iconX={type?.iconX}
        iconY={type?.iconY}
        innerClassName={innerClassName}
      >
        {type?.label}
      </ProductCardTitle>
      <div className="p-[3px_4px] rounded-[10px] border-2 border-[#7F6C41] bg-gradient-to-b from-[#D4A20C] to-[#FFCC34]">
        <div className="grid grid-cols-3 gap-x-[2px] gap-y-[18px] p-[38px_15px_20px] rounded-[10px] border-2 border-[#E5C375] bg-[#FFF1C7] w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
