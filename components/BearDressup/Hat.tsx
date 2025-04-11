import { UserLookItem } from '@/apis/look';
import { HAT_MAPPING } from './mappings'
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';

const Hat = ({
    item
}: {
    item: UserLookItem | EquipmentItem;
}) => {

    if (!item) return null;

    const svgPath = HAT_MAPPING[item?.look_id as keyof typeof HAT_MAPPING] || HAT_MAPPING.H_001;

    if (!svgPath) return null
    
    return (
        <svg width="360" height="340">
            <image xlinkHref={svgPath} width="360" height="340" />
        </svg>
    )
}

export default Hat