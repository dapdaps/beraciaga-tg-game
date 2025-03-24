import { UserLookItem } from '@/apis/look';
import { GLASSES_MAPPING } from './mappings'
import { EquipmentItem } from '@/sections/home2/components/PlayerEquipmentList';

const Glasses = ({
    item
}: {
    item: UserLookItem | EquipmentItem;
}) => {

    if (!item) return null;

    const GlassesComponent = GLASSES_MAPPING[item?.look_id as keyof typeof GLASSES_MAPPING] || GLASSES_MAPPING.G_001;

    if (!GlassesComponent) return null
    
    return (
        <g>
          <GlassesComponent />
        </g>
    )
}

export default Glasses