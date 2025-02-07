const Name = (props: Props) => {
  const { children, className } = props;

  return (
    <div className={`text-[#F7F9EA] text-stroke-2 font-cherryBomb text-[1rem] font-[400] leading-[100%] overflow-hidden text-ellipsis ${className}`}>
      {children}
    </div>
  );
};

export default Name;

interface Props {
  children: any;
  className?: string;
}
