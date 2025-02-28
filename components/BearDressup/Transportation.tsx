import {TRANSPORTATION_MAPPING} from './config';

interface TransportationProps {
  level: number;
  className?: string;
}

const Transportation: React.FC<TransportationProps> = ({ level, className }) => {
  
  const VehicleComponent = TRANSPORTATION_MAPPING[level as keyof typeof TRANSPORTATION_MAPPING];
  
  if (!VehicleComponent) return null;

  return (
    <g id="transportation" fill="none" className={className}>
      <VehicleComponent />
    </g>
  );
};

export default Transportation;