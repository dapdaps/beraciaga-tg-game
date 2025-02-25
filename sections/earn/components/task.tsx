import LazyImage from '@/components/img';
import Card from './card';
import Reward from './reward';
import Button from './button';
import { Quest } from '@/hooks/useQuest';
import LightingButton from '@components/Button/lighting-button';

const Task = (props: Props) => {
  const {
    style,
    name,
    coins,
    finished,
    visited,
    className,
    disabled,
    onClick,
  } = props;

  return (
    <Card className={`w-full ${className}`} style={style}>
      <div className="flex items-center gap-[0.687500rem]">
        <LazyImage
          src=""
          width="3.625rem"
          height="3.625rem"
          containerClassName="shrink-0"
        />
        <div className="flex flex-col flex-1 w-0">
          <div className="">{name}</div>
          <Reward className="mt-[0.562500rem]">
            +{coins}
          </Reward>
        </div>
        <div className="ml-auto flex justify-end items-center shrink-0">
          {
            finished ? (
              <LazyImage src="/images/icon-done.svg" width="1.500000rem" height="1.500000rem" />
            ) : (
              <LightingButton className="whitespace-nowrap" disabled={disabled} onClick={onClick}>
                {visited ? 'Verify' : 'Start'}
              </LightingButton>
            )
          }
        </div>
      </div>
    </Card>
  );
};

export default Task;

interface Props extends Quest {
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?(): void;
}
