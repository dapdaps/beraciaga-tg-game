import { UserLookItem } from '@/apis/look';
import { Category, HAT_MAPPING } from './mappings'
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';

const Hat = ({
    item
}: {
    item: UserLookItem | EquipmentItem;
}) => {

    if (!item) return null;

    const HatComponent = HAT_MAPPING[item?.look_id as keyof typeof HAT_MAPPING] || HAT_MAPPING.H_001;

    if (!HatComponent) return null
    
    return (
        <g id="hat">
          <HatComponent />
        </g>
    )
}

export default Hat