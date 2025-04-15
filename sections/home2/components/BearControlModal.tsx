import Modal from "@/components/modal";
import BearDressup from "@/components/BearDressup";
import clsx from "clsx";
import IconChangeLook from "@public/svg/home/changeLook.svg";
import IconPhoto from "@public/svg/home/photo.svg";
import html2canvas from "html2canvas";
import { CATEGORIES, Category, CATEGORY_NAMES } from "@/components/BearDressup/mappings";
import Clothes from "@/components/BearDressup/Clothes";
import { useGlobalUser } from "@/context/UserContext";
import Face from "@/components/BearDressup/Face";
import Skin from "@/components/BearDressup/Skin";
import { useEffect, useRef } from "react";
import { Canvg } from 'canvg';



const EquipmentItem = ({ category, isUnlocked, userLooksFlattened }: { category: Category; isUnlocked: boolean, userLooksFlattened?: any }) => {
  if (!isUnlocked) {
    return (
      <div className="w-[96px] h-[106px] flex flex-col items-center justify-center">
        <img 
          src={`/images/role/${category}-lock.png`} 
          alt={`${CATEGORY_NAMES[category]} Locked`} 
          className="w-full h-full object-contain" 
        />
      </div>
    );
  }

  return (
    <div className="w-[96px] h-[106px] border-[2px] border-[#DCC9B1] rounded-xl bg-white p-[5px] flex flex-col items-center">
      <div className="w-[86px] h-[86px] rounded-xl border-[2px] border-[#DCB988] bg-[#FFF1DC] flex items-center justify-center relative">
        {category === 'skin' && (
          <div className="w-full h-full scale-[0.27] translate-x-[-32%] -translate-y-[40%]">
            <Skin  item={userLooksFlattened?.skin} />   
          </div>
        ) }
        {category === 'face' && (
          <Face
            item={userLooksFlattened.face}
            className="scale-[0.45] translate-x-[5%] translate-y-[9%]"
          />
        )}
        {category === 'clothes' && (
          <div className="w-full h-full scale-[0.45] translate-x-[-50%] -translate-y-[90%]">
            <Clothes 
              clothesItem={userLooksFlattened.clothes}
              vehicleItem={userLooksFlattened?.vehicle}
            />
          </div>
        )}
        <div className="font-cherryBomb text-white text-stroke-2 leading-4 absolute bottom-[-8px] left-0">
          {CATEGORY_NAMES[category]}
        </div>
      </div>
    </div>
  );
};

