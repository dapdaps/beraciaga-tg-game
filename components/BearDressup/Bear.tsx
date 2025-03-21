import React from "react";
import IconSit from "@public/svg/dressup/bears/sit.svg";
import IconStand from "@public/svg/dressup/bears/stand.svg";
import IconHead from "@public/svg/dressup/bears/head.svg";
import {
  Category,
  LimitMinCarLevel,
  SKINS_MAPPING,
} from "./mappings";
import { UserLookItem } from "@/apis/look";
import Face from "./Face";

interface BearProps {
  userLooks: Record<Category, UserLookItem>;
  className?: string;
  showBody?: boolean;
}

const Bear: React.FC<BearProps> = ({
  userLooks,
  className,
  showBody = true,
}) => {
  if (!userLooks || !userLooks.face) return null;

  const bearColor =
    SKINS_MAPPING[userLooks?.skin?.look_id as keyof typeof SKINS_MAPPING] ||
    SKINS_MAPPING.S_001;

  const level = userLooks.vehicle?.level || 0;
  const hasPassedLimitMinCarLevel = level >= LimitMinCarLevel;

  return (
    <g id="bear" fill="none" className={className}>
      <svg
        width="360"
        height="340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {showBody &&
          (!hasPassedLimitMinCarLevel ? (
            <IconStand
              style={{
                color: bearColor,
              }}
            />
          ) : (
            <IconSit
              style={{
                color: bearColor,
              }}
            />
          ))}
        <IconHead
          style={
            {
              color: bearColor,
            } as React.CSSProperties
          }
        />
        
        <Face item={userLooks.face} bearColor={bearColor} />
      </svg>
    </g>
  );
};

export default Bear;
