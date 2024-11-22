import React, { createContext, useContext } from "react";
import Popover, { PopoverPlacement } from "@/components/popover";

export type ModuleType = "hats" | "jackets" | "necklaces" | "cars";
export type ActionType = "bridge" | "swap" | "delegate" | "lend";

export interface ModuleStyles {
  container: string;
  imageWrapper: string;
  image: string;
  popoverContent?: string;
  imagePopover: string
}

export interface ModuleItem {
  id: string;
  icon: string;
  popoverIcon?: string;
  title: string;
  desc: string;
  type: ActionType;
  hasPopover?: boolean;
  needTransactionNums?: number;
}

export interface ModuleConfig {
  type: ModuleType;
  styles: ModuleStyles;
  items: ModuleItem[];
  onItemClick?: (item: ModuleItem) => void;
}

const ModuleItem: React.FC<ModuleItem & { styles: ModuleStyles }> = ({
  icon,
  popoverIcon,
  title,
  desc,
  type,
  needTransactionNums,
  hasPopover = true,
  styles,
  ...rest
}) => {
  const { onItemClick } = useModuleContext();

  const PopoverContent = () => {
    const [before, after] = desc.split("$TRANSACTION_COUNT");
    return (
      <div className="border-[3px] p-[10px] border-[#C7FF6E] rounded-xl w-[166px] bg-black bg-opacity-50 flex flex-col justify-center items-center gap-2">
        <div className={`flex justify-center items-center ${styles.imagePopover}`}>
          <img className="w-full h-full" src={popoverIcon || icon} alt={title} />
        </div>
        <div className="text-[#F7F9EA] font-cherryBomb text-[18px] font-[400] leading-[18px] text-center text-stroke-2">
          {title}
        </div>
        <div className="w-[38.461vw] text-left text-[12px] font-[400] leading-[14.4px] text-white px-3">
          {desc}
        </div>
        <div
          onClick={() =>
            onItemClick?.({
              icon,
              popoverIcon,
              title,
              desc,
              type,
              needTransactionNums,
              hasPopover,
              ...rest,
            })
          }
          className="w-full h-8 border-[2px] bg-[#FFF5A9] rounded-[30px] border-[#4B371F] font-cherryBomb text-[18px] font-[400] text-center text-stroke-2 text-white"
        >
          {/* {type.charAt(0).toUpperCase() + type.slice(1)} */}
          Buy
        </div>
      </div>
    );
  };

  const ImageContent = () => (
    <div className="flex-1">
      <img className={styles.image} src={icon} alt={title} />
    </div>
  );

  if (!hasPopover) {
    return <ImageContent />;
  }

  return (
    <Popover
      placement={PopoverPlacement.Center}
      contentClassName={`backdrop-blur-[10px]`}
      content={<PopoverContent />}
    >
      <ImageContent />
    </Popover>
  );
};

const ModuleContext = createContext<{
  onItemClick?: (item: ModuleItem) => void;
}>({});

const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("Error: ModuleContext is undefined");
  }
  return context;
};

const Module: React.FC<{ config: ModuleConfig }> = ({ config }) => {
  return (
    <ModuleContext.Provider value={{ onItemClick: config.onItemClick }}>
      <div className={config.styles.container}>
        {config.items.map((item) => (
          <ModuleItem key={item.id} {...item} styles={config.styles} />
        ))}
      </div>
    </ModuleContext.Provider>
  );
};

export default Module;
