import Modal from "@/components/modal";
import DressUpGame from "@/sections/home/components/DressUpGame";
import Bear from "@/sections/home/components/DressUpGame/Bear";
import clsx from "clsx";

import IconChangeLook from "@public/svg/home/changeLook.svg";
import IconPhoto from "@public/svg/home/photo.svg";
import { domToPng } from "modern-screenshot";
import Skin from "./svgHoc/skin";

const CharacterCustomization = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex justify-end">
        {/* <div className="w-[96px] h-[120px] flex flex-col items-center justify-center">
            <img src="/images/role/skin.png" alt="Skin Light Brown" className="w-full h-full object-contain" />
          </div> */}
        <div className="w-[96px] h-[120px] border-[2px] border-[#DCC9B1] rounded-xl bg-white p-[5px] flex flex-col items-center justify-center">
          <div className="w-[86px] h-[86px] rounded-xl border-[2px] border-[#DCB988] bg-[#FFF1DC] flex items-center justify-center relative">
            <Skin />
            <div className="font-cherryBomb text-stroke-2 leading-4 absolute bottom-[-8px] left-0">
              Skin
            </div>
          </div>
          <div className="font-montserrat text-[12px] leading-3 mt-1.5 text-[#2C3108] text-ellipsis max-w-[78px]">
            Light Brown111
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {/* <div className="w-[96px] h-[120px] rounded flex flex-col items-center justify-center">
            <img src="/images/role/face.png" alt="Serious Face" className="w-full h-full object-contain" />
          </div> */}
        <div className="w-[96px] h-[120px] border-[2px] border-[#DCC9B1] rounded-xl bg-white p-[5px] flex flex-col items-center justify-center">
          <div className="w-[86px] h-[86px] rounded-xl border-[2px] border-[#DCB988] bg-[#FFF1DC] flex items-center justify-center relative">
            <Bear
              className="scale-[0.45] translate-x-[5%] translate-y-[9%]"
              showBody={false}
            />
            <div className="font-cherryBomb text-stroke-2 leading-4 absolute bottom-[-8px] left-0">
              Face
            </div>
          </div>
          <div className="font-montserrat text-[12px] leading-3 mt-1.5 text-[#2C3108] text-ellipsis max-w-[78px]">
            Serious Face
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-[96px] h-[120px] rounded flex flex-col items-center justify-center">
          <img
            src="/images/role/clothes.png"
            alt="Orange Swe..."
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-[96px] h-[120px] rounded flex flex-col items-center justify-center">
          <img
            src="/images/role/decoration.png"
            alt="Orange Swe..."
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-[96px] h-[120px] rounded flex flex-col items-center justify-center">
          <img
            src="/images/role/vehicle.png"
            alt="Orange Swe..."
            className="w-full h-full object-contain"
          />
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

const BearControlModal = () => {
  const handlePhoto = () => {
    const element = document.querySelector("#beraRole");
    if (element) {
      domToPng(element).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "beraRole.png";
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => {}}
      closeIcon={
        <img
          src="/images/home/close.png"
          alt="close"
          className="w-[34px] h-[34px]"
        />
      }
      closeIconClassName="top-[-17px] right-[-17px]"
    >
      <div className="bg-[url(/images/home/modal-box.png)] relative bg-contain bg-no-repeat w-[370px] h-[532px] px-2 pt-2">
        <GradientBorderBox containerClassNames="h-[426px] w-full">
          <CharacterCustomization />
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
                className="bg-[#FFF5A8] w-full h-full flex justify-center items-center"
              >
                <div className="w-full h-full scale-[0.6] translate-x-[-30px] translate-y-[-40px]">
                  <DressUpGame />
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-[28px] rotate-[-13.983deg] w-[66px] h-[53px] rounded-[50%] border border-[#4B371F] bg-[#C7FF6E] flex flex-col items-center justify-center gap-1 font-cherryBomb text-stroke-1 leading-4">
              <span>Rare</span>
              <span className="text-[#FF8DE3]">10%</span>
            </div>
            <div className="text-white text-stroke-2 font-cherryBomb text-[18px] leading-[18px] mt-2">
              Beraciaga #51235
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-[18px]">
          <IconChangeLook />
          <IconPhoto onClick={handlePhoto} />
        </div>
      </div>
    </Modal>
  );
};
export default BearControlModal;
