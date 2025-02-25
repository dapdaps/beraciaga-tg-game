import clsx from 'clsx';
import CardTitle from './title';

interface Props {
  className?: string;
  children?: any;
  title: string;
  icon?: string;
  iconX?: number;
  iconY?: number;
  innerClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  bodyClassName?: string;
}

const PaperclipCard: React.FC<Props> = (props) => {
  const { className, children, title, icon, iconX, iconY, innerClassName, titleClassName, contentClassName, bodyClassName } = props;

  return (
    <div className={clsx("relative pb-[15px] bg-[url('/images/shop/card-shadow-bg.svg')] bg-no-repeat bg-left-bottom bg-[length:100%_auto]", className)}>
      <CardTitle
        icon={icon}
        iconX={iconX}
        iconY={iconY}
        className={titleClassName}
        innerClassName={innerClassName}
      >
        {title}
      </CardTitle>
      <div className={clsx("p-[3px_4px] rounded-[10px] border-2 border-[#7F6C41] bg-gradient-to-b from-[#D4A20C] to-[#FFCC34]", bodyClassName)}>
        <div className={clsx("grid grid-cols-3 gap-x-[2px] gap-y-[18px] p-[38px_15px_20px] rounded-[10px] border-2 border-[#E5C375] bg-[#FFF1C7] w-full h-full", contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PaperclipCard;
