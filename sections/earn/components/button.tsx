const Button = (props: Props) => {
  const { style, children, className, onClick, disabled } = props;

  return (
    <button
      type="button"
      className={`bg-[#FFF5A9] h-[2.250000rem] rounded-[1.125000rem] px-[1.312500rem] flex justify-center items-center gap-[0.250000rem] border-[0.125000rem] border-[#4B371F] text-[#4B371F] text-[1.000000rem] font-[700] disabled:opacity-30 ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
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
