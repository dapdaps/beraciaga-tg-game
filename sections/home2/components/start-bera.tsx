import Modal from "@/components/modal";
import { useGameState } from "@/sections/home/components/DressUpGame/useGameState";
import Bear from "@/sections/home/components/DressUpGame/Bear";

interface IProps {
    show: boolean;
    onClose: () => void;
}

const StartBera = ({
    show,
    onClose,
}:  IProps) => {
  const { bearState } = useGameState();
  return (
    <Modal open={show} onClose={onClose}>
      <div className="relative w-[425px] h-[466px] mx-auto">
        <img
          src="/images/home/start-box.png"
          className="w-full h-full"
          alt=""
        />
        <div className="absolute top-[86px] left-[60px] z-0 scale-[0.895]">
          <Bear
            colors={bearState.colors}
            level={1}
            face={bearState.currentFace}
          />
        </div>
        <div></div>
      </div>
      <img
        src="/images/home/start-button.png"
        className="w-[242px] h-[56px] mx-auto mt-5"
        alt=""
      />
    </Modal>
  );
};

export default StartBera;