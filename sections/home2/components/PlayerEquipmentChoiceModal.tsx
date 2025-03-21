import Modal from "@/components/modal";
import { useState } from "react";
import PlayerEquipmentList from "./PlayerEquipmentList";
import IconSaveButton from "@public/svg/save-button.svg";
import { CATEGORIES, CATEGORY_NAMES, Category } from "@/components/BearDressup/mappings";
import { postLook } from "@/apis/look";
import { useGlobalUser } from "@/context/UserContext";
const PlayerEquipmentChoiceModal = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<string>(CATEGORY_NAMES.face);
  const { tgUserId, setUpdater } = useGlobalUser();
  // 记录用户实际修改过的装备状态
  const [equipmentChanges, setEquipmentChanges] = useState<Record<string, boolean>>({});

  const handleEquipmentChange = (lookId: string, equipped: boolean) => {
    setEquipmentChanges(prev => ({
      ...prev,
      [lookId]: equipped
    }));
  };

  const handleSaveEquipment = async () => {
    const modifiedLookIds = Object.entries(equipmentChanges)
      .filter(([_, equipped]) => equipped)
      .map(([lookId]) => lookId);

    if (modifiedLookIds.length === 0) return;

    const data = await postLook({
      look_ids: modifiedLookIds,
      tg_user_id: tgUserId.toString(),
    });

    if (data.code === 200) {
      // 保存成功后清空修改记录
      setEquipmentChanges({});
      onClose();
      setUpdater((prev: number) => prev + 1);
    }
  };

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
      closeIconClassName="top-[-17px] right-[-17px]"
    >
      <div className="bg-[url(/images/home/modal-player.png)] relative bg-contain bg-no-repeat w-[370px] h-[552px] px-2 pt-5">
        <div className="w-full mx-auto">
          <div className="relative top-[4px] flex rounded-t-[10px] w-full overflow-x-auto whitespace-nowrap scrollbar-hidden">
            {CATEGORIES.filter(item => !['skin'].includes(item)).map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(CATEGORY_NAMES[tab])}
                className={`relative px-[10px] text-center z-10
                    rounded-t-[10px] border-x-[2px] border-t-[2px] border-[#E5C375] 
                    font-cherryBomb text-stroke-2 leading-4 text-white
                    ${
                      activeTab === CATEGORY_NAMES[tab]
                        ? "bg-[#FFF1C7] text-black z-10 h-[36px] border-b-0 -mb-[2px]"
                        : "bg-[#E5D194] text-gray-600 h-[33px] mt-[4px]"
                    }
                    ${index === 0 ? "first:ml-0" : "ml-[-2px]"}
                    ${index === CATEGORIES.length - 1 ? "last:mr-0" : ""}
                    `}
              >
                {CATEGORY_NAMES[tab]}
              </button>
            ))}
          </div>

          {/* 内容区域 */}
          <div className="bg-[#FFF1C7] rounded-b-[10px] border-x-[2px] border-b-[2px] border-[#E5C375] h-[425px] overflow-x-hidden overflow-y-scroll">
            <div className="px-[18px] pt-5 pb-5">
              <PlayerEquipmentList 
                category={activeTab} 
                onEquipmentChange={handleEquipmentChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-2" onClick={handleSaveEquipment}>
          <IconSaveButton />
        </div>
      </div>
    </Modal>
  );
};

export default PlayerEquipmentChoiceModal;
