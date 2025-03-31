import { UserLookItem } from '@/apis/look';
import { CLOTHES_MAPPING } from './mappings';
import { LimitMinCarLevel } from './mappings';
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';

const Clothes = ({
    clothesItem,
    vehicleItem
}: {
    clothesItem: UserLookItem | EquipmentItem,
    vehicleItem?: UserLookItem
}) => {
    const level = vehicleItem?.level || 0;
    const hasPassedLimitMinCarLevel = level >= LimitMinCarLevel;
    
    const posture = level < LimitMinCarLevel ? 'stand' : (hasPassedLimitMinCarLevel ? 'sit' : 'stand');
    const svgPath = (CLOTHES_MAPPING as any)[posture][clothesItem.look_id as any];
    
    if (!svgPath) return null;

    return (
        <svg width="360" height="340">
            <image xlinkHref={svgPath} width="360" height="340" />
        </svg>
    );
}

export default Clothes;