import { UserLookItem } from '@/apis/look';
import { FACES_MAPPING } from './mappings';
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';

interface FaceProps {
  item: UserLookItem | EquipmentItem;
  className?: string;
  bearColor?: string;
}

const Face: React.FC<FaceProps> = ({ item, className, bearColor }) => {
  const FaceComponent = FACES_MAPPING[item?.look_id as keyof typeof FACES_MAPPING] || FACES_MAPPING.F_001;

  if (!FaceComponent) return null;

  return (
    <g transform="translate(82,70)" className={className}>
      <FaceComponent
        style={{
          color: bearColor,
        }}
      />
    </g>
  );
};

export default Face;
