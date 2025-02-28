import { JACKETS_MAPPING } from './config'

import { GameItem } from "./useGameState";

const Jacket = ({
    userItems
}: {
    userItems: GameItem[]
}) => {
    const currentVehicle = userItems.find(
        (item: GameItem) => item.category === "cars" && item.isBuyStatus
      );

    const level = currentVehicle?.level || 0;
    
    if (currentVehicle?.isBuyStatus && level === 1) {
        const JacketComponent = (JACKETS_MAPPING as any).stand[1];
        if (!JacketComponent) return null
        return (
            <g id="Jacket">
                <JacketComponent />
            </g>
        )
    }
    const JacketComponent = (JACKETS_MAPPING as any)[currentVehicle ? 'sit' : 'stand'][level as any];

    if (!JacketComponent) return null

    return (
        <g id="Jacket">
            <JacketComponent />
        </g>
    )
}

export default Jacket