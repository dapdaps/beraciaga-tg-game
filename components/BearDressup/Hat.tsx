import { HAT_MAPPING } from './config'

const Hat = ({
    level
}: {
    level: number
}) => {
    const HatComponent = HAT_MAPPING[level as keyof typeof HAT_MAPPING]

    if (!HatComponent) return null
    return (
        <g id="hat">
          <HatComponent />
        </g>
    )
}

export default Hat