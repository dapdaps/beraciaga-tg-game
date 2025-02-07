const Level = (props: Props) => {
  const { children, className } = props;

  return (
    <div className={`w-[1.625rem] h-[1.625rem] shrink-0 bg-[url('/images/level-bg.svg')] bg-no-repeat bg-center bg-contain flex justify-center items-center text-[#F7F9EA] text-stroke-1 font-cherryBomb text-[0.75rem] font-[400] leading-[100%] ${className}`}>
      {children}
    </div>
  );
};

export default Level;

interface Props {
  children: any;
  className?: string;
}
