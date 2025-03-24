import { UserLookItem } from "@/apis/look"
import { EquipmentItem } from "@/sections/home2/components/PlayerEquipmentList"
import { NECKLACES_MAPPING } from "./mappings";

const Necklace = ({
    item
}: {
    item: UserLookItem | EquipmentItem,
}) => {

    if (!item) return null;

    const NeckComponent = NECKLACES_MAPPING[item?.look_id as keyof typeof NECKLACES_MAPPING] || NECKLACES_MAPPING.N_001;

    if (!NeckComponent) return null

    return (
        <g>
            <NeckComponent />
        </g>
    )
}

export default Necklace