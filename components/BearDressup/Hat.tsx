import { UserLookItem } from '@/apis/look';
import { Category, HAT_MAPPING } from './mappings'

const Hat = ({
    userLooks
}: {
    userLooks: Record<Category, UserLookItem>;
}) => {

    if (!userLooks || !userLooks.hat) return null;

    const HatComponent = HAT_MAPPING[userLooks?.hat?.look_id as keyof typeof HAT_MAPPING] || HAT_MAPPING.H_001;

    if (!HatComponent) return null
    
    return (
        <g id="hat">
          <HatComponent />
        </g>
    )
}

export default Hat