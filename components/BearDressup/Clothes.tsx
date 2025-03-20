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
    
    if (level < LimitMinCarLevel) {
        const ClothesComponent = (CLOTHES_MAPPING as any).stand[clothesItem.look_id as any];
        if (!ClothesComponent) return null
        return (
            <g id="Clothes">
                <ClothesComponent />
            </g>
        )
    }
    const ClothesComponent = (CLOTHES_MAPPING as any)[hasPassedLimitMinCarLevel ? 'sit' : 'stand'][clothesItem.look_id as any];

    if (!ClothesComponent) return null

    return (
        <g id="Clothes">
            <ClothesComponent />
        </g>
    )
}

export default Clothes