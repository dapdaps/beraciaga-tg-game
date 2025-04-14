import React from "react";
import { SKINS_MAPPING } from "./mappings";
import { UserLookItem } from "@/apis/look";

interface SkinProps {
  item: UserLookItem;
  className?: string;
}

const Skin: React.FC<SkinProps> = ({ item, className }) => {
  const svgPath = 
    SKINS_MAPPING[item?.look_id as keyof typeof SKINS_MAPPING] ||
    SKINS_MAPPING.S_001;

  return (
    <svg width="360" height="340">
        <image xlinkHref={svgPath} width="360" height="340" />
    </svg>
  );
};

export default Skin;