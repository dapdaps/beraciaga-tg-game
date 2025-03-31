import { UserLookItem } from '@/apis/look';
import { Category, VEHICLE_MAPPING } from './mappings';
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';

interface TransportationProps {
  item: UserLookItem | EquipmentItem;
  className?: string;
}

const Transportation: React.FC<TransportationProps> = ({ item, className }) => {
  const svgPath = VEHICLE_MAPPING[item?.look_id as keyof typeof VEHICLE_MAPPING] || VEHICLE_MAPPING.V_001;
  
  if (!svgPath) return null;

  return (
    <svg width="360" height="340" id="transportation" fill="none" className={className}>
      <image xlinkHref={svgPath} width="360" height="340" />
    </svg>
  );
};

export default Transportation;