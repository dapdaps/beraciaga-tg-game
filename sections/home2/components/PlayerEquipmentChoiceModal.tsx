import Modal from "@/components/modal"
import { useState } from "react";

const PlayerEquipmentChoiceModal = () => {
    const [activeTab, setActiveTab] = useState('Clothes');

  const tabs = ['Clothes', 'Hat', 'Decoration', 'Vehicle', 'Background'];
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
      <div className="bg-[url(/images/home/modal-player.png)] relative bg-contain bg-no-repeat w-[370px] h-[552px] px-2 pt-5">
        <div className="w-full mx-auto">
            {/* Tab 容器 */}
            <div className="relative top-[4px] flex rounded-t-[10px] w-full overflow-x-auto whitespace-nowrap scrollbar-hidden">
                {tabs.map((tab, index) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-[10px] text-center
                    rounded-t-[10px] border-x-[2px] border-t-[2px] border-[#E5C375] 
                    font-cherryBomb text-stroke-2 leading-4 text-white
                    ${activeTab === tab ? "bg-[#FFF1C7] text-black z-10 h-[36px] border-b-0 -mb-[2px]" 
                                        : "bg-[#E5D194] text-gray-600 h-[33px] mt-[4px]"}
                    ${index === 0 ? "first:ml-0" : "ml-[-2px]"}
                    ${index === tabs.length - 1 ? "last:mr-0" : ""}
                    `}
                >
                    {tab}
                </button>
                ))}
            </div>

            {/* 内容区域 */}
            <div className="bg-[#FFF1C7] p-6 rounded-b-[10px] border-x-[2px] border-b-[2px] border-[#E5C375] h-[425px]">
                <p className="text-lg text-black">{activeTab} 内容</p>
            </div>
        </div>
      </div>
    </Modal>
    )
}

export default PlayerEquipmentChoiceModal