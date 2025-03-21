import LightingButton from "@/components/Button/lighting-button";
import FlagModal from "@/components/flag-modal";
import IconOutGoldText from '@public/svg/icon-out-gold-text.svg';

const OutOfGoldModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose?: () => void;
}) => {
  return (
    <FlagModal
      visible={visible}
      onClose={onClose}
      contentClassName='h-[330px]'
      footer={
        <LightingButton className="" onClick={() => {}}>
          More
        </LightingButton>
      }
    >
        <div className="w-full">
            <div className="w-full flex justify-center">
                <IconOutGoldText />
            </div>
            <div className="bg-[url(/svg/icon-out-gold-logo.svg)] bg-no-repeat w-[246px] h-[197px] relative mx-auto mt-4">
                <div style={{
                    background: 'linear-gradient(180deg, #FFDF77 0%, #F6AD0F 100%)',
                    'WebkitBackgroundClip': 'text',
                    'WebkitTextFillColor': 'transparent',
                }} className="text-[36px] text-stroke-3 text-white font-cherryBomb leading-[36px] absolute left-0 right-0 bottom-[25px] rotate-[-15deg] text-center">110k</div>
            </div>
            <div className="bg-[url(/svg/update-btn.svg)] bg-no-repeat w-[243px] h-[61px] mx-auto mt-4">
                <div className="w-full h-full flex flex-col justify-center items-center relative">
                    <img src="/svg/hot.svg" className="absolute right-[-20px] top-[-18px] w-[76px] h-[44px]" alt="" />
                    <div className="text-[#F7F9EA] text-stroke-1 font-cherryBomb text-[10px] leading-[10px] font-[400] line-through decoration-[#DF4040]">$10.9</div>
                    <div className="text-[#F7F9EA] text-stroke-2 font-cherryBomb text-[18px] leading-[18px] font-[400]">$0.99</div>
                </div>
            </div>
        </div>
    </FlagModal>
  );
};

export default OutOfGoldModal;


