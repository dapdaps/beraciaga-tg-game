import React from "react";
import {
  Category,
} from "./mappings";
import { UserLookItem } from "@/apis/look";
import Face from "./Face";
import Skin from "./Skin";

interface BearProps {
  userLooks: Record<Category, UserLookItem>;
  className?: string;
  showBody?: boolean;
}

const Bear: React.FC<BearProps> = ({
  userLooks,
  className,
}) => {
  if (!userLooks || !userLooks.face) return null;

  return (
    <g id="bear" fill="none" className={className}>
      <svg
        width="360"
        height="340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Skin item={userLooks.skin} />
        <Face item={userLooks.face} />
      </svg>
    </g>
  );
};

export default Bear;