const CharacterCustomization = ({
  userLooksFlattened
}: {
  userLooksFlattened: any
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex justify-end">
        {/* Skin */}
        {CATEGORIES.slice(0, 1).map((category) => (
          <EquipmentItem 
            key={category}
            category={category}
            isUnlocked={!!userLooksFlattened?.[category]?.use}
            userLooksFlattened={userLooksFlattened}
          />
        ))}
      </div>
      <div className="flex justify-end">
        {/* Face */}
        {CATEGORIES.slice(1, 2).map((category) => (
          <EquipmentItem 
            key={category}
            category={category}
            isUnlocked={!!userLooksFlattened?.[category]?.use}
            userLooksFlattened={userLooksFlattened}
          />
        ))}
      </div>
        {/* Clothes, Hat, decoration */}
      <div className="flex items-center justify-between">
        {CATEGORIES.slice(2, 5).map((category) => (
          <EquipmentItem 
            key={category}
            category={category}
            isUnlocked={!!userLooksFlattened?.[category]?.use}
            userLooksFlattened={userLooksFlattened}
          />
        ))}
      </div>
      {/* Vehicle, Glasses, Background */}
      <div className="flex items-center gap-3">
        {CATEGORIES.slice(5, 7).map((category) => (
          <EquipmentItem 
            key={category}
            category={category}
            isUnlocked={!!userLooksFlattened?.[category]?.use}
            userLooksFlattened={userLooksFlattened}
          />
        ))}
        <div className="w-[96px] h-[106px] border-[2px] border-[#DCC9B1] rounded-xl bg-white p-[5px] flex flex-col items-center">
          <div className="w-[86px] h-[86px] rounded-xl border-[2px] border-[#DCB988] bg-[#FFF1DC] flex items-center justify-center relative ">
            <div className="w-full h-full bg-[#FFF5A8]  rounded-xl"></div>
            <div className="text-white font-cherryBomb text-stroke-2 leading-4 absolute bottom-[-8px] left-0">
              Background
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

const GradientBorderBox = ({
  children,
  containerClassNames,
}: {
  children: React.ReactNode;
  containerClassNames?: string;
}) => {
  return (
    <div
      className="relative rounded-lg"
      style={{
        padding: "2px",
        background: "linear-gradient(to bottom, #E5C375 0%, #7F6C41 100%)",
      }}
    >
      <div
        className={clsx(
          "relative rounded-lg bg-[#FFF1C7] p-4",
          containerClassNames
        )}
      >
        {children}
      </div>
    </div>
  );
};

const BearControlModal = ({
  show,
  onClose,
  onChangeLook,
}: {
  show: boolean;
  onClose: () => void;
  onChangeLook: () => void;
}) => {

  const {
    userLooksFlattened,
    userInfo,
  } = useGlobalUser();

  const bearRoleRef = useRef<HTMLDivElement>(null);

  const prepareSvgForCapture = async () => {
    if (!bearRoleRef.current) return;
    
    // 找到所有SVG元素
    const svgElements = bearRoleRef.current.querySelectorAll('svg');
    
    // 处理每个SVG
    for (const svgElement of Array.from(svgElements)) {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const bbox = svgElement.getBoundingClientRect();
      
      // 创建一个Canvas元素来代替SVG
      const canvas = document.createElement('canvas');
      canvas.width = bbox.width;
      canvas.height = bbox.height;
      
      // 设置Canvas的样式以匹配SVG
      Object.assign(canvas.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: `${bbox.width}px`,
        height: `${bbox.height}px`,
      });
      
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;
      
      // 使用Canvg渲染SVG到Canvas
      const v = await Canvg.from(ctx, svgString);
      await v.render();
      
      // 临时隐藏SVG并插入Canvas
      svgElement.style.display = 'none';
      svgElement.parentNode?.insertBefore(canvas, svgElement);
      
      // 记录这对匹配的元素，以便稍后恢复
      svgElement.setAttribute('data-has-canvas-replacement', 'true');
    }
  };
  // 恢复原始SVG
  const restoreSvgElements = () => {
    if (!bearRoleRef.current) return;
    
    // 找到所有被替换的SVG
    const replacedSvgs = bearRoleRef.current.querySelectorAll('svg[data-has-canvas-replacement="true"]');
    
    for (const svg of Array.from(replacedSvgs)) {
      // 删除Canvas元素
      const canvas = svg.previousSibling;
      if (canvas && canvas instanceof HTMLCanvasElement) {
        canvas.remove();
      }
      
      // 恢复SVG显示
      (svg as SVGElement).style.display = '';
      svg.removeAttribute('data-has-canvas-replacement');
    }
  };
  const handlePhoto = async () => {
    const element = bearRoleRef.current;
    if (element) {
      try {
        await prepareSvgForCapture();
        
        // 截图
        const canvas = await html2canvas(element, {
          logging: false,
          useCORS: true,
          allowTaint: true
        });
        
        restoreSvgElements();
        
        // 下载图片
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "beraRole.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Failed to generate image:", error);
        restoreSvgElements();
      }
    }
  };

  // 当modal关闭时确保恢复SVG
  useEffect(() => {
    if (!show) {
      restoreSvgElements();
    }
  }, [show]);

  return (
    <Modal
      open={show}
      onClose={onClose}
      closeIcon={
        <img
          src="/images/home/close.png"
          alt="close"
          className="w-[34px] h-[34px]"
        />
      }
      closeIconClassName="top-[-17px] !right-[-8px]"
    >
      <div className="bg-[url(/images/home/modal-box.png)] relative bg-contain bg-no-repeat w-[370px] h-[637px] px-2 pt-2">
        <GradientBorderBox containerClassNames="min-h-[426px] w-full pb-8">
          <CharacterCustomization userLooksFlattened={userLooksFlattened} />
        </GradientBorderBox>
        <div className="w-[240px] h-[280px] bg-white border-[2px] border-[#4B371F] absolute top-0 left-0 rotate-[-2deg] rounded-xl p-[6px] shadow-shadow1">
          <div className="w-full h-full relative z-0">
            <img
              src="/images/role/bera-id.png"
              className="z-10 absolute top-[-40px] w-[224px] h-[59px]"
              alt=""
            />
            <div className="border-[2px] border-[#DCB988] bg-[#FFF5A8] rounded-xl overflow-hidden w-[223px] h-[223px]">
              <div
                id="beraRole"
                ref={bearRoleRef}
                className="bg-[#FFF5A8] w-full h-full flex justify-center items-center"
              >
                <div className="w-full h-full scale-[0.6] translate-x-[-20px] translate-y-[-40px]">
                  <BearDressup />
                </div>
              </div>
            </div>
            {/* <div className="absolute right-0 bottom-[28px] rotate-[-13.983deg] w-[66px] h-[53px] rounded-[50%] border border-[#4B371F] bg-[#C7FF6E] flex flex-col items-center justify-center gap-1 font-cherryBomb text-stroke-1 leading-4">
              <span>Rare</span>
              <span className="text-[#FF8DE3]">10%</span>
            </div> */}
            <div className="text-white text-stroke-2 font-cherryBomb text-[18px] leading-[18px] mt-2">
              Beraciaga #{userInfo.id}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-[30px]">
          <IconChangeLook onClick={() => {
            onChangeLook();
          }} />
          <IconPhoto onClick={handlePhoto} />
        </div>
      </div>
    </Modal>
  );
};
export default BearControlModal;
