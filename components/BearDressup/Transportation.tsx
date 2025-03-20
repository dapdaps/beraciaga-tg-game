import { UserLookItem } from '@/apis/look';
import { Category, VEHICLE_MAPPING } from './mappings';
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';

interface TransportationProps {
  item: UserLookItem | EquipmentItem;
  className?: string;
}

const Transportation: React.FC<TransportationProps> = ({ item, className }) => {
  
  const VehicleComponent = VEHICLE_MAPPING[item?.look_id as keyof typeof VEHICLE_MAPPING] || VEHICLE_MAPPING.V_001;
  
  if (!VehicleComponent) return null;

  return (
    <g id="transportation" fill="none" className={className}>
      <VehicleComponent />
    </g>
  );
};

export default Transportation;