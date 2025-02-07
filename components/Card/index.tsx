const Card = (props: Props) => {
  const { children, className, innerClassName } = props;

  return (
    <div className={`w-full border-[2px] border-[#7F6C41] rounded-[0.625rem] bg-[linear-gradient(180deg,_#D4A20C_0%,_#FFCC34_100%)] p-[0.5rem] ${className}`}>
      <div className={`w-full border-[2px] border-[#E5C375] rounded-[0.625rem] bg-[#FFF1C7] p-[1rem_0.875rem_0] ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;

interface Props {
  children: any;
  className?: string;
  innerClassName?: string;
}
