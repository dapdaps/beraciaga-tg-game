import { UserLookItem } from '@/apis/look';
import { Category, VEHICLE_MAPPING } from './mappings';

interface TransportationProps {
  userLooks: Record<Category, UserLookItem>;
  className?: string;
}

const Transportation: React.FC<TransportationProps> = ({ userLooks, className }) => {
  
  const VehicleComponent = VEHICLE_MAPPING[userLooks?.vehicle?.look_id as keyof typeof VEHICLE_MAPPING] || VEHICLE_MAPPING.V_001;
  
  if (!VehicleComponent) return null;

  return (
    <g id="transportation" fill="none" className={className}>
      <VehicleComponent />
    </g>
  );
};

export default Transportation;