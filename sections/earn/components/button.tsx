const Button = (props: Props) => {
  const { style, children, className, onClick, disabled } = props;

  return (
    <button
      type="button"
      className={`bg-[#FFB050] h-[40px] rounded-[16px] p-[2px] border-[2px] border-[#4B371F] text-[#F7F9EA] uppercase font-cherryBomb text-stroke-2 text-[16px] font-[400] disabled:opacity-30 ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="w-full h-full border-[2px] px-[12px] border-[#AF7026] rounded-[12px] bg-[#FFCF23] flex justify-center items-center bg-[url('/images/shop/product-light.svg')] bg-no-repeat bg-[position:-3px_2px] bg-[length:52px_8.5px]">
        {children}
      </div>
    </button>
  );
};

export default Button;

interface Props {
  style?: React.CSSProperties;
  className?: string;
  children?: any;
  disabled?: boolean;
  onClick?(): void;
}
