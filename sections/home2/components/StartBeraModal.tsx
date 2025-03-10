/* eslint-disable @next/next/no-img-element */
import Modal from "@/components/modal";
import { useGameState } from "@/components/BearDressup/useGameState";
import Bear from "@/components/BearDressup/Bear";
import { useContext } from "react";
import { HomeContext } from "..";

const StartBeraModal = () => {
  const { setStartJourney, visibleStartBera, setVisibleStartBera, userLooksFlattened } = useContext(HomeContext);

  return (
    <Modal open={visibleStartBera} onClose={() => setVisibleStartBera(false)} isShowCloseIcon={false}>
      <div className="relative w-[426px] h-[467px] mx-auto">
        <img
          src="/svg/start-box.svg"
          className="w-full h-full"
          alt=""
        />
        <img src="/svg/modal-line.svg" className="w-[2px] h-[280px] absolute top-[106px] left-[180px] z-[5]" alt="" />
        <div className="absolute top-[86px] left-[60px] z-0 scale-[0.895]">
          <Bear userLooks={userLooksFlattened} />
        </div>
      </div>
      <img
        src="/images/home/start-button.png"
        className="w-[242px] h-[56px] mx-auto mt-5"
        alt=""
        onClick={() => {
          setVisibleStartBera(false)
          setStartJourney(true)
        }}
      />
    </Modal>
  );
};

export default StartBeraModal;