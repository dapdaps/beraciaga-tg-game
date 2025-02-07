const RewardIcon = (props: Props) => {
  const { className } = props;

  return (
    <img src="/images/icon-gemstone.svg" alt="" className={`w-[0.9375rem] h-[1.125rem] shrink-0 translate-y-[0.1rem] ${className}`} />
  );
};

export default RewardIcon;

interface Props {
  className?: string;
}
